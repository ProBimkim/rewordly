import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="blog-writer"
    title="AI Blog Writer"
    icon="✍️"
    color="#f59e0b"
    description="Generate complete, SEO-optimized blog posts instantly. Just enter your topic and our AI will write a full article for you."
    placeholder="Enter your blog topic, e.g: 'How to start a successful YouTube channel in 2026'"
    outputLabel="Generated Blog Post"
    faqs={[
      { q: "Is this blog writer free?", a: "Yes, completely free to use with no sign-up required." },
      { q: "How long are the generated posts?", a: "Typically 400-800 words, structured with headings and paragraphs." },
      { q: "Are the posts SEO optimized?", a: "Yes, the AI writes with SEO best practices including natural keyword usage." },
    ]}
    relatedTools={[
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Summarizer", href: "/summarizer" },
      { label: "Marketing Copy", href: "/marketing-copy" },
    ]}
  />;
}