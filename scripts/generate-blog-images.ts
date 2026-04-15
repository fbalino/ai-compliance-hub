/**
 * generate-blog-images.ts
 *
 * Generates cover images for all blog posts via the Google Imagen API,
 * compresses them with sharp, and saves to public/images/blog/[slug].jpg.
 *
 * Usage:
 *   GEMINI_API_KEY=<key> tsx scripts/generate-blog-images.ts
 *   # or, if set in .env.local:
 *   tsx scripts/generate-blog-images.ts
 *
 * Idempotent: skips slugs that already have an image on disk.
 *
 * Model: imagen-4.0-fast-generate-001 (Imagen 4 Fast)
 * Docs: https://ai.google.dev/gemini-api/docs/imagen
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

// ──────────────────────────────────────────────────────────────────────────────
// Config
// ──────────────────────────────────────────────────────────────────────────────

// Load .env.local manually so the script works outside Next.js context
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const lines = fs.readFileSync(envLocalPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌  GEMINI_API_KEY is not set. Add it to .env.local or export it.");
  process.exit(1);
}

// Imagen 4 Fast — current fastest model (docs: https://ai.google.dev/gemini-api/docs/imagen)
// The task referenced imagen-3.0-fast-generate-001 but Imagen 4 is the current generation.
const MODEL = "imagen-4.0-fast-generate-001";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict`;

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "blog");
const MAX_BYTES = 150 * 1024; // 150 KB
const MIN_QUALITY = 80;

// ──────────────────────────────────────────────────────────────────────────────
// Blog posts with image generation prompts
// Professional B2B style: dark navy palette, clean abstract/tech imagery,
// no text in image. Style is consistent across all posts.
// Prompts can be regenerated once UX Designer publishes guidelines (AIC-21).
// ──────────────────────────────────────────────────────────────────────────────

const POSTS: Array<{ slug: string; prompt: string }> = [
  {
    slug: "how-to-prepare-for-colorado-ai-act-june-2026",
    prompt:
      "Professional B2B illustration: a clean digital compliance checklist on a glowing tablet screen, dark navy blue background, teal accent lines, minimalist corporate style, abstract data nodes, no text, 16:9",
  },
  {
    slug: "virginia-hb-2094-what-businesses-need-to-know",
    prompt:
      "Professional corporate illustration: abstract state capitol dome silhouette integrated with flowing digital data streams, dark navy and slate blue palette, clean geometric lines, no text, 16:9",
  },
  {
    slug: "request-for-quote-ai-bias-audit-what-to-expect",
    prompt:
      "Professional B2B illustration: abstract scales of justice merged with AI neural network nodes, dark navy blue background, cool teal accent glow, balanced geometric composition, no text, 16:9",
  },
  {
    slug: "nist-ai-rmf-explainer-for-compliance-teams",
    prompt:
      "Professional tech illustration: structured risk management framework depicted as an interconnected grid of glowing nodes on dark navy, four quadrants suggesting governance structure, teal and slate blue, no text, 16:9",
  },
  {
    slug: "colorado-ai-act-2026-deadline",
    prompt:
      "Professional corporate illustration: abstract mountain silhouette with glowing digital calendar grid overlay, dark navy background, teal highlight on June date, clean minimalist B2B style, no text, 16:9",
  },
  {
    slug: "eu-ai-act-gpai-obligations",
    prompt:
      "Professional B2B illustration: abstract circle of stars pattern (EU motif) interwoven with neural network connections, dark navy background, deep gold and teal accent lines, clean corporate tech style, no text, 16:9",
  },
  {
    slug: "nyc-ll-144-enforcement-update",
    prompt:
      "Professional corporate illustration: abstract NYC skyline silhouette with legal enforcement gavel icon rendered as glowing geometric shape, dark navy and slate blue, teal accent lines, no text, 16:9",
  },
  {
    slug: "bias-audit-guide",
    prompt:
      "Professional B2B illustration: step-by-step flow diagram with abstract human silhouettes connected by AI data nodes, dark navy background, clean teal and white lines, corporate minimalist, no text, 16:9",
  },
  {
    slug: "texas-ai-regulation-2026",
    prompt:
      "Professional corporate illustration: abstract lone star geometric shape integrated with digital regulatory framework grid, dark navy background, warm gold and teal accents, clean B2B tech style, no text, 16:9",
  },
  {
    slug: "ai-governance-program-guide",
    prompt:
      "Professional B2B illustration: organizational hierarchy chart merging seamlessly into an AI neural network, dark navy background, teal gradient accent lines, clean corporate minimalist style, no text, 16:9",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Image generation
// ──────────────────────────────────────────────────────────────────────────────

interface ImagenResponse {
  predictions?: Array<{
    bytesBase64Encoded?: string;
    mimeType?: string;
  }>;
  // Newer SDK format
  generatedImages?: Array<{
    image?: { imageBytes?: string };
  }>;
}

async function generateImage(prompt: string): Promise<Buffer> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY!,
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9",
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Imagen API error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as ImagenResponse;

  // Handle both REST API response formats
  let b64: string | undefined;
  if (data.predictions?.[0]?.bytesBase64Encoded) {
    b64 = data.predictions[0].bytesBase64Encoded;
  } else if (data.generatedImages?.[0]?.image?.imageBytes) {
    b64 = data.generatedImages[0].image.imageBytes;
  }

  if (!b64) {
    throw new Error(`No image bytes in response: ${JSON.stringify(data).slice(0, 300)}`);
  }

  return Buffer.from(b64, "base64");
}

async function compressToJpeg(imageBuffer: Buffer, slug: string): Promise<Buffer> {
  let quality = 85;
  let result: Buffer;

  do {
    result = await sharp(imageBuffer)
      .resize(1200, 675, { fit: "cover" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    if (result.byteLength <= MAX_BYTES || quality <= MIN_QUALITY) break;
    quality -= 5;
  } while (quality >= MIN_QUALITY);

  const kb = (result.byteLength / 1024).toFixed(1);
  console.log(`   Compressed: ${kb} KB at quality ${quality} — ${slug}.jpg`);
  return result;
}

async function processSlug(slug: string, prompt: string): Promise<void> {
  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);

  if (fs.existsSync(outPath)) {
    const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`⏭️  Skip   ${slug}.jpg (already exists, ${kb} KB)`);
    return;
  }

  console.log(`🎨  Generating ${slug}...`);
  try {
    const rawBuffer = await generateImage(prompt);
    const jpegBuffer = await compressToJpeg(rawBuffer, slug);
    fs.writeFileSync(outPath, jpegBuffer);
    console.log(`✅  Saved   public/images/blog/${slug}.jpg`);
  } catch (err) {
    console.error(`❌  Failed  ${slug}: ${err instanceof Error ? err.message : err}`);
    throw err;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📸  Blog image generator — model: ${MODEL}\n`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Process sequentially to avoid rate-limiting the free-tier Imagen API
  for (const { slug, prompt } of POSTS) {
    await processSlug(slug, prompt);
  }

  console.log("\n✨  Done. All images are in public/images/blog/\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
