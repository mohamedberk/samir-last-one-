"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { getAllBlogs, deleteBlog } from '@/lib/firebase/services'
import { Blog } from '@/lib/firebase/services'
import toast from 'react-hot-toast'

export default function BlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      setLoading(true)
      const blogsData = await getAllBlogs()
      setBlogs(blogsData)
    } catch (error) {
      console.error('Error loading blogs:', error)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlog = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(blogId)
        toast.success('Blog post deleted successfully')
        loadBlogs()
      } catch (error) {
        console.error('Error deleting blog:', error)
        toast.error('Failed to delete blog post')
      }
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Blog Posts</h1>
          <p className="text-stone-600">Manage your travel blog content</p>
        </div>
        <button
          onClick={() => router.push('/admin/blogs/new')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Blog Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-stone-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="input-base w-auto"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Blog Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-highlight-primary mx-auto"></div>
          <p className="text-stone-500 mt-2">Loading blog posts...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-stone-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'No blog posts match your filters' 
              : 'No blog posts yet. Create your first one!'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="card hover:shadow-card-hover">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Blog Image */}
                {blog.imageUrl && (
                  <div className="lg:w-48 lg:flex-shrink-0">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-32 lg:h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Blog Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-stone-900 truncate">
                          {blog.title}
                        </h3>
                        <span className={`badge ${
                          blog.status === 'published' 
                            ? 'badge-primary' 
                            : 'badge-secondary'
                        }`}>
                          {blog.status}
                        </span>
                      </div>
                      
                      <p className="text-stone-600 mb-3 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <span>{formatDate(blog.createdAt || new Date())}</span>
                        {blog.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-1">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="text-xs text-stone-500">+{blog.tags.length - 3}</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                        className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                        title="Edit Post"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 