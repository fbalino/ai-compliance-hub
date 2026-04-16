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
 * Flags:
 *   --force   Overwrite existing images
 *   --v2      Generate alternative style images saved as [slug]-v2.jpg
 *
 * Idempotent: skips slugs that already have an image on disk.
 *
 * Model: imagen-4.0-generate-001 (Imagen 4 Standard)
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
  console.error("[error] GEMINI_API_KEY is not set. Add it to .env.local or export it.");
  process.exit(1);
}

// Gemini 3 Pro Image (nano banana pro) — uses generateContent, not the Imagen predict endpoint
// Docs: https://ai.google.dev/gemini-api/docs/image-generation
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "blog");
const MAX_BYTES = 150 * 1024; // 150 KB
const MIN_QUALITY = 80;
const FORCE = process.argv.includes("--force");
const V2 = process.argv.includes("--v2");

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
// V2: Alternative style — bright editorial, clean professional photography
// Style: Crisp light backgrounds (soft white to warm pearl), real-world
// compliance metaphors (documents, scales, checklists), natural window light,
// professional desk/office context, muted slate-blue accents, editorial calm
// with strong negative space. No dark navy, no 3D renders.
// ──────────────────────────────────────────────────────────────────────────────

const POSTS_V2: Array<{ slug: string; prompt: string }> = [
  {
    slug: "how-to-prepare-for-colorado-ai-act-june-2026",
    prompt:
      "Clean professional editorial photograph of a minimalist compliance checklist on premium white paper, organized on a bright white desk with soft natural window light casting gentle shadows, slate-blue pen and subtle geometric ruler detail, muted corporate blue accents, crisp white and warm pearl background, wide negative space on left third for text overlay, 16:9 landscape, no people, no text visible on paper, calm editorial B2B aesthetic",
  },
  {
    slug: "virginia-hb-2094-what-businesses-need-to-know",
    prompt:
      "Clean editorial photograph of formal legislative documents with an engraved state seal detail, neatly arranged on a bright white marble surface with soft natural sidelighting, cool slate-blue folder and clean pen beside the documents, wide empty white space on left third for text overlay, 16:9 landscape, warm natural light, muted professional B2B aesthetic, no people, no legible text",
  },
  {
    slug: "request-for-quote-ai-bias-audit-what-to-expect",
    prompt:
      "Crisp editorial photograph of a precision measurement instrument and calibration blocks arranged on a clean white surface, soft diffused studio lighting with warm undertones, slate-blue geometric accent element, wide negative white space on left third for text overlay, 16:9 landscape, calm minimal professional B2B aesthetic, no people, no text visible",
  },
  {
    slug: "nist-ai-rmf-explainer-for-compliance-teams",
    prompt:
      "Editorial photograph of four clean printed framework cards fanned on a bright white desk, soft natural sidelighting, minimal geometric diagram visible on card surfaces but not legible, slate-blue binding clip, warm white and light pearl background tones, wide empty space on left third for text overlay, 16:9 landscape, professional editorial B2B aesthetic, no people",
  },
  {
    slug: "colorado-ai-act-2026-deadline",
    prompt:
      "Clean editorial photograph of a minimal desk calendar open to a key date page, crisp white and cream paper tones, soft natural light from upper left, slate-blue ribbon bookmark and clean pen, wide white negative space on left third for text overlay, 16:9 landscape, editorial calm B2B aesthetic, no people, no legible calendar text",
  },
  {
    slug: "eu-ai-act-gpai-obligations",
    prompt:
      "Editorial photograph of a EU-inspired arrangement of formal regulation documents with a subtle circular motif, bright white and soft ivory surface, gentle studio window light, cool slate-blue document folder, clean modern geometry with wide negative space on left third for text overlay, 16:9 landscape, professional editorial B2B aesthetic, no people, no legible text",
  },
  {
    slug: "nyc-ll-144-enforcement-update",
    prompt:
      "Clean editorial photograph of an official notice document with a subtle city seal watermark, placed on a bright white surface with sharp natural sidelighting, dark slate-blue pen and geometric ruler, warm white background, wide empty white space on left third for text overlay, 16:9 landscape, minimal professional editorial aesthetic, no people, no legible text",
  },
  {
    slug: "bias-audit-guide",
    prompt:
      "Editorial photograph of a balanced analytical scale with precision weights on a clean white marble surface, soft studio light from upper right, cool slate-blue accents, clean geometric forms, wide white negative space on left third for text overlay, 16:9 landscape, calm minimal B2B professional aesthetic, no people, no text",
  },
  {
    slug: "texas-ai-regulation-2026",
    prompt:
      "Clean editorial photograph of a formal regulation document with a subtle lone star watermark detail, arranged on a bright white surface with soft warm natural light from upper left, slate-blue binding strip and clean pen, wide white negative space on left third for text overlay, 16:9 landscape, professional editorial B2B aesthetic, no people, no legible text",
  },
  {
    slug: "ai-governance-program-guide",
    prompt:
      "Editorial photograph of an organizational chart printed in clean minimal style on premium white paper, arranged on a bright white desk with soft natural sidelighting, slate-blue connecting lines visible on the chart, neutral pen and ruler accent, wide white negative space on left third for text overlay, 16:9 landscape, calm professional B2B editorial aesthetic, no people, no legible text",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Image generation
// ──────────────────────────────────────────────────────────────────────────────

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
        inlineData?: { mimeType?: string; data?: string };
        inline_data?: { mimeType?: string; data?: string };
      }>;
    };
  }>;
  error?: { message: string; status: string };
}

async function generateImage(prompt: string): Promise<Buffer> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY!,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: "16:9" },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as GeminiResponse;

  if (data.error) {
    throw new Error(`Gemini API error: ${data.error.message}`);
  }

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    // API may use camelCase or snake_case for inline data
    const inlineData = part.inlineData ?? part.inline_data;
    if (inlineData?.data) {
      return Buffer.from(inlineData.data, "base64");
    }
  }

  throw new Error(`No image in response: ${JSON.stringify(data).slice(0, 400)}`);
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

async function processSlug(slug: string, prompt: string, suffix = ""): Promise<"ok" | "skipped" | "failed"> {
  const filename = `${slug}${suffix}.jpg`;
  const outPath = path.join(OUTPUT_DIR, filename);

  if (fs.existsSync(outPath) && !FORCE) {
    const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`[skip]  ${filename} (already exists, ${kb} KB — use --force to regenerate)`);
    return "skipped";
  }

  console.log(`[gen]   Generating ${filename}...`);
  try {
    const rawBuffer = await generateImage(prompt);
    const jpegBuffer = await compressToJpeg(rawBuffer, slug + suffix);
    fs.writeFileSync(outPath, jpegBuffer);
    console.log(`[saved] public/images/blog/${filename}`);
  } catch (err) {
    console.error(`[error] ${filename}: ${err instanceof Error ? err.message : err}`);
    // Non-fatal: continue to next image rather than aborting the batch
    return "failed";
  }
  return "ok";
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────

async function main() {
  const posts = V2 ? POSTS_V2 : POSTS;
  const suffix = V2 ? "-v2" : "";
  const styleLabel = V2 ? "v2 (bright editorial)" : "v1 (dark navy 3D)";

  console.log(`\nBlog image generator — model: ${MODEL} — style: ${styleLabel}\n`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Process sequentially to avoid rate-limiting the Gemini API
  const failed: string[] = [];
  for (const { slug, prompt } of posts) {
    const result = await processSlug(slug, prompt, suffix);
    if (result === "failed") failed.push(slug);
  }

  if (failed.length > 0) {
    console.log(`\n[warn] ${failed.length} image(s) failed — re-run to retry (script is idempotent):`);
    failed.forEach((s) => console.log(`   • ${s}${suffix}.jpg`));
    process.exit(1);
  }

  console.log("\nDone. All images are in public/images/blog/\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
