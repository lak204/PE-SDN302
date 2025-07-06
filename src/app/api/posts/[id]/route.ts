import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const PostSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal(''))
})

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop() || '';
    const post = await prisma.post.findUnique({
      where: { id }
    })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop() || '';
    const body = await request.json();
    const validatedData = PostSchema.parse(body);
    const post = await prisma.post.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl || null
      }
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }
    console.error('Error updating post:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update post' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop() || '';
    console.log('API: Deleting post with id:', id);
    
    if (!id) {
      console.error('API: No ID provided in delete request');
      return NextResponse.json({ success: false, error: 'No ID provided' }, { status: 400 });
    }
    
    try {
      // Check if the post exists first
      const post = await prisma.post.findUnique({
        where: { id }
      });
      
      if (!post) {
        console.log('API: Post not found with id:', id);
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      }
      
      console.log('API: Found post to delete:', post);
      
      // Then delete it
      const deletedPost = await prisma.post.delete({
        where: { id }
      });
      
      console.log('API: Successfully deleted post:', deletedPost);
      return NextResponse.json({ success: true, message: 'Post deleted successfully' });
    } catch (dbError: any) {
      console.error('Database error when deleting post:', dbError);
      return NextResponse.json({ 
        success: false, 
        error: 'Database error when deleting post',
        details: dbError?.message || 'Unknown database error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete post' 
    }, { status: 500 });
  }
}
