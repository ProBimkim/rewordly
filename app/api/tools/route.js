const SYSTEM_PROMPT = `You are a professional AI writing assistant. 
Always preserve meaning, never hallucinate, never add false information.
Output ONLY the result text, no explanations, no labels.`;

const TOOL_PROMPTS = {
  "blog-writer": `You are an expert SEO blog writer.
Write a complete, well-structured blog post based on the topic given.
RULES:
- Include an engaging introduction
- Use clear headings (H2 style, written as plain text with ## prefix)
- Write at least 400 words
- Include a conclusion
- SEO optimized, natural language
- Do NOT use markdown symbols except ## for headings
OUTPUT: Only the blog post content.`,

  "humanizer": `You are an expert at making AI-generated text sound naturally human.
Rewrite the text so it:
- Sounds like a real person wrote it
- Has natural rhythm and varied sentence length
- Removes robotic or repetitive patterns
- Keeps the exact same meaning
- Passes AI detection tools
OUTPUT: Only the humanized text.`,

  "grammar-checker": `You are a professional grammar and spelling editor.
Fix ALL grammar, spelling, punctuation, and sentence structure errors in the text.
RULES:
- Keep the original meaning and tone
- Fix all errors
- Do not rewrite unnecessarily
- If text is already correct, return it as-is with note "No errors found."
OUTPUT: Only the corrected text.`,

  "sentence-improver": `You are a professional writing coach.
Improve the given sentences to be clearer, more engaging, and better structured.
RULES:
- Keep the original meaning
- Improve word choice and flow
- Make it more compelling to read
- Do not change the core message
OUTPUT: Only the improved text.`,

  "summarizer": `You are an expert at summarizing text.
Create a clear, concise summary of the given text.
RULES:
- Capture all key points
- Reduce to 20-30% of original length
- Use clear, simple language
- Keep bullet points if content is list-like
OUTPUT: Only the summary.`,

  "email-generator": `You are a professional email writer.
Write a complete, professional email based on the description or topic given.
RULES:
- Include subject line (prefix with "Subject: ")
- Professional but warm tone
- Clear structure: greeting, body, closing
- Concise and effective
OUTPUT: Only the complete email including subject line.`,

  "marketing-copy": `You are an expert copywriter and marketing specialist.
Write compelling marketing copy based on the product or description given.
RULES:
- Attention-grabbing headline
- Focus on benefits not features
- Include a call to action
- Persuasive but honest tone
- No false claims
OUTPUT: Only the marketing copy.`,

  "product-description": `You are an expert ecommerce copywriter.
Write a compelling product description based on the product details given.
RULES:
- Engaging opening line
- Highlight key features and benefits
- SEO-friendly language
- 100-200 words
- End with a subtle call to action
OUTPUT: Only the product description.`,
};

const TEMPERATURE = {
  "blog-writer": 0.7,
  "humanizer": 0.6,
  "grammar-checker": 0.2,
  "sentence-improver": 0.5,
  "summarizer": 0.3,
  "email-generator": 0.5,
  "marketing-copy": 0.7,
  "product-description": 0.6,
};

async function callGroq(text, tool) {
  const prompt = TOOL_PROMPTS[tool];
  if (!prompt) throw new Error("Invalid tool");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT + "\n\n" + prompt },
        { role: "user", content: text },
      ],
      max_tokens: 2048,
      temperature: TEMPERATURE[tool] || 0.5,
    }),
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

export async function POST(req) {
  const { text, tool } = await req.json();

  if (!text || text.trim().length < 3) {
    return Response.json({ error: "Text too short" }, { status: 400 });
  }
  if (!TOOL_PROMPTS[tool]) {
    return Response.json({ error: "Invalid tool" }, { status: 400 });
  }

  const result = await callGroq(text, tool);

  if (!result) {
    return Response.json({ error: "AI did not return a response" }, { status: 500 });
  }

  return Response.json({ result });
}