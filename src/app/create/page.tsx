'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/PostForm'
import { PostFormData } from '@/types'
import Toast from '@/components/ui/Toast'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreatePostPage() {
  const router = useRouter()
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

  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setToast({
          show: true,
          message: 'Post created successfully!',
          type: 'success'
        })
        
        // Redirect after 1 second
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else {
        setToast({
          show: true,
          message: result.error || 'An error occurred while creating the post',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating post:', error)
      setToast({
        show: true,
        message: 'An error occurred while creating the post',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
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
        
        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-600 mt-2">
          Fill in the information to create a new post
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <PostForm
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
