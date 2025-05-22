import { Activity } from '../types/activity'
import { uploadthingUrls } from './uploadthing-urls'

// For activities that don't have direct images in uploadthingUrls, use hero image as fallback
const defaultImage = uploadthingUrls.heroThumbnail;

export interface AirportTransfer {
  city: string
  code: string
  price: number
}

export const airportTransfers: AirportTransfer[] = [
  {
    city: 'Marrakech',
    code: 'RAK',
    price: 20,
  },
  {
    city: 'Casablanca',
    code: 'CMN',
    price: 50,
  },
  {
    city: 'Agadir',
    code: 'AGA',
    price: 35,
  },
] as const;

// Helper function to calculate airport transfer price
export const calculateAirportTransferPrice = (city: string, totalGuests: number): number => {
  const airport = airportTransfers.find(a => a.city === city);
  if (!airport) return 0;
  return airport.price * totalGuests;
};

// First, declare the activities array directly (no need for initialActivities)
export const allActivities: Activity[] = [
  // 1. Mount Toubkal Summit Trek (2 Days)
  {
    id: 1,
    slug: 'toubkal-trek',
    title: "2 Days: Mount Toubkal Summit & Return to Marrakech",
    description: "Embark on a unique adventure climbing Mount Toubkal, North Africa's highest peak at 4,167 meters. This two-day experience combines physical challenge, breathtaking natural landscapes, and immersion in authentic Berber culture.",
    options: {
      group: {
        price: 200,
        childPrice: 130,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 800,
            maxPeople: 6
          },
          tier2: {
            price: 1400,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.toubkal || defaultImage,
    duration: "2 Days",
    category: "Atlas Odysseys",
    subCategory: "Peak Adventures",
    location: "Atlas Mountains",
    isPopular: true,
    rating: 4.9,
    reviewCount: 167,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396170/toubkal_mnlxal.mp4",
    gallery: uploadthingUrls.toubkalGallery,
    highlights: [
      "Reaching Mount Toubkal summit (4,167m): Rewarding experience with unmatched Atlas Mountains views",
      "Night in typical mountain refuge: Authentic experience sleeping in traditional Berber refuge",
      "Berber culture encounter: Discover local lifestyle with guide and village inhabitants", 
      "Spectacular landscapes: Observe green valleys, natural streams, majestic mountains",
      "Personal satisfaction of reaching summit: Physical achievement with memorable steps",
      "Professional certified guide throughout trek",
      "Round-trip transfer from Marrakech"
    ],
    included: [
      "Round-trip transfer from Marrakech to Imlil",
      "One night accommodation at Toubkal Refuge",
      "Professional certified guide throughout trek",
      "Lunches, dinner, and breakfast during excursion"
    ],
    notIncluded: [
      "Drinks",
      "Personal expenses",
      "Guide tips",
      "Personal equipment (trekking shoes, appropriate clothing, etc.)"
    ],
    recommendations: [
      "Comfortable trekking shoes",
      "Mountain-appropriate clothing",
      "Warm jacket, gloves, and hat",
      "Sunglasses",
      "Sunscreen",
      "Water bottle or camelback with sufficient water",
      "Camera"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "07:30 - Hotel pickup and transfer to Imlil village (1.5-2 hours)",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Trek Start",
        description: "10:00 - Begin trek from Imlil to Toubkal Refuge through Berber villages",
        coordinates: [-7.3833, 31.2833]
      },
      {
        activity: "Refuge Arrival",
        description: "14:00 - Arrive at Toubkal Refuge (3,207m) for rest and acclimatization",
        coordinates: [-7.3671, 31.0636]
      },
      {
        activity: "Summit Push",
        description: "05:00 - Begin summit ascent on Day 2",
        coordinates: [-7.3671, 31.0636]
      },
      {
        activity: "Summit Toubkal",
        description: "09:00 - Reach the peak at 4,167m",
        coordinates: [-7.3649, 31.0599]
      },
      {
        activity: "Return Journey",
        description: "Descend to Imlil and transfer back to Marrakech",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },


  
  // 3. Agafay Desert Adventure
  {
    id: 3,
    slug: 'agafay-desert',
    title: "Half Day Excursion to Agafay Desert & Lala Takerkoust",
    description: "Set off for an unforgettable day combining adventure, spectacular landscapes and local culture. This excursion offers a complete experience with a camel ride, quad biking adventure in the desert, jet skiing at Lake Lala Takerkoust, and a traditional lunch in an authentic atmosphere.",
    options: {
      group: {
        price: 60,
        childPrice: 40,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 100,
            maxPeople: 6
          },
          tier2: {
            price: 180,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.agafay,
    duration: "Half day (6 hours)",
    category: "Soirées & Spectacles",
    subCategory: "Desert Luxe",
    location: "Agafay Desert",
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 156,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396154/agafay_desert_et7pse.mp4",
    gallery: uploadthingUrls.agafayGallery,
    highlights: [
      "Round-trip transfer from Marrakech",
      "Camel ride in Agafay Desert (1 hour)",
      "Quad biking in Agafay Desert (1 hour)",
      "Jet skiing on Lake Lala Takerkoust (30 minutes)",
      "Traditional lunch with local specialties",
      "Professional guide throughout the excursion"
    ],
    included: [
      "Round-trip transfer from Marrakech",
      "Camel ride in Agafay Desert (1 hour)",
      "Quad biking in Agafay Desert (1 hour)", 
      "Jet skiing on Lake Lala Takerkoust (30 minutes)",
      "Traditional lunch with local specialties",
      "Professional guide throughout the excursion"
    ],
    notIncluded: [
      "Drinks",
      "Personal expenses",
      "Tips",
      "Services not mentioned in the itinerary"
    ],
    recommendations: [
      "Comfortable clothing suitable for the weather",
      "Closed shoes for activities",
      "Hat or cap for sun protection", 
      "Sunglasses",
      "Sunscreen",
      "Extra small water bottle if needed",
      "Your camera to capture these memories"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "Departure from your accommodation or meeting point in Marrakech",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Arrival in Agafay Desert",
        description: "Camel Ride (1 hour): Enjoy an authentic experience on camelback exploring the unique landscapes of Agafay. Quad Biking (1 hour): Set off on a quad bike adventure over dunes and desert paths for an experience full of thrills.",
        coordinates: [-8.0152, 31.5062]
      },
      {
        activity: "Traditional Lunch",
        description: "Enjoy lunch in a convivial atmosphere with traditional local specialties.",
        coordinates: [-8.0180, 31.5090]
      },
      {
        activity: "Departure to Lala Takerkoust",
        description: "Experience the adrenaline and natural beauty of the lake with an unforgettable jet ski experience.",
        coordinates: [-8.1307, 31.3647]
      },
      {
        activity: "Return to Marrakech",
        description: "Return in late afternoon after this action-packed day. This is a key hub of the city and will give you a glimpse of the local buzz.",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 4. Essaouira
  {
    id: 4,
    slug: 'essaouira',
    title: "One-Day Excursion to Essaouira from Marrakech",
    description: "Embark on a journey to discover Essaouira, a charming coastal city located about 3 hours by road from Marrakech. Explore its picturesque harbor, historic ramparts, and lively streets with a unique blend of Moroccan architecture and European influences. You will also visit an argan oil cooperative along the way, where you will learn about the traditional craft of producing this precious product. Enjoy a fresh seafood lunch and some free time to stroll along the beach or explore the souks.",
    options: {
      group: {
        price: 35,
        childPrice: 25,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 50,
            maxPeople: 6
          },
          tier2: {
            price: 70,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.essaouira,
    duration: "Full day (10 hours)",
    category: "Royal Routes",
    subCategory: "Coastal Treasures",
    location: "Essaouira",
    rating: 4.9,
    isBestSeller: true,
    reviewCount: 201,
    gallery: uploadthingUrls.essaouiraGallery,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396169/essaouira_p31sts.mp4",
    highlights: [
      "Round-trip transport in air-conditioned vehicle",
      "Visit to argan oil cooperative",
      "UNESCO World Heritage medina exploration",
      "Historic port and ramparts visit",
      "Fresh seafood tasting opportunity",
      "Free time for beach and souk exploration",
      "Multilingual local guide (French, English, or Arabic)"
    ],
    included: [
      "Round-trip transport in an air-conditioned vehicle",
      "Multilingual local guide",
      "Visit to the argan oil cooperative",
      "Free time in Essaouira"
    ],
    notIncluded: [
      "Lunch and drinks",
      "Tips (optional)"
    ],
    recommendations: [
      "Comfortable shoes for walking in the medina and on the beach",
      "Light clothing, but bring a light jacket as it can get chilly near the ocean",
      "Sunglasses and a hat for sun protection",
      "Sunscreen for protection during the day",
      "A camera to capture the landscapes and architecture",
      "Some small change for purchases in the souks or for tips",
      "A swimsuit if you wish to enjoy the beach"
    ],
    itinerary: [
      {
        activity: "Marrakech Departure",
        description: "Pick-up from your hotel. Begin journey towards the Atlantic coast with scenic landscape stops.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Argan Oil Cooperative",
        description: "Visit a cooperative run by Berber women to learn about traditional argan oil production process.",
        coordinates: [-9.3833, 31.3833]
      },
      {
        activity: "Essaouira Arrival",
        description: "Explore the UNESCO World Heritage medina, port, and famous Skala ramparts.",
        coordinates: [-9.7666, 31.5127]
      },
      {
        activity: "Lunch Break",
        description: "Enjoy lunch at a local restaurant with opportunity to sample fresh seafood.",
        coordinates: [-9.7681, 31.5122]
      },
      {
        activity: "Free Time",
        description: "Free time to explore the beach, souks, or art galleries.",
        coordinates: [-9.7657, 31.5128]
      },
      {
        activity: "Return Journey",
        description: "Departure for Marrakech with expected arrival at your hotel around 6:00 PM.",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 5. Ouarzazate
  {
    id: 5,
    slug: 'ouarzazate',
    title: "One-Day Excursion to Ouarzazate from Marrakech",
    description: "Embark on an adventurous day trip to Ouarzazate, the gateway to the desert, crossing the stunning Atlas Mountains via the Tizi n'Tichka pass. Discover the Ksar of Aït Ben Haddou, a fortified village listed as a UNESCO World Heritage site, famous for being the backdrop of many films. Explore the Taourirt Kasbah, the former palace of the pashas, and visit the Atlas Studios, known for their international film productions. A day full of culture, history, and breathtaking landscapes awaits you.",
    options: {
      group: {
        price: 35,
        childPrice: 25,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 50,
            maxPeople: 6
          },
          tier2: {
            price: 70,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.ouarzazate,
    duration: "Full Day (10-12 hours)",
    category: "Royal Routes",
    subCategory: "Imperial Heritage",
    location: "Ouarzazate",
    isPopular: true,
    rating: 4.7,
    reviewCount: 203,
    gallery: uploadthingUrls.ouarzazateGallery,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396187/ouarzazate2_lxavvm.mp4",
    highlights: [
      "Round-trip transport in air-conditioned vehicle",
      "Multilingual local guide (French, English, or Arabic)",
      "Visit UNESCO World Heritage Aït Ben Haddou",
      "Explore Taourirt Kasbah",
      "Optional Atlas Film Studios visit",
      "Cross spectacular Tizi n'Tichka pass (2260m)",
      "Traditional lunch option in local restaurant"
    ],
    included: [
      "Round-trip transport in an air-conditioned vehicle",
      "Multilingual local guide",
      "Visit to Aït Ben Haddou and Ouarzazate"
    ],
    notIncluded: [
      "Lunch and drinks",
      "Entrance fees to the film studios and kasbahs",
      "Tips (optional)"
    ],
    recommendations: [
      "Comfortable shoes for sightseeing",
      "Sunglasses and sunscreen",
      "A hat to protect from the sun",
      "Clothing suited for temperature changes (cool in the morning, warm during the day)",
      "A camera to capture the spectacular landscapes"
    ],
    itinerary: [
      {
        activity: "Marrakech Departure",
        description: "Early morning pickup from your hotel around 7:00 AM. Begin journey through Atlas Mountains via the spectacular Tizi n'Tichka pass (2260m), offering breathtaking panoramic views.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Aït Ben Haddou Visit",
        description: "First stop at the famous Ksar of Aït Ben Haddou, a UNESCO World Heritage site. Explore this fortified village with its earthen kasbahs, famous as a backdrop for films like Gladiator and Game of Thrones.",
        coordinates: [-7.1315, 31.0469]
      },
      {
        activity: "Ouarzazate Exploration",
        description: "Arrive in Ouarzazate, the 'Gateway to the Desert.' Visit the historic Taourirt Kasbah, an ancient fortified residence highlighting the region's strategic importance.",
        coordinates: [-6.9167, 30.9167]
      },
      {
        activity: "Film Studios & Lunch",
        description: "Optional visit to Atlas Studios, Africa's largest film studios. Enjoy traditional Moroccan lunch in a local restaurant while soaking in the southern town's atmosphere.",
        coordinates: [-6.9167, 30.9167]
      },
      {
        activity: "Return Journey",
        description: "Afternoon return to Marrakech through the Atlas Mountains, arriving at your hotel around 7:00 PM.",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 6. Imlil Valley
  {
    id: 6,
    slug: 'imlil',
    title: "Discovery Excursion to Imlil & Atlas Valley Exploration",
    description: "Embark on a day filled with natural landscapes, Berber culture, and local discoveries with this comprehensive excursion to Imlil. You'll experience authentic stops, a traditional breakfast offered by a women's argan oil cooperative, a beautiful hike to a waterfall, a typical local lunch, and a memorable camel ride on the Kik Plateau, ending with a mint tea to beautifully conclude this day.",
    options: {
      group: {
        price: 30,
        childPrice: 20,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 40,
            maxPeople: 6
          },
          tier2: {
            price: 60,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.imlil,
    duration: "8 hours",
    category: "Atlas Odysseys",
    subCategory: "Valley Discoveries",
    location: "Atlas Mountains",
    rating: 4.8,
    reviewCount: 178,
    gallery: uploadthingUrls.imlilGallery,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396171/imlil_sxoeq3.mp4",
    highlights: [
      "Round-trip transfer from Marrakech",
      "Traditional breakfast at women's argan oil cooperative",
      "Waterfall hike",
      "Traditional lunch in a Berber house",
      "Camel ride on the Kik Plateau",
      "Traditional mint tea"
    ],
    included: [
      "Round-trip transfer from Marrakech",
      "Traditional breakfast at the women's argan oil cooperative",
      "Waterfall hike",
      "Traditional lunch in a Berber house",
      "Camel ride on the Kik Plateau",
      "Traditional mint tea"
    ],
    notIncluded: [
      "Drinks not mentioned in the itinerary",
      "Personal expenses",
      "Guide tips",
      "Services not mentioned"
    ],
    recommendations: [
      "Comfortable clothes appropriate for the weather",
      "Closed shoes for hiking",
      "Light jacket for weather changes",
      "Sunglasses and sunscreen",
      "Small water bottle",
      "Hat or cap",
      "Your camera"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "Departure from your accommodation or meeting point in Marrakech",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Photo Stop at Azrou",
        description: "First stop for a short break and photos at Azrou, a typical mountain village",
        coordinates: [-7.3833, 31.2833]
      },
      {
        activity: "Argan Oil Cooperative",
        description: "Visit a women's cooperative, enjoy traditional breakfast and learn about argan oil production",
        coordinates: [-7.3800, 31.2850]
      },
      {
        activity: "Photo Stop at Kasbah Tamadot",
        description: "Short break for photos in front of the famous Richard Branson Hotel",
        coordinates: [-7.3820, 31.2840]
      },
      {
        activity: "Waterfall Hike",
        description: "Beautiful hike from Imlil to one of the region's most iconic waterfalls",
        coordinates: [-7.3810, 31.2860]
      },
      {
        activity: "Traditional Lunch",
        description: "Enjoy a traditional Berber lunch including vegetable tagine and couscous",
        coordinates: [-7.3815, 31.2845]
      },
      {
        activity: "Kik Plateau Experience",
        description: "Camel ride and traditional mint tea in a peaceful natural setting",
        coordinates: [-7.3825, 31.2835]
      },
      {
        activity: "Return to Marrakech",
        description: "Departure from the Kik Plateau to return to Marrakech",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 7. Ouzoud Waterfalls
  {
    id: 7,
    slug: 'ouzoud',
    title: "Discover Ouzoud Waterfalls Day Trip",
    description: "Experience one of Morocco's most impressive natural wonders with this trip to the Ouzoud Waterfalls. Located in the Atlas Mountains, these spectacular waterfalls offer an exceptional natural landscape, perfect for a getaway from the city. Enjoy a light hike, a boat ride on the river, and a traditional lunch in a peaceful natural setting. An experience that combines nature, adventure, relaxation, and local culture. Embark on an unforgettable day at this must-see natural site.",
    options: {
      group: {
        price: 30,
        childPrice: 20,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 40,
            maxPeople: 6
          },
          tier2: {
            price: 60,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.ouzoud,
    duration: "Full day",
    category: "Atlas Odysseys",
    subCategory: "Valley Discoveries",
    location: "Ouzoud",
    rating: 4.8,
    reviewCount: 289,
    gallery: uploadthingUrls.ouzoudGallery,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396173/ouzoud_unvccm.mp4",
    highlights: [
      "Round-trip transport from Marrakech",
      "Hike around the Ouzoud Waterfalls",
      "Boat ride on the river",
      "Traditional lunch with waterfall views",
      "Free time for photos and exploration",
      "Professional guide (French, English, or Arabic)"
    ],
    included: [
      "Round-trip transport from Marrakech",
      "Hike around the Ouzoud Waterfalls"
    ],
    notIncluded: [
      "Traditional lunch with a view of the waterfalls",
      "Boat cruise on the river",
      "Drinks",
      "Personal expenses",
      "Tips for the guide",
      "Services not mentioned"
    ],
    recommendations: [
      "Comfortable clothing suitable for the weather",
      "Closed, sturdy shoes for hiking",
      "Sunscreen and sunglasses",
      "A small bottle of water",
      "A hat or cap",
      "Your camera to capture the stunning landscapes"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "Depart from your accommodation or meeting point in Marrakech. Drive towards the Ouzoud Waterfalls, passing through the magnificent Atlas Mountain landscapes.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Discovering the Ouzoud Waterfalls",
        description: "Upon arrival, explore the Ouzoud Waterfalls, one of Morocco's most famous natural sites. Enjoy the beauty of the waterfalls, which rise up to 110 meters high. The sound of the water, rainbows created by the light, and the lush landscape offer an unforgettable visual experience.",
        coordinates: [-6.7197, 32.0185]
      },
      {
        activity: "Hike Around the Waterfalls",
        description: "Enjoy a light hike to explore the area surrounding the falls. Discover natural trails, small streams, and the most spectacular viewpoints to admire this natural wonder from all angles.",
        coordinates: [-6.7190, 32.0180]
      },
      {
        activity: "Boat Ride on the River",
        description: "For a unique experience, embark on a short boat cruise on the river at the foot of the waterfalls. Take in a different and breathtaking perspective of the waterfalls and their natural surroundings.",
        coordinates: [-6.7195, 32.0175]
      },
      {
        activity: "Traditional Lunch",
        description: "Enjoy a delicious traditional Moroccan lunch in a peaceful setting with a view of the waterfalls. The meal will include: Vegetable or chicken tagine, Traditional couscous, Moroccan soups.",
        coordinates: [-6.7192, 32.0183]
      },
      {
        activity: "Free Time",
        description: "Take some free time to further explore the waterfalls, snap some photos, or simply relax to the soothing sounds of the water.",
        coordinates: [-6.7197, 32.0185]
      },
      {
        activity: "Return to Marrakech",
        description: "After this unforgettable experience, you will head back to Marrakech. Enjoy the Atlas Mountain views one last time before returning to the city.",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 8. Ourika Valley
  {
    id: 8,
    slug: 'ourika',
    title: "Discover Ourika Valley Day Trip",
    description: "Explore the Ourika Valley, one of the most picturesque valleys in the Atlas Mountains. This excursion takes you to an exceptional natural setting, where you'll embark on a hike to the famous Ourika Waterfalls, immerse yourself in Berber culture, and enjoy a traditional lunch by the river. Take a break from the city to discover the mountains, peaceful streams, and authentic local life. This experience is ideal for nature lovers and those looking to explore a traditional and authentic side of Morocco.",
    options: {
      group: {
        price: 30,
        childPrice: 20,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 40,
            maxPeople: 6
          },
          tier2: {
            price: 60,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.ourika,
    duration: "Full day",
    category: "Atlas Odysseys",
    subCategory: "Valley Discoveries",
    location: "Ourika Valley",
    rating: 4.7,
    reviewCount: 156,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396166/ourika_qqsftx.mp4",
    gallery: uploadthingUrls.ourikaGallery,
    highlights: [
      "Round-trip transfer from Marrakech",
      "Hike to the Ourika Waterfalls",
      "Cultural exploration of local villages",
      "Visit to the Women's Argan Oil Cooperative",
      "Traditional lunch by the river",
      "Professional guide throughout the excursion"
    ],
    included: [
      "Round-trip transfer from Marrakech",
      "Hike to the Ourika Waterfalls",
      "Professional guide throughout the excursion",
      "Cultural exploration of local villages"
    ],
    notIncluded: [
      "Drinks not mentioned in the itinerary",
      "Personal expenses",
      "Tips for the guide",
      "Lunch",
      "Services not mentioned"
    ],
    recommendations: [
      "Comfortable clothing suitable for the weather",
      "Closed shoes for the hike",
      "Sunscreen and sunglasses",
      "A small bottle of water",
      "A hat or cap",
      "Your camera"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "Depart from your accommodation or meeting point in Marrakech, journey towards the stunning Ourika Valley, enjoying typical Atlas Mountain landscapes along the way",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Visit to Women's Argan Oil Cooperative",
        description: "After a short drive, arrive at a cooperative of women where organic argan oil is produced, learn about the argan oil production process and interact with local women about their traditional methods",
        coordinates: [-7.8833, 31.5000]
      },
      {
        activity: "Discovering the Ourika Valley",
        description: "Upon arrival in the valley, enjoy its spectacular scenery, including lush mountains, peaceful streams, and small traditional Berber villages",
        coordinates: [-7.7625, 31.3197]
      },
      {
        activity: "Hike to the Ourika Waterfalls",
        description: "Embark on a beautiful hike through the valley to the famous Ourika Waterfalls, an unmissable natural site with stunning views of the preserved nature in the region",
        coordinates: [-7.6744, 31.2258]
      },
      {
        activity: "Exploring Berber Villages",
        description: "Enjoy a leisurely walk through nearby traditional Berber villages, learning about their lifestyle, traditions, and typical architecture",
        coordinates: [-7.7000, 31.2500]
      },
      {
        activity: "Traditional Lunch",
        description: "After the hike, indulge in a traditional Berber lunch in a peaceful riverside setting, followed by relaxing with a glass of traditional mint tea",
        coordinates: [-7.6750, 31.2261]
      },
      {
        activity: "Return to Marrakech",
        description: "After this enriching day, head back to Marrakech, enjoying the beautiful mountain views one last time before returning to the city",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 9. Casablanca
  {
    id: 9,
    slug: 'casablanca',
    title: "Day Trip to Casablanca from Marrakech",
    description: "Discover Casablanca, Morocco's largest city and economic hub, during a one-day trip from Marrakech. Explore the majestic Hassan II Mosque, one of the largest in the world, located on the Atlantic Ocean's shores. Stroll along the Corniche of Ain Diab, admire the architecture of the Habous Quarter and the Royal Palace (exterior), then visit Mohammed V Square, the heart of the city. A perfect day to experience the unique blend of modern and traditional architecture that defines Casablanca's charm.",
    options: {
      group: {
        price: 40,
        childPrice: 30,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 50,
            maxPeople: 6
          },
          tier2: {
            price: 70,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.casablanca,
    duration: "10-12 hours",
    category: "Royal Routes",
    subCategory: "Imperial Heritage",
    location: "Casablanca",
    rating: 4.7,
    reviewCount: 184,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396160/casablanca_sdr5ke.mp4",
    gallery: uploadthingUrls.casablancaGallery,
    highlights: [
      "Visit the magnificent Hassan II Mosque",
      "Stroll along the Corniche of Ain Diab",
      "Explore the historic Habous Quarter",
      "View the Royal Palace exterior",
      "Experience Mohammed V Square",
      "Discover Art Deco architecture"
    ],
    included: [
      "Round-trip transportation in air-conditioned vehicle",
      "Visit to Ain Diab and Casablanca"
    ],
    notIncluded: [
      "Lunch and drinks",
      "Entrance tickets to the Hassan II Mosque",
      "Tips (optional)"
    ],
    recommendations: [
      "Comfortable walking shoes",
      "Sunglasses and sunscreen",
      "Hat for sun protection",
      "Respectful clothing for mosque visit",
      "Camera for photography"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "Pick-up from your hotel at around 7:00 AM, begin 2.5 to 3-hour journey to Casablanca",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Hassan II Mosque Visit",
        description: "Visit the majestic mosque on the Atlantic shores, interior visit (subject to visiting hours), admire sculptures and mosaics",
        coordinates: [-7.6327, 33.6067]
      },
      {
        activity: "Corniche of Ain Diab",
        description: "Stroll along the Atlantic Ocean, explore modern cafés and restaurants, beautiful seaside promenade",
        coordinates: [-7.6611, 33.5972]
      },
      {
        activity: "Cultural Exploration",
        description: "Visit Habous Quarter with French-Moroccan architecture, local souks for souvenirs, Royal Palace exterior view",
        coordinates: [-7.6349, 33.5894]
      },
      {
        activity: "City Center Discovery",
        description: "Mohammed V Square visit, Art Deco administrative buildings, experience local city life",
        coordinates: [-7.6192, 33.5731]
      },
      {
        activity: "Lunch Break",
        description: "Local restaurant experience with choice of Moroccan or international cuisine",
        coordinates: [-7.6192, 33.5731]
      },
      {
        activity: "Return Journey",
        description: "Departure to Marrakech with estimated arrival at 7:00 PM",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 10. Imperial Cities Tour
  {
    id: 10,
    slug: 'imperial-cities',
    title: "Imperial Cities Tour of Morocco - 8 Days / 7 Nights",
    description: "Immerse yourself in the fascinating history and culture of Morocco by visiting its greatest imperial cities. This tour invites you to discover Marrakech, Casablanca, Rabat, Meknes, Fes, and Ouarzazate, while exploring the desert and majestic mountains. Experience the majesty of Morocco's royal cities, their historic medinas, and the breathtaking landscapes that connect them.",
    options: {
      group: {
        price: 890,
        childPrice: 579,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 1490,
            maxPeople: 6
          },
          tier2: {
            price: 2490,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.imperialCities,
    duration: "8 Days / 7 Nights",
    category: "Royal Routes",
    subCategory: "Imperial Heritage",
    location: "Multiple Cities",
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 145,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1736426369/49d91af84a95b43f6edf0fbe858eba01_ioyvql.mp4",
    gallery: uploadthingUrls.imperialCitiesGallery,
    highlights: [
      "Visit all four Imperial Cities: Marrakech, Fes, Rabat, and Meknes",
      "Experience a night in the Sahara Desert under the stars",
      "Explore UNESCO World Heritage medinas",
      "Visit the famous Hassan II Mosque in Casablanca",
      "Cross the Atlas Mountains via scenic routes",
      "Discover traditional crafts and artisans",
      "Stay in authentic riads and quality hotels"
    ],
    included: [
      "Comfortable air-conditioned vehicle throughout the trip",
      "7 nights accommodation in quality hotels or riads",
      "Breakfasts and dinners",
      "Professional guides for monument tours",
      "Camel ride in Merzouga desert",
      "English/French-speaking local guides"
    ],
    notIncluded: [
      "Lunches during transfers",
      "Travel insurance",
      "Tips for guides and drivers",
      "Personal expenses and purchases"
    ],
    recommendations: [
      "Comfortable walking shoes for city exploration",
      "Light clothing for day, warmer layers for desert nights",
      "Conservative dress for mosque visits",
      "Sun protection (hat, sunscreen, sunglasses)",
      "Camera for capturing memories",
      "Small backpack for daily excursions"
    ],
    itinerary: [
      {
        activity: "Day 1: Marrakech Arrival",
        description: "Upon arrival at Marrakech airport, our team will welcome you and drive you to the hotel. You'll have time to settle in and rest after your flight. Dinner at the hotel and overnight stay.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Day 2: Marrakech - Casablanca - Rabat",
        description: "After breakfast in Marrakech, departure for Casablanca, Morocco's economic hub. Cross through Settat, capital of the El Chaouia region. In Casablanca, visit Hassan II Mosque (exterior visit), explore United Nations Square, Anfa district, and the Corniche road. Seafood lunch at a local restaurant. Afternoon continuation to Rabat, visit the Royal Palace, Hassan Tower, and Mohammed V Mausoleum, decorated with marble, carved cedar and gold. Walk through the medina, discovery of the Kasbah of the Oudayas. Hotel check-in, dinner and overnight stay.",
        coordinates: [-6.8498, 33.9716]
      },
      {
        activity: "Day 3: Rabat - Meknes - Fes",
        description: "Departure for Moulay Idriss, the holy city where Morocco's first sultan rests, before continuing to Meknes. Visit the famous Bab El Mansour gate, Morocco's most beautiful gate. Exploration of the medina and Moulay Ismail Mausoleum. Visit to the Harbi (former royal stables). After this visit, continuation to Fes, check-in at hotel or riad. Dinner and overnight stay.",
        coordinates: [-5.0033, 34.0333]
      },
      {
        activity: "Day 4: Fes",
        description: "Visit to the Attarine Medersa and Nejjarine Square, famous for its mosaic-decorated fountain. Lunch in a traditional palace in the medina. Walk on the Royal Palace esplanade and visit to the Merinides Tombs, with a magnificent view over the city. Exploration of the leather tanneries and traditional carpet market. Dinner and overnight stay at hotel or riad.",
        coordinates: [-5.0033, 34.0333]
      },
      {
        activity: "Day 5: Fes - Ifrane - Merzouga",
        description: "Departure from Fes to Ifrane, nicknamed 'Morocco's Switzerland' due to its mountainous landscape and alpine buildings. Walk through this picturesque town with pleasant climate, crossed by large cedar forests. Then, crossing the High Atlas via Azrou, to the Midelt pass, then continuing to Merzouga. Arrival in Merzouga, gateway to the Erg Chebbi Dunes. Camel ride to reach the camp located in the desert, where you can enjoy the sunset over the golden dunes. Night at the desert camp in a Berber tent.",
        coordinates: [-4.0244, 31.1527]
      },
      {
        activity: "Day 6: Merzouga - Tinghir - Ouarzazate",
        description: "Early morning departure for the Todgha Gorges, famous for their 250m high vertical cliffs. Stop to admire the beauty of the gorges and village. Continue to the Dades Gorges, then take the Route of a Thousand Kasbahs, lined with palm groves and earthen kasbahs. Visit to the Skoura palm grove and the Kasbahs of Rose Valley. Arrival in Ouarzazate, the cinema city. Dinner and overnight at hotel or riad.",
        coordinates: [-6.9167, 30.9167]
      },
      {
        activity: "Day 7: Ouarzazate - Marrakech",
        description: "Departure for Marrakech via the Tichka Pass, the highest pass in the Atlas range. Arrival in Marrakech late afternoon. Exploration of Marrakech medina, UNESCO World Heritage site. Visit to Jemaa el-Fna square, a lively place with snake charmers, storytellers, musicians, etc. Optional dinner in the heart of the medina then return to hotel.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Day 8: Marrakech Departure",
        description: "According to your flight time, transfer to Marrakech airport for your departure. Assistance until boarding.",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 11. Merzouga Desert Adventure
  {
    id: 11,
    slug: 'merzouga',
    title: "Merzouga Desert Adventure - 4 Days from Marrakesh",
    description: "Discover the magic of the Moroccan desert with a 4-day adventure that will take you through Berber villages, historic kasbahs, and breathtaking landscapes. Enjoy authentic moments in desert camps, savor traditional cuisine, and let yourself be enchanted by the local culture. This journey is ideal for adventurers seeking total immersion in the desert.",
    options: {
      group: {
        price: 140,
        childPrice: 90,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 200,
            maxPeople: 6
          },
          tier2: {
            price: 300,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.merzouga || defaultImage,
    duration: "4 Days",
    category: "Royal Routes",
    subCategory: "Desert Luxe",
    location: "Merzouga Desert",
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 234,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396164/merzouga_ujhgzs.mp4",
    gallery: uploadthingUrls.merzougaGallery,
    highlights: [
      "Cross the majestic High Atlas Mountains",
      "Visit UNESCO World Heritage Kasbah Ait Ben Haddou",
      "Experience sunset camel trek in Merzouga desert",
      "Stay in traditional desert camps under the stars",
      "Traditional Gnawa music show in the desert",
      "Visit historic kasbahs and Berber villages",
      "Professional multilingual guides throughout"
    ],
    included: [
      "Comfortable air-conditioned vehicle transportation throughout the trip",
      "Accommodation in traditional hotels and desert camps with Berber tents",
      "Dinners and breakfasts in hotels and desert camps",
      "Camel trek in the desert to watch sunset and sunrise",
      "Traditional Gnawa show in the desert",
      "English/French-speaking local guides",
      "Guided tours of kasbahs, valleys and gorges",
      "Cultural activities and local cooperative visits",
      "Entrance fees to tourist sites mentioned in the itinerary"
    ],
    notIncluded: [
      "Lunches during the journey (vegetarian meals possible)",
      "Tips for guides, drivers, and camp staff",
      "Drinks other than water, tea, and included beverages",
      "Travel insurance",
      "Quad bike ride in Merzouga (2 hours)",
      "Personal expenses and souvenirs",
      "Additional activities not mentioned",
      "Personal insurance for leisure activities",
      "Optional visits or specific requests"
    ],
    recommendations: [
      "Comfortable clothing suitable for desert climate",
      "Warm clothing for cold desert nights",
      "Good walking shoes",
      "Sunglasses and sunscreen",
      "Hat or cap for sun protection",
      "Camera for capturing memories",
      "Small backpack for daily essentials"
    ],
    itinerary: [
      {
        activity: "Day 1: Marrakech - Atlas Mountains - Ait Ben Haddou - Ouarzazate",
        description: "8:00 AM departure from Marrakech, cross High Atlas Mountains via Tizin Tichka pass (2,260m). Visit Kasbah Telouet and UNESCO World Heritage Ait Ben Haddou. Overnight in Ouarzazate.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Day 2: Ouarzazate - Skoura - Todgha Gorges - Merzouga",
        description: "8:30 AM departure through Route of Thousand Kasbahs, visit Skoura palm grove, Todgha Gorges, and arrive at Merzouga for sunset camel trek and desert camp stay.",
        coordinates: [-4.0244, 31.1527]
      },
      {
        activity: "Day 3: Merzouga - Rissani - Zagora",
        description: "Sunrise over dunes, optional quad biking, visit Rissani for traditional Medfouna, continue to Zagora for second desert camp experience.",
        coordinates: [-5.8372, 30.3350]
      },
      {
        activity: "Day 4: Zagora - Agdz - Marrakech",
        description: "Early sunrise, traditional breakfast, scenic drive back to Marrakech with stops in charming villages.",
        coordinates: [-7.9811, 31.6295]
      }
    ]
  },

  // 12. Hot Air Balloon
  {
    id: 12,
    slug: 'hot-air-balloon',
    title: "Hot Air Balloon Flight over Marrakech with Traditional Breakfast",
    description: "Looking for the best activity to experience in Marrakech? Soar high above the Red City and its stunning surroundings on this incredible hot air balloon adventure. Enjoy breathtaking views of Marrakech, the Atlas Mountains, and the vast Moroccan desert at sunrise. After your peaceful flight, savor a traditional Moroccan breakfast in a serene Berber tent.",
    options: {
      group: {
        price: 150,
        childPrice: 100,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 200,
            maxPeople: 6
          },
          tier2: {
            price: 300,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.hotAirBalloon || defaultImage,
    duration: "Half Day",
    category: "Soirées & Spectacles",
    subCategory: "Sky Adventures",
    location: "Marrakech",
    isPopular: true,
    rating: 4.8,
    reviewCount: 156,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396157/hot_air_balloon_wu8zsd.mp4",
    gallery: uploadthingUrls.hotAirBalloonGallery,
    highlights: [
      "Round-trip transport from Marrakech",
      "Sunrise hot air balloon flight",
      "Traditional Moroccan breakfast in a Berber tent",
      "Flight certificate"
    ],
    included: [
      "Breakfast",
      "Beverages (coffee, tea, soft drinks)",
      "Bottled water",
      "Round-trip transportation (pickup and transfer back)",
      "Insurance for passengers and their belongings",
      "Flight certificate"
    ],
    notIncluded: [
      "Guide",
      "Services not mentioned"
    ],
    recommendations: [
      "Comfortable clothing suitable for the weather",
      "Sunglasses and sunscreen",
      "Camera to capture the stunning views"
    ],
    itinerary: [
      {
        activity: "Pickup",
        description: "Early morning pickup from your Marrakech accommodation. You'll be driven to the launch site, located in the serene Palmerie area outside the city.",
        coordinates: [-7.9811, 31.6295]  // Marrakech
      },
      {
        activity: "Pre-flight preparations",
        description: "Upon arrival at Palmerie, enjoy a welcoming cup of mint tea while the crew prepares the balloon for takeoff. You'll also receive a safety briefing.",
        coordinates: [-7.9145, 31.6521]  // Palmerie
      },
      {
        activity: "Hot Air Balloon Flight",
        description: "As the sun rises, you'll gently lift off into the sky. Enjoy a peaceful flight with panoramic views of Marrakech, the Atlas Mountains, and the palm oasis of Palmerie. The flight typically lasts 45 minutes to an hour.",
        coordinates: [-7.9145, 31.6521]  // Palmerie
      },
      {
        activity: "Landing and Breakfast",
        description: "After landing in Palmerie, you'll be taken to a traditional Berber tent to enjoy a delicious Moroccan breakfast, complete with fresh bread, local cheeses, honey, Msemen, and tea.",
        coordinates: [-7.9145, 31.6521]  // Palmerie
      },
      {
        activity: "Return to Marrakech",
        description: "Following breakfast, you'll be transferred back to your accommodation in Marrakech, concluding your adventure.",
        coordinates: [-7.9811, 31.6295]  // Back to Marrakech
      }
    ]
  },

  // 13. Agafay Desert Night Show
  {
    id: 13,
    slug: 'agafay-night',
    title: "Agafay Desert Night Show: Camel Riding, Quad Biking & Fire Show Adventure",
    description: "Prepare yourself for an evening like no other in the heart of Morocco's Agafay Desert. A place where adventure and mystique meet beneath the vast sky, offering an unforgettable combination of activities that will ignite your senses. Begin your evening by taking a tranquil 15-minute camel ride through the desert's golden dunes, where the stillness of the landscape transports you into another world. Feel the rhythm of the camel's stride as you take in the sweeping views of the Agafay Desert, with its vast expanse stretching all around.",
    options: {
      group: {
        price: 60,
        childPrice: 40,
        perPerson: true
      },
      private: {
        price: 0,
        childPrice: 0,
        perPerson: false,
        privateTierPricing: {
          tier1: {
            price: 100,
            maxPeople: 6
          },
          tier2: {
            price: 180,
            maxPeople: 17
          }
        }
      }
    },
    image: uploadthingUrls.agafayNight || defaultImage,
    duration: "4-5 hours",
    category: "Soirées & Spectacles",
    subCategory: "Desert Luxe",
    location: "Agafay Desert",
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 178,
    video: "https://res.cloudinary.com/ddnyfqxze/video/upload/v1744396154/agafay_night_ehqy7q.mp4",
    gallery: uploadthingUrls.agafayNightGallery,
    highlights: [
      "15-minute camel ride through golden dunes",
      "1-hour thrilling quad bike adventure",
      "Spectacular fire show under the stars",
      "Traditional Moroccan dinner in Berber camp",
      "Live music and cultural performances",
      "Professional multilingual guide",
      "Round-trip transport from Marrakech"
    ],
    included: [
      "Round-trip transport from Marrakech",
      "15-minute camel ride",
      "1-hour quad biking adventure",
      "Fire show performance",
      "Traditional Moroccan dinner in a Berber camp",
      "Entertainment (Traditional music, dance, and cultural performances)",
      "Professional, multilingual guide"
    ],
    notIncluded: [
      "Alcoholic beverages",
      "Personal expenses",
      "Tips (optional)"
    ],
    recommendations: [
      "Comfortable clothing suitable for outdoor activities",
      "Closed-toe shoes for camel riding and quad biking",
      "A scarf or hat to protect from the sun",
      "Sunglasses and sunscreen for protection during the day",
      "A camera to capture the magical moments",
      "A light jacket or sweater for the cooler desert night"
    ],
    itinerary: [
      {
        activity: "Departure from Marrakech",
        description: "Your adventure begins with a pick-up from your hotel and a scenic drive to the Agafay Desert. During the drive, take in the sweeping views of the desert landscape and the surrounding mountains.",
        coordinates: [-7.9811, 31.6295]
      },
      {
        activity: "Camel Ride",
        description: "Upon arrival in the Agafay Desert, enjoy a 15-minute camel ride. Feel the serenity of the desert as your camel walks slowly through the sand, offering panoramic views and a glimpse into traditional desert life.",
        coordinates: [-8.0152, 31.5062]
      },
      {
        activity: "Quad Biking",
        description: "After your camel ride, take your quad bike for a 1-hour ride across the diverse desert terrain. Speed through sand dunes and rocky paths as you explore the Agafay Desert from a thrilling new perspective.",
        coordinates: [-8.0152, 31.5062]
      },
      {
        activity: "Fire Show",
        description: "As night falls, settle in for a dazzling fire show. Watch talented performers spin and twirl flames, creating an unforgettable visual experience that will leave you in awe.",
        coordinates: [-8.0152, 31.5062]
      },
      {
        activity: "Traditional Berber Dinner and Entertainment",
        description: "After the fire show, head to a traditional Berber camp for a delicious Moroccan dinner. Relax under the starlit sky while enjoying local music and dance, experiencing the warmth and hospitality of the desert.",
        coordinates: [-8.0152, 31.5062]
      }
    ]
  }
];

// Update visibleActivities to match the hero section tabs
export const visibleActivities = new Set([
  'toubkal-trek',    // Activities tab
  'chez-ali',        
  'agafay-desert',   
  'essaouira',       // Excursions tab
  'ouarzazate',      
  'imlil',           // Tours tab
  'ouzoud',          
  'ourika',
  'casablanca',       // Add Casablanca activity
  'imperial-cities',   // Add the new tour
  'merzouga',          // Add the new Merzouga activity
  'hot-air-balloon',   // Add the new hot air balloon activity
  'agafay-night'      // Add the new Agafay Night Show activity
]);

// Simplify the getActivitiesByCategory function
export function getActivitiesByCategory(category: string): Activity[] {
  return allActivities.filter(activity => 
    visibleActivities.has(activity.slug) && activity.category === category
  );
}

// Add this function to filter activities for other components
export function getVisibleActivities(): Activity[] {
  return allActivities.filter(activity => visibleActivities.has(activity.slug));
}

// Add this function to check if an activity is visible
export function isActivityVisible(slug: string): boolean {
  return visibleActivities.has(slug);
}