import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="summarizer-auto"
    title="Smart Summarizer"
    icon="🧠"
    color="#34d399"
    description="Auto-detects your content type and summarizes it the smartest way — bullet points, short summary, or paragraph."
    placeholder="Paste any article, essay, or text to summarize…"
    outputLabel="Smart Summary"
    faqs={[
      { q: "How is this different from a normal summarizer?", a: "It auto-detects content type and chooses the best summarization format automatically." },
      { q: "Does it work for long articles?", a: "Yes, paste any length and it will extract the key points intelligently." },
      { q: "Is the meaning preserved?", a: "Yes, it never adds or removes key information." },
    ]}
    relatedTools={[
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "AI Blog Writer", href: "/ai-blog-writer" },
      { label: "Content Expander", href: "/content-expander" },
    ]}
  />;
}