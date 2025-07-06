'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import PostForm from '@/components/PostForm'
import { PostFormData, Post } from '@/types'
import Toast from '@/components/ui/Toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error'
  }>({
    show: false,
    message: '',
    type: 'success'
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/posts/${postId}`)
        const data = await response.json()
        
        if (response.ok && data.post) {
          setPost(data.post)
        } else {
          setToast({
            show: true,
            message: 'Post not found',
            type: 'error'
          })
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setToast({
          show: true,
          message: 'An error occurred while loading data',
          type: 'error'
        })
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId, router])

  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setToast({
          show: true,
          message: 'Post updated successfully!',
          type: 'success'
        })
        
        // Redirect after 1 second
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else {
        setToast({
          show: true,
          message: result.error || 'An error occurred while updating the post',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error updating post:', error)
      setToast({
        show: true,
        message: 'An error occurred while updating the post',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Post not found
        </h1>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home page
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to list
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        <p className="text-gray-600 mt-2">
          Update information for post: <strong>{post.name}</strong>
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <PostForm
          initialData={{
            name: post.name,
            description: post.description,
            imageUrl: post.imageUrl || ''
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}
