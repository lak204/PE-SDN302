"use client";

import { useState } from "react";
import { Post, CreatePostData, UpdatePostData } from "@/types/post";
import { X, Upload, Link, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePostData | UpdatePostData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PostForm({
  post,
  onSubmit,
  onCancel,
  isLoading,
}: PostFormProps) {
  const [formData, setFormData] = useState({
    name: post?.name || "",
    description: post?.description || "",
    image: post?.image || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageInputType, setImageInputType] = useState<"url" | "file">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(post?.image || "");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image:
            "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
        }));
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          image: "File too large. Maximum size is 5MB.",
        }));
        return;
      }

      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, image: "" }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        const errorData = await response.json();
        setErrors((prev) => ({
          ...prev,
          image: errorData.error || "Upload failed",
        }));
        return null;
      }
    } catch {
      setErrors((prev) => ({ ...prev, image: "Upload failed" }));
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      let imageUrl = formData.image.trim();

      // If file is selected, upload it first
      if (imageInputType === "file" && selectedFile) {
        const uploadedUrl = await uploadFile();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Upload failed, don't submit
        }
      }

      onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: imageUrl || undefined,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update preview URL for image input
    if (name === "image" && imageInputType === "url") {
      setPreviewUrl(value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageTypeChange = (type: "url" | "file") => {
    setImageInputType(type);
    setSelectedFile(null);
    setFormData((prev) => ({ ...prev, image: "" }));
    setPreviewUrl("");
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="flex justify-between items-center p-8 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {post ? "Edit Post" : "Create New Post"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {post
                ? "Update your post details"
                : "Share your thoughts with the world"}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Post Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.name
                  ? "border-red-400 focus:ring-red-500"
                  : "border-purple-200"
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell your story..."
              className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.description
                  ? "border-red-400 focus:ring-red-500"
                  : "border-purple-200"
              }`}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Add Image (Optional)
            </label>

            {/* Image Type Toggle */}
            <div className="flex space-x-3 mb-4">
              <button
                type="button"
                onClick={() => handleImageTypeChange("url")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  imageInputType === "url"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                }`}
                disabled={isLoading || uploadLoading}
              >
                <Link size={16} />
                <span>Image URL</span>
              </button>
              <button
                type="button"
                onClick={() => handleImageTypeChange("file")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  imageInputType === "file"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/50 text-gray-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                }`}
                disabled={isLoading || uploadLoading}
              >
                <Upload size={16} />
                <span>Upload File</span>
              </button>
            </div>

            {/* URL Input */}
            {imageInputType === "url" && (
              <div className="relative">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.image
                      ? "border-red-400 focus:ring-red-500"
                      : "border-purple-200"
                  }`}
                  disabled={isLoading || uploadLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Link className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            )}

            {/* File Input */}
            {imageInputType === "file" && (
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 bg-white/50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    disabled={isLoading || uploadLoading}
                  />
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
                </p>
              </div>
            )}

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Preview:
                </p>
                <div className="relative w-full h-40 border-2 border-purple-200 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={() => setPreviewUrl("")}
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-1">
                      <ImageIcon className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {errors.image && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.image}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 bg-white/50 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              disabled={isLoading || uploadLoading}
            >
              {uploadLoading
                ? "Uploading..."
                : isLoading
                ? "Saving..."
                : post
                ? "Update Post"
                : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
