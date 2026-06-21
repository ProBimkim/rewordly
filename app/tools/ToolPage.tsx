"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export interface ToolConfig {
  toolId: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  tags: string[];
  placeholder: string;
  inputLabel: string;
  buttonLabel?: string;
}

interface ToolPageProps {
  config: ToolConfig;
}

export default function ToolPage({ config }: ToolPageProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const agentSteps = [
    "🤖 Groq Agent processing...",
    "🧠 Gemini Agent verifying...",
    "⚡ OpenRouter cross-checking...",
    "🗳️ Selecting best result...",
  ];

  const handleSubmit = async () => {
    if (input.trim().length < 5) return;
    setLoading(true);
    setResult("");
    setError("");
    setAgentStep(0);

    const interval = setInterval(() => {
      setAgentStep((s) => (s < agentSteps.length - 1 ? s + 1 : s));
    }, 1800);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tool: config.toolId }),
      });
      const data = await res.json();
      if (data.error) setError(data.error as string);
      else setResult(data.result as string);
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setAgentStep(0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ac = config.accentColor;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#e8e6f0" }}>
      <Navbar />

      {/* Hero */}
      <div className="cyber-grid-bg" style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #2a254520",
        padding: "48px 20px 40px", textAlign: "center",
        background: `radial-gradient(ellipse at 50% 0%, ${ac}12 0%, transparent 60%), #0a0a12`,
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="cyber-badge" style={{
            marginBottom: 20,
            background: `${ac}15`, borderColor: `${ac}30`, color: ac,
          }}>
            🤖 3-Agent Verified · Groq · Gemini · OpenRouter
            {config.badge && (
              <span style={{
                background: `${ac}20`, border: `1px solid ${ac}40`,
                color: ac, fontSize: 10, fontWeight: 700,
                padding: "1px 6px", borderRadius: 6, marginLeft: 4,
              }}>{config.badge}</span>
            )}
          </div>

          <h1 className="hero-title" style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 44, fontWeight: 900, marginBottom: 12,
            background: `linear-gradient(135deg, #e8e6f0 0%, ${config.gradientFrom} 50%, ${config.gradientTo} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {config.icon} {config.title}
          </h1>

          <p style={{ color: "#8b85a8", fontSize: 15, maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.7 }}>
            {config.description}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {["Groq Llama 3.3 70B", "Gemini 2.0 Flash", "OpenRouter Free", ...config.tags].map((tag) => (
              <span key={tag} className="cyber-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>

        {/* Agent progress */}
        {loading && (
          <div style={{
            background: "#13111f", border: `1px solid ${ac}30`,
            borderRadius: 14, padding: "14px 18px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${ac}`, borderTopColor: "transparent",
              animation: "spin 0.7s linear infinite", flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: ac, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
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
                      height: 3, borderRadius: 2, transition: "all 0.4s",
                      background: agentStep > i ? a.color : agentStep === i ? a.color + "60" : "#1e1b35",
                      boxShadow: agentStep > i ? `0 0 6px ${a.color}60` : "none",
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{
          background: "#13111f",
          border: `1px solid ${loading || input.length > 0 ? ac + "25" : "#2a254530"}`,
          borderRadius: 16, overflow: "hidden", marginBottom: 12,
          transition: "border-color 0.3s",
        }}>
          <div style={{
            padding: "10px 16px", borderBottom: "1px solid #2a254520",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{
              fontSize: 11, color: "#5a5477",
              textTransform: "uppercase", letterSpacing: "0.1em",
              fontWeight: 600, fontFamily: "'Orbitron', monospace",
            }}>{config.inputLabel}</span>
            <span style={{ fontSize: 11, color: input.length > 9000 ? "#ff1744" : "#5a5477" }}>
              {input.length} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            className="cyber-textarea"
            style={{ minHeight: 180 }}
          />
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button
            onClick={handleSubmit}
            disabled={loading || input.trim().length < 5}
            className="cyber-btn"
            style={{
              background: loading || input.trim().length < 5
                ? "#1e1b35"
                : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              color: loading || input.trim().length < 5 ? "#5a5477" : "white",
              padding: "13px 32px",
              boxShadow: loading || input.trim().length < 5 ? "none" : `0 0 20px ${ac}30`,
            }}
          >
            {loading ? "Processing..." : (config.buttonLabel ?? `Run ${config.title} →`)}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#ff174410", border: "1px solid #ff174430",
            borderRadius: 14, padding: "14px 18px", marginBottom: 16,
            color: "#ff6b6b", fontSize: 14,
            display: "flex", gap: 8, alignItems: "center",
          }}>
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{
            background: "#13111f", border: `1px solid ${ac}25`,
            borderRadius: 16, overflow: "hidden",
          }}>
            <div style={{
              height: 2,
              background: `linear-gradient(90deg, transparent, ${config.gradientFrom}, ${config.gradientTo}, transparent)`,
            }} />
            <div style={{
              padding: "10px 16px", borderBottom: "1px solid #2a254520",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 11, color: "#5a5477",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  fontWeight: 600, fontFamily: "'Orbitron', monospace",
                }}>Result</span>
                <span style={{
                  background: `${ac}15`, border: `1px solid ${ac}30`,
                  color: ac, fontSize: 10, fontWeight: 700,
                  padding: "1px 8px", borderRadius: 6,
                }}>✓ 3-agent verified</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => { setResult(""); setInput(""); }}
                  style={{
                    background: "none", border: "1px solid #2a2545",
                    color: "#5a5477", borderRadius: 8,
                    padding: "4px 10px", fontSize: 12, cursor: "pointer",
                  }}>🔄 Reset</button>
                <button onClick={handleCopy}
                  style={{
                    background: copied ? "#39ff1410" : "none",
                    border: `1px solid ${copied ? "#39ff14" : "#2a2545"}`,
                    color: copied ? "#39ff14" : "#8b85a8",
                    borderRadius: 8, padding: "4px 10px",
                    fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                  }}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>
            <div style={{
              padding: "18px 16px", fontSize: 14,
              lineHeight: 1.8, color: "#e8e6f0", whiteSpace: "pre-wrap",
            }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}