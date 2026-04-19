"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "summarizer-auto",
        title: "Smart Summarizer",
        description: "Auto-detects the best summary format for your content and summarizes smartly",
        icon: "🧠",
        badge: undefined,
        gradientFrom: "#06b6d4",
        gradientTo: "#3b82f6",
        accentColor: "#06b6d4",
        tags: ["🤖 Auto Format", "📊 Bullets/Prose", "🎯 Key Points"],
        inputLabel: "Paste any text to auto-summarize",
        placeholder: "Paste any text — article, essay, notes, or list — and AI will auto-detect the best summary format...",
        buttonLabel: "Auto Summarize →",
      }}
    />
  );
}
