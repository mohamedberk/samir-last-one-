"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, User, Clock } from 'lucide-react'
import { getBlogsByStatus, type Blog } from '@/lib/firebase/services'

const BlogCard = ({ blog }: { blog: Blog }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  // Calculate read time based on content length (rough estimate)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  return (
    <Link 
      href={`/blog/${blog.id}`}
      className="premium-card group transform transition-all duration-500 hover:-translate-y-1"
    >
      <div className="premium-card-media h-[280px]">
        <img 
          src={blog.imageUrl || '/logo.png'} 
          alt={blog.title}
          className="premium-card-image w-full h-full object-cover"
        />
        
        <div className="premium-card-badge">
          <Calendar size={12} />
          <span className="text-xs font-semibold">{formatDate(blog.publishedAt)}</span>
        </div>
      </div>
      
      <div className="premium-card-content">
        <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{calculateReadTime(blog.content)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{blog.author}</span>
          </div>
        </div>
        
        <h3 className="premium-card-title group-hover:text-highlight-primary transition-colors">
          {blog.title}
        </h3>
        
        <p className="premium-card-description">
          {blog.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-100">
          {blog.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPublishedBlogs()
  }, [])

  const fetchPublishedBlogs = async () => {
    try {
      setLoading(true)
      const publishedBlogs = await getBlogsByStatus('published')
      // Get the 3 most recent published blogs
      const recentBlogs = publishedBlogs
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3)
      setBlogs(recentBlogs)
    } catch (error) {
      console.error('Error fetching published blogs:', error)
      // Fallback to empty array if there's an error
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-sand-gradient relative py-16 border-t border-sand-200">
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative">
        {/* Section Header */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-highlight-primary"></div>
            <span className="text-sm font-medium tracking-wide text-highlight-primary uppercase">
              Travel Stories
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight leading-tight">
                Discover Morocco Through Our Stories
              </h2>
              <p className="mt-2 text-stone-600 max-w-lg">
                Get inspired by our travel guides, cultural insights, and insider tips 
                to make the most of your Moroccan adventure.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="premium-card animate-pulse">
                <div className="h-[280px] bg-stone-100 rounded-t-premium"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-3 w-20 bg-stone-200 rounded"></div>
                    <div className="h-3 w-16 bg-stone-200 rounded"></div>
                  </div>
                  <div className="h-6 w-full bg-stone-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-stone-200 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-stone-200 rounded mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-stone-200 rounded"></div>
                    <div className="h-4 w-20 bg-stone-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 mb-10">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-10">
            <p className="text-stone-500 mb-4">No blog posts available yet.</p>
            <p className="text-sm text-stone-400">Check back soon for travel stories and insights!</p>
          </div>
        )}

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all font-medium shadow-subtle hover:shadow-subtle-hover"
            >
              <span>View All Articles</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
} 