"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/ai-rewriter", label: "Rewriter", icon: "✨" },
  { href: "/tools/mcq-solver", label: "MCQ Solver", icon: "🎯" },
  { href: "/tools/image-prompt", label: "Image Gen", icon: "🎨" },
  { href: "/tools/ai-agent", label: "AI Agent", icon: "🤖" },
  { href: "/tools/ai-blog-writer", label: "Blog Writer", icon: "✍️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        borderBottom: "1px solid #2a254520",
        padding: "0 20px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(10,10,18,0.92)",
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none", flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: 32, height: 32,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 0 12px #7c3aed40",
          }}>
            <Image
              src="/logo-icon.png"
              alt="BantuGwehAI"
              width={32} height={32}
              style={{ borderRadius: 8, width: "auto", height: "auto" }}
            />
          </div>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 800,
            fontSize: 16,
            background: "linear-gradient(135deg, #a855f7, #e040fb, #00e5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}>
            BantuGwehAI
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{
          alignItems: "center", gap: 4,
          flex: 1, justifyContent: "center",
        }}>
          {NAV_LINKS.map((t) => {
            const isActive = pathname === t.href || pathname?.startsWith(t.href + "/");
            return (
              <Link key={t.href} href={t.href} style={{
                padding: "6px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                color: isActive ? "#c084fc" : "#8b85a8",
                background: isActive ? "#7c3aed15" : "transparent",
                border: isActive ? "1px solid #7c3aed30" : "1px solid transparent",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}>
                {t.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="nav-desktop" style={{ alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Link href="/about" style={{
            fontSize: 13, color: "#5a5477", textDecoration: "none", padding: "4px 8px",
            transition: "color 0.2s",
          }}>About</Link>
          <Link href="/contact" style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "white", fontSize: 13, fontWeight: 600,
            textDecoration: "none", padding: "7px 16px",
            borderRadius: 10, whiteSpace: "nowrap",
            boxShadow: "0 0 15px #7c3aed30",
            transition: "all 0.3s ease",
          }}>Contact</Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "1px solid #2a2545",
            borderRadius: 10,
            padding: "8px 10px",
            cursor: "pointer",
            color: "#c084fc",
            fontSize: 18,
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 98,
          }}
        />
      )}

      {/* Mobile slide-in panel */}
      <div
        className={`nav-mobile-panel ${menuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0, right: 0,
          width: "280px",
          height: "100vh",
          background: "linear-gradient(180deg, #0d0b1a, #0a0a12)",
          borderLeft: "1px solid #2a254540",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.5)",
          zIndex: 99,
          flexDirection: "column",
          padding: "20px",
          overflowY: "auto",
          animation: menuOpen ? "slide-in-right 0.3s ease" : "none",
        }}
      >
        {/* Panel header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 24, paddingBottom: 16,
          borderBottom: "1px solid #2a254530",
        }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 700, fontSize: 14,
            color: "#c084fc",
          }}>
            MENU
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "none", border: "none",
              color: "#8b85a8", fontSize: 20, cursor: "pointer",
              padding: 4,
            }}
          >✕</button>
        </div>

        {/* Mobile nav links */}
        {NAV_LINKS.map((t) => {
          const isActive = pathname === t.href;
          return (
            <Link key={t.href} href={t.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                color: isActive ? "#c084fc" : "#8b85a8",
                background: isActive ? "#7c3aed15" : "transparent",
                border: isActive ? "1px solid #7c3aed30" : "1px solid transparent",
                transition: "all 0.2s ease",
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              {t.label}
            </Link>
          );
        })}

        <div style={{
          height: 1,
          background: "#2a254530",
          margin: "16px 0",
        }} />

        <Link href="/about"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block", padding: "12px 16px",
            color: "#5a5477", textDecoration: "none",
            fontSize: 14, borderRadius: 12,
            transition: "color 0.2s",
          }}
        >About</Link>

        <Link href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "white", textDecoration: "none",
            padding: "12px 16px", borderRadius: 12,
            fontWeight: 600, fontSize: 14,
            textAlign: "center",
            marginTop: 8,
            boxShadow: "0 0 20px #7c3aed30",
          }}
        >Contact Us</Link>

        {/* Bottom info */}
        <div style={{
          marginTop: "auto", paddingTop: 24,
          borderTop: "1px solid #2a254520",
          color: "#5a5477", fontSize: 11,
          textAlign: "center",
        }}>
          <div style={{ marginBottom: 4 }}>3-Agent AI Verification</div>
          <div>Groq · Gemini · OpenRouter</div>
        </div>
      </div>
    </>
  );
}