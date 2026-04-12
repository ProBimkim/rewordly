"use client";

import { useState } from "react";

const MODES = [
  { id: "simple", label: "Simple", icon: "◎", desc: "Clear & easy to read", color: "#4ade80" },
  { id: "formal", label: "Formal", icon: "◈", desc: "Professional & polished", color: "#60a5fa" },
  { id: "natural", label: "Natural", icon: "◉", desc: "Conversational & warm", color: "#f59e0b" },
  { id: "creative", label: "Creative", icon: "◇", desc: "Vivid & expressive", color: "#a78bfa" },
];

type HistoryItem = {
  id: number;
  mode: string;
  input: string;
  output: string;
  time: string;
};

export default function Home() {
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
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const activeMode = MODES.find((m) => m.id === selectedMode)!;

  const addToHistory = (input: string, output: string, mode: string) => {
    const item: HistoryItem = {
      id: Date.now(),
      mode,
      input: input.slice(0, 80) + (input.length > 80 ? "…" : ""),
      output: output.slice(0, 80) + (output.length > 80 ? "…" : ""),
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    setHistory(prev => [item, ...prev].slice(0, 20));
  };

  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError("");
    setOutputText("");
    setVariants([]);

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode: selectedMode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutputText(data.result);
      addToHistory(inputText, data.result, selectedMode);
    } catch (e: any) {
      setError(e.message);
    } finally {
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
      addToHistory(inputText, data.variants[0], selectedMode);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingVariants(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHistoryClick = (item: HistoryItem) => {
    setInputText(item.input.replace("…", ""));
    setOutputText(item.output.replace("…", ""));
    setSelectedMode(item.mode);
    setShowHistory(false);
  };

  const isLoading = loading || loadingVariants;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "sans-serif" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1e1e2e", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #7c6aff, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Rewordly</div>
            <div style={{ fontSize: 10, color: "#6b6b8a", letterSpacing: "0.08em", textTransform: "uppercase" }}>AI Text Rewriter</div>
          </div>
        </div>
        <button onClick={() => setShowHistory(!showHistory)}
          style={{ background: showHistory ? "rgba(124,106,255,0.15)" : "none", border: "1px solid #1e1e2e", color: showHistory ? "#a78bfa" : "#6b6b8a", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🕐 History {history.length > 0 && `(${history.length})`}
        </button>
      </header>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>

        {/* History Panel */}
        {showHistory && (
          <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e1e2e", fontSize: 12, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Recent Rewrites</span>
              {history.length > 0 && (
                <button onClick={() => setHistory([])} style={{ background: "none", border: "none", color: "#f87171", fontSize: 11, cursor: "pointer" }}>Clear all</button>
              )}
            </div>
            {history.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center", color: "#3a3a52", fontSize: 13 }}>No history yet</div>
            ) : (
              history.map((item) => {
                const mode = MODES.find(m => m.id === item.mode);
                return (
                  <div key={item.id} onClick={() => handleHistoryClick(item)}
                    style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a28", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#16161f")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: mode?.color || "#6b6b8a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{mode?.icon} {item.mode}</span>
                      <span style={{ fontSize: 11, color: "#3a3a52" }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6b6b8a", marginBottom: 2 }}>In: {item.input}</div>
                    <div style={{ fontSize: 12, color: "#e8e8f0" }}>Out: {item.output}</div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Rewrite any text,{" "}
            <span style={{ background: "linear-gradient(90deg, #7c6aff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>instantly.</span>
          </h1>
          <p style={{ color: "#6b6b8a", fontSize: 15 }}>Paste your text, choose a tone, get a polished rewrite.</p>
        </div>

        {/* Mode Selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
          {MODES.map((mode) => (
            <button key={mode.id} onClick={() => setSelectedMode(mode.id)}
              style={{ padding: "12px", borderRadius: 10, cursor: "pointer", textAlign: "left", border: `2px solid ${selectedMode === mode.id ? mode.color : "#1e1e2e"}`, background: selectedMode === mode.id ? `rgba(255,255,255,0.04)` : "#111118", color: "#e8e8f0", transition: "all 0.2s" }}>
              <div style={{ fontSize: 18, color: selectedMode === mode.id ? mode.color : "#3a3a52" }}>{mode.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4, color: selectedMode === mode.id ? mode.color : "#e8e8f0" }}>{mode.label}</div>
              <div style={{ fontSize: 11, color: "#6b6b8a", marginTop: 2 }}>{mode.desc}</div>
            </button>
          ))}
        </div>

        {/* Text Panels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {/* Input */}
          <div style={{ background: "#111118", border: "1.5px solid #1e1e2e", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Input</span>
              <span style={{ fontSize: 11, color: charCount > 4500 ? "#f87171" : "#3a3a52" }}>{charCount}/5000</span>
            </div>
            <textarea value={inputText}
              onChange={(e) => { setInputText(e.target.value); setCharCount(e.target.value.length); }}
              maxLength={5000}
              placeholder="Paste or type your text here…"
              style={{ width: "100%", minHeight: 240, background: "transparent", border: "none", outline: "none", color: "#e8e8f0", padding: 16, fontSize: 13, lineHeight: 1.7, resize: "none", fontFamily: "monospace" }} />
          </div>

          {/* Output */}
          <div style={{ background: "#111118", border: "1.5px solid #1e1e2e", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#6b6b8a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Output · {activeMode.label}</span>
              {outputText && (
                <button onClick={() => handleCopy(outputText)}
                  style={{ background: "none", border: "1px solid #1e1e2e", color: copied ? "#4ade80" : "#6b6b8a", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              )}
            </div>

            {/* Variant tabs */}
            {variants.length > 1 && (
              <div style={{ display: "flex", gap: 4, padding: "8px 16px", borderBottom: "1px solid #1e1e2e" }}>
                {variants.map((_, i) => (
                  <button key={i} onClick={() => { setSelectedVariant(i); setOutputText(variants[i]); }}
                    style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", border: `1px solid ${selectedVariant === i ? activeMode.color : "#1e1e2e"}`, background: selectedVariant === i ? `rgba(255,255,255,0.05)` : "transparent", color: selectedVariant === i ? activeMode.color : "#6b6b8a" }}>
                    Version {i + 1}
                  </button>
                ))}
              </div>
            )}

            <div style={{ padding: 16, minHeight: 240, fontSize: 13, lineHeight: 1.7, fontFamily: "monospace", color: error ? "#f87171" : "#e8e8f0", whiteSpace: "pre-wrap" }}>
              {isLoading
                ? <span style={{ color: "#6b6b8a", fontStyle: "italic" }}>✦ {loadingVariants ? "Generating 3 versions…" : "Rewriting…"}</span>
                : error ? `✕ ${error}`
                : outputText || <span style={{ color: "#3a3a52", fontStyle: "italic" }}>Rewritten text will appear here</span>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <button onClick={handleRewrite} disabled={isLoading || !inputText.trim()}
            style={{ background: isLoading ? "#2a2a3e" : "linear-gradient(135deg, #7c6aff, #a78bfa)", color: "white", border: "none", padding: "13px 32px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.6 : 1 }}>
            {loading ? "Rewriting…" : "✦ Rewrite Text"}
          </button>
          <button onClick={handleVariants} disabled={isLoading || !inputText.trim()}
            style={{ background: "transparent", color: isLoading ? "#3a3a52" : "#a78bfa", border: `1px solid ${isLoading ? "#1e1e2e" : "#a78bfa"}`, padding: "13px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.5 : 1 }}>
            {loadingVariants ? "Generating…" : "⟳ 3 Versions"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1e1e2e", marginTop: 60, padding: "20px 0", textAlign: "center" }}>
        <p style={{ color: "#3a3a52", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.08em", userSelect: "none" }}>
          © {new Date().getFullYear()} bimkim · All rights reserved
        </p>
      </footer>

    </div>
  );
}