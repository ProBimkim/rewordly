"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_TOOLS = [
  { href: "/ai-rewriter", label: "Rewriter" },
  { href: "/tools/ai-blog-writer", label: "Blog Writer" },
  { href: "/tools/mcq-solver", label: "MCQ Solver" },
  { href: "/tools/image-prompt", label: "Image Gen" },
  { href: "/tools/ai-agent", label: "AI Agent" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      borderBottom: "1px solid #ffffff0f",
      padding: "0 24px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(7,7,17,0.95)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
        <Image
          src="/logo-icon.png"
          alt="RewordlyAI"
          width={28}
          height={28}
          style={{ borderRadius: 6, width: "auto", height: "auto" }}
        />
        <span style={{
          fontWeight: 700,
          fontSize: 15,
          background: "linear-gradient(90deg, #818cf8, #c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          RewordlyAI
        </span>
      </Link>

      {/* Desktop nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}
        className="nav-desktop">
        {NAV_TOOLS.map((t) => {
          const isActive = pathname === t.href;
          return (
            <Link key={t.href} href={t.href} style={{
              padding: "5px 12px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              textDecoration: "none",
              color: isActive ? "#a78bfa" : "#6b7280",
              background: isActive ? "#a78bfa15" : "transparent",
              border: isActive ? "1px solid #a78bfa30" : "1px solid transparent",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#e2e8f0"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#6b7280"; }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <Link href="/about" style={{
          fontSize: 13,
          color: "#4b5563",
          textDecoration: "none",
          padding: "4px 8px",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
        >
          About
        </Link>
        <Link href="/contact" style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          padding: "6px 14px",
          borderRadius: 8,
          whiteSpace: "nowrap",
        }}>
          Contact
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
}