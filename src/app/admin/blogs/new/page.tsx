"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Save, 
  Eye, 
  Plus,
  Image as ImageIcon,
  X
} from 'lucide-react'
import { createBlog } from '@/lib/firebase/services'
import toast from 'react-hot-toast'

export default function NewBlogPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published',
    imageUrl: '',
    // SEO fields
    slug: '',
    seoTitle: '',
    metaDescription: '',
    metaKeywords: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')
  const [saving, setSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Update slug when title changes
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

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      tags: [],
      status: 'draft',
      imageUrl: '',
      slug: '',
      seoTitle: '',
      metaDescription: '',
      metaKeywords: []
    })
    setNewTag('')
    setNewKeyword('')
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
        publishedAt: status === 'published' ? new Date() : new Date()
      }

      console.log('Attempting to create blog with data:', blogData)
      const blogId = await createBlog(blogData)
      
      if (blogId) {
        toast.success(`Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`)
        resetForm()
        router.push('/admin/blogs')
      } else {
        toast.error('Failed to save blog post')
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
      toast.error('Failed to save blog post')
    } finally {
      setSaving(false)
    }
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
                <h1 className="text-2xl font-bold text-stone-900">Create New Blog Post</h1>
                <p className="text-stone-600 mt-1">Share your travel stories with the world</p>
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
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-900 mb-3">
                Blog Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter your blog title..."
                className="input-base text-lg"
              />
            </div>

            {/* Excerpt */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-900 mb-3">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Write a brief description of your post..."
                rows={4}
                className="input-base resize-none"
              />
            </div>

            {/* Featured Image */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-900 mb-3">
                Featured Image
              </label>
              {formData.imageUrl ? (
                <div className="relative group">
                  <img 
                    src={formData.imageUrl} 
                    alt="Featured" 
                    className="w-full h-48 object-cover rounded-lg border border-stone-200"
                  />
                  <button
                    onClick={() => handleInputChange('imageUrl', '')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
                  <ImageIcon size={32} className="mx-auto text-stone-400 mb-2" />
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    placeholder="Enter image URL..."
                    className="input-base"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="card">
              <label className="block text-sm font-medium text-stone-900 mb-3">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog post content here..."
                rows={16}
                className="input-base resize-none font-mono text-sm"
              />
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
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add a tag..."
                  className="input-base text-sm"
                />
                <button
                  onClick={addTag}
                  className="p-2 bg-highlight-primary text-white rounded-lg hover:bg-highlight-primary/90 transition-colors"
                >
                  <Plus size={16} />
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
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    placeholder="Add keyword..."
                    className="input-base text-sm"
                  />
                  <button
                    onClick={addKeyword}
                    className="p-2 bg-highlight-primary text-white rounded-lg hover:bg-highlight-primary/90 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.metaKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-blue-500 hover:text-red-500 transition-colors"
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