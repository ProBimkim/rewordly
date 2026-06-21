"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const MODES = [
  { id: "simple", label: "Simple", icon: "◎", desc: "Clear & easy to read", color: "#39ff14" },
  { id: "formal", label: "Formal", icon: "◈", desc: "Professional & polished", color: "#2979ff" },
  { id: "natural", label: "Natural", icon: "◉", desc: "Conversational & warm", color: "#ffab00" },
  { id: "creative", label: "Creative", icon: "◇", desc: "Vivid & expressive", color: "#a855f7" },
  { id: "humanize", label: "Humanize", icon: "⟁", desc: "Bypass AI detection", color: "#e040fb" },
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
    <div style={{ minHeight: "100vh", color: "#e8e6f0", background: "#0a0a12", fontFamily: "'Inter', system-ui, sans-serif" }}>

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
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[
            { href: "/tools/mcq-solver", label: "MCQ Solver" },
            { href: "/tools/image-prompt", label: "Image Gen" },
            { href: "/tools/ai-agent", label: "AI Agent" },
          ].map((t) => (
            <Link key={t.href} href={t.href} style={{
              color: "#8b85a8", fontSize: 13, textDecoration: "none",
              padding: "4px 10px", borderRadius: 8, transition: "color 0.2s",
            }}>{t.label}</Link>
          ))}
          <Link href="/contact" style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "white", fontSize: 13, textDecoration: "none",
            padding: "7px 16px", borderRadius: 10, fontWeight: 600,
            boxShadow: "0 0 15px #7c3aed30",
          }}>Contact</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="cyber-grid-bg" style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #2a254520",
        padding: "48px 20px 40px", textAlign: "center",
        background: "radial-gradient(ellipse at 50% 0%, #7c3aed15 0%, transparent 60%), #0a0a12",
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="cyber-badge" style={{ marginBottom: 20 }}>
            ✦ 3-Agent Verified Rewriting · Groq · Gemini · OpenRouter
          </div>
          <h1 className="hero-title" style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 44, fontWeight: 900, marginBottom: 12, letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #e8e6f0 0%, #a855f7 50%, #e040fb 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            AI Text Rewriter
          </h1>
          <p style={{ color: "#8b85a8", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Rewrite any text in 5 modes. New <strong style={{ color: "#e040fb" }}>Humanize</strong> mode uses
            24-pattern technique to bypass AI detection.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>

        {/* Mode Selector */}
        <div className="grid-modes" style={{ marginBottom: 20 }}>
          {MODES.map((mode) => (
            <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
              style={{
                padding: "14px 12px", borderRadius: 14, cursor: "pointer", textAlign: "left",
                border: `1px solid ${selectedMode === mode.id ? mode.color + "50" : "#2a254530"}`,
                background: selectedMode === mode.id ? mode.color + "10" : "#13111f",
                color: "#e8e6f0", transition: "all 0.3s",
                position: "relative", overflow: "hidden",
              }}>
              {selectedMode === mode.id && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${mode.color}, transparent)`,
                }} />
              )}
              <div style={{ fontSize: 20, color: selectedMode === mode.id ? mode.color : "#5a5477", marginBottom: 6 }}>
                {mode.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: selectedMode === mode.id ? mode.color : "#e8e6f0", marginBottom: 2 }}>
                {mode.label}
              </div>
              <div style={{ fontSize: 11, color: "#5a5477" }}>{mode.desc}</div>
              {mode.id === "humanize" && (
                <div style={{
                  position: "absolute", top: 6, right: 6,
                  background: "#e040fb15", border: "1px solid #e040fb30",
                  color: "#e040fb", fontSize: 9, fontWeight: 700,
                  padding: "1px 6px", borderRadius: 6,
                }}>NEW</div>
              )}
            </button>
          ))}
        </div>

        {/* Agent progress */}
        {isLoading && (
          <div style={{
            background: "#13111f", border: `1px solid ${activeMode.color}30`,
            borderRadius: 14, padding: "14px 18px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${activeMode.color}`, borderTopColor: "transparent",
              animation: "spin 0.7s linear infinite", flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: activeMode.color, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                {agentSteps[agentStep]}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { name: "Groq", color: "#a855f7" },
                  { name: "Gemini", color: "#00e5ff" },
                  { name: "OpenRouter", color: "#39ff14" },
                ].map((a, i) => (
                  <div key={a.name} style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: a.color, marginBottom: 3 }}>{a.name}</div>
                    <div style={{
                      height: 3, borderRadius: 2,
                      background: agentStep > i ? a.color : agentStep === i ? a.color + "60" : "#1e1b35",
                      transition: "all 0.4s",
                      boxShadow: agentStep > i ? `0 0 6px ${a.color}60` : "none",
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main panels */}
        <div className="grid-2col" style={{ marginBottom: 14 }}>

          {/* Input */}
          <div style={{
            background: "#13111f", border: "1px solid #2a254530",
            borderRadius: 16, overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              padding: "10px 16px", borderBottom: "1px solid #2a254520",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{
                fontSize: 11, color: "#5a5477",
                textTransform: "uppercase", letterSpacing: "0.1em",
                fontWeight: 600, fontFamily: "'Orbitron', monospace",
              }}>Input</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: charCount > 4500 ? "#ff1744" : "#5a5477" }}>
                  {charCount}/5000
                </span>
                {inputText && (
                  <button onClick={handleClear}
                    style={{ background: "none", border: "none", color: "#5a5477", cursor: "pointer", fontSize: 12, padding: "2px 6px" }}>
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
              className="cyber-textarea"
              style={{ flex: 1, minHeight: 280 }}
            />
          </div>

          {/* Output */}
          <div style={{
            background: "#13111f",
            border: `1px solid ${outputText ? activeMode.color + "30" : "#2a254530"}`,
            borderRadius: 16, overflow: "hidden",
            display: "flex", flexDirection: "column",
            transition: "border-color 0.3s",
          }}>
            <div style={{
              padding: "10px 16px", borderBottom: "1px solid #2a254520",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 11, color: "#5a5477",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  fontWeight: 600, fontFamily: "'Orbitron', monospace",
                }}>Output</span>
                {outputText && (
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    background: activeMode.color + "15",
                    border: `1px solid ${activeMode.color}30`,
                    color: activeMode.color,
                    padding: "1px 8px", borderRadius: 6,
                  }}>{activeMode.label}</span>
                )}
              </div>
              {outputText && (
                <button onClick={handleCopy} style={{
                  background: copied ? "#39ff1410" : "none",
                  border: `1px solid ${copied ? "#39ff14" : "#2a2545"}`,
                  color: copied ? "#39ff14" : "#8b85a8",
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                }}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            {/* Variant tabs */}
            {variants.length > 1 && (
              <div style={{
                display: "flex", gap: 4, padding: "8px 16px",
                borderBottom: "1px solid #2a254520",
              }}>
                {variants.map((_, i) => (
                  <button key={i}
                    onClick={() => { setSelectedVariant(i); setOutputText(variants[i]); }}
                    style={{
                      padding: "4px 12px", borderRadius: 8, fontSize: 12,
                      cursor: "pointer",
                      border: `1px solid ${selectedVariant === i ? activeMode.color : "#2a2545"}`,
                      background: selectedVariant === i ? activeMode.color + "15" : "transparent",
                      color: selectedVariant === i ? activeMode.color : "#5a5477",
                      transition: "all 0.2s",
                    }}>
                    Version {i + 1}
                  </button>
                ))}
              </div>
            )}

            <div style={{
              flex: 1, padding: 16, minHeight: 280,
              fontSize: 14, lineHeight: 1.75,
              color: error ? "#ff6b6b" : "#e8e6f0",
              whiteSpace: "pre-wrap", overflowY: "auto",
            }}>
              {isLoading ? (
                <span style={{ color: "#5a5477", fontStyle: "italic" }}>
                  ✦ {loadingVariants ? "Generating 3 versions with 3 AI agents…" : "Rewriting with 3 AI agents…"}
                </span>
              ) : error ? (
                `⚠️ ${error}`
              ) : outputText ? (
                outputText
              ) : (
                <span style={{ color: "#2a2545", fontStyle: "italic" }}>
                  Rewritten text will appear here
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
          <button onClick={handleRewrite} disabled={isLoading || !inputText.trim()}
            className="cyber-btn"
            style={{
              background: isLoading || !inputText.trim()
                ? "#1e1b35"
                : `linear-gradient(135deg, ${activeMode.color}, ${activeMode.color}aa)`,
              color: isLoading || !inputText.trim() ? "#5a5477" : "white",
              padding: "14px 36px", borderRadius: 14, fontSize: 15,
              boxShadow: isLoading || !inputText.trim() ? "none" : `0 0 24px ${activeMode.color}30`,
            }}>
            {loading ? "Processing..." : `✦ Rewrite as ${activeMode.label}`}
          </button>
          <button onClick={handleVariants} disabled={isLoading || !inputText.trim()}
            style={{
              background: "transparent",
              color: isLoading || !inputText.trim() ? "#2a2545" : activeMode.color,
              border: `1px solid ${isLoading || !inputText.trim() ? "#2a2545" : activeMode.color + "50"}`,
              padding: "14px 24px", borderRadius: 14,
              fontSize: 15, fontWeight: 600,
              cursor: isLoading || !inputText.trim() ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}>
            {loadingVariants ? "Generating…" : "⟳ 3 Versions"}
          </button>
        </div>

        {/* Humanize mode info */}
        {selectedMode === "humanize" && (
          <div style={{
            background: "#13111f", border: "1px solid #e040fb25",
            borderRadius: 16, padding: "20px 24px", marginBottom: 24,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>⟁</span>
              <h3 style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 14, fontWeight: 700, color: "#e040fb", margin: 0,
              }}>
                Humanize Mode — 24-Pattern Technique
              </h3>
            </div>
            <p style={{ color: "#8b85a8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Fixes <strong style={{ color: "#e8e6f0" }}>24 AI-writing patterns</strong> identified by Wikipedia&apos;s Signs of AI Writing guide.
              Removes em dash overuse, AI vocabulary (delve, tapestry, leverage...), uniform sentence length, sycophantic openers,
              hollow transitions, and more. Output passes AI detection tools.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {["Em dash overuse", "AI vocabulary", "Uniform length", "Rule of three", "Filler phrases", "Passive voice", "Hollow transitions", "Inflated symbolism"].map((p) => (
                <span key={p} style={{
                  background: "#e040fb10", border: "1px solid #e040fb25",
                  color: "#e040fb", fontSize: 11, padding: "2px 8px", borderRadius: 6,
                }}>✓ {p}</span>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="grid-3col" style={{ marginBottom: 32 }}>
          {[
            { icon: "✍️", title: "Paste your text", desc: "Any text up to 5000 characters" },
            { icon: "🤖", title: "3 AI agents process", desc: "Groq, Gemini, and OpenRouter independently rewrite" },
            { icon: "✅", title: "Get best result", desc: "The highest quality output is returned" },
          ].map((s) => (
            <div key={s.title} style={{
              background: "#13111f", border: "1px solid #2a254520",
              borderRadius: 14, padding: "20px 16px", textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#e8e6f0" }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "#5a5477", lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* SEO */}
        <div style={{ background: "#13111f", border: "1px solid #2a254520", borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#e8e6f0",
          }}>What is an AI Text Rewriter?</h2>
          <p style={{ color: "#8b85a8", lineHeight: 1.8, fontSize: 14, margin: 0 }}>
            An AI text rewriter uses artificial intelligence to rewrite sentences, paragraphs, or entire documents while preserving the original meaning.
            BantuGwehAI uses 3 independent AI agents (Groq, Gemini, OpenRouter) to improve grammar, clarity, and tone.
            The <strong style={{ color: "#e040fb" }}>Humanize</strong> mode applies 24 proven techniques to make AI-generated text
            sound naturally human and bypass AI detection tools.
          </p>
        </div>

        {/* FAQ */}
        <div style={{ background: "#13111f", border: "1px solid #2a254520", borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#e8e6f0",
          }}>FAQ</h2>
          {[
            { q: "Is BantuGwehAI free?", a: "Yes, completely free. No sign-up required." },
            { q: "Does it change the meaning?", a: "No. The AI preserves your original meaning 100% while improving clarity and flow." },
            { q: "What is Humanize mode?", a: "Humanize mode applies 24 AI-writing detection patterns to make output pass AI detectors like GPTZero and Turnitin." },
            { q: "What are the 5 rewriting modes?", a: "Simple (easy to read), Formal (professional), Natural (conversational), Creative (expressive), and Humanize (bypasses AI detection)." },
            { q: "How many characters can I rewrite?", a: "Up to 5,000 characters per request." },
          ].map((faq, i) => (
            <div key={i} style={{
              marginBottom: i < 4 ? 16 : 0,
              paddingBottom: i < 4 ? 16 : 0,
              borderBottom: i < 4 ? "1px solid #2a254520" : "none",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: "#c084fc" }}>Q: {faq.q}</div>
              <div style={{ fontSize: 13, color: "#8b85a8", lineHeight: 1.7 }}>A: {faq.a}</div>
            </div>
          ))}
        </div>

        {/* Other tools */}
        <div>
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#5a5477",
          }}>Try Other AI Tools</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "🧠 MCQ Solver", href: "/tools/mcq-solver" },
              { label: "🎨 Image Generator", href: "/tools/image-prompt" },
              { label: "🤖 AI Agent", href: "/tools/ai-agent" },
              { label: "✍️ Blog Writer", href: "/tools/ai-blog-writer" },
              { label: "🧬 AI Humanizer", href: "/tools/ai-humanizer" },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} style={{
                background: "#13111f", border: "1px solid #2a254530",
                color: "#c084fc", borderRadius: 10,
                padding: "8px 14px", fontSize: 13,
                textDecoration: "none", fontWeight: 600,
                transition: "all 0.3s",
              }}>
                {tool.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #2a254520",
        padding: "20px", textAlign: "center", marginTop: 40,
      }}>
        <p style={{ color: "#5a5477", fontSize: 12 }}>
          © {new Date().getFullYear()} BantuGwehAI · Free AI writing tools for everyone
        </p>
      </footer>
    </div>
  );
}