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
const FORCE = process.argv.includes("--force");

// ──────────────────────────────────────────────────────────────────────────────
// Blog posts with image generation prompts
// Style: AIC-21 visual guidelines — photorealistic 3D render, deep navy
// backgrounds (#1e3a8a to #172554), electric blue/cyan accents, abstract
// governance/compliance subject matter, no human figures, text-safe 16:9
// composition (left third clean for text overlay).
// ──────────────────────────────────────────────────────────────────────────────

const POSTS: Array<{ slug: string; prompt: string }> = [
  {
    slug: "how-to-prepare-for-colorado-ai-act-june-2026",
    prompt:
      "Dark navy abstract 3D render of a hierarchical regulatory compliance checklist structure, geometric nodes interconnected by glowing data pathways representing state AI Act requirements, structured framework with document hierarchy flows, deep navy background (#1e3a8a to #172554), subtle low-opacity hex-grid texture, precise ambient occlusion shadows, cool electric blue and cyan accent highlights on focal nodes, photorealistic 3D render with shallow depth of field, left third clean dark navy space for text overlay, right two-thirds focal composition, 16:9 landscape, minimal professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "virginia-hb-2094-what-businesses-need-to-know",
    prompt:
      "Dark navy abstract 3D render of regulatory framework chains forming a structured legislative architecture, geometric compliance nodes connected by glowing pathway networks, document hierarchy flows against deep navy background (#1e3a8a to #172554), subtle hex-mesh background texture at low opacity, focal compliance structure at right-of-center with restrained electric blue and cyan luminescence, photorealistic 3D render with ambient occlusion, left third clean dark navy space for text overlay, 16:9 landscape, professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "request-for-quote-ai-bias-audit-what-to-expect",
    prompt:
      "Dark navy abstract 3D render of a structured data lattice with balanced dual-framework geometric forms suggesting precision evaluation and measurement, interconnected compliance audit nodes with glowing cyan accent highlights, deep navy background (#172554 to #1e3a8a), subtle low-opacity hex-grid texture, ambient occlusion shadows on precise geometric forms, focal element at right-of-center with restrained luminescence, shallow depth of field, left third clean dark navy space for text overlay, 16:9 landscape, minimal B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "nist-ai-rmf-explainer-for-compliance-teams",
    prompt:
      "Dark navy abstract 3D render of interconnected governance framework architecture, four-pillar structured compliance network with hierarchical nodes connected by glowing data pathways suggesting risk management quadrants, deep navy background (#1e3a8a to #172554), subtle hex-mesh texture at low opacity, cool electric blue and cyan accent lighting on focal governance structure, photorealistic 3D render with ambient occlusion and shallow depth of field, left third clean dark space for text overlay, right two-thirds primary composition, 16:9 landscape, professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "colorado-ai-act-2026-deadline",
    prompt:
      "Dark navy abstract 3D render of a regulatory timeline structure, geometric compliance checkpoint nodes arranged in hierarchical sequence with glowing progression pathways suggesting milestone tracking, structured framework with document flows, deep navy background (#172554), subtle low-opacity hex-grid texture, cool electric blue and cyan accent highlights on milestone nodes, photorealistic 3D render with ambient occlusion, focal structure at right-of-center, left third clean dark navy space for text overlay, 16:9 landscape composition, minimal professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "eu-ai-act-gpai-obligations",
    prompt:
      "Dark navy abstract 3D render of an interconnected regulatory compliance network with hierarchical governance nodes representing EU AI Act GPAI framework, structured geometric compliance tree diagram with flowing data pathways, deep navy background (#1e3a8a to #172554), subtle low-opacity hex-grid texture, precise ambient occlusion shadows, cool electric blue and cyan accent highlights on focal governance nodes, photorealistic 3D render with shallow depth of field, left third clean dark space for text overlay, right two-thirds focal composition, 16:9 landscape, minimal professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "nyc-ll-144-enforcement-update",
    prompt:
      "Dark navy abstract 3D render of a structured enforcement framework architecture, hierarchical compliance nodes with geometric shield motif dissolved into clean data lattice forms, regulatory framework chains against deep navy background (#1e3a8a to #172554), subtle hex-mesh texture at low opacity, electric blue and cyan accent glow on focal enforcement structure at right-of-center, photorealistic 3D render with ambient occlusion and restrained luminescence, left third clean dark space for text overlay, 16:9 landscape, professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "bias-audit-guide",
    prompt:
      "Dark navy abstract 3D render of a systematic evaluation framework with structured data lattice and analytical node network, geometric measurement forms with precise compliance pathway connections, deep navy background (#172554 to #1e3a8a), subtle low-opacity hex-grid texture, cool cyan and electric blue accent highlights on focal audit nodes at right-of-center, photorealistic 3D render with ambient occlusion and shallow depth of field, left third clean dark space for text overlay, 16:9 landscape composition, minimal professional B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "texas-ai-regulation-2026",
    prompt:
      "Dark navy abstract 3D render of a regulatory framework structure with hierarchical compliance nodes and geometric data lattice representing state AI legislation architecture, interconnected governance pathways against deep navy background (#1e3a8a to #172554), subtle hex-mesh background texture at low opacity, precise ambient occlusion shadows, cool electric blue and cyan accent highlights on focal compliance nodes at right-of-center, photorealistic 3D render with shallow depth of field, left third clean dark space for text overlay, 16:9 landscape, minimal B2B aesthetic, no human figures, no text in image",
  },
  {
    slug: "ai-governance-program-guide",
    prompt:
      "Dark navy abstract 3D render of a hierarchical organizational governance architecture, interconnected compliance network nodes forming a structured AI governance framework, document hierarchy flows with regulatory framework chains, deep navy background (#1e3a8a to #172554), subtle low-opacity hex-grid texture, precise ambient occlusion shadows with restrained glow on focal governance nodes, cool electric blue and cyan accent highlights, photorealistic 3D render with shallow depth of field, focal structure at right-of-center, left third clean dark space for text overlay, 16:9 landscape, minimal professional B2B aesthetic, no human figures, no text in image",
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

  if (fs.existsSync(outPath) && !FORCE) {
    const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`⏭️  Skip   ${slug}.jpg (already exists, ${kb} KB — use --force to regenerate)`);
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
