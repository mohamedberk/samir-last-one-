import { LucideIcon } from 'lucide-react'
import { Crown, Mountain, Sparkles } from 'lucide-react'

export interface CategoryTab {
  name: string;
  icon: LucideIcon;
  order: number;
  description: string;
  isDefault?: boolean;
  themeColor?: {
    bg: string;
    text: string;
    border: string;
  };
  subCategories?: {
    name: string;
    description: string;
  }[];
}

export interface NavigationConfig {
  categories: CategoryTab[];
  switchInterval: number; // in milliseconds
}

// Default navigation configuration
export const defaultNavigationConfig: NavigationConfig = {
  categories: [
    {
      name: "Soirées & Spectacles",
      icon: Sparkles,
      order: 1,
      description: "Enchanting evenings and desert adventures",
      isDefault: true,
      themeColor: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30"
      },
      subCategories: [
        {
          name: "Cultural Shows",
          description: "Mesmerizing performances and traditional entertainment"
        },
        {
          name: "Desert Luxe",
          description: "Premium desert experiences under the stars"
        }
      ]
    },
    {
      name: "Atlas Odysseys",
      icon: Mountain,
      order: 2,
      description: "Majestic mountain experiences",
      themeColor: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        border: "border-emerald-500/30"
      },
      subCategories: [
        {
          name: "Peak Adventures",
          description: "Exclusive mountain summits and trails"
        },
        {
          name: "Valley Discoveries",
          description: "Hidden gems of the Atlas valleys"
        }
      ]
    },
    {
      name: "Royal Routes",
      icon: Crown,
      order: 3,
      description: "Imperial city explorations",
      themeColor: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/30"
      },
      subCategories: [
        {
          name: "Imperial Heritage",
          description: "Journey through Morocco's royal cities"
        },
        {
          name: "Coastal Treasures",
          description: "Historic ports and seaside wonders"
        }
      ]
    }
  ],
  switchInterval: 10000
} 