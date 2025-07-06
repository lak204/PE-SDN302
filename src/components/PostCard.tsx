'use client'

import { Post } from '@/types'
import { Edit, Trash2 } from 'lucide-react'
import PostImage from '@/components/ui/PostImage'
import Link from 'next/link'

interface PostCardProps {
  post: Post
  onDelete: (id: string) => void
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.imageUrl && (
        <div className="h-48 w-full">
          <PostImage
            src={post.imageUrl}
            alt={post.name}
            className="h-full w-full"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {post.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {truncateText(post.description, 120)}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('en-US')}
          </span>
          
          <div className="flex space-x-2">
            <Link
              href={`/edit/${post.id}`}
              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Link>
            
            <button
              onClick={() => {
                console.log('Delete button clicked for post:', post.id);
                // Make sure we're passing the ID string directly
                if (typeof onDelete === 'function') {
                  onDelete(post.id);
                } else {
                  console.error('onDelete is not a function');
                }
              }}
              className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
