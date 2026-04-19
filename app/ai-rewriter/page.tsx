"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const MODES = [
  {
    id: "simple",
    label: "Simple",
    icon: "◎",
    desc: "Clear & easy to read",
    color: "#4ade80",
    glow: "#4ade8033",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "formal",
    label: "Formal",
    icon: "◈",
    desc: "Professional & polished",
    color: "#60a5fa",
    glow: "#60a5fa33",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "natural",
    label: "Natural",
    icon: "◉",
    desc: "Conversational & warm",
    color: "#f59e0b",
    glow: "#f59e0b33",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "creative",
    label: "Creative",
    icon: "◇",
    desc: "Vivid & expressive",
    color: "#a78bfa",
    glow: "#a78bfa33",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "humanize",
    label: "Humanize",
    icon: "⟁",
    desc: "Bypass AI detection",
    color: "#f472b6",
    glow: "#f472b633",
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function AIRewriter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedMode, setSelectedMode] = useState("natural");
  const [loading, setLoading] = useState(false);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeMode = MODES.find((m) => m.id === selectedMode)!;
  const isLoading = loading || loadingVariants;
  const charCount = inputText.length;

  const agentSteps = [
    "🤖 Groq Agent processing...",
    "🧠 Gemini Agent verifying...",
    "⚡ OpenRouter cross-checking...",
    "🗳️ Selecting best result...",
  ];

  const startAgentAnimation = () => {
    setAgentStep(0);
    intervalRef.current = setInterval(() => {
      setAgentStep((s) => (s < agentSteps.length - 1 ? s + 1 : s));
    }, 1600);
  };

  const stopAgentAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAgentStep(0);
  };

  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setOutputText("");
    setVariants([]);
    startAgentAnimation();
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode: selectedMode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutputText(data.result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      stopAgentAnimation();
      setLoading(false);
    }
  };

  const handleVariants = async () => {
    if (!inputText.trim()) return;
    setLoadingVariants(true);
    setError("");
    setOutputText("");
    setVariants([]);
    setSelectedVariant(0);
    startAgentAnimation();
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode: selectedMode, variants: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setVariants(data.variants);
      setOutputText(data.variants[0]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      stopAgentAnimation();
      setLoadingVariants(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setVariants([]);
    setError("");
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "#070711", fontFamily: "system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        borderBottom: "1px solid #ffffff0f",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(7,7,17,0.9)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Image src="/logo-icon.png" alt="RewordlyAI" width={28} height={28} style={{ borderRadius: 6, width: "auto", height: "auto" }} />
          <span style={{ fontWeight: 700, fontSize: 15, background: "linear-gradient(90deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            RewordlyAI
          </span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[
            { href: "/tools/mcq-solver", label: "MCQ Solver" },
            { href: "/tools/image-prompt", label: "Image Gen" },
            { href: "/tools/ai-agent", label: "AI Agent" },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{ color: "#6b7280", fontSize: 13, textDecoration: "none", padding: "4px 10px", borderRadius: 6, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}>
              {t.label}
            </Link>
          ))}
          <Link href="/contact" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontSize: 13, textDecoration: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 600 }}>
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        borderBottom: "1px solid #ffffff0a",
        padding: "48px 24px 40px",
        textAlign: "center",
        background: "radial-gradient(ellipse at 50% 0%, #4f46e520 0%, transparent 60%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#ffffff08", border: "1px solid #ffffff15",
          borderRadius: 20, padding: "4px 12px", fontSize: 12,
          color: "#a78bfa", marginBottom: 20,
        }}>
          ✦ 3-Agent Verified Rewriting · Groq · Gemini · OpenRouter
        </div>
        <h1 style={{
          fontSize: 48, fontWeight: 900, marginBottom: 12, letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #e2e8f0 0%, #a78bfa 50%, #818cf8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          AI Text Rewriter
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          Rewrite any text in 5 modes. New <strong style={{ color: "#f472b6" }}>Humanize</strong> mode uses
          blader/humanizer 24-pattern technique to bypass AI detection.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>

        {/* Mode Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 20 }}>
          {MODES.map((mode) => (
            <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
              style={{
                padding: "14px 10px",
                borderRadius: 12,
                cursor: "pointer",
                textAlign: "left",
                border: `1px solid ${selectedMode === mode.id ? mode.color + "80" : "#ffffff0f"}`,
                background: selectedMode === mode.id ? mode.glow : "#0d0d1a",
                color: "#e2e8f0",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden",
              }}>
              {selectedMode === mode.id && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${mode.color}00, ${mode.color}, ${mode.color}00)`,
                }} />
              )}
              <div style={{ fontSize: 20, color: selectedMode === mode.id ? mode.color : "#374151", marginBottom: 6 }}>
                {mode.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: selectedMode === mode.id ? mode.color : "#e2e8f0", marginBottom: 2 }}>
                {mode.label}
              </div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{mode.desc}</div>
              {mode.id === "humanize" && (
                <div style={{
                  position: "absolute", top: 6, right: 6,
                  background: "#f472b620", border: "1px solid #f472b640",
                  color: "#f472b6", fontSize: 9, fontWeight: 700,
                  padding: "1px 5px", borderRadius: 4,
                }}>NEW</div>
              )}
            </button>
          ))}
        </div>

        {/* Agent progress bar */}
        {isLoading && (
          <div style={{
            background: "#0d0d1a", border: `1px solid ${activeMode.color}40`,
            borderRadius: 12, padding: "14px 18px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${activeMode.color}`,
              borderTopColor: "transparent",
              animation: "spin 0.7s linear infinite",
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: activeMode.color, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                {agentSteps[agentStep]}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Groq", "Gemini", "OpenRouter"].map((name, i) => (
                  <div key={name} style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 3 }}>{name}</div>
                    <div style={{
                      height: 3, borderRadius: 2,
                      background: agentStep > i ? activeMode.color : agentStep === i ? activeMode.color + "60" : "#1f2937",
                      transition: "all 0.4s",
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main panels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>

          {/* Input */}
          <div style={{
            background: "#0d0d1a",
            border: "1px solid #ffffff0f",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              padding: "10px 16px",
              borderBottom: "1px solid #ffffff08",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                Input
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: charCount > 4500 ? "#ef4444" : "#374151" }}>
                  {charCount}/5000
                </span>
                {inputText && (
                  <button onClick={handleClear}
                    style={{ background: "none", border: "none", color: "#374151", cursor: "pointer", fontSize: 13, padding: "2px 6px" }}>
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={5000}
              placeholder="Paste or type your text here…"
              style={{
                flex: 1,
                minHeight: 280,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e2e8f0",
                padding: "16px",
                fontSize: 14,
                lineHeight: 1.75,
                resize: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Output */}
          <div style={{
            background: "#0d0d1a",
            border: `1px solid ${outputText ? activeMode.color + "30" : "#ffffff0f"}`,
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.3s",
          }}>
            <div style={{
              padding: "10px 16px",
              borderBottom: "1px solid #ffffff08",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                  Output
                </span>
                {outputText && (
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: activeMode.glow,
                    border: `1px solid ${activeMode.color}40`,
                    color: activeMode.color,
                    padding: "1px 6px", borderRadius: 4,
                  }}>
                    {activeMode.label}
                  </span>
                )}
              </div>
              {outputText && (
                <button onClick={handleCopy}
                  style={{
                    background: copied ? "#065f4620" : "none",
                    border: `1px solid ${copied ? "#4ade80" : "#1f2937"}`,
                    color: copied ? "#4ade80" : "#6b7280",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            {/* Variant tabs */}
            {variants.length > 1 && (
              <div style={{
                display: "flex", gap: 4, padding: "8px 16px",
                borderBottom: "1px solid #ffffff08",
              }}>
                {variants.map((_, i) => (
                  <button key={i}
                    onClick={() => { setSelectedVariant(i); setOutputText(variants[i]); }}
                    style={{
                      padding: "4px 12px", borderRadius: 6, fontSize: 12,
                      cursor: "pointer",
                      border: `1px solid ${selectedVariant === i ? activeMode.color : "#1f2937"}`,
                      background: selectedVariant === i ? activeMode.glow : "transparent",
                      color: selectedVariant === i ? activeMode.color : "#6b7280",
                      transition: "all 0.2s",
                    }}>
                    Version {i + 1}
                  </button>
                ))}
              </div>
            )}

            <div style={{
              flex: 1,
              padding: 16,
              minHeight: 280,
              fontSize: 14,
              lineHeight: 1.75,
              color: error ? "#ef4444" : "#e2e8f0",
              whiteSpace: "pre-wrap",
              overflowY: "auto",
            }}>
              {isLoading ? (
                <span style={{ color: "#374151", fontStyle: "italic" }}>
                  ✦ {loadingVariants ? "Generating 3 versions with 3 AI agents…" : "Rewriting with 3 AI agents…"}
                </span>
              ) : error ? (
                `⚠️ ${error}`
              ) : outputText ? (
                outputText
              ) : (
                <span style={{ color: "#1f2937", fontStyle: "italic" }}>
                  Rewritten text will appear here
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40 }}>
          <button onClick={handleRewrite} disabled={isLoading || !inputText.trim()}
            style={{
              background: isLoading || !inputText.trim()
                ? "#1f2937"
                : `linear-gradient(135deg, ${activeMode.color}, ${activeMode.color}aa)`,
              color: isLoading || !inputText.trim() ? "#374151" : "white",
              border: "none",
              padding: "14px 36px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              cursor: isLoading || !inputText.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: isLoading || !inputText.trim() ? "none" : `0 0 24px ${activeMode.glow}`,
            }}>
            {loading ? "Processing..." : `✦ Rewrite as ${activeMode.label}`}
          </button>
          <button onClick={handleVariants} disabled={isLoading || !inputText.trim()}
            style={{
              background: "transparent",
              color: isLoading || !inputText.trim() ? "#1f2937" : activeMode.color,
              border: `1px solid ${isLoading || !inputText.trim() ? "#1f2937" : activeMode.color + "60"}`,
              padding: "14px 24px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              cursor: isLoading || !inputText.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}>
            {loadingVariants ? "Generating…" : "⟳ 3 Versions"}
          </button>
        </div>

        {/* Humanize mode info */}
        {selectedMode === "humanize" && (
          <div style={{
            background: "#0d0d1a",
            border: "1px solid #f472b630",
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 24,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>⟁</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f472b6", margin: 0 }}>
                Humanize Mode — blader/humanizer technique
              </h3>
            </div>
            <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Fixes <strong style={{ color: "#e2e8f0" }}>24 AI-writing patterns</strong> identified by Wikipedia&apos;s Signs of AI Writing guide.
              Removes em dash overuse, AI vocabulary (delve, tapestry, leverage...), uniform sentence length, sycophantic openers,
              hollow transitions, and more. Output passes AI detection tools.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {["Em dash overuse", "AI vocabulary", "Uniform length", "Rule of three", "Filler phrases", "Passive voice", "Hollow transitions", "Inflated symbolism"].map((p) => (
                <span key={p} style={{
                  background: "#f472b610", border: "1px solid #f472b630",
                  color: "#f472b6", fontSize: 11, padding: "2px 8px", borderRadius: 4,
                }}>✓ {p}</span>
              ))}
            </div>
          </div>
        )}

        {/* AdSense */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <ins className="adsbygoogle" style={{ display: "block" }}
            data-ad-client="ca-pub-8754288242636148" data-ad-slot="auto"
            data-ad-format="auto" data-full-width-responsive="true" />
        </div>

        {/* How it works */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32,
        }}>
          {[
            { icon: "✍️", title: "Paste your text", desc: "Any text up to 5000 characters" },
            { icon: "🤖", title: "3 AI agents process", desc: "Groq, Gemini, and OpenRouter independently rewrite" },
            { icon: "✅", title: "Get best result", desc: "The highest quality output is returned" },
          ].map((s) => (
            <div key={s.title} style={{
              background: "#0d0d1a", border: "1px solid #ffffff0a",
              borderRadius: 12, padding: "20px 16px", textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* SEO */}
        <div style={{ background: "#0d0d1a", border: "1px solid #ffffff0a", borderRadius: 14, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>What is an AI Text Rewriter?</h2>
          <p style={{ color: "#6b7280", lineHeight: 1.8, fontSize: 14, margin: 0 }}>
            An AI text rewriter uses artificial intelligence to rewrite sentences, paragraphs, or entire documents while preserving the original meaning.
            RewordlyAI uses 3 independent AI agents (Groq, Gemini, OpenRouter) to improve grammar, clarity, and tone.
            The new <strong style={{ color: "#f472b6" }}>Humanize</strong> mode applies 24 proven techniques from the blader/humanizer skill to make AI-generated text
            sound naturally human and bypass AI detection tools.
          </p>
        </div>

        {/* FAQ */}
        <div style={{ background: "#0d0d1a", border: "1px solid #ffffff0a", borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>FAQ</h2>
          {[
            { q: "Is RewordlyAI free?", a: "Yes, completely free. No sign-up required." },
            { q: "Does it change the meaning?", a: "No. The AI preserves your original meaning 100% while improving clarity and flow." },
            { q: "What is Humanize mode?", a: "Humanize mode applies 24 AI-writing detection patterns from blader/humanizer to make output pass AI detectors like GPTZero and Turnitin." },
            { q: "What are the 5 rewriting modes?", a: "Simple (easy to read), Formal (professional), Natural (conversational), Creative (expressive), and Humanize (bypasses AI detection)." },
            { q: "How many characters can I rewrite?", a: "Up to 5,000 characters per request." },
          ].map((faq, i) => (
            <div key={i} style={{ marginBottom: i < 4 ? 16 : 0, paddingBottom: i < 4 ? 16 : 0, borderBottom: i < 4 ? "1px solid #ffffff08" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: "#a78bfa" }}>Q: {faq.q}</div>
              <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>A: {faq.a}</div>
            </div>
          ))}
        </div>

        {/* Other tools */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#6b7280" }}>Try Other AI Tools</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "🧠 MCQ Solver", href: "/tools/mcq-solver" },
              { label: "🎨 Image Generator", href: "/tools/image-prompt" },
              { label: "🤖 AI Agent", href: "/tools/ai-agent" },
              { label: "✍️ Blog Writer", href: "/tools/ai-blog-writer" },
              { label: "🧑 AI Humanizer", href: "/tools/ai-humanizer" },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href}
                style={{
                  background: "#0d0d1a", border: "1px solid #ffffff0a",
                  color: "#a78bfa", borderRadius: 8,
                  padding: "7px 14px", fontSize: 13,
                  textDecoration: "none", fontWeight: 600,
                }}>
                {tool.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #ffffff08", padding: "20px", textAlign: "center", marginTop: 40 }}>
        <p style={{ color: "#374151", fontSize: 12 }}>© {new Date().getFullYear()} RewordlyAI · bimkim · All rights reserved</p>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        textarea::placeholder { color: #374151; }
      `}</style>
    </div>
  );
}