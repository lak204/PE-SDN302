import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/posts - Get all posts with optional search and sort
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') // 'asc' or 'desc'

    let whereClause = {}
    if (search) {
      whereClause = {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    }

    let orderByClause = {}
    if (sort === 'asc' || sort === 'desc') {
      orderByClause = {
        name: sort
      }
    } else {
      orderByClause = {
        createdAt: 'desc'
      }
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: orderByClause
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, image } = body

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        name,
        description,
        image: image || null
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
