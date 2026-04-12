import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="email-generator"
    title="AI Email Generator"
    icon="📧"
    color="#fb923c"
    description="Write professional emails in seconds. Just describe what you need and our AI generates a complete, polished email."
    placeholder="Describe the email you need, e.g: 'Write a follow-up email to a client about a pending invoice'"
    outputLabel="Generated Email"
    faqs={[
      { q: "What types of emails can it write?", a: "Business emails, follow-ups, apologies, proposals, cold outreach, and more." },
      { q: "Does it include a subject line?", a: "Yes, every generated email includes a subject line." },
      { q: "Can I edit the output?", a: "Yes, copy the result and customize it as needed." },
    ]}
    relatedTools={[
      { label: "Marketing Copy", href: "/marketing-copy" },
      { label: "AI Rewriter", href: "/ai-rewriter" },
      { label: "Sentence Improver", href: "/sentence-improver" },
    ]}
  />;
}