import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="humanizer"
    title="AI Humanizer"
    icon="🤖"
    color="#4ade80"
    description="Make AI-generated text sound naturally human. Bypass AI detectors by rewriting text with natural human rhythm and style."
    placeholder="Paste your AI-generated text here to humanize it…"
    outputLabel="Humanized Text"
    faqs={[
      { q: "What is an AI humanizer?", a: "It rewrites AI-generated text to sound more natural and human-like." },
      { q: "Can it bypass AI detection?", a: "It significantly reduces AI detection scores by improving natural flow." },
      { q: "Does it change the meaning?", a: "No, the original meaning is always preserved." },
    ]}
    relatedTools={[
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Grammar Checker", href: "/grammar-checker" },
      { label: "Sentence Improver", href: "/sentence-improver" },
    ]}
  />;
}