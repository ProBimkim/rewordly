"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "grammar-checker",
        title: "Grammar Checker",
        description: "Fix all grammar, spelling, punctuation, and sentence structure errors instantly",
        icon: "✅",
        badge: undefined,
        gradientFrom: "#14b8a6",
        gradientTo: "#10b981",
        accentColor: "#14b8a6",
        tags: ["✏️ Grammar", "🔤 Spelling", "📌 Punctuation"],
        inputLabel: "Paste your text to check",
        placeholder: "Paste the text you want to grammar check...",
        buttonLabel: "Check Grammar →",
      }}
    />
  );
}
