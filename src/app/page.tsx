"use client";

import { useState, useEffect, useCallback } from "react";
import { Contact, CreateContactData, UpdateContactData } from "@/types/contact";
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";
import { ToastContainer } from "@/components/Toast";
import { useToast } from "@/hooks/useToast";
import { Plus, Search, SortAsc, SortDesc, Filter } from "lucide-react";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const { toasts, removeToast, showSuccess, showError } = useToast();

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedGroup && selectedGroup !== "all")
        params.append("group", selectedGroup);
      if (sortOrder) params.append("sort", sortOrder);

      const response = await fetch(`/api/contacts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        showError("Failed to load contacts. Please refresh the page.");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      showError("Failed to load contacts. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedGroup, sortOrder, showError]);

  // Fetch available groups
  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch("/api/contacts/groups");
      if (response.ok) {
        const data = await response.json();
        setAvailableGroups(data);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
    fetchGroups();
  }, [fetchContacts, fetchGroups]);

  // Create contact
  const handleCreateContact = async (data: CreateContactData) => {
    try {
      setFormLoading(true);
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowForm(false);
        fetchContacts();
        fetchGroups(); // Refresh groups in case a new one was added
        showSuccess(`Contact "${data.name}" has been created successfully!`);
      } else {
        const errorData = await response.json();
        showError(errorData.error || "Failed to create contact");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      showError("Failed to create contact. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Update contact
  const handleUpdateContact = async (data: UpdateContactData) => {
    if (!editingContact) return;

    try {
      setFormLoading(true);
      const response = await fetch(`/api/contacts/${editingContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEditingContact(null);
        fetchContacts();
        fetchGroups(); // Refresh groups in case a new one was added
        showSuccess(`Contact "${data.name}" has been updated successfully!`);
      } else {
        const errorData = await response.json();
        showError(errorData.error || "Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      showError("Failed to update contact. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete contact
  const handleDeleteContact = async (id: string) => {
    // Find the contact name for the success message
    const contactToDelete = contacts.find((contact) => contact.id === id);
    const contactName = contactToDelete?.name || "Contact";

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchContacts();
        fetchGroups(); // Refresh groups in case the deleted contact was the last in a group
        showSuccess(`"${contactName}" has been deleted successfully!`);
      } else {
        const errorData = await response.json();
        showError(errorData.error || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      showError("Failed to delete contact. Please try again.");
    }
  };

  const handleSort = () => {
    if (sortOrder === "") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Contact Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Organize and manage your contacts with ease
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search contacts by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-purple-400"
                />
              </div>

              {/* Group Filter */}
              <div className="relative min-w-[180px]">
                <Filter
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={20}
                />
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-white/50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="all">All Groups</option>
                  {availableGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Sort */}
              <button
                onClick={handleSort}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {sortOrder === "asc" ? (
                  <SortAsc size={20} />
                ) : (
                  <SortDesc size={20} />
                )}
                <span className="font-medium">
                  Sort{" "}
                  {sortOrder === "asc"
                    ? "A-Z"
                    : sortOrder === "desc"
                    ? "Z-A"
                    : "Default"}
                </span>
              </button>
            </div>

            {/* Create Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <Plus size={20} />
              Add Contact
            </button>
          </div>
        </div>

        {/* Contacts Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-purple-600 font-medium">
              Loading contacts...
            </p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-medium mb-2">
              No contacts found
            </p>
            {searchTerm && (
              <p className="text-gray-400">
                Try adjusting your search terms or add a new contact
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contacts.map((contact, index) => (
              <div
                key={contact.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ContactCard
                  contact={contact}
                  onEdit={setEditingContact}
                  onDelete={handleDeleteContact}
                />
              </div>
            ))}
          </div>
        )}

        {/* Forms */}
        {showForm && (
          <ContactForm
            onSubmit={handleCreateContact}
            onCancel={() => setShowForm(false)}
            isLoading={formLoading}
          />
        )}

        {editingContact && (
          <ContactForm
            contact={editingContact}
            onSubmit={handleUpdateContact}
            onCancel={() => setEditingContact(null)}
            isLoading={formLoading}
          />
        )}
      </div>
    </div>
  );
}
