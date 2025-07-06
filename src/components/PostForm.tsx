'use client'

import { PostFormData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Upload, Link as LinkIcon, X } from 'lucide-react'

const PostSchema = z.object({
  name: z.string().min(1, 'Post title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal(''))
})

interface PostFormProps {
  initialData?: PostFormData
  onSubmit: (data: PostFormData) => Promise<void>
  isSubmitting?: boolean
}

export default function PostForm({ initialData, onSubmit, isSubmitting }: PostFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null)
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      imageUrl: ''
    }
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file!')
        return
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large! Please select a file smaller than 5MB.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setValue('imageUrl', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (url: string) => {
    setValue('imageUrl', url)
    setImagePreview(url)
  }

  const clearImage = () => {
    setImagePreview(null)
    setValue('imageUrl', '')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Post title *
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          placeholder="Enter post title..."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          placeholder="Enter post description..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image (optional)
        </label>
        
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setUploadMode('url')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              uploadMode === 'url'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
            }`}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            URL
          </button>
          
          <button
            type="button"
            onClick={() => setUploadMode('file')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              uploadMode === 'file'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
            }`}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </button>
        </div>

        {uploadMode === 'url' ? (
          <div>
            <input
              type="url"
              {...register('imageUrl')}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
            <p className="mt-1 text-sm text-gray-500">
              Only accepts image files (JPG, PNG, GIF), maximum 5MB
            </p>
          </div>
        )}

        {imagePreview && (
          <div className="mt-4 relative">
            <div className="relative w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  )
}
