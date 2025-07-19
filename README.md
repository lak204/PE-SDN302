# 📇 Contact Manager

A modern, responsive contact management application built with Next.js, Prisma, and MongoDB. Organize and manage your contacts with ease using a beautiful, professional interface.

![Contact Manager](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## ✨ Features

### 🎯 Core Functionality

- **📋 Contact Management** - Create, read, update, and delete contacts
- **🔍 Smart Search** - Real-time search by contact name
- **🏷️ Group Filtering** - Filter contacts by groups (Friends, Work, Family, etc.)
- **📊 Flexible Sorting** - Sort by name (A-Z, Z-A) or creation date
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile

### 🎨 User Experience

- **🎉 Toast Notifications** - Success/error feedback for all operations
- **✨ Modern UI** - Glass-morphism design with smooth animations
- **🎭 Interactive Elements** - Hover effects and loading states
- **🔒 Form Validation** - Real-time validation with helpful error messages
- **⚡ Fast Performance** - Optimized bundle size and loading times

### 🛠️ Technical Features

- **🔐 TypeScript** - Full type safety throughout the application
- **🗄️ MongoDB + Prisma** - Robust database with type-safe queries
- **🌐 RESTful API** - Clean API design with proper error handling
- **📧 Email Validation** - Prevents duplicate emails and validates format
- **🎯 Custom Groups** - Support for predefined and custom contact groups

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd contact-manager
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment setup:**
   Create a `.env` file in the root directory:

```env
DATABASE_URL="mongodb://localhost:27017/contact-manager"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/contact-manager"
```

4. **Database setup:**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (optional)
npx prisma db push
```

5. **Start development server:**

```bash
npm run dev
```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Adding a Contact

1. Click the **"Add Contact"** button
2. Fill in the required fields (Name, Email)
3. Optionally add Phone and Group
4. Click **"Add Contact"** to save

### Managing Contacts

- **Search**: Type in the search box for real-time filtering
- **Filter**: Select a group from the dropdown to filter contacts
- **Sort**: Click the sort button to toggle between A-Z, Z-A, and default
- **Edit**: Click the edit button on any contact card
- **Delete**: Click the delete button and confirm the action

### Groups

- **Predefined Groups**: Friends, Work, Family, Business, School
- **Custom Groups**: Type any group name when creating/editing contacts
- **Dynamic Filtering**: Groups appear in the filter dropdown automatically

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/contacts/          # API routes for contact operations
│   ├── globals.css            # Global styles and animations
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Main contact list page
├── components/
│   ├── ContactCard.tsx        # Individual contact display
│   ├── ContactForm.tsx        # Create/edit contact form
│   └── Toast.tsx              # Notification system
├── hooks/
│   └── useToast.ts            # Toast notification hook
├── lib/
│   └── prisma.ts              # Prisma client configuration
└── types/
    └── contact.ts             # TypeScript type definitions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database GUI
- `npx prisma generate` - Generate Prisma client

## 🗄️ Database Schema

```prisma
model Contact {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String   // Required: Contact's full name
  email     String   // Required: Must be unique and valid format
  phone     String?  // Optional: Phone number
  group     String?  // Optional: Contact group/category
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("contacts")
}
```

## 🌐 API Endpoints

| Method   | Endpoint               | Description                                         |
| -------- | ---------------------- | --------------------------------------------------- |
| `GET`    | `/api/contacts`        | Get all contacts with optional search, filter, sort |
| `POST`   | `/api/contacts`        | Create a new contact                                |
| `GET`    | `/api/contacts/[id]`   | Get a specific contact                              |
| `PUT`    | `/api/contacts/[id]`   | Update a contact                                    |
| `DELETE` | `/api/contacts/[id]`   | Delete a contact                                    |
| `GET`    | `/api/contacts/groups` | Get all unique groups                               |

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Server

```bash
npm ci --only=production
npm run build
npm start
```

## 🎨 Customization

### Adding New Contact Groups

Edit the `COMMON_GROUPS` array in `src/components/ContactForm.tsx`:

```typescript
const COMMON_GROUPS = [
  "Friends",
  "Work",
  "Family",
  "Business",
  "School",
  "Your Custom Group",
];
```

### Styling

- **Colors**: Modify the Tailwind classes in components
- **Animations**: Update `src/app/globals.css` for custom animations
- **Layout**: Adjust the responsive grid in `src/app/page.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **MongoDB** - The database for modern applications
- **Tailwind CSS** - A utility-first CSS framework
- **Lucide React** - Beautiful & consistent icon toolkit

---

**Built with ❤️ using Next.js and modern web technologies**
