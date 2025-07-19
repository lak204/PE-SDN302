import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/contacts/groups - Get all unique groups
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      select: {
        group: true
      },
      where: {
        group: {
          not: null
        }
      }
    })

    // Extract unique groups and filter out null values
    const uniqueGroups = [...new Set(contacts.map(contact => contact.group).filter(Boolean))]
    
    return NextResponse.json(uniqueGroups.sort())
  } catch (error) {
    console.error('Error fetching groups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    )
  }
}
