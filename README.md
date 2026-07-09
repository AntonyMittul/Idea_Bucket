# 💡 Idea Bucket

**Idea Bucket** is a beautifully crafted, minimalistic web application designed to help you quickly capture, organize, and track your ideas across mobile and desktop. It provides a sleek, dark-themed, glassmorphic UI so you can record your thoughts in seconds and get back to your day.

---

## ✨ Features

- 📱 **Mobile-First Design**: Optimized layout so you can easily pull out your phone and save an idea in under 10 seconds.
- 🎨 **Premium Minimalist UI**: A stunning dark mode with subtle purple accents, glassmorphic surfaces, and carefully crafted typography.
- 💨 **Smooth Animations**: Powered by Framer Motion for beautiful mount fades, hover lifts, and fluid modal transitions.
- 🔐 **Secure Authentication**: Seamless login via GitHub using Auth.js (NextAuth).
- 🏷 **Status Tracking**: Categorize your ideas easily (Not Started, In Progress, Completed, Archived).
- ⌨️ **Keyboard Shortcuts**: Use `Ctrl + K` (or `Cmd + K`) on desktop to immediately search your ideas without using a mouse.
- 🔍 **Real-time Filtering**: Instantly search and filter ideas by status using smooth filter chips.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Glassmorphism)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [Auth.js](https://authjs.dev/) (NextAuth v5)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites
- Node.js (v18 or higher)
- A Supabase account (for PostgreSQL)
- A GitHub OAuth App (for Authentication)

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/AntonyMittul/Idea_Bucket.git
cd Idea_Bucket
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the project and add the following keys:

```env
# Database Credentials (Supabase)
DATABASE_URL="postgresql://postgres.[YOUR-SUPABASE-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[YOUR-SUPABASE-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# NextAuth Secrets
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-nextauth-string" # Run `npx auth secret` to generate one

# GitHub OAuth Credentials
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

### 4. Database Setup

Generate the Prisma Client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app!

---

## 🏗 Future Roadmap

- Expand the Idea Detail View to include rich text formatting.
- Add "Resources" (Links/Attachments) and "Notes" sections for deeper idea planning.
- Add shareable links to collaborate on ideas.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
