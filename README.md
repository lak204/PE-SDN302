# Next.js Post Management App

A modern, full-featured post management application built with Next.js 14+ (App Router), TypeScript, Prisma ORM, MongoDB, and Tailwind CSS.

## Features

- ✅ **Full CRUD operations** for posts (Create, Read, Update, Delete)
- 🔍 **Real-time search** by post name and description
- 📊 **Sorting** posts A-Z / Z-A
- 🖼️ **Image support** - URL input or file upload
- 📱 **Responsive design** - works on mobile, tablet, and desktop
- 🎨 **Beautiful UI** with Tailwind CSS
- ⚡ **Fast performance** with Next.js 14 App Router
- 🔒 **Form validation** with Zod
- 🌐 **MongoDB** database with Prisma ORM
- 🎯 **TypeScript** for type safety

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or cloud)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string:
```bash
DATABASE_URL="your-mongodb-connection-string"
```

4. Generate Prisma client and push database schema:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page - posts list
│   ├── create/
│   │   └── page.tsx        # Create new post
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx    # Edit existing post
│   └── api/
│       └── posts/
│           ├── route.ts    # GET all posts, POST create
│           └── [id]/
│               └── route.ts # GET, PUT, DELETE by ID
├── components/
│   ├── PostCard.tsx        # Individual post card
│   ├── PostForm.tsx        # Create/Edit post form
│   ├── SearchBar.tsx       # Search functionality
│   ├── SortButtons.tsx     # Sort A-Z / Z-A buttons
│   └── ui/                 # UI components
│       ├── DeleteConfirmModal.tsx
│       ├── Toast.tsx
│       └── LoadingSkeleton.tsx
├── lib/
│   ├── prisma.ts           # Prisma client setup
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript types
```

## API Endpoints

- `GET /api/posts` - Get all posts with optional search & sort
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

## Features in Detail

### 🔍 Search & Sort
- Real-time search across post names and descriptions
- Sort posts alphabetically (A-Z / Z-A)
- Debounced search input for better performance

### 🖼️ Image Support
- **URL Input**: Paste image URLs directly
- **File Upload**: Upload images from your device
- **Image Preview**: See images before saving
- **Validation**: File type and size validation

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### 🎨 UI/UX Features
- Loading skeletons while fetching data
- Smooth animations and transitions
- Toast notifications for user feedback
- Confirmation modals for destructive actions
- Form validation with helpful error messages

## Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

## Database Schema

```prisma
model Post {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("posts")
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

### Other Platforms
This app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need help, please open an issue on GitHub.
# PE-SDN302
