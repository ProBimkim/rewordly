"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MODES = [
  { id: "simple", label: "Simple", icon: "◎", desc: "Clear & easy to read", color: "#4ade80" },
  { id: "formal", label: "Formal", icon: "◈", desc: "Professional & polished", color: "#60a5fa" },
  { id: "natural", label: "Natural", icon: "◉", desc: "Conversational & warm", color: "#f59e0b" },
  { id: "creative", label: "Creative", icon: "◇", desc: "Vivid & expressive", color: "#a78bfa" },
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
  const [charCount, setCharCount] = useState(0);

  const activeMode = MODES.find((m) => m.id === selectedMode)!;
  const isLoading = loading || loadingVariants;

  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setLoading(true); setError(""); setOutputText(""); setVariants([]);
    try {
      const res = await fetch("/api/rewrite", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: inputText, mode: selectedMode }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutputText(data.result);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleVariants = async () => {
    if (!inputText.trim()) return;
    setLoadingVariants(true); setError(""); setOutputText(""); setVariants([]); setSelectedVariant(0);
    try {
      const res = await fetch("/api/rewrite", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: inputText, mode: selectedMode, variants: true }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setVariants(data.variants);
      setOutputText(data.variants[0]);
    } catch (e: any) { setError(e.message); }
    finally { setLoadingVariants(false); }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "sans-serif" }}>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid #1e1e2e", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.95)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo-icon.png" alt="RewordlyAI" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ fontWeight: 700, fontSize: 16, background: "linear-gradient(90deg, #7c6aff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RewordlyAI</span>
        </Link>
        <Link href="/" style={{ color: "#6b6b8a", textDecoration: "none", fontSize: 14 }}>← Back to Tools</Link>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px" }}>

        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>✦ AI Text Rewriter</h1>
          <p style={{ color: "#6b6b8a", fontSize: 15, lineHeight: 1.6 }}>
            Rewrite any text instantly using AI. Choose from 4 tones — Simple, Formal, Natural, or Creative.
            Our AI preserves your original meaning while improving clarity, flow, and style.
          </p>
        </div>

        {/* AdSense */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-8754288242636148" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>

        {/* Mode Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
          {MODES.map((mode) => (
            <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
              style={{ padding: "12px", borderRadius: 10, cursor: "pointer", textAlign: "left", border: `2px solid ${selectedMode === mode.id ? mode.color : "#1e1e2e"}`, background: selectedMode === mode.id ? "rgba(255,255,255,0.04)" : "#111118", color: "#e8e8f0", transition: "all 0.2s" }}>
              <div style={{ fontSize: 18, color: selectedMode === mode.id ? mode.color : "#3a3a52" }}>{mode.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4, color: selectedMode === mode.id ? mode.color : "#e8e8f0" }}>{mode.label}</div>
              <div style={{ fontSize: 11, color: "#6b6b8a", marginTop: 2 }}>{mode.desc}</div>
            </button>
          ))}
        </div>

        {/* Text Panels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div style={{ background: "#111118", border: "1.5px solid #1e1e2e", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Input</span>
              <span style={{ fontSize: 11, color: charCount > 4500 ? "#f87171" : "#3a3a52" }}>{charCount}/5000</span>
            </div>
            <textarea value={inputText} onChange={(e) => { setInputText(e.target.value); setCharCount(e.target.value.length); }} maxLength={5000}
              placeholder="Paste or type your text here…"
              style={{ width: "100%", minHeight: 240, background: "transparent", border: "none", outline: "none", color: "#e8e8f0", padding: 16, fontSize: 13, lineHeight: 1.7, resize: "none", fontFamily: "monospace" }} />
          </div>
          <div style={{ background: "#111118", border: "1.5px solid #1e1e2e", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Output · {activeMode.label}</span>
              {outputText && <button onClick={handleCopy} style={{ background: "none", border: "1px solid #1e1e2e", color: copied ? "#4ade80" : "#6b6b8a", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>{copied ? "✓ Copied" : "Copy"}</button>}
            </div>
            {variants.length > 1 && (
              <div style={{ display: "flex", gap: 4, padding: "8px 16px", borderBottom: "1px solid #1e1e2e" }}>
                {variants.map((_, i) => (
                  <button key={i} onClick={() => { setSelectedVariant(i); setOutputText(variants[i]); }}
                    style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", border: `1px solid ${selectedVariant === i ? activeMode.color : "#1e1e2e"}`, background: selectedVariant === i ? "rgba(255,255,255,0.05)" : "transparent", color: selectedVariant === i ? activeMode.color : "#6b6b8a" }}>
                    Version {i + 1}
                  </button>
                ))}
              </div>
            )}
            <div style={{ padding: 16, minHeight: 240, fontSize: 13, lineHeight: 1.7, fontFamily: "monospace", color: error ? "#f87171" : "#e8e8f0", whiteSpace: "pre-wrap" }}>
              {isLoading ? <span style={{ color: "#6b6b8a", fontStyle: "italic" }}>✦ {loadingVariants ? "Generating 3 versions…" : "Rewriting…"}</span>
                : error ? `✕ ${error}`
                : outputText || <span style={{ color: "#3a3a52", fontStyle: "italic" }}>Rewritten text will appear here</span>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40 }}>
          <button onClick={handleRewrite} disabled={isLoading || !inputText.trim()}
            style={{ background: isLoading ? "#2a2a3e" : "linear-gradient(135deg, #7c6aff, #a78bfa)", color: "white", border: "none", padding: "13px 32px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.6 : 1 }}>
            {loading ? "Rewriting…" : "✦ Rewrite Text"}
          </button>
          <button onClick={handleVariants} disabled={isLoading || !inputText.trim()}
            style={{ background: "transparent", color: isLoading ? "#3a3a52" : "#a78bfa", border: `1px solid ${isLoading ? "#1e1e2e" : "#a78bfa"}`, padding: "13px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer" }}>
            {loadingVariants ? "Generating…" : "⟳ 3 Versions"}
          </button>
        </div>

        {/* AdSense mid */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-8754288242636148" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
        </div>

        {/* SEO Content */}
        <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>What is an AI Text Rewriter?</h2>
          <p style={{ color: "#6b6b8a", lineHeight: 1.8, fontSize: 14 }}>
            An AI text rewriter is a tool that uses artificial intelligence to rewrite sentences, paragraphs, or entire documents while preserving the original meaning.
            RewordlyAI uses advanced language models to improve grammar, clarity, and tone — all in seconds.
            Whether you are a student, blogger, or business professional, our AI rewriter helps you communicate more effectively.
          </p>
        </div>

        {/* FAQ */}
        <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Frequently Asked Questions</h2>
          {[
            { q: "Is RewordlyAI free to use?", a: "Yes! RewordlyAI is completely free to use. Simply paste your text, select a tone, and click Rewrite." },
            { q: "Does it change the meaning of my text?", a: "No. Our AI is designed to preserve your original meaning 100% while improving clarity and flow." },
            { q: "What are the 4 rewriting modes?", a: "Simple (easy to read), Formal (professional), Natural (conversational), and Creative (expressive)." },
            { q: "How many words can I rewrite at once?", a: "You can rewrite up to 5000 characters per request for free." },
          ].map((faq) => (
            <div key={faq.q} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #1e1e2e" }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: "#a78bfa" }}>Q: {faq.q}</div>
              <div style={{ fontSize: 13, color: "#6b6b8a", lineHeight: 1.7 }}>A: {faq.a}</div>
            </div>
          ))}
        </div>

        {/* Other Tools */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Try Other AI Tools</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "AI Blog Writer", href: "/ai-blog-writer" },
              { label: "Grammar Checker", href: "/grammar-checker" },
              { label: "Summarizer", href: "/summarizer" },
              { label: "AI Humanizer", href: "/ai-humanizer" },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href}
                style={{ background: "#111118", border: "1px solid #1e1e2e", color: "#a78bfa", borderRadius: 8, padding: "8px 16px", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
                {tool.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 20px", textAlign: "center", marginTop: 40 }}>
        <p style={{ color: "#3a3a52", fontSize: 12, fontFamily: "monospace" }}>© {new Date().getFullYear()} bimkim · All rights reserved</p>
      </footer>
    </div>
  );
}