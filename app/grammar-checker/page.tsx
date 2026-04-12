import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="grammar-checker"
    title="Grammar Checker"
    icon="✅"
    color="#60a5fa"
    description="Fix all grammar, spelling, and punctuation errors instantly. Powered by AI for accurate and context-aware corrections."
    placeholder="Paste your text here to check and fix grammar…"
    outputLabel="Corrected Text"
    faqs={[
      { q: "Is this grammar checker accurate?", a: "Yes, it uses advanced AI to detect contextual grammar errors, not just basic spell-check." },
      { q: "What types of errors does it fix?", a: "Grammar, spelling, punctuation, sentence structure, and word usage." },
      { q: "Is it free?", a: "Yes, completely free with no word limit per session." },
    ]}
    relatedTools={[
      { label: "Sentence Improver", href: "/sentence-improver" },
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Summarizer", href: "/summarizer" },
    ]}
  />;
}