# Idea Bucket

Idea Bucket is a sleek, minimalistic, personal idea repository. It allows you to quickly capture, organize, and track your ideas with zero friction.

## Features

- **Direct Access**: No login walls or complex authentication. Just open the app and start writing.
- **Minimalist Design**: Built with raw vanilla CSS and glassmorphic styling, delivering a visually stunning, responsive interface without any heavy UI libraries.
- **Idea Management**:
  - Add new ideas instantly using the floating action button.
  - Track statuses (`Not Started`, `In Progress`, `Completed`, `Archived`) with a stylish one-click toggle system.
  - Edit or delete ideas seamlessly.
- **Search & Filter**: Quickly filter by status or search text to find exactly what you need. (Press `Ctrl K` / `Cmd K` to focus the search bar).
- **Fast & Modern**: Built on the Next.js 14 App Router and backed by a Supabase PostgreSQL database via Prisma ORM.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Database**: PostgreSQL (via [Supabase](https://supabase.com/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Setup

Since this is a single-user application, setup is incredibly straightforward:

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your `.env` file with your PostgreSQL database URLs:
   ```env
   DATABASE_URL="postgresql://[your-db-url]?pgbouncer=true&connection_limit=1"
   DIRECT_URL="postgresql://[your-direct-url]"
   ```

3. Push the database schema:
   ```bash
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## License

This project is open-source and available under the [MIT License](LICENSE).
