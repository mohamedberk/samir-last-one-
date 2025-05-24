"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Search, Filter } from 'lucide-react'
import { getBlogsByStatus, type Blog } from '@/lib/firebase/services'

const BlogCard = ({ blog }: { blog: Blog }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

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
          {blog.tags.slice(0, 3).map((tag, index) => (
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  const fetchAllBlogs = async () => {
    try {
      setLoading(true)
      const publishedBlogs = await getBlogsByStatus('published')
      const sortedBlogs = publishedBlogs
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      setBlogs(sortedBlogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))

  // Filter blogs based on search and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'all' || blog.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full bg-sand-gradient relative py-8 border-b border-sand-200">
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative">
          {/* Back Button */}
          <div className="mb-1">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-highlight-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-highlight-primary"></div>
              <span className="text-sm font-medium text-highlight-primary uppercase tracking-wider">
                Travel Stories
              </span>
              <div className="h-px w-12 bg-highlight-primary"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
              Morocco Travel Blog
            </h1>
            
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover Morocco through our travel guides, cultural insights, and insider tips 
              to make the most of your Moroccan adventure.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary transition-all"
              />
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary transition-all min-w-[150px]"
              >
                <option value="all">All Topics</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="w-full bg-white relative py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
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
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <>
              {/* Results count */}
              <div className="mb-8">
                <p className="text-stone-600">
                  {filteredBlogs.length === blogs.length 
                    ? `Showing all ${blogs.length} articles`
                    : `Found ${filteredBlogs.length} of ${blogs.length} articles`
                  }
                </p>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-stone-400" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">No articles found</h3>
                <p className="text-stone-500 mb-6">
                  {searchTerm || selectedTag !== 'all' 
                    ? "Try adjusting your search or filter criteria"
                    : "No blog posts available yet. Check back soon for travel stories and insights!"
                  }
                </p>
                {(searchTerm || selectedTag !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedTag('all')
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-highlight-primary text-white rounded-full hover:bg-highlight-primary/90 transition-colors text-sm font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 