# Regulome — Full Audit & Handoff Report

_Generated 2026-06-21. Method: two multi-agent workflows (a 7-dimension codebase health sweep with adversarial verification, and a 15-agent regulation web-verification sweep), plus direct build/test/DNS checks and independent spot-verification of the highest-stakes findings._

**Companion file:** [`regulations-accuracy.md`](regulations-accuracy.md) — the full per-regulation accuracy audit with sources (read alongside §4 below).

---

## 0. TL;DR — what actually matters

1. **Your regulation content is the biggest problem, not the code.** 14 of 15 regulation pages have factual inaccuracies. Several describe *the wrong version of the law* — Colorado's body still teaches the **repealed** SB 24-205, and Texas TRAIGA describes obligations that were **deleted before the bill passed**. This is a credibility risk for a legal-accuracy product. (§4)
2. **A live, indexed lead-gen page is broadcasting wrong legal dates.** `public/resources/ai-compliance-checklist.html` still says Colorado's deadline is "June 30, 2026 — 47 days away," and its Google structured-data emits *three different wrong dates*. (§5, 🔴)
3. **The outreach can't go out yet — and not just because of approval.** `regulome.io` has **no mailbox** (no MX/SPF/DMARC). You literally cannot send or receive mail from a `@regulome.io` address today. The fix is small but it's a prerequisite. (§3)
4. **The code is in good shape.** `npm run build` passes clean. The bugs found are real but mostly medium/low and contained (a broken directory filter, search that ignores articles, a checker crash-path). No critical security holes. (§5)
5. **Revenue is still off** (Stripe live keys missing) and **rank tracking is still unconfigured** (GSC/Ahrefs) — both need *you*, both unchanged since the handoff. (§2)

---

## 1. The handoff file — what's going on

`plan/handoff.md` is the record of a previous agent moving the project **off Paperclip**. The important parts, in plain terms:

- **The folder situation is solved.** Your one real folder is `/Users/fernandobalino/Projects/regulome`. The two `_archive-*` folders are old/stale copies, safe to delete once you're comfortable. The live site deploys: you edit here → `git push` → Vercel builds → `regulome.io` updates. No Paperclip needed.
- **There are 28 leftover "inbox" items** from Paperclip, grouped into themes (revenue, SEO/backlinks, content, a proposed feature, growth). Many are **duplicates of each other**.
- **A stale fact poisoned a lot of those items:** they were written around a "Colorado deadline of June 30, 2026," which is now **January 1, 2027**. The handoff already flags this — and my audit found the stale date still lives in several shipped + draft files (§5).

My read: the handoff is accurate and well-organized. The two things it **under-weights** are (a) the *depth* of the regulation-accuracy problem — it only flags Colorado, but the rot is system-wide (§4), and (b) the email-sending blocker (§3), which it doesn't mention.

---

## 2. What needs *you* vs. what's execution work

### Needs you (decisions / accounts — can't be done from code)
| Item | What | Handoff ref |
|---|---|---|
| 💰 **Turn on payments** | Add **live** Stripe keys (`sk_live_…`, `pk_live_…`, `whsec_…`) in Vercel → Env Vars, then test one purchase. Until then the site earns $0 and `/api/checkout` errors on click. | AIC-152, AIC-157 |
| 📊 **Rank tracking** | Confirm Google Search Console access for the domain; Ahrefs was cancelled for cost — move to GSC + Ahrefs Webmaster Tools (free). Unblocks the "did backlinks land?" checks. | AIC-280, AIC-208, AIC-213 |
| 📧 **Approve + enable outreach** | Approve the copy **and** stand up a real mailbox (see §3). Then re-angle every "June 30" to "January 1, 2027." | AIC-38, AIC-202, AIC-192 |
| 🧩 **Feature go/no-go** | "My Compliance Checklist" (a no-login saveable tracker) is proposed 4× (AIC-135–138). Decide build or kill; if build, pick one ticket and close the rest. | AIC-135–138 |

### Execution work (I or a future agent can do)
- **Fix the regulation content** (§4) — the single highest-value work item now.
- **Fix the stale checklist HTML + site-wide June-30 references** (§5).
- **Rewrite the EU AI Act page** (AIC-242) — highest organic-traffic page; now *also* factually behind (Digital Omnibus dates).
- **Build the content-freshness automation** (AIC-219) — a cheap cron that flags when a law changes. The §4 findings are the argument for why this matters.
- **Newsletter #1** (AIC-39) via Loops — but re-angle off June 30 first.
- **Codebase cleanups** (§5) — dead code, duplication, CSS tokens.

---

## 3. The outreach-email problem — and how to actually do it

**You asked how to send the outreach without using your personal `fbalino@gmail.com`. Here's the real situation, with evidence.**

### What I found
- **`regulome.io` has no mailbox at all.** I checked DNS from three resolvers: the domain has **A records** (the website, on Vercel) but **no MX record, no SPF (`v=spf1`), and no DMARC**. The only mail-related record is a leftover `google-site-verification` TXT. **Translation: a `@regulome.io` address can't currently send *or receive* email.** Replies to outreach would have nowhere to land.
- The codebase *does* reference **Resend** (`hello@regulome.io`, for lead notifications) and **Loops** (for the newsletter), but:
  - **Resend / Loops are the wrong tools for cold outreach.** They're transactional/marketing ESPs. Blasting 50 unsolicited provider emails through them risks your sending reputation and likely violates their acceptable-use terms. Keep them for what they're for.
  - Given there's no MX/DKIM on the domain yet, the Resend lead-notification path may also not be fully verified — worth confirming in the Resend dashboard separately.
- The outreach drafts currently **sign off with `fbalino@gmail.com`** and use the dead "June 30 / 47 days" angle — both need changing before anything sends.

### The recommendation
You have **two distinct email needs** — don't use one tool for both:

**A) Cold 1:1 outreach** (the PR pitches + 50 provider emails) → **a real, monitored mailbox on `regulome.io`.** Cold outreach should look human and replies must come back to a real inbox. The clean path:
1. Stand up a mailbox like **`fernando@regulome.io`** (or `hello@`) on a proper mail host.
2. Add the host's **MX + SPF + DKIM + DMARC** DNS records (your provider gives you these; this is the step that keeps you out of spam).
3. Send the providers as **personalized 1:1s via a light mail-merge** (GMass or YAMM if you go Google) — individual messages, not a BCC blast. Send in small daily batches at first (a brand-new domain has zero sending reputation; warm it up).
4. Send the Tier-1/2/3 media pitches **manually**, personalized.

**B) Newsletter** (AIC-39) → **Loops**, which is already configured on the `send.regulome.io` subdomain. That's the right tool; just re-angle the Colorado date first.

### Mailbox host — your call (see the question I'll ask you)
- **Google Workspace (~$7/user/mo)** — Gmail UI you already know, strong deliverability, Google verification on the domain is already half-done, easy mail-merge add-ons. My default recommendation.
- **Zoho Mail (free for 1 domain / small teams, or ~$1/user/mo)** — cheapest; you cancelled Ahrefs for cost, so this may fit. Slightly less polished, separate ecosystem.
- Either works. The DNS records (MX/SPF/DKIM/DMARC) are the part that actually matters for deliverability.

> ⚠️ Whatever you pick: **do not** mass-BCC from the new mailbox on day one, and **do not** route cold outreach through Resend/Loops.

---

## 4. Regulation accuracy — the headline problem

A research agent verified each of the 15 pages against current law (June 2026) with authoritative sources. **14 of 15 have inaccuracies.** Full detail + sources in [`regulations-accuracy.md`](regulations-accuracy.md). The recurring root cause: **pages were written when these laws were in an earlier/proposed form and never updated for 2025–2026 changes.**

| Regulation | Verdict | Worst issue |
|---|---|---|
| `colorado-ai-act` | ❌ 🔴 | Frontmatter date is right, but the **body still teaches the repealed SB 24-205** (impact assessments, risk-management program, NIST safe harbor). SB 26-189 (signed **May 14, 2026**) repealed & reenacted it into a narrower ADMT disclosure regime. *Independently confirmed (Crowell, Buchalter, Seyfarth, Norton Rose Fulbright).* |
| `texas-traiga` | ❌ 🔴×3 | Page describes Colorado-style obligations (high-risk systems, impact assessments, 7 domains, consumer opt-outs) that were **stripped before HB 149 was enacted**. Enacted law is far narrower (mostly government agencies). Wrong penalty/enforcement framework too. *Independently confirmed (K&L Gates "pared back," Baker Botts, IAPP).* |
| `california-ab-2013` | ❌ 🔴×3 | **Fabricates a "10²³ FLOPs compute threshold" + "CPPA implementing guidance" + fake exemptions** — that's the *vetoed* SB 1047, not AB 2013. AB 2013 has no compute test. |
| `nist-ai-rmf` | ❌ 🔴×2 | Cites **rescinded** EO 14110 (revoked Jan 2025) and OMB M-24-10 (replaced Apr 2025) as current, plus the dead Colorado safe harbor. |
| `ccpa-admt` | ❌ 🔴 | ADMT compliance deadline shown as **April 1, 2027**; the finalized regs say **January 1, 2027**. |
| `iso-42001` | ❌ 🔴 | Calls ISO 42001 a "candidate harmonized standard under the EU AI Act" (it isn't — that's prEN 18286); anchors urgency to a stale EU date. |
| `eu-ai-act` | ❌ 🔴 | High-risk dates (Aug 2026 / Aug 2027) are being **deferred by the Digital Omnibus** to Dec 2027 / Aug 2028. *Note: provisional agreement (May 2026), near adoption — present as "being deferred," verify final OJ text.* |
| `illinois-ai-video-interview-act` | ❌ 🔴 | Invents a private right of action + penalties the statute doesn't contain; omits the Section 20 demographic-reporting duty. |
| `illinois-bipa` | ❌ 🟠×2 | Per-scan damages (Cothron) were **overturned by SB 2979 (Aug 2024)**; page doesn't mention it. |
| `texas-cubi` | ❌ 🔴 | TRAIGA added an **AI exemption** to CUBI (so "CUBI applies to AI" is now wrong); Google matter settled **$1.375B**, shown as pending. |
| `nyc-local-law-144` | ❌ 🟠 | Wrong penalty schedule ($375 / 30-day cure don't exist; it's $500 first / $500–$1,500 subsequent). |
| `gdpr` | ❌ 🟠 | OpenAI shown "under investigation"; Italy **concluded it with a €15M fine (Dec 2024)**. |
| `nis2-directive` | ❌ 🟡 | Minor transposition/date nuances. |
| `dora` | ❌ 🟡 | Minor nuance. |
| `virginia-hb-2094` | ✅ | Clean (vetoed bill, simple page). |

**Recommended approach:** treat `colorado-ai-act`, `texas-traiga`, `california-ab-2013`, `nist-ai-rmf`, `ccpa-admt` as **priority rewrites** (these are *wrong*, not just dated). Have counsel sanity-check the substantive rewrites before publishing. Then build the freshness automation (AIC-219) so this doesn't recur.

---

## 5. Codebase health

`npm run build` → **passes clean.** `npm test` → **7 of 8 fail** (see §6). Findings below survived adversarial verification (false positives dropped).

### 🔴 / 🟠 High-impact

1. **Stale Colorado dates on a live, indexed page** — `public/resources/ai-compliance-checklist.html`. Still says "June 30, 2026 — 47 days away"; its FAQ **structured data** (what Google & AI assistants ingest) emits *three contradictory wrong dates* (June 1 2026, Feb 1 2026, June 30 2026). Listed in `sitemap.ts:74`, linked from blog + resources. **Fix:** correct all dates to Jan 1 2027 and reflect SB 26-189 — or regenerate the page from the (now-correct) reg data. _(verified)_
2. **Regulation facts are hardcoded in ~4 places and have drifted** — the checklist HTML, `compare/colorado-vs-eu-ai-act`, `compare/us-state-ai-laws`, and `api/checker/analyze` all re-state reg facts instead of reading `content/regulations/*.mdx`. That's *why* the dates drift. **Fix:** make the MDX frontmatter the single source of truth; have compare pages + checker read via `getRegulationBySlug`/`getAllRegulations`. _(verified)_
3. **"912 regulations" is hardcoded and false** — appears in the SEO meta description (`layout.tsx:34`), the Organization JSON-LD (`jsonld.ts:47`), and the 404 page (`not-found.tsx:9`). You have **15**. The homepage already computes the real count dynamically. **Fix:** use the live count (or a `REGULATION_COUNT` constant). _(verified — 60× overstatement in your structured data)_

### 🟡 Bugs (real, contained)

4. **Provider directory "Service" filter matches nothing** — `DirectorySearchClient.tsx:15` filters on `["Software","Advisory","Legal counsel","Audit"]` with exact-match, but seed data stores free-text like `"Bias Audits"`, `"Compliance Software"`. Checking any Service box → zero results. **Fix:** map filter labels to the stored vocabulary or use substring match. _(verified)_
5. **Global search never searches articles** — `search/page.tsx:29` shows the same 4 hardcoded `SAMPLE_ARTICLES` for *every* query, yet the UI advertises article search and the result counts exclude them. **Fix:** wire search to the real `POSTS` corpus. _(verified)_
6. **Checker can white-screen** — `api/checker/analyze` returns Claude's JSON with no per-field validation; if `urgency` isn't high/medium/low (or `actions` is missing), `CheckerClient.tsx:705-740` throws on render. **Fix:** validate/normalize the LLM response, fall back to the deterministic path. _(verified)_
7. **CCPA-ADMT sorts to 1970** — `RegulationsFilterClient.tsx:111` sorts by `new Date(effectiveDate)`, but CCPA-ADMT's `effectiveDate` is a multi-date sentence → `NaN` → epoch 0. **Fix:** add a numeric `sortDate` to frontmatter. _(verified)_
8. **Stripe webhook can infinite-retry** — `webhooks/stripe/route.ts:37` does `JSON.parse(metadata.answers)` *outside* the try/catch; `checkout/route.ts:12` truncates that JSON to 500 chars and can cut it mid-string → parse throws → 500 → Stripe retries forever. **Fix:** wrap the parse; better, store large payloads server-side keyed by session id. _(verified, low likelihood)_

### 🟡 Dead code & data integrity

9. **Dead components/files** (zero importers, verified): `src/components/ui/Card.tsx`, `src/components/ui/Badge.tsx`, `src/lib/posthog.ts`, `directory/SidebarToggle.tsx`, `layout/AnnouncementStrip.tsx`. Note `AnnouncementStrip` carries the *correct* Jan-1-2027 banner but is **never rendered** — so the date-change message reaches no one. Decide: render it or delete it.
10. **`/v2` concept pages ship to production** — `(v2)/v2`, `concept-a/b/c` are built (noindex, not in sitemap) but are leftover design explorations. Delete if dead.
11. **Dead glossary link** — `algorithmic-discrimination.mdx` links `/glossary/ai-bias-audit` which 404s; the real slug is `bias-audit`. _(verified)_
12. **3 live blog posts missing from sitemap** — `POSTS` has 37, sitemap lists 34 (missing `ai-bias-audit`, `ai-compliance-checklist`, `iso-42001-checklist`). **Fix:** derive `BLOG_SLUGS` from `Object.keys(POSTS)`. _(verified)_
13. **Seed data points to non-existent regulation slugs** — 22 of 111 `regulationSlug` refs in `seed.ts` aren't registered regs (`sr-11-7`, `oecd-ai-principles`, …). A migration (`fix-provider-regulation-slugs.ts`) patches them in the DB, so **re-seeding silently re-breaks provider matching**. **Fix:** correct the seed and retire the band-aid migration. _(verified)_
14. Smaller inconsistencies (verified or high-confidence): `not-found.tsx` claims "40+ jurisdictions" (real: ~9); vetoed Virginia page is hidden from the catalog but still in the sitemap and not noindexed; orphaned `content/articles/*.mdx` never imported.

### 🟡 CSS / design tokens (Tailwind v4)

15. **`var(--radius)` is undefined → broken corners** — `@theme` defines `--radius-DEFAULT` (Tailwind v4 doesn't emit a bare `--radius`), but `globals.css` uses `border-radius: var(--radius)` at lines 1085, 1150, 1454, 1522, 1626 → those elements get **no rounding** (sharp corners on ledger plates, the countdown, blog cards). **Fix:** add `--radius: 6px` or switch usages to `--radius-DEFAULT`. _(verified by hand — cosmetic but real)_
16. **Compare pages hardcode off-palette colors with no dark mode** — `colorado-vs-eu-ai-act` (and siblings) inline `#1e3a5f`/`#2563eb`/`#3b0764`/`#9333ea`; invisible on the dark theme. **Fix:** tokenize to `var(--accent)`.
17. **~150 lines of orphaned/unused CSS** in `globals.css` (e.g. `more-ledger`, `story-*`, `pull-quote`, `marker-highlight`, `card-quiet`, `chip-gold`, `input-lg`); duplicated dark blocks; token aliases that drift (`--gold`==`--amber`, `--surface`≠`--color-surface`); **~163 raw hex values in `.tsx`** that duplicate existing tokens. **Fix:** prune unused rules; replace raw hex with tokens; reconcile the alias tokens.
18. **Status-dot class mismatches** — `jurisdictions/page.tsx:247` emits `.dot-vetoed` and `search/page.tsx:181` can emit `.dot-draft`, neither of which exist in CSS → colorless dots. **Fix:** centralize the status→dot mapping.

### 🟡 Security / config (all low — no critical holes)

19. `next-auth` is installed and `.env.example` advertises an OAuth "provider dashboard," but **no auth is implemented anywhere** and the dashboard doesn't exist. Dead dependency + misleading env docs. **Fix:** remove, or build it.
20. Unauthenticated `api/checker/*` and `api/register` have **no rate limiting or input/size caps** (LLM cost-abuse + memory/DoS surface). `api/register` reads uploads fully into memory with no size limit.
21. **No Content-Security-Policy** header (vercel.json sets others but not CSP; still ships deprecated `X-XSS-Protection`).

### Duplication worth factoring (verified)

22. The **branded HTML admin-email template is copy-pasted across 3 routes** (`leads`, `rfp`, `register`, ~70 lines each) → extract to `src/lib/email.ts`.
23. **Email regex (7 copies)**, `slugify` (2–3 copies), and date formatters (with inconsistent en-US/en-GB locales) are duplicated → `src/lib/validation.ts`, `slug.ts`, `date.ts`.
24. `src/components/ui` primitives (`Badge`/`Button`/`Card`) are **re-implemented inline across ~20 files** (raw `chip`/`btn` classes) → adopt the primitives or delete them.
25. `SITE_URL` redeclared in 5 files instead of importing from `brand.ts`; `jsonld.ts` uses `regulome.io` as the org/author *name* vs `Regulome` elsewhere.

---

## 6. Build & test status

- ✅ **`npm run build`** — passes clean, all routes compile.
- ❌ **`npm test`** — **7 of 8 fail.** Cause: `src/lib/ai-filter.ts` `rewriteForHuman()` makes a **live Anthropic API call with no mock**, and the tests assert on the rewritten text. With no working key (or any network/quota hiccup) it hits the catch and returns the original AI-flavored text, so every assertion fails. **This isn't a logic bug — the test suite just isn't hermetic.** Fix: mock the Anthropic client in the test (or move these to a separate, opt-in integration suite) so `npm test` is deterministic and free.

---

## 7. Suggested order of attack

1. **Fix the live wrong dates** (§5.1–5.3) — fastest credibility win; it's *wrong legal info* in indexed structured data. Half a day.
2. **Priority regulation rewrites** (§4: Colorado, Texas TRAIGA, California, NIST, CCPA) — the core product-quality issue. Counsel-review the substantive parts.
3. **Stand up the outreach mailbox** (§3) — unblocks AIC-38/192/202; pick a host (question below), add DNS, then approve + re-angle copy + send.
4. **Turn on Stripe live + confirm GSC** (§2) — your two account tasks; restores revenue + tracking.
5. **Rewrite EU AI Act page** (AIC-242) + **build freshness automation** (AIC-219) — the EU page is both high-traffic and now factually behind; the automation prevents §4 from recurring.
6. **Decide on "My Compliance Checklist"** (AIC-135–138).
7. **Codebase cleanups** (§5 dead code/dup/CSS) + **make tests hermetic** (§6) — lower urgency; do alongside the above.
