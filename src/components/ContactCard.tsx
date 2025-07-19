"use client";

import { Contact } from "@/types/contact";
import { Edit, Trash2, Mail, Phone, Users } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactCard({
  contact,
  onEdit,
  onDelete,
}: ContactCardProps) {
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${contact.name}"?\n\nThis action cannot be undone.`
      )
    ) {
      onDelete(contact.id);
    }
  };

  const getGroupColor = (group: string | null) => {
    if (!group) return "bg-gray-100 text-gray-600";

    const colors = {
      Friends: "bg-green-100 text-green-700",
      Work: "bg-blue-100 text-blue-700",
      Family: "bg-purple-100 text-purple-700",
      Business: "bg-orange-100 text-orange-700",
      School: "bg-yellow-100 text-yellow-700",
    };

    return (
      colors[group as keyof typeof colors] || "bg-indigo-100 text-indigo-700"
    );
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
      <div className="p-6">
        {/* Header with name and group */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
            {contact.name}
          </h3>
          {contact.group && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getGroupColor(
                contact.group
              )}`}
            >
              <Users size={12} className="inline mr-1" />
              {contact.group}
            </span>
          )}
        </div>

        {/* Contact details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-gray-600">
            <Mail size={16} className="text-purple-500" />
            <span className="text-sm font-medium">{contact.email}</span>
          </div>

          {contact.phone && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone size={16} className="text-blue-500" />
              <span className="text-sm font-medium">{contact.phone}</span>
            </div>
          )}
        </div>

        {/* Footer with date and actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            <span className="text-xs text-gray-500 font-medium">
              {new Date(contact.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(contact)}
              className="p-2.5 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-blue-200"
              title="Edit contact"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={handleDelete}
              className="p-2.5 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-red-200"
              title="Delete contact"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
