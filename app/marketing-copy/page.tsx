import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="marketing-copy"
    title="Marketing Copy Generator"
    icon="📣"
    color="#a78bfa"
    description="Generate high-converting marketing copy for ads, landing pages, and social media. Powered by AI copywriting expertise."
    placeholder="Describe your product or campaign, e.g: 'Fitness app for busy professionals that helps them work out in 15 minutes a day'"
    outputLabel="Marketing Copy"
    faqs={[
      { q: "What can I use this for?", a: "Facebook ads, Google ads, landing pages, email campaigns, and social media posts." },
      { q: "Is the copy unique?", a: "Yes, every output is freshly generated and unique to your input." },
      { q: "Does it include a CTA?", a: "Yes, every piece includes a compelling call to action." },
    ]}
    relatedTools={[
      { label: "Product Description", href: "/product-description" },
      { label: "Email Generator", href: "/email-generator" },
      { label: "AI Blog Writer", href: "/ai-blog-writer" },
    ]}
  />;
}