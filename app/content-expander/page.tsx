import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="content-expander"
    title="Content Expander"
    icon="📈"
    color="#fb923c"
    description="Turn short notes, bullet points, or brief text into full, detailed content. Perfect for expanding outlines into articles."
    placeholder="Paste your short text or bullet points to expand, e.g: 'AI is changing healthcare. Faster diagnosis. Better treatment.'"
    outputLabel="Expanded Content"
    faqs={[
      { q: "What can I use this for?", a: "Blog posts, essays, reports, emails, product descriptions — anything you want to make longer and richer." },
      { q: "Does it add false information?", a: "No. It only expands on what you provide — never adds unrelated or false facts." },
      { q: "How much longer will the output be?", a: "Typically 2-3x the original length." },
    ]}
    relatedTools={[
      { label: "AI Blog Writer", href: "/ai-blog-writer" },
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Summarizer", href: "/summarizer" },
    ]}
  />;
}