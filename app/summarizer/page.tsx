import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="summarizer"
    title="AI Summarizer"
    icon="📝"
    color="#34d399"
    description="Summarize long articles, essays, or documents into concise key points. Save time and understand content faster."
    placeholder="Paste the long text you want to summarize…"
    outputLabel="Summary"
    faqs={[
      { q: "How short is the summary?", a: "Typically 20-30% of the original length, capturing all key points." },
      { q: "Can it summarize articles from the web?", a: "Yes, paste any article text and it will be summarized instantly." },
      { q: "Is it good for students?", a: "Absolutely. Perfect for summarizing textbook chapters or research papers." },
    ]}
    relatedTools={[
      { label: "AI Blog Writer", href: "/ai-blog-writer" },
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Grammar Checker", href: "/grammar-checker" },
    ]}
  />;
}