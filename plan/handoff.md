# Regulome — Handoff & Pending Work

_Last updated: 2026-06-21 · Generated for Fernando as part of the move off Paperclip (AIC-286 / AIC-285)._

---

## 1. The folder situation — SOLVED

You had three confusing folders. Here is the truth about each, and what I did.

| Folder | What it actually was | What I did |
|---|---|---|
| `…/.paperclip/…/_default` | **The real, live site.** The Next.js app that deploys to **regulome.io**. Git remote: `github.com/fbalino/ai-compliance-hub`. This was the canonical code. | **MOVED** it to `/Users/fernandobalino/Projects/regulome` |
| `/Users/fernandobalino/Projects/ai-compliance-hub` | A **stale copy** of the same app, frozen on May 14 (many commits behind live). Not connected to anything important. | Renamed to `/Users/fernandobalino/Projects/_archive-ai-compliance-hub-stale` (kept, not deleted) |
| `/Users/fernandobalino/Projects/regulome` (old) | An **early static-HTML mockup** ("v3 three directions") from April. It deploys to a *different, dead* Vercel project (`regulome.vercel.app`) that has **no custom domain**. It was never the live site. | Renamed to `/Users/fernandobalino/Projects/_archive-regulome-static-v3` (kept, not deleted) |

### How "canonical" works now

- **Your one true folder is: `/Users/fernandobalino/Projects/regulome`** ✅
- The old Paperclip path (`…/_default`) is now just a **symlink** (a pointer) to that folder. So if Paperclip ever runs again, it transparently sees the same files — nothing is duplicated. The *real* files live only in `/Users/fernandobalino/Projects/regulome`.
- This matches the move-and-symlink approach we used before for relocating projects.

> **The two `_archive-*` folders are safe to delete** once you've confirmed everything works for a week or two. I left them in place so nothing is lost. They are NOT the live site.

### How the live site actually deploys

```
You edit /Users/fernandobalino/Projects/regulome
        → git commit + git push   (to github.com/fbalino/ai-compliance-hub, branch: main)
              → Vercel auto-builds and deploys
                    → regulome.io updates
```

You do **not** need Paperclip for any of this. Just edit, commit, push.

---

## 2. How to work on this now (plain-English commands)

Open Terminal and run:

```bash
cd /Users/fernandobalino/Projects/regulome

# See the site locally in your browser (http://localhost:3000)
npm run dev

# Make a production build (catches errors before deploying)
npm run build

# Publish your changes to the live site:
git add -A
git commit -m "describe what you changed"
git push        # Vercel auto-deploys regulome.io
```

**Status as of this handoff:** ✅ `npm run build` passes cleanly. The folder is verified working and is exactly in sync with the live site (commit `da74686`, AIC-276).

**Secrets:** `.env.local` (your API keys for the database, Stripe, Anthropic, etc.) moved with the app and is present. It is gitignored, so it never gets pushed to GitHub — that's correct and safe.

---

## 3. What's still pending (the inbox)

There are **28 open items** from Paperclip. Below they're grouped by theme, with what's missing and the next concrete action. I've flagged which ones **need you (Fernando)** vs. which are execution work.

> ⚠️ **READ THIS FIRST — a stale fact poisons several tasks:** Many of the SEO/PR/newsletter tasks below were written around a **"Colorado AI Act deadline of June 30, 2026."** That date is **WRONG now** — it was pushed to **January 1, 2027** (Colorado SB 26-189). The live site content was already fixed, but the *outreach copy* in these tickets still uses the old urgency angle. **Any PR/Reddit/newsletter task that leans on "June 30" must be re-angled to "January 1, 2027" before you send it.**

---

### 🟥 A. Revenue is not actually turned on (highest priority)

The site can't take real money yet. Two blockers:

- **AIC-152** — `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are not set in production. The $49 "Pro Report" checkout (`/api/checkout`) throws an error the moment anyone clicks "Get Pro Report."
- **AIC-157** — Even where Stripe responds, it's running in **TEST mode** (`cs_test_` keys). No real card can be charged.
- _Also noted in AIC-152:_ the provider **"Featured" tier ($490/mo)** isn't wired to Stripe at all — it just emails an admin.

**Needs you:** Get **live** Stripe keys (`sk_live_…`, `pk_live_…`) from your Stripe dashboard and add them to Vercel → Project Settings → Environment Variables. Then test one end-to-end purchase. Until this is done, the site earns $0.

---

### 🟧 B. SEO Authority Sprint — backlinks & rankings (big cluster, lots of duplicates)

**Background:** Regulome.io launched April 2026 at Domain Rating 0, zero backlinks, zero organic traffic. The plan was (1) publish easy-to-rank "quick win" pages — **these are live** — and (2) earn the first 10+ backlinks. **Track 2 (backlinks) was never finished.**

Duplicate/overlapping tickets describing the same sprint: **AIC-180, AIC-181, AIC-182, AIC-186, AIC-202**. Treat these as **one effort**, not five. Supporting tickets:

- **AIC-38** (high) — 50 provider outreach emails are **drafted and waiting for your sign-off before sending**. → **Needs you:** approve the copy, then they can go out. (Templates are in `plan/pr-outreach-media-list.md` and the JD Supra draft `plan/jd-supra-article-colorado-ai-act.md`.)
- **AIC-192** (high) — Identify + email 50 AI-compliance providers (ISO 42001 cert bodies, GRC vendors, law firms) to claim a free listing → reciprocal backlinks. Most scalable backlink channel.
- **AIC-202** (high) — Execute the two outreach tracks: media/PR pitch + JD Supra self-publish (free do-follow link) + 50 provider emails. Target: 5+ new referring domains.
- **AIC-186** (high) — Colorado-deadline PR push to IAPP, Law.com, SHRM, etc. ⚠️ **Re-angle off "June 30."**
- **AIC-205 / AIC-210 / AIC-211** (high) — Promote the three live resource pages (ISO 42001 checklist, AI Bias Audit, AI Compliance Checklist) on Reddit / LinkedIn / Hacker News. ⚠️ AIC-211 leans on the stale Colorado date.
- **AIC-213** (high) — Verify 5+ referring domains landed after outreach. _Was written for Ahrefs — Ahrefs is now cancelled, use Google Search Console + Ahrefs Webmaster Tools free tier instead (see AIC-280)._
- **AIC-208** (todo) — "Week 3" rank-tracker checkpoint, originally targeted **June 4, 2026 (now overdue)**. Pull up Google Search Console → Performance → Queries and check for first impressions on `iso 42001 checklist`, `ai bias audit`, etc.

**Bottom line:** the *content* exists; nobody sent the outreach or earned the links. This is mostly execution work, but the **first send needs your approval (AIC-38)**.

---

### 🟨 C. SEO infrastructure / monitoring

- **AIC-280** (high) — **Ahrefs was cancelled May 18** (your cost decision). All rank/backlink monitoring must move to free tools: **Google Search Console** (primary), **Ahrefs Webmaster Tools** (free tier, backlinks), **Google Analytics**. → **Needs you:** confirm GSC access for `fbalino@gmail.com`. This unblocks AIC-208 and AIC-213.
- **AIC-249** (low) — Set up a Google service account so new/updated pages can be pushed to Google for faster re-indexing. Nice-to-have; normal crawling works without it.

---

### 🟦 D. Content freshness

- **AIC-242** (high) — Rewrite `/regulations/eu-ai-act`. It's the **highest-traffic-potential page** on the site but reads generic ("comprehensive" used 5×). Brief: lead with a "Which risk tier are you?" decision aid, add industry callouts, front-load the August 2026 enforcement date.
- **AIC-219** (medium) — You asked for an **automatic system** that keeps regulation pages up to date (a cron job that checks for news) so you don't have to prompt it — and it must be **budget-friendly** (cheap LLM usage). This was never built; it needs a design + implementation.

---

### 🟩 E. Product feature (proposed, not built)

- **AIC-135, AIC-136, AIC-137, AIC-138** — All four are the **same proposal duplicated**: **"My Compliance Checklist"** — a no-login, saveable, shareable compliance tracker so visitors have a reason to return (and to surface matched providers). It's a well-developed proposal sitting in review. → **Needs you:** decide go / no-go. If go, it's a real build (pick ONE ticket, close the other three).

---

### 🟪 F. Growth / lifecycle

- **AIC-39** (medium) — Send **Newsletter Issue #1** via Loops (the `send.regulome.io` subdomain is configured). Draft structure exists. ⚠️ Uses the stale "75 days / June 30" Colorado angle — update before sending.

---

### ⚙️ G. Paperclip-internal / now mostly moot

These were about Paperclip's own behavior. Since you're leaving Paperclip, most are **resolved or no longer relevant** — listed only so nothing is silently dropped:

- **AIC-278** — "Repo/Workspace audit: which folder is canonical?" → **This handoff answers it. Done.**
- **AIC-285** — "Move project files" → **Done by this work.**
- **AIC-286** — "Where is the canonical project?" → **Done by this work (this is the task that produced this file).**
- **AIC-282** (in_progress) — Recurring site-wide QA on regulome.io. You can run this yourself manually now (click through homepage, search, regulation pages, checker, mobile).
- **AIC-273** — Complaint that the Paperclip Product Manager spawned 20+ junk issues and ignored the design system. Relevant only if you keep using Paperclip agents. The underlying ask — **extract a real design system from the live site so designs stay consistent** — is still a good idea if you ever expand the site.

---

## 4. Recommended order if you want a priority list

1. **Turn on real payments** — Stripe live keys (AIC-152 + AIC-157). _Needs you._
2. **Confirm GSC access + retire Ahrefs** (AIC-280). _Needs you._ Unblocks all rank/backlink tracking.
3. **Approve + send the provider/PR outreach** (AIC-38 → AIC-202 / AIC-192) — but first **fix every "June 30, 2026" to "January 1, 2027."**
4. **Rewrite the EU AI Act page** (AIC-242) — biggest organic-traffic upside.
5. **Decide on "My Compliance Checklist"** (AIC-135–138) — your only real new-feature proposal.
6. Newsletter #1 (AIC-39) and the content-freshness automation (AIC-219) when you have bandwidth.

---

## 5. Reference: where things live

- **Canonical code & site:** `/Users/fernandobalino/Projects/regulome`
- **GitHub:** `github.com/fbalino/ai-compliance-hub` (branch `main`)
- **Live domain:** `regulome.io` (Vercel project `ai-compliance-hub`, team `fbalinos-projects`)
- **Outreach assets:** `plan/pr-outreach-media-list.md`, `plan/jd-supra-article-colorado-ai-act.md`
- **Archived (safe to delete later):** `/Users/fernandobalino/Projects/_archive-ai-compliance-hub-stale`, `/Users/fernandobalino/Projects/_archive-regulome-static-v3`
