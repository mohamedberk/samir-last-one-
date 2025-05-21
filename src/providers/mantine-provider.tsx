'use client'

import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'

// Create theme outside of component to avoid re-creation on each render
const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: ['#FF6B6B', '#FF8787', '#FFA5A5', '#FFC3C3', '#FFE1E1', '#FFF0F0', '#FFF5F5', '#FFFAFA', '#FFFFFF', '#FFFFFF'],
    accent: ['#4ECDC4', '#2BAE9F', '#1A9E8F', '#0A8E7F', '#007E6F', '#006E5F', '#005E4F', '#004E3F', '#003E2F', '#002E1F'],
  },
  radius: {
    md: '0.5rem'
  },
  components: {
    Paper: {
      defaultProps: {
        withBorder: true,
      }
    },
    Badge: {
      defaultProps: {
        size: 'lg',
      }
    }
  }
})

export function MantineProviderWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  )
} 