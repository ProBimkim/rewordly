"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

interface ParsedResult {
  answer: string | undefined;
  reason: string | undefined;
  confidence: string | undefined;
  agentInfo: string | undefined;
}

const confidenceColor: Record<string, string> = {
  High: "text-green-400",
  Medium: "text-yellow-400",
  Low: "text-red-400",
};

const confidenceBg: Record<string, string> = {
  High: "bg-green-950 border-green-800",
  Medium: "bg-yellow-950 border-yellow-800",
  Low: "bg-red-950 border-red-800",
};

export default function MCQSolverPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agentStep, setAgentStep] = useState(0);

  const agentSteps = [
    "🤖 Agent 1 (Groq) analyzing...",
    "🤖 Agent 2 (Gemini) verifying...",
    "🤖 Agent 3 cross-checking...",
    "🗳️ Counting votes & selecting majority...",
  ];

  const example = `Manakah kalimat yang menggunakan kata TIDAK baku?
A. Dia pergi ke apotek untuk membeli obat
B. Para atlet itu berlatih setiap hari
C. Kami praktek dokter di rumah sakit
D. Analisis data dilakukan secara mendalam
E. Jadwal ujian sudah ditempel di papan`;

  const handleSolve = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    setAgentStep(0);

    const interval = setInterval(() => {
      setAgentStep((s) => (s < agentSteps.length - 1 ? s + 1 : s));
    }, 1800);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tool: "mcq-solver" }),
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

  const parseResult = (text: string): ParsedResult => {
    const answerMatch = text.match(/^Answer:\s*(.+)$/m);
    const reasonMatch = text.match(/^Reason:\s*(.+)$/m);
    const confidenceMatch = text.match(/^Confidence:\s*(\w+)/m);
    const agentMatch = text.match(/Agents:\s*(.+)$/m);
    return {
      answer: answerMatch?.[1]?.trim(),
      reason: reasonMatch?.[1]?.trim(),
      confidence: confidenceMatch?.[1]?.trim(),
      agentInfo: agentMatch?.[1]?.trim(),
    };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero — distinct yellow/amber MCQ theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950/40 via-gray-950 to-orange-950/30 border-b border-gray-800">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f97316 0%, transparent 50%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 text-amber-300 text-xs px-3 py-1 rounded-full mb-5">
            🗳️ 3-Agent Majority Vote System
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            MCQ Solver
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            3 independent AI agents solve your question and vote on the answer — for maximum accuracy
          </p>
          <div className="flex justify-center gap-3 mt-5 flex-wrap text-sm">
            {[
              ["🤖", "Groq Agent"],
              ["🧠", "Gemini Agent"],
              ["✅", "Verify Agent"],
              ["🇮🇩", "Bahasa Indonesia"],
            ].map(([icon, label]) => (
              <span key={label} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Input */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-gray-400 font-medium">
              📝 Paste your MCQ question with all options
            </label>
            <button
              onClick={() => setInput(example)}
              className="text-xs text-amber-400 hover:text-amber-300 underline transition-colors"
            >
              Try Example
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Example:\nManakah yang bukan kata baku?\nA. Apotek\nB. Atlet\nC. Praktek\nD. Analisis"}
            className="w-full bg-gray-800 rounded-xl p-4 text-white placeholder-gray-500 border border-gray-700 focus:border-amber-500 focus:outline-none resize-none h-48 font-mono text-sm transition-colors"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">{input.length} characters</span>
            <button
              onClick={handleSolve}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-amber-900/20"
            >
              {loading ? "Solving..." : "Solve with 3 Agents →"}
            </button>
          </div>
        </div>

        {/* Agent progress */}
        {loading && (
          <div className="bg-gray-900 border border-amber-900/50 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="animate-spin w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full flex-shrink-0" />
              <span className="text-amber-300 font-medium">{agentSteps[agentStep]}</span>
            </div>
            {/* Progress bars */}
            <div className="flex gap-2">
              {["Groq", "Gemini", "Verify"].map((name, i) => (
                <div key={name} className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">{name}</div>
                  <div className={`h-1.5 rounded-full transition-all duration-700 ${agentStep > i ? "bg-amber-500" : agentStep === i ? "bg-amber-800 animate-pulse" : "bg-gray-800"}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-2xl p-5 mb-6 text-red-300 flex items-start gap-3">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {/* Result */}
        {result && (() => {
          const parsed = parseResult(result);
          const conf = parsed.confidence ?? "";
          return (
            <div className="space-y-4">
              {/* Answer — big and clear */}
              <div className="bg-gray-900 border border-green-700 rounded-2xl p-7 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Final Answer</div>
                <div className="text-5xl font-black text-green-400 mb-2">
                  {parsed.answer ?? "—"}
                </div>
                <div className={`inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full border text-sm font-medium ${confidenceBg[conf] ?? "bg-gray-900 border-gray-700"}`}>
                  <span className={confidenceColor[conf] ?? "text-white"}>●</span>
                  <span className={confidenceColor[conf] ?? "text-white"}>{conf} Confidence</span>
                </div>
              </div>

              {/* Reason */}
              {parsed.reason && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">📖 Explanation</div>
                  <div className="text-gray-200 leading-relaxed">{parsed.reason}</div>
                </div>
              )}

              {/* Agent votes */}
              {parsed.agentInfo && (
                <div className="bg-gray-900 border border-amber-900/40 rounded-2xl p-5">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">🤖 Agent Votes</div>
                  <div className="text-sm text-amber-300 font-mono">{parsed.agentInfo}</div>
                </div>
              )}

              {/* Full reasoning collapsible */}
              <details className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300 select-none">
                  View full reasoning ▾
                </summary>
                <pre className="mt-4 text-xs text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
                  {result}
                </pre>
              </details>
            </div>
          );
        })()}

        {/* Tips */}
        <div className="mt-10 bg-gray-900/40 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-semibold text-gray-300 mb-3">💡 Tips for best results</h3>
          <ul className="text-sm text-gray-500 space-y-1.5">
            <li>• Always include ALL answer options (A, B, C, D, E)</li>
            <li>• Works for Math, Logic, Science, and Bahasa Indonesia</li>
            <li>• 3 agents vote independently — majority wins for higher accuracy</li>
            <li>• Agents are specially trained to detect &quot;Kecuali/Bukan/Except&quot; traps</li>
          </ul>
        </div>
      </div>
    </div>
  );
}