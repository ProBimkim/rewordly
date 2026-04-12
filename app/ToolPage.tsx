"use client";
import { useState } from "react";
import Link from "next/link";

interface ToolPageProps {
  toolId: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  placeholder: string;
  outputLabel: string;
  faqs: { q: string; a: string }[];
  relatedTools: { label: string; href: string }[];
}

export default function ToolPage({
  toolId, title, icon, color, description,
  placeholder, outputLabel, faqs, relatedTools
}: ToolPageProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    setLoading(true); setError(""); setOutputText("");
    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, tool: toolId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutputText(data.result);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
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
          <img src="/logo-icon.jpeg" alt="RewordlyAI" width={32} height={32} style={{ borderRadius: 8, objectFit: "contain" }} />
          <span style={{ fontWeight: 700, fontSize: 16, background: "linear-gradient(90deg, #7c6aff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RewordlyAI</span>
        </Link>
        <Link href="/" style={{ color: "#6b6b8a", textDecoration: "none", fontSize: 14 }}>← All Tools</Link>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{icon}</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, color }}>{title}</h1>
          <p style={{ color: "#6b6b8a", fontSize: 14, lineHeight: 1.7 }}>{description}</p>
        </div>

        {/* Input */}
        <div style={{ background: "#111118", border: "1.5px solid #1e1e2e", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "#6b6b8a", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Your Input</span>
            <span style={{ fontSize: 11, color: "#3a3a52" }}>{inputText.length}/5000</span>
          </div>
          <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} maxLength={5000}
            placeholder={placeholder}
            style={{ width: "100%", minHeight: 180, background: "transparent", border: "none", outline: "none", color: "#e8e8f0", padding: 16, fontSize: 13, lineHeight: 1.7, resize: "none", fontFamily: "monospace" }} />
        </div>

        {/* Button */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <button onClick={handleSubmit} disabled={loading || !inputText.trim()}
            style={{ background: loading ? "#2a2a3e" : `linear-gradient(135deg, ${color}, #7c6aff)`, color: "white", border: "none", padding: "13px 40px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
            {loading ? "⏳ Processing…" : `${icon} Run ${title}`}
          </button>
        </div>

        {/* Output */}
        <div style={{ background: "#111118", border: `1.5px solid ${outputText ? color : "#1e1e2e"}`, borderRadius: 12, overflow: "hidden", marginBottom: 32 }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#6b6b8a", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{outputLabel}</span>
            {outputText && (
              <button onClick={handleCopy} style={{ background: "none", border: "1px solid #1e1e2e", color: copied ? "#4ade80" : "#6b6b8a", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            )}
          </div>
          <div style={{ padding: 16, minHeight: 180, fontSize: 13, lineHeight: 1.8, fontFamily: "monospace", whiteSpace: "pre-wrap", color: error ? "#f87171" : "#e8e8f0" }}>
            {loading
              ? <span style={{ color: "#6b6b8a", fontStyle: "italic" }}>✦ AI is working…</span>
              : error ? `✕ ${error}`
              : outputText || <span style={{ color: "#3a3a52", fontStyle: "italic" }}>Result will appear here</span>}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #1e1e2e" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color }}>{faq.q}</div>
              <div style={{ fontSize: 13, color: "#6b6b8a", lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
        </div>

        {/* Related Tools */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Try Other Tools</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href}
                style={{ background: "#111118", border: "1px solid #1e1e2e", color: "#a78bfa", borderRadius: 8, padding: "8px 16px", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
                {tool.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #1e1e2e", padding: "24px 20px", textAlign: "center", marginTop: 40 }}>
        <p style={{ color: "#3a3a52", fontSize: 12, fontFamily: "monospace" }}>© {new Date().getFullYear()} bimkim · All rights reserved</p>
      </footer>
    </div>
  );
}