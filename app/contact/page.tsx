"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-gray-400 mb-10">
          Have a question, feedback, or business inquiry? We&apos;d love to hear from you.
        </p>

        {submitted ? (
          <div className="bg-green-950 border border-green-700 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
            <p className="text-gray-400 mb-6">Thank you! We&apos;ll get back to you within 1-2 business days.</p>
            <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl text-sm font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Your Name</label>
              <input type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-gray-900 border border-gray-700 focus:border-violet-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
              <input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="w-full bg-gray-900 border border-gray-700 focus:border-violet-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Message</label>
              <textarea value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us how we can help..."
                rows={6}
                className="w-full bg-gray-900 border border-gray-700 focus:border-violet-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none resize-none" />
            </div>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!form.name || !form.email || !form.message}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition-colors">
              Send Message →
            </button>
          </div>
        )}

        <div className="mt-12 grid grid-cols-3 gap-4 text-center text-sm">
          {([
            { icon: "📧", label: "Email", value: "support@rewordlyai.com" },
            { icon: "🌐", label: "Website", value: "rewordly-ai.vercel.app" },
            { icon: "🕐", label: "Response", value: "1-2 business days" },
          ] as { icon: string; label: string; value: string }[]).map((item) => (
            <div key={item.label} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-gray-500 text-xs">{item.label}</div>
              <div className="text-gray-300 text-xs mt-0.5 break-all">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}