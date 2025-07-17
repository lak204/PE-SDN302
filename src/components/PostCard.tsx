"use client";

import { Post } from "@/types/post";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
      {post.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
          {post.name}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            <span className="text-xs text-gray-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(post)}
              className="p-2.5 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-blue-200"
              title="Edit post"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={handleDelete}
              className="p-2.5 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-red-200"
              title="Delete post"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
