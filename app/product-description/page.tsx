import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="product-description"
    title="Product Description Generator"
    icon="🛍️"
    color="#f87171"
    description="Write compelling product descriptions that sell. Perfect for ecommerce stores, marketplaces, and product pages."
    placeholder="Describe your product, e.g: 'Wireless noise-cancelling headphones with 30-hour battery life, foldable design, premium sound'"
    outputLabel="Product Description"
    faqs={[
      { q: "Is it good for Shopify or Tokopedia?", a: "Yes, it works perfectly for any ecommerce platform." },
      { q: "How long are the descriptions?", a: "Typically 100-200 words, optimized for conversions." },
      { q: "Can I generate multiple versions?", a: "Yes, just run it again with the same input for a different version." },
    ]}
    relatedTools={[
      { label: "Marketing Copy", href: "/marketing-copy" },
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Email Generator", href: "/email-generator" },
    ]}
  />;
}