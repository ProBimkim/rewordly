import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="sentence-improver"
    title="Sentence Improver"
    icon="⚡"
    color="#f472b6"
    description="Transform weak, awkward sentences into clear, powerful writing. Our AI improves word choice, flow, and structure instantly."
    placeholder="Paste the sentences you want to improve…"
    outputLabel="Improved Text"
    faqs={[
      { q: "How is this different from a rewriter?", a: "The sentence improver focuses on enhancing quality, not just changing words." },
      { q: "Can I use it for academic writing?", a: "Yes, it works great for essays, reports, and academic papers." },
      { q: "Does it work for short sentences?", a: "Yes, even a single sentence can be improved." },
    ]}
    relatedTools={[
      { label: "Grammar Checker", href: "/grammar-checker" },
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "AI Humanizer", href: "/ai-humanizer" },
    ]}
  />;
}