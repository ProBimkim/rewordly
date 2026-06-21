import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BantuGwehAI — Free AI Writing Tools | 3-Agent Verified",
  description:
    "Free AI writing tools powered by 3-agent verification system. Rewriter, humanizer, MCQ solver, image generator, AI agent and more. Groq + Gemini + OpenRouter.",
  keywords: "AI writing tools, text rewriter, MCQ solver, AI humanizer, free AI tools, BantuGwehAI",
  authors: [{ name: "BantuGwehAI" }],
  icons: {
    icon: "/logo-icon.png",
  },
  openGraph: {
    title: "BantuGwehAI — Free AI Writing Tools",
    description: "14+ free AI writing tools powered by 3-agent verification for maximum accuracy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0a12" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8754288242636148"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ background: "#0a0a12", color: "#e8e6f0" }}>
        {children}
      </body>
    </html>
  );
}