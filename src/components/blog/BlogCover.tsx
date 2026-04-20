import type { CSSProperties } from "react";

import { BRAND_NAME } from "@/lib/brand";

type Props = {
  slug: string;
  category: string;
  title?: string;
  variant?: "lead" | "card";
  className?: string;
  style?: CSSProperties;
};

const CATEGORY_MOTIFS = {
  "Enforcement Updates": "stamp",
  "Compliance Guides": "stack",
  "Regulation Analysis": "nodes",
  "Industry News": "wave",
  Comparison: "split",
} as const;

type Motif = (typeof CATEGORY_MOTIFS)[keyof typeof CATEGORY_MOTIFS];

function seedFrom(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function mulberry(seed: number) {
  let t = Math.floor(seed * 1e9) + 0x6d2b79f5;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function motifFor(category: string): Motif {
  return (CATEGORY_MOTIFS as Record<string, Motif>)[category] ?? "nodes";
}

function shortCode(slug: string) {
  const parts = slug.split("-").slice(0, 2);
  const base = parts.join("-").replace(/[^a-z0-9-]/gi, "");
  return base.slice(0, 14).toUpperCase();
}

const W = 1400;
const H = 613;

export function BlogCover({ slug, category, title, variant = "lead", className, style }: Props) {
  const motif = motifFor(category);
  const seed = seedFrom(slug);
  const rand = mulberry(seed);
  const code = shortCode(slug);
  const year = new Date().getFullYear();
  const plateNo = String(Math.floor(seed * 899 + 100));

  const gridId = `bc-grid-${slug}`;
  const hatchId = `bc-hatch-${slug}`;
  const noiseId = `bc-noise-${slug}`;
  const softId = `bc-soft-${slug}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      role="img"
      aria-label={title ?? `${category} illustration`}
    >
      <defs>
        <pattern id={gridId} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="var(--line)" strokeOpacity="0.55" strokeWidth="0.7" />
        </pattern>
        <pattern id={hatchId} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.75" strokeOpacity="0.22" />
        </pattern>
        <pattern id={noiseId} x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="transparent" />
          {Array.from({ length: 80 }).map((_, i) => {
            const r = mulberry(seed + i * 0.017)();
            return (
              <circle
                key={i}
                cx={r * 160}
                cy={mulberry(seed + i * 0.031)() * 160}
                r={0.6}
                fill="var(--ink)"
                fillOpacity={0.06 + r * 0.05}
              />
            );
          })}
        </pattern>
        <radialGradient id={softId} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--paper)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base paper */}
      <rect width={W} height={H} fill="var(--paper-2)" />
      <rect width={W} height={H} fill={`url(#${softId})`} />
      <rect width={W} height={H} fill={`url(#${gridId})`} />

      {/* Editorial plate frame */}
      <g stroke="var(--ink)" strokeOpacity="0.7" fill="none" strokeWidth="1">
        <rect x="24" y="24" width={W - 48} height={H - 48} />
        <rect x="34" y="34" width={W - 68} height={H - 68} strokeOpacity="0.25" />
      </g>

      {/* Plate motif */}
      {motif === "stamp" && <StampMotif rand={rand} />}
      {motif === "stack" && <StackMotif rand={rand} />}
      {motif === "nodes" && <NodesMotif rand={rand} />}
      {motif === "wave" && <WaveMotif rand={rand} />}
      {motif === "split" && <SplitMotif rand={rand} />}

      {/* Halftone wash */}
      <rect width={W} height={H} fill={`url(#${noiseId})`} opacity="0.6" />

      {/* Corner chrome — kicker, plate number, year */}
      <g
        fontFamily="var(--font-mono), 'JetBrains Mono', ui-monospace, monospace"
        fontSize="13"
        letterSpacing="2.5"
        fill="var(--ink)"
        fillOpacity="0.85"
      >
        <text x="46" y="66">{category.toUpperCase()}</text>
        <text x={W - 46} y="66" textAnchor="end">
          PLATE № {plateNo}
        </text>
        <text x="46" y={H - 46}>
          {code} · {year}
        </text>
        <text x={W - 46} y={H - 46} textAnchor="end">
          {BRAND_NAME.toUpperCase()}
        </text>
      </g>

      {/* Tick marks on frame like an engineering rule */}
      <g stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1">
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 80 + i * ((W - 160) / 23);
          return <line key={`t-${i}`} x1={x} y1={H - 80} x2={x} y2={H - (i % 4 === 0 ? 62 : 70)} />;
        })}
      </g>

      {variant === "card" && <rect x="0" y="0" width={W} height={H} fill="var(--paper)" fillOpacity="0" />}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   Motifs
   ────────────────────────────────────────────────────────────── */

function StampMotif({ rand }: { rand: () => number }) {
  const cx = 880 + rand() * 120;
  const cy = 300 + rand() * 40;
  const rot = -8 + rand() * 16;
  return (
    <g>
      {/* Redacted bars — simulated form */}
      <g transform="translate(110, 140)">
        {Array.from({ length: 7 }).map((_, i) => {
          const w = 260 + rand() * 320;
          const y = i * 40;
          const isRedacted = rand() > 0.55;
          return (
            <g key={i}>
              <rect x={0} y={y} width={w} height={14} fill={isRedacted ? "var(--ink)" : "var(--line-2)"} fillOpacity={isRedacted ? 0.9 : 0.5} />
              {!isRedacted && (
                <rect x={w + 20} y={y + 3} width={120 + rand() * 120} height={8} fill="var(--line-2)" fillOpacity="0.5" />
              )}
            </g>
          );
        })}
      </g>

      {/* Signature squiggle */}
      <path
        d="M 150 490 C 220 470, 240 510, 310 486 S 410 460, 460 488 S 560 504, 620 476"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />

      {/* Official stamp */}
      <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
        <circle r="142" fill="none" stroke="var(--stone)" strokeWidth="5" strokeOpacity="0.9" />
        <circle r="122" fill="none" stroke="var(--stone)" strokeWidth="1.5" strokeOpacity="0.9" />
        <circle r="96" fill="none" stroke="var(--stone)" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="3 6" />
        <text
          textAnchor="middle"
          y="-18"
          fontFamily="var(--font-serif), 'Fraunces', serif"
          fontSize="30"
          fontWeight="700"
          fill="var(--stone)"
          letterSpacing="3"
        >
          ENFORCED
        </text>
        <line x1="-74" y1="6" x2="74" y2="6" stroke="var(--stone)" strokeWidth="2" />
        <text
          textAnchor="middle"
          y="38"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="14"
          fill="var(--stone)"
          letterSpacing="4"
        >
          FILE · {Math.floor(rand() * 9000 + 1000)}
        </text>
      </g>
    </g>
  );
}

function StackMotif({ rand }: { rand: () => number }) {
  const rows = 9;
  return (
    <g>
      {/* Checklist plate on left */}
      <g transform="translate(110, 150)">
        <rect x="0" y="0" width="420" height="320" fill="var(--paper)" stroke="var(--ink)" strokeOpacity="0.55" />
        <line x1="0" y1="40" x2="420" y2="40" stroke="var(--ink)" strokeOpacity="0.35" />
        <text x="20" y="27" fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="12" letterSpacing="2" fill="var(--ink)">
          § CHECKLIST
        </text>
        {Array.from({ length: rows }).map((_, i) => {
          const y = 70 + i * 28;
          const checked = rand() > 0.35;
          return (
            <g key={i}>
              <rect x={20} y={y - 12} width={16} height={16} fill="none" stroke="var(--ink)" strokeWidth="1.2" />
              {checked && (
                <path d={`M ${23} ${y - 4} L ${28} ${y + 1} L ${34} ${y - 9}`} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
              )}
              <rect x={48} y={y - 6} width={220 + rand() * 140} height={6} fill="var(--line-2)" fillOpacity="0.6" />
            </g>
          );
        })}
      </g>

      {/* Stacked rule sheets on right */}
      <g transform="translate(700, 120)">
        {Array.from({ length: 6 }).map((_, i) => {
          const off = i * 18;
          return (
            <g key={i} transform={`translate(${off}, ${off})`}>
              <rect
                x="0"
                y="0"
                width="440"
                height="360"
                fill={i === 5 ? "var(--paper)" : "var(--paper-2)"}
                stroke="var(--ink)"
                strokeOpacity={0.25 + i * 0.08}
                strokeWidth="1"
              />
              {i === 5 && (
                <>
                  <rect x="28" y="36" width="120" height="8" fill="var(--accent)" />
                  {Array.from({ length: 9 }).map((_, k) => (
                    <rect key={k} x={28} y={68 + k * 22} width={260 + (k % 3) * 60} height={5} fill="var(--line-2)" fillOpacity="0.7" />
                  ))}
                  <rect x="28" y="300" width="80" height="28" fill="var(--gold)" />
                </>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
}

function NodesMotif({ rand }: { rand: () => number }) {
  const nodes = Array.from({ length: 9 }).map((_, i) => ({
    x: 160 + rand() * 1080,
    y: 140 + rand() * 320,
    r: 12 + rand() * 24,
    k: i,
  }));
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.hypot(dx, dy) < 340 && rand() > 0.4) edges.push([i, j]);
    }
  }
  return (
    <g>
      {/* Annotations */}
      <g fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="11" fill="var(--ink)" fillOpacity="0.55" letterSpacing="1.4">
        <text x="110" y="140">FIG. A — NETWORK OF OBLIGATIONS</text>
      </g>

      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        return (
          <line
            key={`e-${i}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="var(--ink)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        );
      })}

      {nodes.map((n, i) => {
        const highlight = i === 0 || i === 4;
        const gold = i === nodes.length - 1;
        return (
          <g key={n.k}>
            <circle cx={n.x} cy={n.y} r={n.r + 8} fill="var(--paper)" />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={gold ? "var(--gold)" : highlight ? "var(--accent)" : "var(--paper)"}
              stroke={gold ? "var(--ink)" : "var(--accent)"}
              strokeWidth={highlight || gold ? 2 : 1.5}
              strokeOpacity={0.9}
            />
            {highlight && <circle cx={n.x} cy={n.y} r={n.r - 6} fill="var(--paper)" />}
          </g>
        );
      })}
    </g>
  );
}

function WaveMotif({ rand }: { rand: () => number }) {
  const baselines = [260, 340, 420];
  const paths = baselines.map((by, idx) => {
    let d = `M 80 ${by}`;
    for (let x = 80; x <= 1320; x += 40) {
      const amp = 24 + rand() * 40 + idx * 8;
      const off = rand() * 20;
      d += ` L ${x + 20} ${by - amp + off} L ${x + 40} ${by + off - 8}`;
    }
    return d;
  });
  return (
    <g>
      <g fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="11" fill="var(--ink)" fillOpacity="0.55" letterSpacing="1.4">
        <text x="110" y="140">TICKER · DAILY BRIEF</text>
      </g>

      {/* Candlesticks */}
      <g>
        {Array.from({ length: 32 }).map((_, i) => {
          const x = 120 + i * 38;
          const h = 40 + rand() * 140;
          const up = rand() > 0.45;
          const y = 180 + rand() * 180;
          return (
            <g key={i}>
              <line x1={x} y1={y - 16} x2={x} y2={y + h + 16} stroke="var(--ink)" strokeOpacity="0.35" />
              <rect
                x={x - 6}
                y={y}
                width={12}
                height={h}
                fill={up ? "var(--accent)" : "var(--gold)"}
                opacity={0.9}
              />
            </g>
          );
        })}
      </g>

      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i === 1 ? "var(--accent)" : "var(--ink)"}
          strokeOpacity={i === 1 ? 0.9 : 0.35}
          strokeWidth={i === 1 ? 2 : 1}
        />
      ))}
    </g>
  );
}

function SplitMotif({ rand }: { rand: () => number }) {
  const cols = 2;
  const mid = W / 2;
  return (
    <g>
      {/* Divider */}
      <line x1={mid} y1={80} x2={mid} y2={H - 80} stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="4 6" />

      {/* Column headers */}
      <g fontFamily="var(--font-mono), ui-monospace, monospace" fontSize="11" fill="var(--ink)" fillOpacity="0.65" letterSpacing="2">
        <text x="110" y="140">SUBJECT · A</text>
        <text x={mid + 28} y="140">SUBJECT · B</text>
      </g>

      {/* Two tables */}
      {Array.from({ length: cols }).map((_, c) => {
        const x0 = c === 0 ? 110 : mid + 28;
        const color = c === 0 ? "var(--accent)" : "var(--gold)";
        return (
          <g key={c} transform={`translate(${x0}, 170)`}>
            <rect x="0" y="0" width="540" height="44" fill={color} opacity={0.15} />
            <rect x="0" y="0" width="6" height="44" fill={color} />
            <rect x="20" y="14" width="180" height="14" fill={color} />

            {Array.from({ length: 6 }).map((_, r) => {
              const y = 70 + r * 44;
              const bar = 80 + rand() * 380;
              return (
                <g key={r}>
                  <line x1="0" y1={y + 30} x2="540" y2={y + 30} stroke="var(--line)" />
                  <rect x="0" y={y} width="6" height="30" fill="var(--ink)" fillOpacity="0.25" />
                  <rect x="20" y={y + 10} width={bar} height="10" fill={color} opacity="0.8" />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

export default BlogCover;
