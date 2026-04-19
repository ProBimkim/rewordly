"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "sentence-improver",
        title: "Sentence Improver",
        description: "Improve clarity, flow, and engagement of your sentences instantly",
        icon: "⚡",
        badge: undefined,
        gradientFrom: "#eab308",
        gradientTo: "#f97316",
        accentColor: "#eab308",
        tags: ["💡 Clarity", "🔄 Better Flow", "📖 Readability"],
        inputLabel: "Paste your sentences to improve",
        placeholder: "Paste the sentences you want to improve...",
        buttonLabel: "Improve Sentences →",
      }}
    />
  );
}
