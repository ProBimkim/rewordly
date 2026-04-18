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
      content: "Hi! I'm RewordlyAI Assistant 🤖\n\nI can help you with writing, editing, content strategy, SEO tips, grammar rules, and more. What would you like to work on today?",
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
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      <div className="text-center py-5 border-b border-gray-800/50 bg-gradient-to-r from-violet-950/20 to-blue-950/20">
        <h1 className="text-2xl font-bold mb-1">🤖 AI Writing Agent</h1>
        <p className="text-gray-500 text-sm">Multi-turn assistant · Remembers context · 3-Agent verified</p>
        <button
          onClick={() => setMessages([{ role: "assistant", content: "Chat cleared! How can I help you?" }])}
          className="mt-2 text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          🗑️ Clear chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-1">🤖</div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user" ? "bg-violet-700 text-white rounded-br-sm" : "bg-gray-800 text-gray-100 rounded-bl-sm"
            }`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm ml-3 flex-shrink-0 mt-1">👤</div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm mr-3">🤖</div>
            <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4 max-w-3xl mx-auto w-full">
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                className="text-left text-sm bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-violet-700 text-gray-400 hover:text-white px-4 py-3 rounded-xl transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-800 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about writing, SEO, content... (Enter to send)"
            className="flex-1 bg-gray-900 border border-gray-700 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none resize-none leading-6"
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="bg-violet-600 hover:bg-violet-500 disabled:bg-gray-800 disabled:cursor-not-allowed px-5 rounded-xl transition-all font-medium"
          >
            {loading
              ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
              : "→"}
          </button>
        </div>
        <p className="text-xs text-gray-600 text-center mt-2">RewordlyAI Agent · 3-agent verified responses</p>
      </div>
    </div>
  );
}