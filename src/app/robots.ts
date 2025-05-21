import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/confirmation', '/api/'],
    },
    sitemap: 'https://vipmarrakechtrips.com/sitemap.xml',
  }
} 