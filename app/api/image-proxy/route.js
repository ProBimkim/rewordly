// app/api/image-proxy/route.js
// Proxy untuk fetch gambar dari Pollinations agar tidak kena CORS/timeout di browser

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");
  const seed = searchParams.get("seed") || "42";

  if (!prompt) {
    return new Response("Missing prompt", { status: 400 });
  }

  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

  try {
    const imageRes = await fetch(pollinationsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RewordlyAI/1.0)",
      },
      // Server-side fetch tidak kena CORS
    });

    if (!imageRes.ok) {
      throw new Error(`Pollinations returned ${imageRes.status}`);
    }

    const imageBuffer = await imageRes.arrayBuffer();
    const contentType = imageRes.headers.get("content-type") || "image/jpeg";

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new Response("Failed to fetch image", { status: 502 });
  }
}