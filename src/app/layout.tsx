import type { Metadata, Viewport } from "next"
import { Providers } from "@/components/Providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Idea Bucket",
  description: "Lightning-fast idea capture",
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
