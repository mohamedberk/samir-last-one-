"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  User,
  Tag
} from 'lucide-react'
import { getAllBlogs, deleteBlog, type Blog } from '@/lib/firebase/services'
import toast from 'react-hot-toast'
import NewBlogModal from '@/components/admin/NewBlogModal'

const BlogItem = ({ blog, onDelete }: { blog: Blog; onDelete: (id: string) => void }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-50 text-green-600 border-green-200'
      case 'draft': return 'bg-amber-50 text-amber-600 border-amber-200'
      default: return 'bg-stone-50 text-stone-600 border-stone-200'
    }
  }
  
  const handleDelete = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const success = await deleteBlog(blogId)
      if (success) {
        toast.success('Blog post deleted successfully')
        onDelete(blogId)
      } else {
        toast.error('Failed to delete blog post')
      }
    }
  }
  
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-subtle transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          {blog.imageUrl && (
            <div className="w-16 h-16 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden">
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-stone-900 mb-2">{blog.title}</h3>
            <p className="text-sm text-stone-600 line-clamp-2">{blog.excerpt}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(blog.status)}`}>
          {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <User size={14} className="text-stone-400" />
          <span className="text-sm text-stone-600">{blog.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-stone-400" />
          <span className="text-sm text-stone-600">{formatDate(blog.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-stone-400" />
          <span className="text-sm text-stone-600">{blog.tags.length} tags</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div className="flex flex-wrap gap-1">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
              +{blog.tags.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors">
            <Eye size={16} className="text-stone-600" />
          </button>
          <button className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors">
            <Edit size={16} className="text-stone-600" />
          </button>
          <button 
            onClick={() => handleDelete(blog.id)}
            className="p-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Fetch real blogs from Firestore
  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const blogsData = await getAllBlogs()
      // Filter out deleted blogs
      const activeBlogs = blogsData.filter(blog => !(blog as any).deleted)
      setBlogs(activeBlogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId))
  }

  const handleBlogCreated = () => {
    fetchBlogs() // Refresh the blogs list
  }
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Blogs</h1>
          <p className="text-stone-500 mt-2">Manage blog posts and articles</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-highlight-primary text-white rounded-xl hover:bg-highlight-primary/90 transition-colors"
        >
          <Plus size={20} />
          New Blog Post
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-stone-900">{blogs.length}</div>
          <div className="text-sm text-stone-500">Total Posts</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-green-600">
            {blogs.filter(b => b.status === 'published').length}
          </div>
          <div className="text-sm text-stone-500">Published</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-amber-600">
            {blogs.filter(b => b.status === 'draft').length}
          </div>
          <div className="text-sm text-stone-500">Drafts</div>
        </div>
      </div>
      
      {/* Blogs List */}
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-highlight-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogItem key={blog.id} blog={blog} onDelete={handleDeleteBlog} />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
              <FileText size={48} className="mx-auto text-stone-300 mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">No blog posts found</h3>
              <p className="text-stone-500 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by creating your first blog post'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-highlight-primary text-white rounded-xl hover:bg-highlight-primary/90 transition-colors"
                >
                  <Plus size={20} />
                  Create Blog Post
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* New Blog Modal */}
      <NewBlogModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleBlogCreated}
      />
    </div>
  )
} 