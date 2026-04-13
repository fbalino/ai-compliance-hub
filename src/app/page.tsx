// This file intentionally left as a redirect shim.
// The actual homepage lives in src/app/(site)/page.tsx.
// Next.js App Router: route groups (parentheses) don't affect the URL,
// so (site)/page.tsx already handles "/".
// This file should not coexist — keeping it here would cause a route conflict.
// It is replaced by the (site) route group layout.
export { default } from "@/app/(site)/page";
