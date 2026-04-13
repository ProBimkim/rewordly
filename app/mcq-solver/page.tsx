import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="mcq-solver"
    title="MCQ Solver"
    icon="🎯"
    color="#60a5fa"
    description="Paste any multiple choice question and our AI will analyze, eliminate wrong options, and give you the correct answer with explanation."
    placeholder="Paste your MCQ question here, e.g:&#10;Which planet is closest to the Sun?&#10;A) Venus&#10;B) Mercury&#10;C) Mars&#10;D) Earth"
    outputLabel="Answer & Explanation"
    faqs={[
      { q: "What types of questions does it solve?", a: "Science, math, history, general knowledge, and most academic MCQ formats." },
      { q: "Is it always correct?", a: "It provides confidence scoring — High confidence answers are very reliable." },
      { q: "Can it solve math MCQs?", a: "Yes, it uses step-by-step reasoning for math and logic questions." },
    ]}
    relatedTools={[
      { label: "Summarizer", href: "/summarizer" },
      { label: "Grammar Checker", href: "/grammar-checker" },
      { label: "Sentence Improver", href: "/sentence-improver" },
    ]}
  />;
}