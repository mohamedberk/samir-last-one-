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
      className="group bg-white rounded-premium border border-stone-200 overflow-hidden hover:shadow-subtle-hover transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={blog.imageUrl || '/logo.png'} 
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{calculateReadTime(blog.content)}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-highlight-primary transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-sm text-stone-600 mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={14} className="text-stone-400" />
            <span className="text-sm text-stone-600">{blog.author}</span>
          </div>
          
          <div className="flex items-center gap-1 text-highlight-primary text-sm font-medium">
            <span>Read more</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
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
    <section className="w-full bg-white relative py-16 border-t border-stone-200">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-highlight-primary"></div>
            <span className="text-sm font-medium text-highlight-primary uppercase tracking-wider">
              Travel Stories
            </span>
            <div className="h-px w-12 bg-highlight-primary"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Discover Morocco Through Our Stories
          </h2>
          
          <p className="text-stone-600 max-w-2xl mx-auto">
            Get inspired by our travel guides, cultural insights, and insider tips 
            to make the most of your Moroccan adventure.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-premium border border-stone-200 overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-stone-200"></div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500 mb-4">No blog posts available yet.</p>
            <p className="text-sm text-stone-400">Check back soon for travel stories and insights!</p>
          </div>
        )}

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-highlight-primary text-white rounded-full hover:bg-highlight-primary/90 transition-colors font-medium"
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