import { SimpleGalleryItem } from '@/data/uploadthing-urls'

export interface PricingOption {
  price: number;
  childPrice: number;
  perPerson: boolean;
  privateTierPricing?: {
    tier1: {  // 1-6 people
      price: number;
      maxPeople: number;
    };
    tier2: {  // 7-17 people
      price: number;
      maxPeople: number;
    };
  };
}

export interface Review {
  id: string;
  activityId: number;
  userId?: string; // Optional, for authenticated users
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified?: boolean; // To mark if the review is from a verified booking
}

export interface MenuItem {
  price: number;
  items: string[];
  minimumPeople?: number;
}

export interface MenuOptions {
  tagineMenu?: MenuItem;
  mechouiMenu?: MenuItem;
  specialEvents?: {
    ramadan?: {
      departureTime: string;
    };
    newYear?: {
      price: number;
      description: string;
    };
  };
}

export interface Activity {
  id: number;
  slug: string;
  title: string;
  description: string;
  options: {
    group: PricingOption;
    private: PricingOption;
  };
  image: string;
  duration: string;
  category: string;
  subCategory?: string;
  location: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  gallery?: SimpleGalleryItem[];
  video?: string;
  highlights?: string[];
  itinerary?: {
    activity: string;
    coordinates?: [number, number];
    description?: string;
  }[];
  reviews?: Review[];
  included?: string[];
  notIncluded?: string[];
  recommendations?: string[];
  menuOptions?: MenuOptions;
}

export interface BookingSummaryProps {
  selectedActivities: (Activity & { isMainActivity?: boolean })[];
  guests?: {
    adults: number;
    children: number;
  };
  airportPickup?: {
    enabled: boolean;
    city: string;
    price: number;
  };
  showFinishBooking?: boolean;
  onFinishBooking?: () => Promise<void>;
  isDisabled?: boolean;
  activityDate?: string;
  airportDetails?: {
    enabled: boolean;
    city: string;
    airport: string;
    price: number;
  };
  bookingReference?: string;
  tourType?: 'group' | 'private';
  totalAmount?: string;
  onRemoveActivity?: (activityId: number) => void;
}

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
}

interface ReviewSectionProps {
  activityId: number;
  reviews: Review[];
  onReviewAdded: () => void;
  rating: number;
  totalReviews: number;
  showForm?: boolean;
  onClose?: () => void;
} 