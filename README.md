# Post Management Application

A modern web application for managing posts built with Next.js, Prisma, and MongoDB. This application allows users to create, read, update, and delete posts with search and sorting functionality.

## Features

- **Post Management**: Create, edit, and delete posts
- **Search**: Search posts by name
- **Sorting**: Sort posts alphabetically (A-Z/Z-A) or by creation date
- **Image Support**: Upload images from device or use image URLs
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant updates when posts are modified

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (MongoDB Atlas recommended)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd post-application
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
DATABASE_URL="mongodb+srv://kle2042004:kle2042004@test.wmit5ey.mongodb.net/TEST?retryWrites=true&w=majority"
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/posts/          # API routes for posts
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── components/
│   ├── PostCard.tsx        # Individual post card component
│   └── PostForm.tsx        # Form for creating/editing posts
├── lib/
│   └── prisma.ts           # Prisma client configuration
└── types/
    └── post.ts             # TypeScript type definitions
```

## API Endpoints

- `GET /api/posts` - Get all posts (with optional search and sort)
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post
- `POST /api/upload` - Upload image file (returns image URL)

## Database Schema

```prisma
model Post {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@map("posts")
}
```

## Deployment

This application can be deployed on platforms like Vercel, Netlify, or any Node.js hosting service.

For Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.
