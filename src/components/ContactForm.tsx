"use client";

import { useState } from "react";
import { Contact, CreateContactData, UpdateContactData } from "@/types/contact";
import { X, Mail, Phone, User, Users } from "lucide-react";

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: CreateContactData | UpdateContactData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const COMMON_GROUPS = ["Friends", "Work", "Family", "Business", "School"];

export default function ContactForm({
  contact,
  onSubmit,
  onCancel,
  isLoading,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    group: contact?.group || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        group: formData.group.trim() || undefined,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="flex justify-between items-center p-8 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {contact ? "Edit Contact" : "Add New Contact"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {contact
                ? "Update contact information"
                : "Add a new contact to your list"}
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
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name..."
                className={`w-full pl-12 pr-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.name
                    ? "border-red-400 focus:ring-red-500"
                    : "border-purple-200"
                }`}
                disabled={isLoading}
              />
              <User
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={18}
              />
            </div>
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

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address..."
                className={`w-full pl-12 pr-4 py-3 bg-white/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-500"
                    : "border-purple-200"
                }`}
                disabled={isLoading}
              />
              <Mail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={18}
              />
            </div>
            {errors.email && (
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
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number (Optional)
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number..."
                className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                disabled={isLoading}
              />
              <Phone
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={18}
              />
            </div>
          </div>

          {/* Group Field */}
          <div>
            <label
              htmlFor="group"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Group (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                id="group"
                name="group"
                value={formData.group}
                onChange={handleChange}
                placeholder="Enter group name or select from common groups..."
                list="groupOptions"
                className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                disabled={isLoading}
              />
              <datalist id="groupOptions">
                {COMMON_GROUPS.map((group) => (
                  <option key={group} value={group} />
                ))}
              </datalist>
              <Users
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                size={18}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Type a custom group name or select from suggestions:{" "}
              {COMMON_GROUPS.join(", ")}
            </p>
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
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : contact
                ? "Update Contact"
                : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
