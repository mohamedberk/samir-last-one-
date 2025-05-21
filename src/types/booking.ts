export interface Booking {
  reference: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    confirmPhone: string;
    nationality: string;
    pickupLocation: string;
  };
  date: Date;
  duration?: string;
  tourType: 'group' | 'private';
  activities: {
    id: number;
    name: string;
    basePrice: number;
    childPrice: number;
    adultCount: number;
    childCount: number;
    adultTotal: number;
    childTotal: number;
    totalPrice: number;
    selectedMenu?: 'tagine' | 'mechoui';
    menuPrice?: number;
  }[];
  guests: {
    adults: number;
    children: number;
  };
  airportTransfer: {
    city: string;
    date: Date;
    time: string;
    price: number;
    totalPrice: number;
  } | null;
  paymentDetails: {
    status: 'pending' | 'confirmed' | 'cancelled';
    totalAmount: string;
    currency: string;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  lastUpdated: Date;
  metadata?: {
    source: string;
    isChezAli?: boolean;
  };
} 