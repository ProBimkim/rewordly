"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "summarizer",
        title: "Summarizer",
        description: "Condense long text into clear, concise summaries in seconds",
        icon: "📋",
        badge: undefined,
        gradientFrom: "#ec4899",
        gradientTo: "#f43f5e",
        accentColor: "#ec4899",
        tags: ["📉 20-30% Length", "🎯 Key Points", "📄 Any Format"],
        inputLabel: "Paste the text you want to summarize",
        placeholder: "Paste the long text you want to summarize...",
        buttonLabel: "Summarize →",
      }}
    />
  );
}
