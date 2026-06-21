import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "BantuGwehAI — Free AI Writing Tools | 3-Agent Verified",
  description:
    "Free AI writing tools powered by 3-agent verification. Rewriter, humanizer, MCQ solver, image generator, AI agent and more.",
};

const tools = [
  { href: "/ai-rewriter", label: "AI Rewriter", desc: "Rewrite text in 5 tones with AI humanizer", icon: "✨", badge: "HOT", accent: "#a855f7" },
  { href: "/tools/ai-blog-writer", label: "Blog Writer", desc: "Generate full SEO blog posts instantly", icon: "✍️", badge: "HOT", accent: "#2979ff" },
  { href: "/tools/ai-humanizer", label: "AI Humanizer", desc: "24-pattern technique bypasses AI detection", icon: "🧬", badge: "NEW", accent: "#00e5ff" },
  { href: "/tools/grammar-checker", label: "Grammar Checker", desc: "Fix all grammar errors instantly", icon: "✅", accent: "#39ff14" },
  { href: "/tools/sentence-improver", label: "Sentence Improver", desc: "Improve clarity and flow", icon: "⚡", accent: "#ffab00" },
  { href: "/tools/summarizer", label: "Summarizer", desc: "Condense long text in seconds", icon: "📋", accent: "#e040fb" },
  { href: "/tools/email-generator", label: "Email Generator", desc: "Write professional emails fast", icon: "📧", accent: "#2979ff" },
  { href: "/tools/marketing-copy", label: "Marketing Copy", desc: "Generate converting ad copy", icon: "📣", accent: "#ff1744" },
  { href: "/tools/product-description", label: "Product Description", desc: "Compelling ecommerce copy", icon: "🛍️", accent: "#e040fb" },
  { href: "/tools/summarizer-auto", label: "Smart Summarizer", desc: "Auto-detects best summary format", icon: "🧠", accent: "#00e5ff" },
  { href: "/tools/mcq-solver", label: "MCQ Solver", desc: "3-agent majority vote for MCQ accuracy", icon: "🎯", badge: "HOT", accent: "#ffab00" },
  { href: "/tools/image-prompt", label: "Image Generator", desc: "Real AI images via Flux model", icon: "🎨", badge: "NEW", accent: "#e040fb" },
  { href: "/tools/content-expander", label: "Content Expander", desc: "Expand short text to full content", icon: "📝", accent: "#8b85a8" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#e8e6f0" }}>
      {/* Navbar */}
      <nav style={{
        borderBottom: "1px solid #2a254520",
        padding: "0 20px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,10,18,0.92)", backdropFilter: "blur(16px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo-icon.png" alt="BantuGwehAI" width={32} height={32}
            style={{ borderRadius: 8, boxShadow: "0 0 12px #7c3aed40", width: "auto", height: "auto" }} />
          <span style={{
            fontFamily: "'Orbitron', monospace", fontWeight: 800, fontSize: 16,
            background: "linear-gradient(135deg, #a855f7, #e040fb, #00e5ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>BantuGwehAI</span>
        </Link>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[
            { href: "/ai-rewriter", label: "Rewriter" },
            { href: "/tools/mcq-solver", label: "MCQ Solver" },
            { href: "/tools/image-prompt", label: "Image Gen" },
            { href: "/tools/ai-agent", label: "AI Agent" },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{
              padding: "6px 14px", borderRadius: 10, fontSize: 13,
              color: "#8b85a8", textDecoration: "none", transition: "color 0.2s",
            }}>{t.label}</Link>
          ))}
          <Link href="/about" style={{ fontSize: 13, color: "#5a5477", textDecoration: "none", padding: "4px 8px" }}>About</Link>
          <Link href="/contact" style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "white", fontSize: 13, fontWeight: 600,
            textDecoration: "none", padding: "7px 16px", borderRadius: 10,
            boxShadow: "0 0 15px #7c3aed30",
          }}>Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="cyber-grid-bg" style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #2a254520",
        background: "radial-gradient(ellipse at 20% 60%, #7c3aed15 0%, transparent 50%), radial-gradient(ellipse at 80% 40%, #e040fb10 0%, transparent 50%), #0a0a12",
      }}>
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 900, margin: "0 auto",
          padding: "64px 20px 56px", textAlign: "center",
        }}>
          <div className="cyber-badge" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            3-Agent AI Verification — Groq · Gemini · OpenRouter
          </div>

          <h1 className="hero-title" style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 52, fontWeight: 900,
            marginBottom: 20, lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}>
            <span style={{ color: "#e8e6f0" }}>AI Writing Tools</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #e040fb, #00e5ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textShadow: "none",
            }}>
              for Everyone
            </span>
          </h1>

          <p className="hero-subtitle" style={{
            fontSize: 18, color: "#8b85a8",
            maxWidth: 560, margin: "0 auto 32px",
            lineHeight: 1.7,
          }}>
            Free AI tools for students, creators, and SEO writers.
            <br />
            Every result verified by <strong style={{ color: "#c084fc" }}>3 independent AI agents</strong> for maximum accuracy.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/ai-rewriter" className="cyber-btn" style={{
              padding: "14px 32px", fontSize: 16, borderRadius: 14,
              boxShadow: "0 0 30px #7c3aed40",
            }}>
              ✨ Try AI Rewriter Free →
            </Link>
            <Link href="/tools/ai-agent" style={{
              background: "#13111f", color: "#c084fc",
              border: "1px solid #2a2545",
              padding: "14px 28px", borderRadius: 14,
              fontWeight: 600, fontSize: 16,
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.3s",
            }}>
              🤖 Chat with AI Agent
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderBottom: "1px solid #2a254520", background: "#0d0b1a" }}>
        <div className="grid-stats" style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
          {[
            { v: "14+", l: "Free AI Tools" },
            { v: "3", l: "Agents per task" },
            { v: "24", l: "Humanizer patterns" },
            { v: "100%", l: "Free forever" },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 24, fontWeight: 800, color: "#a855f7",
                textShadow: "0 0 10px #7c3aed40",
              }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "#5a5477", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
        {/* AI Agent — featured card */}
        <Link href="/tools/ai-agent" style={{
          display: "block", marginBottom: 32, textDecoration: "none", color: "inherit",
          background: "linear-gradient(135deg, #13111f, #1a1730)",
          border: "1px solid #7c3aed30",
          borderRadius: 20, padding: "28px 32px",
          transition: "all 0.3s",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, #a855f7, #e040fb, #00e5ff, transparent)",
          }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, boxShadow: "0 0 20px #7c3aed40",
                flexShrink: 0,
              }}>🤖</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#e8e6f0", fontFamily: "'Orbitron', monospace" }}>
                    AI Writing Agent
                  </h2>
                  <span style={{
                    background: "#7c3aed", color: "white",
                    fontSize: 10, fontWeight: 700,
                    padding: "2px 8px", borderRadius: 6,
                  }}>NEW</span>
                  <span style={{
                    background: "#00e5ff15", border: "1px solid #00e5ff30",
                    color: "#00e5ff", fontSize: 10,
                    padding: "2px 8px", borderRadius: 6,
                  }}>Multi-turn</span>
                </div>
                <p style={{ color: "#8b85a8", maxWidth: 480, fontSize: 14, lineHeight: 1.6 }}>
                  Multi-turn AI assistant with memory. Ask anything about writing, SEO, content strategy, grammar — responses verified by 3 AI agents.
                </p>
              </div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              padding: "10px 24px", borderRadius: 12,
              fontWeight: 600, color: "white", fontSize: 14,
              boxShadow: "0 0 20px #7c3aed30",
              flexShrink: 0,
            }}>
              Chat Now →
            </div>
          </div>
        </Link>

        {/* Section header */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 24, fontWeight: 800, marginBottom: 8,
            color: "#e8e6f0",
          }}>All AI Writing Tools</h2>
          <p style={{ color: "#5a5477", fontSize: 14 }}>
            Every tool runs on 3 AI agents simultaneously for verified results
          </p>
        </div>

        {/* Tool grid */}
        <div className="grid-tools">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{
              display: "block", textDecoration: "none", color: "inherit",
              background: "#13111f",
              border: "1px solid #2a254530",
              borderRadius: 16, padding: "24px 20px",
              transition: "all 0.3s",
              position: "relative", overflow: "hidden",
            }}>
              {/* Top accent on hover glow */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${tool.accent}, transparent)`,
                opacity: 0,
                transition: "opacity 0.3s",
              }} />

              {tool.badge && (
                <span style={{
                  position: "absolute", top: 12, right: 12,
                  fontSize: 10, fontWeight: 700,
                  padding: "2px 8px", borderRadius: 6,
                  background: tool.badge === "HOT" ? "#ff174420" : "#7c3aed20",
                  border: `1px solid ${tool.badge === "HOT" ? "#ff174440" : "#7c3aed40"}`,
                  color: tool.badge === "HOT" ? "#ff6b6b" : "#c084fc",
                }}>{tool.badge}</span>
              )}

              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: `linear-gradient(135deg, ${tool.accent}20, ${tool.accent}10)`,
                border: `1px solid ${tool.accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
                transition: "all 0.3s",
              }}>
                {tool.icon}
              </div>

              <h3 style={{ fontWeight: 600, color: "#e8e6f0", marginBottom: 6, fontSize: 15 }}>
                {tool.label}
              </h3>
              <p style={{ fontSize: 13, color: "#5a5477", lineHeight: 1.5 }}>
                {tool.desc}
              </p>

              <div style={{
                marginTop: 14, fontSize: 11, color: "#5a5477",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#7c3aed",
                  boxShadow: "0 0 6px #7c3aed60",
                }} />
                3-agent verified
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works — 3-Agent System */}
      <div style={{
        borderTop: "1px solid #2a254520",
        background: "radial-gradient(ellipse at 50% 50%, #7c3aed08 0%, transparent 60%), #0d0b1a",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 28, fontWeight: 800, marginBottom: 12,
              color: "#e8e6f0",
            }}>3-Agent Verification System</h2>
            <p style={{ color: "#8b85a8", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Every request runs through 3 independent AI models simultaneously.
              The best result is selected — higher accuracy than any single-model tool.
            </p>
          </div>

          <div className="grid-agents">
            {[
              { icon: "🤖", name: "Groq Agent", model: "Llama 3.3 70B", desc: "Primary inference — ultra-fast responses", color: "#a855f7" },
              { icon: "🧠", name: "Gemini Agent", model: "Gemini 2.0 Flash", desc: "Deep reasoning & verification", color: "#00e5ff" },
              { icon: "⚡", name: "OpenRouter Agent", model: "Free Models", desc: "Independent cross-check — zero cost", color: "#39ff14" },
            ].map((a) => (
              <div key={a.name} style={{
                background: "#13111f",
                border: `1px solid ${a.color}20`,
                borderRadius: 16, padding: "28px 24px",
                textAlign: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`,
                }} />
                <div style={{ fontSize: 40, marginBottom: 12 }}>{a.icon}</div>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 700, color: "#e8e6f0", marginBottom: 8, fontSize: 15,
                }}>{a.name}</div>
                <div style={{
                  display: "inline-block", fontSize: 11,
                  padding: "3px 10px", borderRadius: 20,
                  color: a.color,
                  background: `${a.color}15`,
                  border: `1px solid ${a.color}30`,
                  marginBottom: 12,
                }}>{a.model}</div>
                <div style={{ fontSize: 13, color: "#5a5477", lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#39ff1410", border: "1px solid #39ff1430",
              color: "#39ff14", padding: "10px 20px", borderRadius: 14,
              fontSize: 13, fontWeight: 500,
            }}>
              🗳️ Majority vote determines the final answer — significantly more accurate than single-model tools
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #2a254520",
        padding: "32px 20px",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5a5477" }}>
            <Image src="/logo-icon.png" alt="BantuGwehAI" width={18} height={18}
              style={{ borderRadius: 4, opacity: 0.5, width: "auto", height: "auto" }} />
            <span>© 2026 BantuGwehAI · Free AI writing tools for everyone</span>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#5a5477" }}>
            <Link href="/about" style={{ color: "#5a5477", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ color: "#5a5477", textDecoration: "none" }}>Contact</Link>
            <Link href="/tools/ai-agent" style={{ color: "#5a5477", textDecoration: "none" }}>AI Agent</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}