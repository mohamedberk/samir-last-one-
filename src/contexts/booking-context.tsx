'use client';

import { Activity } from '@/types/activity';
import { createContext, useContext, useReducer, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { allActivities } from '@/data/activities';

export enum STEPS {
  PERSONAL_INFO = 1,
  AIRPORT_PICKUP = 2,
  UPSELL = 3,
  CONFIRMATION = 4,
}

export type Step = 1 | 2 | 3 | 4;

interface BookingState {
  step: Step;
  formData: {
    name: string;
    email: string;
    phone: string;
    confirmPhone: string;
    nationality: string;
    pickupLocation: string;
    date: Date | null;
    guests: {
      adults: number;
      children: number;
    };
    duration: string;
  };
  airportPickup: {
    enabled: boolean;
    city: 'Marrakech' | 'Casablanca' | 'Agadir';
    date: Date | null;
    time: string;
    price: number;
  };
  activities: {
    main: Activity | null;
    additional: Activity[];
    upsell: Activity[];
  };
  tourType: 'group' | 'private';
  paymentMethod: 'card' | 'cash' | 'pending';
  _hydrated: boolean;
}

type BookingAction =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<BookingState['formData']> }
  | { type: 'UPDATE_AIRPORT_PICKUP'; payload: Partial<BookingState['airportPickup']> }
  | { type: 'ADD_ACTIVITY'; payload: { activity: Activity; type: 'main' | 'additional' | 'upsell' } }
  | { type: 'REMOVE_ACTIVITY'; payload: { activityId: number; type: 'main' | 'additional' | 'upsell' } }
  | { type: 'SET_PAYMENT_METHOD'; payload: 'card' | 'cash' }
  | { type: 'SET_TOUR_TYPE'; payload: 'group' | 'private' }
  | { type: 'HYDRATE'; payload: Partial<BookingState> }
  | { type: 'RESET_BOOKING' };

const initialState: BookingState = {
  step: 1,
  formData: {
    name: '',
    email: '',
    phone: '',
    confirmPhone: '',
    nationality: '',
    pickupLocation: '',
    date: null,
    guests: {
      adults: 1,
      children: 0
    },
    duration: '',
  },
  airportPickup: {
    enabled: false,
    city: 'Marrakech',
    date: null,
    time: '',
    price: 20,
  },
  activities: {
    main: null,
    additional: [],
    upsell: [],
  },
  tourType: 'group',
  paymentMethod: 'pending',
  _hydrated: false,
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    
    case 'UPDATE_AIRPORT_PICKUP':
      return {
        ...state,
        airportPickup: { ...state.airportPickup, ...action.payload },
      };
    
    case 'ADD_ACTIVITY':
      const { activity, type } = action.payload;
      return {
        ...state,
        activities: {
          ...state.activities,
          [type]: type === 'main' 
            ? activity 
            : [...state.activities[type], activity],
        },
      };
    
    case 'REMOVE_ACTIVITY':
      const { activityId, type: removeType } = action.payload;
      return {
        ...state,
        activities: {
          ...state.activities,
          [removeType]: removeType === 'main'
            ? null
            : state.activities[removeType].filter(a => a.id !== activityId),
        },
      };
    
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };

    case 'SET_TOUR_TYPE':
      return { ...state, tourType: action.payload };
    
    case 'HYDRATE':
      return {
        ...state,
        ...action.payload,
        _hydrated: true,
      };
    
    case 'RESET_BOOKING':
      return { ...initialState, _hydrated: true };
    
    default:
      return state;
  }
}

export interface BookingContextValue {
  state: BookingState;
  setStep: (step: Step) => void;
  updateFormData: (data: Partial<BookingState['formData']>) => void;
  updateAirportPickup: (data: Partial<BookingState['airportPickup']>) => void;
  addActivity: (activity: Activity, type: 'main' | 'additional' | 'upsell') => void;
  removeActivity: (activityId: number, type: 'main' | 'additional' | 'upsell') => void;
  setPaymentMethod: (method: 'card' | 'cash') => void;
  setTourType: (type: 'group' | 'private') => void;
  resetBooking: () => void;
  // Computed values
  selectedActivities: (Activity & { isMainActivity?: boolean })[];
  totalPrice: number;
  isValid: boolean;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

const AIRPORT_PRICES = {
  'Marrakech': 20,
  'Casablanca': 50,
  'Agadir': 35,
} as const;

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load initial state from URL
  useEffect(() => {
    const urlState = {
      step: searchParams.get('step'),
      activityId: searchParams.get('activityId'),
      tourType: searchParams.get('tourType'),
      adults: searchParams.get('adults'),
      children: searchParams.get('children'),
      upsells: searchParams.get('upsells'),
      name: searchParams.get('name'),
      email: searchParams.get('email'),
      phone: searchParams.get('phone'),
      confirmPhone: searchParams.get('confirmPhone'),
      nationality: searchParams.get('nationality'),
      pickup: searchParams.get('pickup'),
      date: searchParams.get('date'),
    };

    const payload: Partial<BookingState> = {};

    // Parse step
    if (urlState.step) {
      payload.step = parseInt(urlState.step) as Step;
    }

    // Parse tour type
    if (urlState.tourType) {
      try {
        const parsedTourType = JSON.parse(urlState.tourType);
        if (parsedTourType === 'group' || parsedTourType === 'private') {
          payload.tourType = parsedTourType;
        }
      } catch (e) {
        console.error('Error parsing tour type:', e);
      }
    }

    // Initialize form data with any existing URL values
    payload.formData = {
      ...initialState.formData,
      name: urlState.name || '',
      email: urlState.email || '',
      phone: urlState.phone || '',
      confirmPhone: urlState.confirmPhone || '',
      nationality: urlState.nationality || '',
      pickupLocation: urlState.pickup || '',
      date: urlState.date ? new Date(urlState.date) : null,
      guests: {
        adults: urlState.adults ? parseInt(urlState.adults) : 1,
        children: urlState.children ? parseInt(urlState.children) : 0
      }
    };

    // Parse upsells - ensure uniqueness
    if (urlState.upsells) {
      try {
        const upsellIds = Array.from(new Set(JSON.parse(urlState.upsells)));
        const upsellActivities = upsellIds.map(id => 
          allActivities.find(a => a.id === id)
        ).filter((a): a is Activity => a !== undefined);
        
        payload.activities = {
          ...initialState.activities,
          upsell: upsellActivities
        };
      } catch (e) {
        console.error('Error parsing upsells:', e);
      }
    }

    // If there's an activityId, set it as the main activity
    if (urlState.activityId) {
      const mainActivity = allActivities.find(a => a.id === parseInt(urlState.activityId || ''));
      if (mainActivity) {
        payload.activities = {
          ...payload.activities || initialState.activities,
          main: mainActivity
        };
      }
    }

    dispatch({ type: 'HYDRATE', payload });
  }, [searchParams]); // Only depend on searchParams

  // Save state to URL only on specific changes
  useEffect(() => {
    if (!state._hydrated) return;

    const params = new URLSearchParams(searchParams.toString());

    // Core booking parameters that should always be in URL
    params.set('step', state.step.toString());
    params.set('tourType', JSON.stringify(state.tourType));
    params.set('activityId', state.activities.main?.id.toString() || '');

    // Include guest counts only when moving to next step
    if (state.step > STEPS.PERSONAL_INFO) {
      params.set('adults', state.formData.guests.adults.toString());
      if (state.formData.guests.children > 0) {
        params.set('children', state.formData.guests.children.toString());
      } else {
        params.delete('children');
      }
    }

    // Only include unique upsell IDs
    if (state.activities.upsell.length > 0) {
      const uniqueUpsellIds = Array.from(new Set(state.activities.upsell.map(a => a.id)));
      params.set('upsells', JSON.stringify(uniqueUpsellIds));
    } else {
      params.delete('upsells');
    }

    // Only include form data when moving to next step
    if (state.step > STEPS.PERSONAL_INFO) {
      if (state.formData.name) params.set('name', state.formData.name);
      if (state.formData.email) params.set('email', state.formData.email);
      if (state.formData.phone) params.set('phone', state.formData.phone);
      if (state.formData.confirmPhone) params.set('confirmPhone', state.formData.confirmPhone);
      if (state.formData.nationality) params.set('nationality', state.formData.nationality);
      if (state.formData.pickupLocation) params.set('pickup', state.formData.pickupLocation);
      if (state.formData.date) params.set('date', state.formData.date.toISOString());
    }

    const basePath = state.tourType === 'private' ? '/privatebooking' : '/booking';
    window.history.replaceState(null, '', `${basePath}?${params.toString()}`);
  }, [
    state.step, // Only update URL when step changes
    state.tourType, // When tour type changes
    state.activities.main?.id, // When main activity changes
    state.activities.upsell.length, // When upsells are added/removed
    searchParams
  ]);

  const setStep = useCallback((step: Step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const updateFormData = useCallback((data: Partial<BookingState['formData']>) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
  }, []);

  const updateAirportPickup = useCallback((data: Partial<BookingState['airportPickup']>) => {
    dispatch({ type: 'UPDATE_AIRPORT_PICKUP', payload: data });
  }, []);

  const addActivity = useCallback((activity: Activity, type: 'main' | 'upsell' | 'additional') => {
    // For upsells, check if already exists
    if (type === 'upsell' && state.activities.upsell.some(a => a.id === activity.id)) {
      return; // Already exists, don't add
    }

    dispatch({ type: 'ADD_ACTIVITY', payload: { activity, type } });
  }, [state.activities.upsell]);

  const removeActivity = useCallback((activityId: number, type: 'main' | 'upsell' | 'additional') => {
    dispatch({ type: 'REMOVE_ACTIVITY', payload: { activityId, type } });
  }, []);

  const setPaymentMethod = useCallback((method: 'card' | 'cash') => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  }, []);

  const setTourType = useCallback((type: 'group' | 'private') => {
    dispatch({ type: 'SET_TOUR_TYPE', payload: type });
  }, []);

  const resetBooking = useCallback(() => {
    dispatch({ type: 'RESET_BOOKING' });
  }, []);

  // Computed values
  const selectedActivities = useMemo(() => {
    const { main, additional, upsell } = state.activities;
    return [
      ...(main ? [{ ...main, isMainActivity: true }] : []),
      ...additional,
      ...upsell
    ];
  }, [state.activities]);

  const totalPrice = useMemo(() => {
    let total = 0;

    // Calculate activities total
    selectedActivities.forEach(activity => {
      if ('options' in activity) { // Type guard to ensure activity has options
        const activityOptions = activity.options[state.tourType];
        if (activityOptions) {
          const basePrice = activityOptions.price;
          const childPrice = activityOptions.childPrice;
          total += basePrice * state.formData.guests.adults;
          total += childPrice * state.formData.guests.children;
        }
      }
    });

    // Add airport pickup if enabled
    if (state.airportPickup.enabled && state.airportPickup.city in AIRPORT_PRICES) {
      const pickupPrice = AIRPORT_PRICES[state.airportPickup.city as keyof typeof AIRPORT_PRICES];
      total += pickupPrice * (state.formData.guests.adults + state.formData.guests.children);
    }

    return total;
  }, [state.activities, state.tourType, state.formData.guests, state.airportPickup, selectedActivities]);

  const isValid = useMemo(() => {
    if (state.step === STEPS.CONFIRMATION) return true;

    const formValid = Boolean(
      state.formData.name &&
      state.formData.email &&
      state.formData.phone &&
      state.formData.phone === state.formData.confirmPhone &&
      state.formData.nationality &&
      state.formData.pickupLocation &&
      state.formData.date
    );

    const airportValid = !state.airportPickup.enabled || Boolean(
      state.airportPickup.date &&
      state.airportPickup.time
    );

    const activitiesValid = selectedActivities.length > 0;
    const paymentValid = state.step === STEPS.UPSELL ? Boolean(state.paymentMethod) : true;

    return formValid && airportValid && activitiesValid && paymentValid;
  }, [state, selectedActivities]);

  const value = useMemo(() => ({
    state,
    setStep,
    updateFormData,
    updateAirportPickup,
    addActivity,
    removeActivity,
    setPaymentMethod,
    setTourType,
    resetBooking,
    selectedActivities,
    totalPrice,
    isValid,
  }), [
    state,
    setStep,
    updateFormData,
    updateAirportPickup,
    addActivity,
    removeActivity,
    setPaymentMethod,
    setTourType,
    resetBooking,
    selectedActivities,
    totalPrice,
    isValid,
  ]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
} 