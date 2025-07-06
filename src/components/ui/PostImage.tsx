"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface PostImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function PostImage({
  src,
  alt,
  className = "",
}: PostImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm">Unable to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${
          imageLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
