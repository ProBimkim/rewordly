import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "RewordlyAI — Free AI Writing Tools",
  description: "Free AI writing tools powered by 3-agent verification. Rewriter, humanizer, MCQ solver, image generator, AI agent and more.",
};

const tools = [
  { href: "/ai-rewriter", label: "AI Rewriter", desc: "Rewrite text in 4 tones", icon: "✨", badge: "HOT", gradient: "from-violet-500 to-purple-500" },
  { href: "/tools/ai-blog-writer", label: "Blog Writer", desc: "Generate full SEO blog posts", icon: "✍️", badge: "HOT", gradient: "from-blue-500 to-cyan-500" },
  { href: "/tools/ai-humanizer", label: "AI Humanizer", desc: "24-pattern human writing technique", icon: "🧑", badge: "NEW", gradient: "from-green-500 to-emerald-500" },
  { href: "/tools/grammar-checker", label: "Grammar Checker", desc: "Fix all grammar errors instantly", icon: "✅", gradient: "from-teal-500 to-green-500" },
  { href: "/tools/sentence-improver", label: "Sentence Improver", desc: "Improve clarity and flow", icon: "⚡", gradient: "from-yellow-500 to-orange-500" },
  { href: "/tools/summarizer", label: "Summarizer", desc: "Condense long text instantly", icon: "📋", gradient: "from-pink-500 to-rose-500" },
  { href: "/tools/email-generator", label: "Email Generator", desc: "Write professional emails fast", icon: "📧", gradient: "from-indigo-500 to-blue-500" },
  { href: "/tools/marketing-copy", label: "Marketing Copy", desc: "Generate converting ad copy", icon: "📣", gradient: "from-orange-500 to-red-500" },
  { href: "/tools/product-description", label: "Product Description", desc: "Compelling ecommerce copy", icon: "🛍️", gradient: "from-purple-500 to-pink-500" },
  { href: "/tools/summarizer-auto", label: "Smart Summarizer", desc: "Auto-detects best summary format", icon: "🧠", gradient: "from-cyan-500 to-blue-500" },
  { href: "/tools/mcq-solver", label: "MCQ Solver", desc: "3-agent verified MCQ accuracy", icon: "🎯", badge: "HOT", gradient: "from-amber-500 to-orange-500" },
  { href: "/tools/image-prompt", label: "Image Generator", desc: "Real AI images via Flux model", icon: "🎨", badge: "NEW", gradient: "from-pink-500 to-violet-500" },
  { href: "/tools/content-expander", label: "Content Expander", desc: "Expand short text to full content", icon: "📝", gradient: "from-slate-500 to-gray-500" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo-icon.png" alt="RewordlyAI" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-white text-lg">RewordlyAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/ai-rewriter", label: "Rewriter" },
              { href: "/tools/mcq-solver", label: "MCQ Solver" },
              { href: "/tools/image-prompt", label: "Image Gen" },
              { href: "/tools/ai-agent", label: "AI Agent" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                {t.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-300 hidden sm:block">About</Link>
            <Link href="/contact" className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-gray-800" style={{
        background: "radial-gradient(ellipse at 20% 60%, #4c1d9522 0%, transparent 50%), radial-gradient(ellipse at 80% 40%, #1e3a8a22 0%, transparent 50%), #030712"
      }}>
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-900/30 border border-violet-700/40 text-violet-300 text-xs px-3 py-1 rounded-full mb-6">
            🤖 3-Agent AI Verification — Groq · Gemini · OpenRouter
          </div>
          <h1 className="text-6xl font-black mb-5 leading-tight tracking-tight">
            AI Writing Tools
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              for Everyone
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Free AI tools for students, creators, and SEO writers.<br />
            Every result verified by 3 independent AI agents for maximum accuracy.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/ai-rewriter"
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-violet-900/30">
              ✨ Try AI Rewriter Free →
            </Link>
            <Link href="/tools/ai-agent"
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all">
              🤖 Chat with AI Agent
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-gray-800 bg-gray-900/20">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-4 gap-4 text-center">
          {[
            { v: "14+", l: "Free AI Tools" },
            { v: "3", l: "Agents per task" },
            { v: "24", l: "Humanizer patterns" },
            { v: "100%", l: "Free forever" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-black text-violet-400">{s.v}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* AI Agent — featured card */}
        <Link href="/tools/ai-agent"
          className="block mb-10 bg-gradient-to-br from-violet-900/30 to-blue-900/20 border border-violet-700/30 hover:border-violet-500/50 rounded-2xl p-7 transition-all group">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">AI Writing Agent</h2>
                  <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">NEW</span>
                  <span className="bg-blue-900/40 border border-blue-700/40 text-blue-300 text-xs px-2 py-0.5 rounded-full">Multi-turn</span>
                </div>
                <p className="text-gray-400 max-w-xl">
                  Multi-turn AI assistant with memory. Ask anything about writing, SEO, content strategy, grammar — responses verified by 3 AI agents.
                </p>
              </div>
            </div>
            <div className="bg-violet-600 group-hover:bg-violet-500 px-6 py-2.5 rounded-xl font-semibold transition-colors text-white flex-shrink-0">
              Chat Now →
            </div>
          </div>
        </Link>

        {/* Section header */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">All AI Writing Tools</h2>
            <p className="text-gray-500 text-sm">Every tool runs on 3 AI agents simultaneously for verified results</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 bg-gray-900 border border-gray-800 px-3 py-2 rounded-xl">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            All systems operational
          </div>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}
              className="group relative bg-gray-900 hover:bg-gray-800/80 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all overflow-hidden">
              {/* Top accent line on hover */}
              <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

              {tool.badge && (
                <span className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium ${
                  tool.badge === "HOT" ? "bg-orange-900/50 text-orange-300 border border-orange-800/40" : "bg-violet-900/50 text-violet-300 border border-violet-800/40"
                }`}>
                  {tool.badge}
                </span>
              )}

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} bg-opacity-20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {tool.icon}
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">{tool.label}</h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">{tool.desc}</p>

              <div className="mt-3 text-xs text-gray-700 group-hover:text-gray-500 transition-colors flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-violet-500 transition-colors"></span>
                3-agent verified
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="border-t border-gray-800 bg-gray-900/10">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">3-Agent Verification System</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Every request runs through 3 independent AI models simultaneously. The best result is selected — higher accuracy than any single-model tool.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: "🤖", name: "Groq Agent", model: "Llama 3.3 70B", desc: "Primary inference — ultra-fast responses", color: "#7c3aed" },
              { icon: "🧠", name: "Gemini Agent", model: "Gemini 1.5 Pro", desc: "Deep reasoning & verification", color: "#2563eb" },
              { icon: "⚡", name: "OpenRouter Agent", model: "Llama 3.3 70B :free", desc: "Independent cross-check — no API cost", color: "#059669" },
            ].map((a) => (
              <div key={a.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{a.icon}</div>
                <div className="font-semibold text-white mb-1">{a.name}</div>
                <div className="text-xs mb-3 px-2 py-0.5 rounded-full inline-block" style={{ color: a.color, backgroundColor: a.color + "22", border: `1px solid ${a.color}44` }}>{a.model}</div>
                <div className="text-sm text-gray-500">{a.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-800/40 text-green-400 px-5 py-2.5 rounded-xl text-sm">
              🗳️ Majority vote determines the final answer — significantly more accurate than single-model tools
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Image src="/logo-icon.png" alt="RewordlyAI" width={18} height={18} className="rounded opacity-50" />
            <span>© 2026 RewordlyAI · Free AI writing tools for everyone</span>
          </div>
          <div className="flex gap-5 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
            <Link href="/tools/ai-agent" className="hover:text-gray-400 transition-colors">AI Agent</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}