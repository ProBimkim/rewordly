"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm BantuGwehAI Assistant 🤖\n\nI can help you with writing, editing, content strategy, SEO tips, grammar rules, and more. What would you like to work on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Help me write a blog post about AI",
    "What are the best SEO practices?",
    "Review and improve my writing",
    "How do I write a professional email?",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userText = text ?? input.trim();
    if (!userText) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const history = newMessages.slice(1, -1).map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, tool: "ai-agent", history }),
      });
      const data = await res.json();
      const reply = (data.result ?? data.error ?? "Sorry, I couldn't process that.") as string;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#e8e6f0", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Header */}
      <div style={{
        textAlign: "center", padding: "20px 20px 16px",
        borderBottom: "1px solid #2a254520",
        background: "linear-gradient(180deg, #7c3aed08 0%, transparent 100%)",
      }}>
        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 22, fontWeight: 800, marginBottom: 6,
          color: "#e8e6f0",
        }}>
          🤖 AI Writing Agent
        </h1>
        <p style={{ color: "#5a5477", fontSize: 13 }}>
          Multi-turn assistant · Remembers context · 3-Agent verified
        </p>
        <button
          onClick={() => setMessages([{ role: "assistant", content: "Chat cleared! How can I help you?" }])}
          style={{
            marginTop: 8, background: "none", border: "1px solid #2a2545",
            color: "#5a5477", fontSize: 12, padding: "4px 12px",
            borderRadius: 8, cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          🗑️ Clear chat
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "24px 16px",
        maxWidth: 720, margin: "0 auto", width: "100%",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            animation: "fade-in 0.3s ease",
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, marginRight: 10, flexShrink: 0, marginTop: 2,
                boxShadow: "0 0 12px #7c3aed30",
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: "80%", borderRadius: 16,
              padding: "12px 16px", fontSize: 14, lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              ...(msg.role === "user" ? {
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                color: "white", borderBottomRightRadius: 4,
                boxShadow: "0 0 15px #7c3aed20",
              } : {
                background: "#13111f",
                border: "1px solid #2a254530",
                color: "#e8e6f0", borderBottomLeftRadius: 4,
              }),
            }}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: "#1e1b35",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, marginLeft: 10, flexShrink: 0, marginTop: 2,
              }}>👤</div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, marginRight: 10, boxShadow: "0 0 12px #7c3aed30",
            }}>🤖</div>
            <div style={{
              background: "#13111f", border: "1px solid #2a254530",
              borderRadius: 16, borderBottomLeftRadius: 4,
              padding: "12px 16px",
            }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center", height: 24 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: 8, height: 8,
                    background: "#a855f7",
                    borderRadius: "50%",
                    animation: `typing-bounce 0.6s ease infinite`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: "0 0 6px #a855f760",
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{
          padding: "0 16px 16px",
          maxWidth: 720, margin: "0 auto", width: "100%",
        }}>
          <div className="grid-suggestions">
            {suggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                style={{
                  textAlign: "left", fontSize: 13,
                  background: "#13111f",
                  border: "1px solid #2a254530",
                  color: "#8b85a8",
                  padding: "12px 16px", borderRadius: 12,
                  cursor: "pointer", transition: "all 0.3s",
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{
        borderTop: "1px solid #2a254520",
        padding: "16px",
        background: "rgba(10,10,18,0.95)",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{
          maxWidth: 720, margin: "0 auto",
          display: "flex", gap: 10,
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about writing, SEO, content... (Enter to send)"
            className="cyber-input"
            style={{
              flex: 1, resize: "none",
              minHeight: 44, maxHeight: 120,
              borderRadius: 14, padding: "12px 16px",
              fontSize: 14, lineHeight: 1.5,
            }}
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="cyber-btn"
            style={{
              padding: "0 20px", borderRadius: 14,
              background: loading || !input.trim()
                ? "#1e1b35"
                : "linear-gradient(135deg, #7c3aed, #a855f7)",
              minWidth: 50,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {loading
              ? <span style={{
                  width: 16, height: 16, borderRadius: "50%",
                  border: "2px solid white", borderTopColor: "transparent",
                  animation: "spin 0.7s linear infinite", display: "block",
                }} />
              : "→"}
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "#5a5477", marginTop: 8 }}>
          BantuGwehAI Agent · 3-agent verified responses
        </p>
      </div>
    </div>
  );
}