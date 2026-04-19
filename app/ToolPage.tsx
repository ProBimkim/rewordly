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
  const glow = ac + "22";

  return (
    <div style={{ minHeight: "100vh", background: "#070711", color: "#e2e8f0" }}>
      <Navbar />

      {/* Hero Header — same style as AI Rewriter */}
      <div style={{
        borderBottom: "1px solid #ffffff0a",
        padding: "48px 24px 40px",
        textAlign: "center",
        background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 60%)`,
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#ffffff08", border: "1px solid #ffffff15",
          borderRadius: 20, padding: "4px 14px", fontSize: 12,
          color: ac, marginBottom: 20,
        }}>
          🤖 3-Agent Verified · Groq · Gemini · OpenRouter
          {config.badge && (
            <span style={{
              background: ac + "25", border: `1px solid ${ac}50`,
              color: ac, fontSize: 10, fontWeight: 700,
              padding: "1px 6px", borderRadius: 4, marginLeft: 4,
            }}>
              {config.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 48,
          fontWeight: 900,
          marginBottom: 12,
          letterSpacing: "-0.02em",
          background: `linear-gradient(135deg, #e2e8f0 0%, ${config.gradientFrom} 50%, ${config.gradientTo} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {config.icon} {config.title}
        </h1>

        {/* Description */}
        <p style={{
          color: "#6b7280",
          fontSize: 16,
          maxWidth: 520,
          margin: "0 auto 20px",
          lineHeight: 1.6,
        }}>
          {config.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {["Groq Llama 3.3 70B", "Gemini 2.0 Flash", "OpenRouter Free", ...config.tags].map((tag) => (
            <span key={tag} style={{
              background: "#ffffff08",
              border: "1px solid #ffffff12",
              color: "#9ca3af",
              fontSize: 12,
              padding: "3px 10px",
              borderRadius: 20,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>

        {/* Agent progress */}
        {loading && (
          <div style={{
            background: "#0d0d1a",
            border: `1px solid ${ac}40`,
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${ac}`,
              borderTopColor: "transparent",
              animation: "spin 0.7s linear infinite",
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: ac, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                {agentSteps[agentStep]}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Groq", "Gemini", "OpenRouter"].map((name, i) => (
                  <div key={name} style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 3 }}>{name}</div>
                    <div style={{
                      height: 3, borderRadius: 2, transition: "all 0.4s",
                      background: agentStep > i ? ac : agentStep === i ? ac + "60" : "#1f2937",
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{
          background: "#0d0d1a",
          border: `1px solid ${loading || input.length > 0 ? ac + "30" : "#ffffff0f"}`,
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 12,
          transition: "border-color 0.3s",
        }}>
          <div style={{
            padding: "10px 16px",
            borderBottom: "1px solid #ffffff08",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase" as const, letterSpacing: "0.1em", fontWeight: 600 }}>
              {config.inputLabel}
            </span>
            <span style={{ fontSize: 11, color: input.length > 9000 ? "#ef4444" : "#374151" }}>
              {input.length} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            style={{
              width: "100%",
              minHeight: 180,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e2e8f0",
              padding: "16px",
              fontSize: 14,
              lineHeight: 1.75,
              resize: "vertical" as const,
              fontFamily: "system-ui, sans-serif",
            }}
          />
        </div>

        {/* Submit button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button
            onClick={handleSubmit}
            disabled={loading || input.trim().length < 5}
            style={{
              background: loading || input.trim().length < 5
                ? "#1f2937"
                : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              color: loading || input.trim().length < 5 ? "#374151" : "white",
              border: "none",
              padding: "13px 32px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              cursor: loading || input.trim().length < 5 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: loading || input.trim().length < 5 ? "none" : `0 0 20px ${glow}`,
            }}
          >
            {loading ? "Processing..." : (config.buttonLabel ?? `Run ${config.title} →`)}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#1c0a0a",
            border: "1px solid #7f1d1d",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 16,
            color: "#fca5a5",
            fontSize: 14,
            display: "flex",
            gap: 8,
          }}>
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{
            background: "#0d0d1a",
            border: `1px solid ${ac}30`,
            borderRadius: 16,
            overflow: "hidden",
          }}>
            {/* Top accent line */}
            <div style={{
              height: 2,
              background: `linear-gradient(90deg, ${config.gradientFrom}00, ${config.gradientFrom}, ${config.gradientTo}, ${config.gradientTo}00)`,
            }} />
            <div style={{
              padding: "10px 16px",
              borderBottom: "1px solid #ffffff08",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase" as const, letterSpacing: "0.1em", fontWeight: 600 }}>
                  Result
                </span>
                <span style={{
                  background: ac + "20", border: `1px solid ${ac}40`,
                  color: ac, fontSize: 10, fontWeight: 700,
                  padding: "1px 6px", borderRadius: 4,
                }}>
                  ✓ 3-agent verified
                </span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => { setResult(""); setInput(""); }}
                  style={{
                    background: "none", border: "1px solid #1f2937",
                    color: "#6b7280", borderRadius: 6,
                    padding: "4px 10px", fontSize: 12, cursor: "pointer",
                  }}
                >
                  🔄 Reset
                </button>
                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? "#065f4620" : "none",
                    border: `1px solid ${copied ? "#4ade80" : "#1f2937"}`,
                    color: copied ? "#4ade80" : "#6b7280",
                    borderRadius: 6, padding: "4px 10px",
                    fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>
            <div style={{
              padding: "18px 16px",
              fontSize: 14,
              lineHeight: 1.8,
              color: "#e2e8f0",
              whiteSpace: "pre-wrap",
            }}>
              {result}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea::placeholder { color: #374151; }
      `}</style>
    </div>
  );
}