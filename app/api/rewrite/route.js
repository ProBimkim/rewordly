// Basic bot protection — rate limit per IP
const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 menit
  const maxRequests = 20; // max 20 request per menit per IP

  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, []);
  }

  const requests = ipRequests.get(ip).filter(time => now - time < windowMs);
  requests.push(now);
  ipRequests.set(ip, requests);

  return requests.length > maxRequests;
}

const SYSTEM_PROMPT = `You are a high-precision text rewriting system.

Your primary objective:
- Preserve exact semantic meaning
- Avoid hallucination or adding new information
- Maintain logical consistency

You must:
- Ensure clarity and coherence
- Avoid copying original sentence structures
- Produce natural and fluent language

Failure conditions (never do these):
- Meaning shift
- Redundant paraphrasing
- Structural similarity too high
- Adding new facts`;

const PROMPTS = {
  simple: `Rewrite the text to be simple and very easy to understand.
STRICT RULES:
- Break long sentences into shorter ones (max 12 words per sentence)
- Replace every complex or formal word with the simplest everyday alternative
- Remove unnecessary filler words
- Keep meaning 100% intact
- Connect sentences naturally so they flow as a paragraph, not a list
- No jargon, no academic language

STYLE:
- Like explaining to a smart 12-year-old
- Clear, direct, no fluff
- Reads like a paragraph, NOT bullet points or fragments

Constraint:
- Minimum 40% word-level simplification required
- Do NOT keep original sentence structure

OUTPUT: Only the rewritten text, nothing else.`,

  formal: `Rewrite the text in a formal, professional, and academic tone.
STRICT RULES:
- Preserve exact meaning (zero information loss)
- Significantly change sentence structure (minimum 50% restructuring)
- Use formal and precise vocabulary
- Improve logical flow and coherence
- Avoid mirroring original phrasing
- No contractions (use "do not" not "don't")

OUTPUT: Only the rewritten text, nothing else.`,

  natural: `Rewrite the text to sound natural and conversational.
RULES:
- Make it flow like how a smart person would speak
- Keep it clear, warm, and engaging
- Avoid overly formal or stiff language
- Use contractions naturally ("don't", "it's", "we're")
- Preserve meaning exactly
- Different from Simple: don't over-simplify

OUTPUT: Only the rewritten text, nothing else.`,

  creative: `Rewrite the text in a creative and expressive way.
STRICT RULES:
- Preserve original meaning
- Significantly change sentence structure
- Use varied sentence rhythm
- Improve narrative flow
- Avoid original phrasing
STYLE:
- Engaging, Dynamic
- Slightly expressive but still clear
Constraint:
- High transformation (60-80%)

OUTPUT: Only the rewritten text, nothing else.`,
};

const TEMPERATURE = {
  simple: 0.3,
  formal: 0.4,
  natural: 0.6,
  creative: 0.8,
};

function getSimilarityScore(original, rewritten) {
  const a = original.toLowerCase().split(/\s+/);
  const b = rewritten.toLowerCase().split(/\s+/);
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter(w => setB.has(w)).length;
  return intersection / Math.max(setA.size, setB.size);
}

async function callGroq(text, mode, attempt = 1) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT + "\n\n" + PROMPTS[mode] },
        { role: "user", content: `Rewrite this text:\n\n${text}` },
      ],
      max_tokens: 1024,
      temperature: TEMPERATURE[mode] + (attempt > 1 ? 0.15 : 0),
    }),
  });
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

export async function POST(req) {
  const { text, mode, variants = false } = await req.json();

const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  if (!text || text.trim().length < 5) {
    return Response.json({ error: "Text too short" }, { status: 400 });
  }
  if (text.trim().length > 5000) {
    return Response.json({ error: "Text too long (max 5000 characters)" }, { status: 400 });
  }
  if (!["simple", "formal", "natural", "creative"].includes(mode)) {
    return Response.json({ error: "Invalid mode" }, { status: 400 });
  }

  // Mode variants: generate 3 versions
  if (variants) {
    const results = await Promise.all([
      callGroq(text, mode, 1),
      callGroq(text, mode, 2),
      callGroq(text, mode, 3),
    ]);
    const filtered = results.filter(Boolean);
    if (filtered.length === 0) {
      return Response.json({ error: "AI did not return a response" }, { status: 500 });
    }
    return Response.json({ variants: filtered });
  }

  // Single rewrite
  let result = await callGroq(text, mode, 1);
  if (result) {
    const similarity = getSimilarityScore(text, result);
    if (similarity > 0.85) {
      result = await callGroq(text, mode, 2);
    }
  }
  if (!result) {
    return Response.json({ error: "AI did not return a response" }, { status: 500 });
  }

  return Response.json({ result });
}