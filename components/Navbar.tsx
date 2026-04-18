"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const tools = [
  { href: "/ai-rewriter", label: "Rewriter" },
  { href: "/tools/ai-blog-writer", label: "Blog Writer" },
  { href: "/tools/mcq-solver", label: "MCQ Solver" },
  { href: "/tools/image-prompt", label: "Image Gen" },
  { href: "/tools/ai-agent", label: "AI Agent" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/logo-icon.png"
            alt="RewordlyAI"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-white text-lg">RewordlyAI</span>
        </Link>

        {/* Tool Links */}
        <div className="hidden md:flex items-center gap-1">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                pathname === t.href
                  ? "bg-violet-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/about" className="text-sm text-gray-500 hover:text-gray-300 hidden sm:block">
            About
          </Link>
          <Link href="/contact" className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg transition-colors">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile tool scroll */}
      <div className="md:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              pathname === t.href
                ? "bg-violet-700 text-white"
                : "text-gray-400 bg-gray-900 hover:text-white"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}