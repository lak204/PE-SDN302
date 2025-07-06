export interface Post {
  id: string
  name: string
  description: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface PostFormData {
  name: string
  description: string
  imageUrl?: string
}

export interface SearchParams {
  search?: string
  sort?: 'asc' | 'desc'
}
