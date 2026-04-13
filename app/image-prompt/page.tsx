import ToolPage from "../ToolPage";
export default function Page() {
  return <ToolPage
    toolId="image-prompt"
    title="AI Image Prompt Generator"
    icon="🎨"
    color="#f472b6"
    description="Generate detailed, optimized prompts for Midjourney, DALL-E, and Stable Diffusion. Turn your idea into a perfect AI image prompt."
    placeholder="Describe the image you want to create, e.g: 'A futuristic city at night with neon lights and flying cars'"
    outputLabel="Generated Image Prompt"
    faqs={[
      { q: "What image generators does this work with?", a: "Midjourney, DALL-E 3, Stable Diffusion, Adobe Firefly, and most AI image tools." },
      { q: "Does it include negative prompts?", a: "Yes, every output includes a negative prompt to avoid unwanted elements." },
      { q: "Can I request portraits of real people?", a: "For safety and legal reasons, prompts for real person faces are not supported." },
    ]}
    relatedTools={[
      { label: "Marketing Copy", href: "/marketing-copy" },
      { label: "AI Blog Writer", href: "/ai-blog-writer" },
      { label: "Product Description", href: "/product-description" },
    ]}
  />;
}