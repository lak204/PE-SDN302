import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// GET /api/contacts - Get all contacts with optional search, filter, and sort
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const group = searchParams.get("group");
    const sort = searchParams.get("sort"); // 'asc' or 'desc'

    const whereClause: {
      name?: {
        contains: string;
        mode: "insensitive";
      };
      group?: string;
    } = {};

    // Search by name
    if (search) {
      whereClause.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Filter by group
    if (group && group !== "all") {
      whereClause.group = group;
    }

    let orderByClause = {};
    if (sort === "asc" || sort === "desc") {
      orderByClause = {
        name: sort,
      };
    } else {
      orderByClause = {
        createdAt: "desc",
      };
    }

    const contacts = await prisma.contact.findMany({
      where: whereClause,
      orderBy: orderByClause,
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Create a new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, group } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingContact = await prisma.contact.findFirst({
      where: { email },
    });

    if (existingContact) {
      return NextResponse.json(
        { error: "A contact with this email already exists" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        group: group || null,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
