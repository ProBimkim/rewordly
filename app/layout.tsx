import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RewordlyAI - Free AI Writing Tools",
  description: "Free AI writing tools for students, creators, and SEO writers.",
  icons: {
    icon: "/logo-icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8754288242636148"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}