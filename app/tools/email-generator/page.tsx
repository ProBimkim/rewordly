"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "email-generator",
        title: "Email Generator",
        description: "Write complete professional emails with subject line instantly",
        icon: "📧",
        badge: undefined,
        gradientFrom: "#6366f1",
        gradientTo: "#3b82f6",
        accentColor: "#6366f1",
        tags: ["📨 Subject Line", "👔 Professional", "⚡ Instant"],
        inputLabel: "Describe the email you need",
        placeholder: "Example: Write a follow-up email to a client about our project proposal...",
        buttonLabel: "Generate Email →",
      }}
    />
  );
}
