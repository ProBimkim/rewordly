"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "humanizer",
        title: "AI Humanizer",
        description: "Remove 24 AI-writing patterns. Make your text pass AI detection and sound genuinely human",
        icon: "🧑",
        badge: "blader/humanizer",
        gradientFrom: "#10b981",
        gradientTo: "#059669",
        accentColor: "#10b981",
        tags: ["✅ 24 AI Patterns", "🔍 Bypass Detection", "🇮🇩 Indonesian"],
        inputLabel: "Paste your AI-generated text here",
        placeholder: "Paste AI text to humanize...",
        buttonLabel: "Humanize Text →",
      }}
    />
  );
}
