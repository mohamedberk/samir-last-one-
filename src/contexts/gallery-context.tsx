'use client'

import { createContext, useContext, useState } from 'react';

interface GalleryContextType {
  isGalleryOpen: boolean;
  setIsGalleryOpen: (open: boolean) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <GalleryContext.Provider value={{ isGalleryOpen, setIsGalleryOpen }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
} 