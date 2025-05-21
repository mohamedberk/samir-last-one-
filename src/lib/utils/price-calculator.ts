import { Activity } from '@/types/activity';
import { airportTransfers, calculateAirportTransferPrice } from '@/data/activities';

/**
 * Comprehensive price calculation for all booking types
 */

export interface PriceCalculatorParams {
  activities: Activity[];
  tourType: 'group' | 'private';
  guests: {
    adults: number;
    children: number;
  };
  airportPickup?: {
    enabled: boolean;
    city?: string;
    price?: number;
  };
  isChezAli?: boolean;
  selectedMenu?: 'tagine' | 'mechoui';
}

export interface ActivityPriceBreakdown {
  id: number;
  name: string;
  adultPrice: number;
  childPrice: number;
  adultTotal: number;
  childTotal: number;
  activityTotal: number;
}

export interface PriceBreakdown {
  activitiesTotal: number;
  airportTransferTotal: number;
  totalAmount: number;
  formattedTotal: string;
  currency: string;
  perActivityBreakdown: ActivityPriceBreakdown[];
}

/**
 * Calculate the total price for a booking with detailed breakdown
 */
export function calculateTotalPrice({
  activities,
  tourType,
  guests,
  airportPickup,
  isChezAli = false,
  selectedMenu = 'tagine'
}: PriceCalculatorParams): PriceBreakdown {
  let activitiesTotal = 0;
  let airportTransferTotal = 0;
  const perActivityBreakdown: ActivityPriceBreakdown[] = [];
  const currency = "EUR"; // Using Euro for all calculations
  
  // Calculate activities total
  activities.forEach(activity => {
    // Special handling for Chez Ali
    if (isChezAli || activity.slug === 'chez-ali') {
      const menuPrice = selectedMenu === 'tagine' 
        ? (activity.menuOptions?.tagineMenu?.price || 48)
        : (activity.menuOptions?.mechouiMenu?.price || 60);
      
      const totalGuests = guests.adults + guests.children;
      const activityTotal = menuPrice * totalGuests;
      
      activitiesTotal += activityTotal;
      
      perActivityBreakdown.push({
        id: activity.id,
        name: activity.title,
        adultPrice: menuPrice,
        childPrice: menuPrice, // Same price for children in Chez Ali
        adultTotal: menuPrice * guests.adults,
        childTotal: menuPrice * guests.children,
        activityTotal
      });
      
      return;
    }

    const pricing = activity.options[tourType];
    let adultPrice = 0;
    let childPrice = 0;
    let adultTotal = 0;
    let childTotal = 0;
    let activityTotal = 0;

    if (tourType === 'private' && pricing.privateTierPricing) {
      // Private tour with tier pricing
      const totalPeople = guests.adults + guests.children;
      
      if (totalPeople <= pricing.privateTierPricing.tier1.maxPeople) {
        // Tier 1 pricing (typically 1-6 people)
        activityTotal = pricing.privateTierPricing.tier1.price;
      } else {
        // Tier 2 pricing (typically 7-17 people)
        activityTotal = pricing.privateTierPricing.tier2.price;
      }
      
      // For private tours, we don't differentiate adult vs child price in the total
      // But for the breakdown, we'll divide the total proportionally
      if (totalPeople > 0) {
        adultPrice = activityTotal / totalPeople;
        childPrice = adultPrice;
        adultTotal = adultPrice * guests.adults;
        childTotal = childPrice * guests.children;
      }
    } else {
      // Group tour pricing - per person
      adultPrice = pricing.price;
      childPrice = pricing.childPrice;
      adultTotal = adultPrice * guests.adults;
      childTotal = childPrice * guests.children;
      activityTotal = adultTotal + childTotal;
    }

    activitiesTotal += activityTotal;
    
    perActivityBreakdown.push({
      id: activity.id,
      name: activity.title,
      adultPrice,
      childPrice,
      adultTotal,
      childTotal,
      activityTotal
    });
  });

  // Add airport pickup if enabled
  if (airportPickup?.enabled) {
    const totalGuests = guests.adults + guests.children;
    
    // If city is provided, use our standard calculation
    if (airportPickup.city) {
      airportTransferTotal = calculateAirportTransferPrice(airportPickup.city, totalGuests);
    } 
    // If a specific price is provided, use that
    else if (airportPickup.price) {
      airportTransferTotal = airportPickup.price * totalGuests;
    }
  }

  const totalAmount = activitiesTotal + airportTransferTotal;

  return {
    activitiesTotal,
    airportTransferTotal,
    totalAmount,
    formattedTotal: `€${totalAmount.toFixed(2)}`,
    currency,
    perActivityBreakdown
  };
}

/**
 * Format a price for display with the Euro symbol
 */
export function formatPrice(price: number): string {
  return `€${price.toFixed(2)}`;
}

/**
 * Calculate price for a single activity
 */
export function calculateActivityPrice(
  activity: Activity, 
  tourType: 'group' | 'private',
  guests: { adults: number; children: number },
  isChezAli = false,
  selectedMenu = 'tagine'
): number {
  if (isChezAli || activity.slug === 'chez-ali') {
    const menuPrice = selectedMenu === 'tagine' 
      ? (activity.menuOptions?.tagineMenu?.price || 48)
      : (activity.menuOptions?.mechouiMenu?.price || 60);
    
    return menuPrice * (guests.adults + guests.children);
  }

  const pricing = activity.options[tourType];

  if (tourType === 'private' && pricing.privateTierPricing) {
    const totalPeople = guests.adults + guests.children;
    
    if (totalPeople <= pricing.privateTierPricing.tier1.maxPeople) {
      return pricing.privateTierPricing.tier1.price;
    } else {
      return pricing.privateTierPricing.tier2.price;
    }
  } else {
    // Regular group tour pricing
    return (pricing.price * guests.adults) + (pricing.childPrice * guests.children);
  }
}

/**
 * Parse a price string from Firestore back to a number
 */
export function parsePriceString(priceString: string): number {
  if (!priceString) return 0;
  
  // Remove currency symbol if present
  const cleaned = priceString.replace(/[€$£]/g, '');
  return parseFloat(cleaned) || 0;
} 