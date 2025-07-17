export interface Post {
  id: string
  name: string
  description: string
  image?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreatePostData {
  name: string
  description: string
  image?: string
}

export interface UpdatePostData {
  name: string
  description: string
  image?: string
}
