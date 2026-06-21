"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

interface ImageData {
  prompt: string;
  imageUrl: string;
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
      const seed = (data.seed as number) ?? Math.floor(Math.random() * 999999);

      setLoadingStep("🎨 Generating your image...");
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
      a.download = `bantugwehai-${imageData.seed}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageData.imageUrl, "_blank");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#e8e6f0" }}>
      <Navbar />

      {/* Hero */}
      <div className="cyber-grid-bg" style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #2a254520",
        background: "radial-gradient(ellipse at 30% 50%, #e040fb10 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, #a855f710 0%, transparent 50%), #0a0a12",
      }}>
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 800, margin: "0 auto",
          padding: "48px 20px", textAlign: "center",
        }}>
          <div className="cyber-badge" style={{
            marginBottom: 20,
            background: "#e040fb15", borderColor: "#e040fb30", color: "#e040fb",
          }}>
            ✨ Powered by Flux AI via Pollinations
          </div>
          <h1 className="hero-title" style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 44, fontWeight: 900, marginBottom: 16,
            background: "linear-gradient(135deg, #e040fb, #a855f7, #00e5ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            AI Image Generator
          </h1>
          <p style={{ color: "#8b85a8", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Describe in any language — AI crafts the perfect prompt and generates stunning HD images
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            {[["🎨", "Flux AI Model"], ["🖼️", "1024×1024 HD"], ["🌐", "Any Language"], ["⚡", "Free Forever"]].map(
              ([icon, label]) => (
                <span key={label} className="cyber-tag">{icon} {label}</span>
              )
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        {/* Input */}
        <div style={{
          background: "#13111f", borderRadius: 16,
          border: "1px solid #2a2545", padding: "24px",
          marginBottom: 20,
        }}>
          <label style={{ fontSize: 13, color: "#8b85a8", fontWeight: 500, display: "block", marginBottom: 12 }}>
            🖊️ Describe your image (Indonesian, English, or any language)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Contoh: Kucing lucu memakai topi penyihir di perpustakaan kuno..."
            className="cyber-textarea"
            style={{
              background: "#0d0b1a", border: "1px solid #2a2545",
              borderRadius: 12, height: 120,
            }}
          />

          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {examples.map((ex) => (
              <button key={ex} onClick={() => setInput(ex)}
                style={{
                  fontSize: 12, background: "#0d0b1a",
                  border: "1px solid #2a2545",
                  color: "#8b85a8", padding: "6px 12px",
                  borderRadius: 20, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                {ex}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
            <span style={{ fontSize: 12, color: "#5a5477" }}>{input.length} / 500 chars</span>
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="cyber-btn"
              style={{
                background: loading || !input.trim()
                  ? "#1e1b35"
                  : "linear-gradient(135deg, #e040fb, #a855f7)",
                padding: "12px 28px",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: "2px solid white", borderTopColor: "transparent",
                    animation: "spin 0.7s linear infinite", display: "block",
                  }} />
                  {loadingStep || "Generating..."}
                </span>
              ) : "✨ Generate Image"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#ff174410", border: "1px solid #ff174430",
            borderRadius: 16, padding: "16px 20px",
            marginBottom: 20, color: "#ff6b6b",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {imageData && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "#13111f", borderRadius: 16,
              border: "1px solid #e040fb25", overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{
                padding: "14px 20px",
                borderBottom: "1px solid #2a254520",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                flexWrap: "wrap", gap: 8,
              }}>
                <span style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 13, fontWeight: 600, color: "#e8e6f0",
                }}>🖼️ Generated Image</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleRegenerate} style={{
                    fontSize: 12, background: "#0d0b1a",
                    border: "1px solid #2a2545",
                    color: "#8b85a8", padding: "6px 14px",
                    borderRadius: 10, cursor: "pointer",
                  }}>🔄 New Variation</button>
                  <button onClick={handleDownload} style={{
                    fontSize: 12,
                    background: "linear-gradient(135deg, #e040fb, #a855f7)",
                    border: "none", color: "white",
                    padding: "6px 14px", borderRadius: 10,
                    cursor: "pointer",
                    boxShadow: "0 0 10px #e040fb30",
                  }}>⬇️ Download</button>
                </div>
              </div>

              {/* Image */}
              <div style={{
                position: "relative", background: "#0a0a12",
                minHeight: 300, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                {!imgLoaded && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    zIndex: 10, background: "#0a0a12",
                  }}>
                    <div style={{ position: "relative", width: 64, height: 64, marginBottom: 16 }}>
                      <div style={{
                        position: "absolute", inset: 0, borderRadius: "50%",
                        border: "3px solid #e040fb", borderTopColor: "transparent",
                        animation: "spin 0.8s linear infinite",
                      }} />
                      <div style={{
                        position: "absolute", inset: 8, borderRadius: "50%",
                        border: "3px solid #a855f7", borderBottomColor: "transparent",
                        animation: "spin 0.8s linear infinite",
                        animationDirection: "reverse",
                      }} />
                    </div>
                    <p style={{ color: "#e8e6f0", fontWeight: 500, fontSize: 14 }}>Rendering image...</p>
                    <p style={{ color: "#5a5477", fontSize: 12, marginTop: 4 }}>Usually 10-40 seconds</p>
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={imageData.imageUrl}
                  src={imageData.imageUrl}
                  alt="AI Generated artwork"
                  style={{
                    width: "100%", display: imgLoaded ? "block" : "none",
                    borderRadius: 0,
                  }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => {
                    setImgLoaded(true);
                    setError("Image generation timed out. Pollinations is busy — please try again.");
                    setImageData(null);
                  }}
                />
              </div>
            </div>

            {/* Prompt display */}
            <div style={{
              background: "#13111f", border: "1px solid #2a254520",
              borderRadius: 16, padding: "20px",
            }}>
              <div style={{
                fontSize: 11, color: "#5a5477",
                textTransform: "uppercase", letterSpacing: "0.1em",
                marginBottom: 8, fontFamily: "'Orbitron', monospace",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>🤖</span> AI-Enhanced Prompt (English)
              </div>
              <p style={{ color: "#8b85a8", fontSize: 13, lineHeight: 1.7 }}>{imageData.prompt}</p>
              <button
                onClick={() => navigator.clipboard.writeText(imageData.prompt)}
                style={{
                  marginTop: 10, background: "none",
                  border: "1px solid #2a2545",
                  color: "#e040fb", fontSize: 12,
                  padding: "4px 12px", borderRadius: 8,
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >📋 Copy prompt</button>
            </div>

            <p style={{ fontSize: 12, color: "#5a5477", textAlign: "center" }}>
              Seed: {imageData.seed} · Model: Flux · via Pollinations AI (free & open source)
            </p>
          </div>
        )}

        {/* How it works */}
        {!imageData && !loading && (
          <div className="grid-3col" style={{ marginTop: 24 }}>
            {[
              { icon: "✍️", title: "1. Describe", desc: "Any language, any style" },
              { icon: "🤖", title: "2. AI Enhances", desc: "Optimized English prompt" },
              { icon: "🖼️", title: "3. Get Image", desc: "HD image in 10-40 seconds" },
            ].map((s) => (
              <div key={s.title} style={{
                background: "#13111f", borderRadius: 14,
                padding: "20px 16px", border: "1px solid #2a254520",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{
                  fontWeight: 700, fontSize: 14, marginBottom: 4,
                  fontFamily: "'Orbitron', monospace", color: "#e8e6f0",
                }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#5a5477" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}