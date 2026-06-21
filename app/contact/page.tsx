"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#e8e6f0" }}>
      <Navbar />

      <div className="cyber-grid-bg" style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #2a254520",
        padding: "48px 20px 40px", textAlign: "center",
        background: "radial-gradient(ellipse at 50% 0%, #7c3aed10 0%, transparent 60%), #0a0a12",
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 40, fontWeight: 900, marginBottom: 8,
            background: "linear-gradient(135deg, #e8e6f0, #a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Contact Us
          </h1>
          <p style={{ color: "#8b85a8", fontSize: 16 }}>
            Have a question, feedback, or business inquiry? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
        {submitted ? (
          <div style={{
            background: "#39ff1408", border: "1px solid #39ff1425",
            borderRadius: 20, padding: "40px 32px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #39ff14, transparent)",
            }} />
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 20, fontWeight: 700, marginBottom: 8,
            }}>Message Sent!</h2>
            <p style={{ color: "#8b85a8", marginBottom: 24 }}>
              Thank you! We&apos;ll get back to you within 1-2 business days.
            </p>
            <Link href="/" className="cyber-btn" style={{
              textDecoration: "none", display: "inline-flex",
              padding: "12px 24px",
            }}>
              Back to Home
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{
                fontSize: 13, color: "#8b85a8", marginBottom: 8, display: "block",
                fontFamily: "'Orbitron', monospace", fontWeight: 500,
              }}>Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="cyber-input"
              />
            </div>

            <div>
              <label style={{
                fontSize: 13, color: "#8b85a8", marginBottom: 8, display: "block",
                fontFamily: "'Orbitron', monospace", fontWeight: 500,
              }}>Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="cyber-input"
              />
            </div>

            <div>
              <label style={{
                fontSize: 13, color: "#8b85a8", marginBottom: 8, display: "block",
                fontFamily: "'Orbitron', monospace", fontWeight: 500,
              }}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us how we can help..."
                rows={6}
                className="cyber-input"
                style={{ resize: "none", lineHeight: 1.7 }}
              />
            </div>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!form.name || !form.email || !form.message}
              className="cyber-btn"
              style={{
                width: "100%", justifyContent: "center",
                padding: "14px",
                background: !form.name || !form.email || !form.message
                  ? "#1e1b35"
                  : "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: !form.name || !form.email || !form.message
                  ? "#5a5477" : "white",
              }}
            >
              Send Message →
            </button>
          </div>
        )}

        <div className="grid-contact" style={{ marginTop: 40 }}>
          {[
            { icon: "📧", label: "Email", value: "support@bantugwehai.com" },
            { icon: "🌐", label: "Website", value: "bantugweh-ai.vercel.app" },
            { icon: "🕐", label: "Response", value: "1-2 business days" },
          ].map((item) => (
            <div key={item.label} style={{
              background: "#13111f", borderRadius: 14,
              padding: "16px", border: "1px solid #2a254520",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 11, color: "#5a5477", marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "#8b85a8", wordBreak: "break-all" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}