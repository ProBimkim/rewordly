"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

interface ImageData {
  prompt: string;
  imageUrl: string; // proxy URL
  seed: number;
}

const examples = [
  "Pemandangan pegunungan saat matahari terbenam",
  "Robot futuristik di kota cyberpunk malam hari",
  "Kucing lucu memakai topi penyihir",
  "Pantai tropis dengan air jernih dan pasir putih",
];

export default function ImageGeneratorPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const buildProxyUrl = (prompt: string, seed: number) =>
    `/api/image-proxy?prompt=${encodeURIComponent(prompt)}&seed=${seed}`;

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setImageData(null);
    setImgLoaded(false);
    setLoadingStep("🤖 AI crafting your prompt...");

    try {
      // Step 1: Get enhanced prompt from AI
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tool: "image-prompt" }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error as string);
        return;
      }

      const prompt = data.result as string;
      const seed = data.seed as number ?? Math.floor(Math.random() * 999999);

      setLoadingStep("🎨 Generating your image...");

      // Step 2: Use proxy URL — image loads via our server, not browser directly
      const proxyUrl = buildProxyUrl(prompt, seed);

      setImageData({ prompt, imageUrl: proxyUrl, seed });

    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const handleRegenerate = () => {
    if (!imageData) return;
    const seed = Math.floor(Math.random() * 999999);
    setImageData({ ...imageData, imageUrl: buildProxyUrl(imageData.prompt, seed), seed });
    setImgLoaded(false);
  };

  const handleDownload = async () => {
    if (!imageData) return;
    try {
      const res = await fetch(imageData.imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rewordlyai-${imageData.seed}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(imageData.imageUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-950/40 via-gray-950 to-violet-950/40 border-b border-gray-800">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #ec4899 0%, transparent 50%), radial-gradient(circle at 70% 50%, #8b5cf6 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-pink-900/30 border border-pink-700/40 text-pink-300 text-xs px-3 py-1 rounded-full mb-5">
            ✨ Powered by Flux AI via Pollinations
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            AI Image Generator
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Describe in any language — AI crafts the perfect prompt and generates stunning HD images
          </p>
          <div className="flex justify-center gap-3 mt-5 flex-wrap text-sm">
            {[["🎨", "Flux AI Model"], ["🖼️", "1024×1024 HD"], ["🌐", "Any Language"], ["⚡", "Free Forever"]].map(
              ([icon, label]) => (
                <span key={label} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                  {icon} {label}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Input */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <label className="text-sm text-gray-400 font-medium mb-3 block">
            🖊️ Describe your image (Indonesian, English, or any language)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contoh: Kucing lucu memakai topi penyihir di perpustakaan kuno..."
            className="w-full bg-gray-800 rounded-xl p-4 text-white placeholder-gray-500 border border-gray-700 focus:border-pink-500 focus:outline-none resize-none h-32 transition-colors"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1.5 rounded-full border border-gray-700 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-500">{input.length} / 500 chars</span>
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-pink-900/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                  {loadingStep || "Generating..."}
                </span>
              ) : (
                "✨ Generate Image"
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-2xl p-5 mb-6 text-red-300 flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {imageData && (
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-200">🖼️ Generated Image</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleRegenerate}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-all border border-gray-700"
                  >
                    🔄 New Variation
                  </button>
                  <button
                    onClick={handleDownload}
                    className="text-xs bg-pink-700 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg transition-all"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>

              {/* Image area */}
              <div className="relative bg-gray-950 min-h-72 flex items-center justify-center">
                {/* Loading spinner — show while image not loaded */}
                {!imgLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-950">
                    <div className="relative w-16 h-16 mb-4">
                      <div className="animate-spin absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent" />
                      <div
                        className="animate-spin absolute inset-2 rounded-full border-4 border-violet-500 border-b-transparent"
                        style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
                      />
                    </div>
                    <p className="text-gray-300 font-medium">Rendering image...</p>
                    <p className="text-gray-500 text-sm mt-1">Usually 10-40 seconds</p>
                  </div>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={imageData.imageUrl}
                  src={imageData.imageUrl}
                  alt="AI Generated artwork"
                  className="w-full"
                  style={{ display: imgLoaded ? "block" : "none" }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => {
                    setImgLoaded(true); // stop spinner
                    setError("Image generation timed out. Pollinations is busy — please try again in a moment.");
                    setImageData(null);
                  }}
                />
              </div>
            </div>

            {/* Prompt display */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🤖</span> AI-Enhanced Prompt (English)
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{imageData.prompt}</p>
              <button
                onClick={() => navigator.clipboard.writeText(imageData.prompt)}
                className="mt-3 text-xs text-pink-400 hover:text-pink-300 transition-colors"
              >
                📋 Copy prompt
              </button>
            </div>

            <p className="text-xs text-gray-600 text-center">
              Seed: {imageData.seed} · Model: Flux · via Pollinations AI (free & open source)
            </p>
          </div>
        )}

        {/* How it works */}
        {!imageData && !loading && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { icon: "✍️", title: "1. Describe", desc: "Any language, any style" },
              { icon: "🤖", title: "2. AI Enhances", desc: "Optimized English prompt" },
              { icon: "🖼️", title: "3. Get Image", desc: "HD image in 10-40 seconds" },
            ].map((s) => (
              <div key={s.title} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-semibold text-sm mb-1">{s.title}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}