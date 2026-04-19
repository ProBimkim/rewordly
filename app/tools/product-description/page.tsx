"use client";
import ToolPage from "../ToolPage";

export default function Page() {
  return (
    <ToolPage
      config={{
        toolId: "product-description",
        title: "Product Description",
        description: "Write compelling 100-200 word ecommerce product descriptions that convert",
        icon: "🛍️",
        badge: undefined,
        gradientFrom: "#a855f7",
        gradientTo: "#ec4899",
        accentColor: "#a855f7",
        tags: ["🛒 SEO Friendly", "💬 100-200 Words", "✨ CTA Included"],
        inputLabel: "Describe your product",
        placeholder: "Example: Wireless noise-canceling headphones with 30-hour battery, foldable design...",
        buttonLabel: "Generate Description →",
      }}
    />
  );
}
