// app/api/image-proxy/route.js
// Proxy for fetching images from Pollinations to avoid CORS/timeout in browser

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");
  const seed = searchParams.get("seed") || "42";

  if (!prompt) {
    return new Response("Missing prompt", { status: 400 });
  }

  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    const imageRes = await fetch(pollinationsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BantuGwehAI/1.0)",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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
    const isTimeout = err.name === "AbortError";
    return new Response(
      isTimeout ? "Image generation timed out" : "Failed to fetch image",
      { status: isTimeout ? 504 : 502 }
    );
  }
}