"use client";
import Link from "next/link";

const TOOLS = [
  { icon: "✦", label: "AI Rewriter", desc: "Rewrite any text in 4 tones", href: "/ai-rewriter", color: "#7c6aff", hot: true },
  { icon: "✍️", label: "AI Blog Writer", desc: "Generate SEO blog posts instantly", href: "/ai-blog-writer", color: "#f59e0b", hot: true },
  { icon: "🤖", label: "AI Humanizer", desc: "Make AI text sound human", href: "/ai-humanizer", color: "#4ade80" },
  { icon: "✅", label: "Grammar Checker", desc: "Fix grammar and spelling errors", href: "/grammar-checker", color: "#60a5fa" },
  { icon: "⚡", label: "Sentence Improver", desc: "Improve any sentence instantly", href: "/sentence-improver", color: "#f472b6" },
  { icon: "📝", label: "Summarizer", desc: "Summarize long text in seconds", href: "/summarizer", color: "#34d399" },
  { icon: "📧", label: "Email Generator", desc: "Write professional emails fast", href: "/email-generator", color: "#fb923c" },
  { icon: "📣", label: "Marketing Copy", desc: "Generate converting ad copy", href: "/marketing-copy", color: "#a78bfa" },
  { icon: "🛍️", label: "Product Description", desc: "Write compelling product copy", href: "/product-description", color: "#f87171" },
];

const BLOGS = [
  { title: "Best AI Writing Tools in 2026", desc: "Discover the top AI tools that are changing how people write online." },
  { title: "How to Rewrite Text with AI", desc: "A complete guide to using AI paraphrasing tools effectively." },
  { title: "SEO Writing Guide for Beginners", desc: "Learn how to write content that ranks on Google in 2026." },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "sans-serif" }}>

          {/* Navbar */}
          <nav style={{ borderBottom: "1px solid #1e1e2e", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.95)", position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="/logo-icon.png"
                alt="RewordlyAI"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  borderRadius: 12,
                }}
              />
              <span style={{ fontWeight: 800, fontSize: 24, background: "linear-gradient(90deg, #7c6aff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                RewordlyAI
              </span>
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
              <Link href="/" style={{ color: "#e8e8f0", textDecoration: "none", fontWeight: 600 }}>Home</Link>
              <Link href="/ai-rewriter" style={{ color: "#6b6b8a", textDecoration: "none" }}>Tools</Link>
            </div>
          </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "70px 20px 50px", background: "radial-gradient(ellipse at top, rgba(124,106,255,0.08) 0%, transparent 70%)" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
          AI Writing Tools for{" "}
          <span style={{ background: "linear-gradient(90deg, #7c6aff, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Everyone
          </span>
        </h1>
        <p style={{ color: "#6b6b8a", fontSize: 17, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6 }}>
          Free AI tools for students, creators, and SEO writers. Rewrite, summarize, check grammar, and more — instantly.
        </p>
        <Link href="/ai-rewriter">
          <button style={{ background: "linear-gradient(135deg, #7c6aff, #a78bfa)", color: "white", border: "none", padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            ✦ Try AI Rewriter Free →
          </button>
        </Link>
      </div>

      {/* Tool Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px" }}>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>All AI Writing Tools</h2>
        <p style={{ textAlign: "center", color: "#6b6b8a", marginBottom: 32, fontSize: 14 }}>Pick a tool and start writing smarter</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
              <div
                style={{ background: "#111118", border: "1.5px solid #1e1e2e", borderRadius: 14, padding: 20, cursor: "pointer", transition: "all 0.2s", position: "relative" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = tool.color; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1e1e2e"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
                {tool.hot && (
                  <span style={{ position: "absolute", top: 12, right: 12, background: "#f59e0b", color: "#000", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>HOT</span>
                )}
                <div style={{ fontSize: 28, marginBottom: 10 }}>{tool.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: tool.color }}>{tool.label}</div>
                <div style={{ fontSize: 13, color: "#6b6b8a", lineHeight: 1.5 }}>{tool.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO Blocks */}
      <div style={{ background: "#0d0d14", borderTop: "1px solid #1e1e2e", borderBottom: "1px solid #1e1e2e", padding: "50px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, marginBottom: 28 }}>Why Use RewordlyAI?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
            {[
              { title: "AI Paraphrasing Tool", desc: "Rewrite any sentence while keeping the original meaning intact." },
              { title: "Rewrite Sentence Online", desc: "Fix awkward sentences instantly with AI-powered rewriting." },
              { title: "AI Blog Writer", desc: "Generate full SEO blog posts in seconds. Save hours of writing time." },
              { title: "Grammar Checker Online", desc: "Detect and fix grammar, spelling, and punctuation errors automatically." },
            ].map((block) => (
              <div key={block.title} style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#a78bfa", marginBottom: 8 }}>{block.title}</div>
                <div style={{ fontSize: 13, color: "#6b6b8a", lineHeight: 1.6 }}>{block.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 20px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Writing Tips & Guides</h2>
        <p style={{ color: "#6b6b8a", marginBottom: 24, fontSize: 14 }}>Learn how to write better with AI</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {BLOGS.map((blog) => (
            <div key={blog.title} style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 11, color: "#7c6aff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Article</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{blog.title}</div>
              <div style={{ fontSize: 13, color: "#6b6b8a", lineHeight: 1.6 }}>{blog.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 20px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <img src="/logo-icon.png" alt="RewordlyAI" style={{ width: 24, height: 24, borderRadius: 4, objectFit: "contain" }} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>RewordlyAI</span>
        </div>
        <p style={{ color: "#3a3a52", fontSize: 12, fontFamily: "monospace" }}>© {new Date().getFullYear()} bimkim · All rights reserved</p>
      </footer>

    </div>
  );
}