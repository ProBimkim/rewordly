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
  accentColor: string; // hex color for glow e.g. "#7c3aed"
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
    "⚡ OpenRouter Agent cross-checking...",
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero — consistent with MCQ solver style */}
      <div
        className="relative overflow-hidden border-b border-gray-800"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${config.accentColor}20 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, ${config.accentColor}10 0%, transparent 55%), #030712`,
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          {config.badge && (
            <div
              className="inline-flex items-center gap-2 border text-xs px-3 py-1 rounded-full mb-5"
              style={{
                backgroundColor: config.accentColor + "20",
                borderColor: config.accentColor + "40",
                color: config.accentColor,
              }}
            >
              🤖 3-Agent Verified · {config.badge}
            </div>
          )}
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {config.icon} {config.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{config.description}</p>
          <div className="flex justify-center gap-3 mt-5 flex-wrap text-sm">
            {["🤖 Groq", "🧠 Gemini", "⚡ OpenRouter", ...config.tags].map((tag) => (
              <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Input card */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <label className="text-sm text-gray-400 font-medium mb-3 block">{config.inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            className="w-full bg-gray-800 rounded-xl p-4 text-white placeholder-gray-500 border border-gray-700 focus:outline-none resize-none h-44 transition-all"
            style={{
              borderColor: input.length > 10 ? config.accentColor + "60" : undefined,
            }}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">{input.length} characters</span>
            <button
              onClick={handleSubmit}
              disabled={loading || input.trim().length < 5}
              className="px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white"
              style={{
                background:
                  loading || input.trim().length < 5
                    ? "#374151"
                    : `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {loading ? "Processing..." : (config.buttonLabel ?? `Run ${config.title} →`)}
            </button>
          </div>
        </div>

        {/* Agent progress */}
        {loading && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="animate-spin w-5 h-5 border-2 border-t-transparent rounded-full flex-shrink-0"
                style={{ borderColor: config.accentColor, borderTopColor: "transparent" }}
              />
              <span className="font-medium" style={{ color: config.accentColor }}>
                {agentSteps[agentStep]}
              </span>
            </div>
            <div className="flex gap-2">
              {["Groq", "Gemini", "OpenRouter"].map((name, i) => (
                <div key={name} className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">{name}</div>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      backgroundColor:
                        agentStep > i ? config.accentColor : agentStep === i ? config.accentColor + "60" : "#1f2937",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-2xl p-5 mb-6 text-red-300 flex items-start gap-3">
            <span className="flex-shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-200">✅ Result</span>
                <span className="text-xs text-gray-600">· 3-agent verified</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setResult(""); setInput(""); }}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1.5 rounded-lg transition-colors"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors text-white"
                  style={{ backgroundColor: copied ? "#065f46" : config.accentColor + "aa" }}
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{result}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}