"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "marketing-copy",
        title: "Marketing Copy",
        description: "Generate high-converting marketing copy, ads, and promotional content",
        icon: "📣",
        badge: undefined,
        gradientFrom: "#f97316",
        gradientTo: "#ef4444",
        accentColor: "#f97316",
        tags: ["🎯 CTA Included", "💰 High Converting", "📢 Ad Ready"],
        inputLabel: "Describe your product or campaign",
        placeholder: "Example: Write marketing copy for a new productivity app for students...",
        buttonLabel: "Generate Copy →",
      }}
    />
  );
}
