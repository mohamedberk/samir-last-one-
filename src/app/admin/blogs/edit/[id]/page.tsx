"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Save, 
  Eye, 
  Plus,
  Image as ImageIcon,
  X
} from 'lucide-react'
import { getBlog, updateBlog } from '@/lib/firebase/services'
import toast from 'react-hot-toast'

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published',
    imageUrl: '',
    slug: '',
    seoTitle: '',
    metaDescription: '',
    metaKeywords: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')

  useEffect(() => {
    if (params.id) {
      loadBlog(params.id as string)
    }
  }, [params.id])

  const loadBlog = async (blogId: string) => {
    try {
      setLoading(true)
      const blog = await getBlog(blogId)
      if (blog) {
        setFormData({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          tags: blog.tags || [],
          status: blog.status || 'draft',
          imageUrl: blog.imageUrl || '',
          slug: blog.slug || '',
          seoTitle: blog.seoTitle || '',
          metaDescription: blog.metaDescription || '',
          metaKeywords: blog.metaKeywords || []
        })
      } else {
        toast.error('Blog post not found')
        router.push('/admin/blogs')
      }
    } catch (error) {
      console.error('Error loading blog:', error)
      toast.error('Failed to load blog post')
      router.push('/admin/blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title)
    if (!formData.slug) {
      handleInputChange('slug', generateSlug(title))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.metaKeywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        metaKeywords: [...prev.metaKeywords, newKeyword.trim()]
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter(keyword => keyword !== keywordToRemove)
    }))
  }

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title.trim()) {
      toast.error('Please enter a blog title')
      return
    }

    if (!formData.excerpt.trim()) {
      toast.error('Please enter a blog excerpt')
      return
    }

    if (!formData.content.trim()) {
      toast.error('Please enter blog content')
      return
    }

    setSaving(true)
    try {
      const blogData = {
        ...formData,
        status,
        lastUpdated: new Date(),
        publishedAt: status === 'published' ? new Date() : undefined
      }

      await updateBlog(params.id as string, blogData)
      toast.success(`Blog post ${status === 'published' ? 'published' : 'updated'} successfully!`)
      router.push('/admin/blogs')
    } catch (error) {
      console.error('Error updating blog post:', error)
      toast.error('Failed to update blog post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-highlight-primary mx-auto mb-4"></div>
          <p className="text-stone-500">Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                disabled={saving}
                className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                <ArrowLeft size={20} className="text-stone-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-stone-900">Edit Blog Post</h1>
                <p className="text-stone-600 mt-1">Update your travel story</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="btn-secondary disabled:opacity-50"
              >
                <Save size={16} />
                Save Draft
              </button>
              <button
                onClick={() => handleSave('published')}
                disabled={saving || !formData.title || !formData.content}
                className="btn-primary disabled:opacity-50"
              >
                <Eye size={16} />
                {formData.status === 'published' ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter your blog title..."
                className="input-base text-lg font-medium"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Brief description of your blog post..."
                rows={3}
                className="input-base resize-none"
                required
              />
              <div className="text-xs text-stone-500 mt-1">
                {formData.excerpt.length}/200 characters recommended
              </div>
            </div>

            {/* Content */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog content here..."
                rows={20}
                className="input-base resize-none font-mono text-sm"
                required
              />
            </div>

            {/* Featured Image */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Featured Image URL
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="input-base flex-1"
                />
                <button className="btn-secondary">
                  <ImageIcon size={16} />
                  Upload
                </button>
              </div>
              {formData.imageUrl && (
                <div className="mt-3">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="card">
              <h3 className="text-sm font-medium text-stone-900 mb-3">Status</h3>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="input-base"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Tags */}
            <div className="card">
              <h3 className="text-sm font-medium text-stone-900 mb-3">Tags</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="input-base flex-1 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  onClick={addTag}
                  className="btn-secondary text-sm"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-stone-500 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="card">
              <h3 className="text-sm font-medium text-stone-900 mb-3">SEO Settings</h3>
              
              {/* SEO Title */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder={formData.title || "SEO title for search engines..."}
                  className="input-base text-sm"
                  maxLength={60}
                />
                <div className="text-xs text-stone-500 mt-1">
                  {(formData.seoTitle || formData.title).length}/60 characters
                </div>
              </div>

              {/* Slug */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                  className="input-base text-sm font-mono"
                />
                <div className="text-xs text-stone-500 mt-1">
                  marrakechtrips.com/blog/{formData.slug || 'your-slug'}
                </div>
              </div>

              {/* Meta Description */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder={formData.excerpt || "Brief description for search engines..."}
                  rows={3}
                  className="input-base text-sm resize-none"
                  maxLength={160}
                />
                <div className="text-xs text-stone-500 mt-1">
                  {(formData.metaDescription || formData.excerpt).length}/160 characters
                </div>
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Meta Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword..."
                    className="input-base flex-1 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <button
                    onClick={addKeyword}
                    className="btn-secondary text-sm"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.metaKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-stone-100 text-stone-600 rounded text-xs"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-stone-500 hover:text-red-500 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="card">
              <h3 className="text-sm font-medium text-stone-900 mb-3">SEO Preview</h3>
              <div className="border border-stone-200 rounded-lg p-4">
                <div className="text-blue-600 text-sm font-medium truncate">
                  {formData.seoTitle || formData.title || 'Your Blog Post Title'}
                </div>
                <div className="text-green-600 text-xs mt-1">
                  marrakechtrips.com/blog/{formData.slug || 'your-post-slug'}
                </div>
                <div className="text-stone-600 text-sm mt-2 line-clamp-2">
                  {formData.metaDescription || formData.excerpt || 'Your blog post meta description will appear here...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 