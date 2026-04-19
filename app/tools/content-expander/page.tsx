"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "content-expander",
        title: "Content Expander",
        description: "Expand short text into full, detailed content — 2-3x the original length",
        icon: "📝",
        badge: undefined,
        gradientFrom: "#64748b",
        gradientTo: "#475569",
        accentColor: "#64748b",
        tags: ["📈 2-3x Length", "💡 Adds Context", "✍️ Natural Flow"],
        inputLabel: "Paste the short text to expand",
        placeholder: "Paste a short paragraph, bullet points, or outline to expand into full content...",
        buttonLabel: "Expand Content →",
      }}
    />
  );
}
