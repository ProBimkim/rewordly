"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

interface AgentDetail {
  name: string;
  model: string;
  answer: string | null;
  reason: string | null;
  status: string;
  icon: string;
}

interface MCQResponse {
  result: string;
  agentDetails?: AgentDetail[];
  consensus?: string;
  confidence?: string;
  voteCount?: number;
  totalVotes?: number;
  error?: string;
}

const confidenceConfig: Record<string, { color: string; bg: string; border: string }> = {
  High: { color: "#39ff14", bg: "#39ff1410", border: "#39ff1430" },
  Medium: { color: "#ffab00", bg: "#ffab0010", border: "#ffab0030" },
  Low: { color: "#ff1744", bg: "#ff174410", border: "#ff174430" },
};

const agentColors: Record<string, string> = {
  Groq: "#a855f7",
  Gemini: "#00e5ff",
  OpenRouter: "#39ff14",
};

export default function MCQSolverPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<MCQResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agentStep, setAgentStep] = useState(0);

  const agentSteps = [
    "🤖 Agent 1 (Groq Llama 3.3) analyzing...",
    "🧠 Agent 2 (Gemini 2.0 Flash) verifying...",
    "⚡ Agent 3 (OpenRouter) cross-checking...",
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
    setResponse(null);
    setAgentStep(0);

    const interval = setInterval(() => {
      setAgentStep((s) => (s < agentSteps.length - 1 ? s + 1 : s));
    }, 2000);

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tool: "mcq-solver" }),
      });
      const data: MCQResponse = await res.json();
      if (data.error) setError(data.error);
      else setResponse(data);
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setAgentStep(0);
    }
  };

  const parseResult = (text: string) => {
    const answerMatch = text.match(/^Answer:\s*(.+)$/m);
    const reasonMatch = text.match(/^Reason:\s*(.+)$/m);
    const confidenceMatch = text.match(/^Confidence:\s*(\w+)/m);
    return {
      answer: answerMatch?.[1]?.trim(),
      reason: reasonMatch?.[1]?.trim(),
      confidence: confidenceMatch?.[1]?.trim(),
    };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#e8e6f0" }}>
      <Navbar />

      {/* Hero */}
      <div className="cyber-grid-bg" style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #2a254520",
        background: "radial-gradient(ellipse at 20% 50%, #ffab0012 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #a855f710 0%, transparent 50%), #0a0a12",
      }}>
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 800, margin: "0 auto",
          padding: "48px 20px", textAlign: "center",
        }}>
          <div className="cyber-badge" style={{
            marginBottom: 20,
            background: "#ffab0015", borderColor: "#ffab0030", color: "#ffab00",
          }}>
            <span>🗳️</span> 3-Agent Majority Vote System (MCP)
          </div>

          <h1 className="hero-title" style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 44, fontWeight: 900, marginBottom: 16,
            background: "linear-gradient(135deg, #ffab00, #e040fb, #a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            MCQ Solver
          </h1>

          <p style={{ color: "#8b85a8", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            3 independent AI agents solve your question and <strong style={{ color: "#ffab00" }}>vote on the answer</strong> — for maximum accuracy
          </p>

          <div style={{
            display: "flex", justifyContent: "center", gap: 10,
            marginTop: 20, flexWrap: "wrap",
          }}>
            {[
              ["🤖", "Groq Agent", "#a855f7"],
              ["🧠", "Gemini Agent", "#00e5ff"],
              ["⚡", "OpenRouter Agent", "#39ff14"],
              ["🇮🇩", "Bahasa Indonesia", "#8b85a8"],
            ].map(([icon, label, color]) => (
              <span key={label as string} className="cyber-tag" style={{
                borderColor: (color as string) + "30",
                color: color as string,
              }}>
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        {/* Input Card */}
        <div style={{
          background: "#13111f", borderRadius: 16,
          border: "1px solid #2a2545", padding: "24px",
          marginBottom: 20,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 12,
          }}>
            <label style={{ fontSize: 13, color: "#8b85a8", fontWeight: 500 }}>
              📝 Paste your MCQ question with all options
            </label>
            <button
              onClick={() => setInput(example)}
              style={{
                background: "none", border: "none",
                color: "#ffab00", fontSize: 12, cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Try Example
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Example:\nManakah yang bukan kata baku?\nA. Apotek\nB. Atlet\nC. Praktek\nD. Analisis"}
            className="cyber-textarea"
            style={{
              background: "#0d0b1a",
              border: "1px solid #2a2545",
              borderRadius: 12,
              height: 200,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
            }}
          />

          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginTop: 12,
          }}>
            <span style={{ fontSize: 12, color: "#5a5477" }}>{input.length} characters</span>
            <button
              onClick={handleSolve}
              disabled={loading || !input.trim()}
              className="cyber-btn"
              style={{
                background: loading || !input.trim()
                  ? "#1e1b35"
                  : "linear-gradient(135deg, #ffab00, #e040fb)",
                color: loading || !input.trim() ? "#5a5477" : "white",
                padding: "12px 28px",
                fontSize: 14,
              }}
            >
              {loading ? "Solving..." : "Solve with 3 Agents →"}
            </button>
          </div>
        </div>

        {/* Agent Progress */}
        {loading && (
          <div style={{
            background: "#13111f",
            border: "1px solid #ffab0030",
            borderRadius: 16, padding: "20px 24px",
            marginBottom: 20,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                border: "2px solid #ffab00",
                borderTopColor: "transparent",
                animation: "spin 0.7s linear infinite",
                flexShrink: 0,
              }} />
              <span style={{ color: "#ffab00", fontWeight: 600, fontSize: 14 }}>
                {agentSteps[agentStep]}
              </span>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {[
                { name: "Groq", color: "#a855f7" },
                { name: "Gemini", color: "#00e5ff" },
                { name: "OpenRouter", color: "#39ff14" },
              ].map((agent, i) => (
                <div key={agent.name} style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: agent.color, marginBottom: 6, fontWeight: 500 }}>
                    {agent.name}
                  </div>
                  <div style={{
                    height: 4, borderRadius: 2,
                    background: agentStep > i
                      ? agent.color
                      : agentStep === i
                        ? agent.color + "60"
                        : "#1e1b35",
                    transition: "all 0.5s ease",
                    boxShadow: agentStep > i ? `0 0 8px ${agent.color}60` : "none",
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#ff174410", border: "1px solid #ff174430",
            borderRadius: 16, padding: "16px 20px",
            marginBottom: 20, color: "#ff6b6b",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <span style={{ fontSize: 14 }}>{error}</span>
          </div>
        )}

        {/* Result */}
        {response && (() => {
          const parsed = parseResult(response.result);
          const conf = response.confidence || parsed.confidence || "";
          const confStyle = confidenceConfig[conf] || { color: "#8b85a8", bg: "#13111f", border: "#2a2545" };

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Final Answer — Big display */}
              <div style={{
                background: "#13111f",
                border: `1px solid ${confStyle.border}`,
                borderRadius: 20, padding: "32px 24px",
                textAlign: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, transparent, ${confStyle.color}, transparent)`,
                  boxShadow: `0 0 20px ${confStyle.color}40`,
                }} />

                <div style={{
                  fontSize: 11, color: "#5a5477",
                  textTransform: "uppercase", letterSpacing: "0.15em",
                  marginBottom: 16,
                  fontFamily: "'Orbitron', monospace",
                }}>
                  Final Answer
                </div>

                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 56, fontWeight: 900,
                  color: confStyle.color,
                  textShadow: `0 0 20px ${confStyle.color}40`,
                  marginBottom: 12,
                  lineHeight: 1,
                }}>
                  {parsed.answer || response.consensus || "—"}
                </div>

                {/* Confidence badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: confStyle.bg,
                  border: `1px solid ${confStyle.border}`,
                  padding: "6px 16px", borderRadius: 20,
                  fontSize: 13, fontWeight: 600,
                  color: confStyle.color,
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: confStyle.color,
                    boxShadow: `0 0 8px ${confStyle.color}`,
                  }} />
                  {conf} Confidence
                  {response.voteCount && response.totalVotes && (
                    <span style={{ color: "#5a5477", fontSize: 12 }}>
                      ({response.voteCount}/{response.totalVotes} agents agree)
                    </span>
                  )}
                </div>
              </div>

              {/* 3-Agent MCP Cards */}
              {response.agentDetails && response.agentDetails.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 12, color: "#8b85a8",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    marginBottom: 12,
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 600,
                  }}>
                    🔗 MCP Agent Responses
                  </div>

                  <div className="grid-agents">
                    {response.agentDetails.map((agent) => {
                      const color = agentColors[agent.name] || "#8b85a8";
                      const isWinner = agent.answer === response.consensus;

                      return (
                        <div key={agent.name} style={{
                          background: "#13111f",
                          border: `1px solid ${isWinner ? color + "50" : "#2a254530"}`,
                          borderRadius: 16, padding: "20px",
                          position: "relative", overflow: "hidden",
                          transition: "all 0.3s",
                        }}>
                          {/* Top accent */}
                          <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: 2,
                            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                            opacity: isWinner ? 1 : 0.3,
                          }} />

                          {/* Agent header */}
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            marginBottom: 16,
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{ fontSize: 22 }}>{agent.icon}</span>
                              <div>
                                <div style={{
                                  fontWeight: 700, fontSize: 14, color: "#e8e6f0",
                                  fontFamily: "'Orbitron', monospace",
                                }}>{agent.name}</div>
                                <div style={{ fontSize: 11, color: "#5a5477" }}>{agent.model}</div>
                              </div>
                            </div>

                            {agent.status === "failed" ? (
                              <span style={{
                                fontSize: 10, padding: "2px 8px", borderRadius: 6,
                                background: "#ff174420", border: "1px solid #ff174440",
                                color: "#ff6b6b",
                              }}>OFFLINE</span>
                            ) : isWinner ? (
                              <span style={{
                                fontSize: 10, padding: "2px 8px", borderRadius: 6,
                                background: `${color}20`, border: `1px solid ${color}40`,
                                color: color, fontWeight: 700,
                              }}>✓ WINNER</span>
                            ) : null}
                          </div>

                          {/* Agent answer */}
                          <div style={{
                            background: "#0a0a12", borderRadius: 12,
                            padding: "16px", textAlign: "center",
                            border: `1px solid ${isWinner ? color + "30" : "#2a254520"}`,
                            marginBottom: agent.reason ? 12 : 0,
                          }}>
                            <div style={{ fontSize: 11, color: "#5a5477", marginBottom: 6 }}>
                              ANSWER
                            </div>
                            <div style={{
                              fontFamily: "'Orbitron', monospace",
                              fontSize: 32, fontWeight: 900,
                              color: agent.answer ? color : "#5a5477",
                              textShadow: agent.answer ? `0 0 10px ${color}30` : "none",
                            }}>
                              {agent.answer || "—"}
                            </div>
                          </div>

                          {/* Agent reason */}
                          {agent.reason && (
                            <div style={{
                              fontSize: 12, color: "#8b85a8",
                              lineHeight: 1.6,
                              borderTop: "1px solid #2a254520",
                              paddingTop: 12,
                            }}>
                              {agent.reason}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Explanation */}
              {parsed.reason && (
                <div style={{
                  background: "#13111f", border: "1px solid #2a2545",
                  borderRadius: 16, padding: "20px 24px",
                }}>
                  <div style={{
                    fontSize: 12, color: "#8b85a8",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    marginBottom: 10, fontWeight: 600,
                  }}>📖 Explanation</div>
                  <div style={{ color: "#e8e6f0", lineHeight: 1.7, fontSize: 14 }}>
                    {parsed.reason}
                  </div>
                </div>
              )}

              {/* Full reasoning collapsible */}
              <details style={{
                background: "#0d0b1a", border: "1px solid #2a254520",
                borderRadius: 16, padding: "16px 20px",
              }}>
                <summary style={{
                  cursor: "pointer", fontSize: 13,
                  color: "#5a5477", userSelect: "none",
                }}>
                  View full reasoning ▾
                </summary>
                <pre style={{
                  marginTop: 16, fontSize: 12,
                  color: "#8b85a8", whiteSpace: "pre-wrap",
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1.7,
                }}>
                  {response.result}
                </pre>
              </details>
            </div>
          );
        })()}

        {/* Tips */}
        <div style={{
          marginTop: 32,
          background: "#13111f", borderRadius: 16,
          border: "1px solid #2a254520",
          padding: "24px",
        }}>
          <h3 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 14, fontWeight: 700,
            color: "#c084fc", marginBottom: 16,
          }}>💡 Tips for best results</h3>
          <ul style={{
            fontSize: 13, color: "#8b85a8",
            display: "flex", flexDirection: "column",
            gap: 8, listStyle: "none",
          }}>
            {[
              "Always include ALL answer options (A, B, C, D, E)",
              "Works for Math, Logic, Science, and Bahasa Indonesia",
              "3 agents vote independently — majority wins for higher accuracy",
              "Agents detect \"Kecuali/Bukan/Except\" trap questions automatically",
              "Each agent uses different AI model for unbiased verification",
            ].map((tip) => (
              <li key={tip} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#7c3aed", flexShrink: 0,
                  marginTop: 6,
                  boxShadow: "0 0 6px #7c3aed60",
                }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}