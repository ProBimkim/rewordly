"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "blog-writer",
        title: "AI Blog Writer",
        description: "Generate full SEO-optimized blog posts from a topic instantly",
        icon: "✍️",
        badge: "HOT",
        gradientFrom: "#3b82f6",
        gradientTo: "#06b6d4",
        accentColor: "#3b82f6",
        tags: ["📝 400+ words", "🔍 SEO Optimized", "## Headings"],
        inputLabel: "Enter your blog topic or title",
        placeholder: "Example: 10 Tips for Better Productivity in 2025",
        buttonLabel: "Generate Blog Post →",
      }}
    />
  );
}
