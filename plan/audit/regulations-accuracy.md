# Regulome — Regulations Accuracy Audit

_Generated 2026-06-21 by a 15-agent web-verification sweep (one research agent per regulation, each cross-checking the live page against primary/authoritative sources as of June 2026)._

> ⚠️ **This is legal-adjacent content. Treat these findings as a prioritized to-do list, and have the substantive rewrites reviewed by counsel before publishing.** Sources cited are what the research agents surfaced; spot-check them.

## Summary

| Regulation | Verdict | 🔴 | 🟠 | 🟡 | ⚪ | Headline problem |
|---|---|---|---|---|---|---|
| `colorado-ai-act` | ❌ needs fixes | 1 | 1 | 2 | 1 | Body still teaches the **repealed** SB 24-205 obligations |
| `texas-traiga` | ❌ needs fixes | 3 | 2 | 2 | 1 | Page documents Colorado-style obligations **stripped before enactment** |
| `california-ab-2013` | ❌ needs fixes | 3 | 3 | 1 | 1 | Fabricated 10²³ FLOPs compute threshold (that was vetoed SB 1047) |
| `ccpa-admt` | ❌ needs fixes | 1 |  | 2 | 1 | ADMT deadline wrong: says Apr 1 2027, real is **Jan 1 2027** |
| `nist-ai-rmf` | ❌ needs fixes | 2 | 4 |  | 1 | Cites **rescinded** EO 14110 / OMB M-24-10 + dead CO safe harbor |
| `eu-ai-act` | ❌ needs fixes | 1 | 1 | 2 |  | High-risk dates being deferred by the Digital Omnibus |
| `iso-42001` | ❌ needs fixes | 1 | 1 |  | 1 | Wrongly calls ISO 42001 an EU AI Act "harmonized standard" |
| `illinois-ai-video-interview-act` | ❌ needs fixes | 1 | 1 | 1 | 1 | Invents a private right of action the statute lacks |
| `illinois-bipa` | ❌ needs fixes |  | 2 | 1 | 1 | Per-scan damages (Cothron) overturned by SB 2979 (2024) |
| `nyc-local-law-144` | ❌ needs fixes |  | 1 | 1 |  | Wrong penalty amounts ($375 / 30-day cure do not exist) |
| `texas-cubi` | ❌ needs fixes | 1 | 1 | 1 | 1 | TRAIGA added an AI exemption; "$1.375B Google" shown as pending |
| `gdpr` | ❌ needs fixes |  | 1 | 2 | 1 | OpenAI shown "under investigation" — concluded w/ €15M fine Dec 2024 |
| `nis2-directive` | ❌ needs fixes |  |  | 2 | 2 | Minor transposition/date nuances |
| `dora` | ❌ needs fixes |  |  | 1 |  | Minor nuance |
| `virginia-hb-2094` | ✅ up to date |  |  |  |  | Clean (vetoed bill, simple page) |

**14 of 15 pages have inaccuracies. The recurring root cause: pages were written when these laws were in an earlier (proposed/original) form and never updated for 2025–2026 changes** — Colorado's repeal-and-reenact, Texas TRAIGA being narrowed before enactment, federal executive orders being rescinded, the EU Digital Omnibus, and new case law.

---

## `colorado-ai-act`

**Page currently asserts:** status `enacted` · effective `January 1, 2027` · enforcement `January 1, 2027` · max penalty `$20,000 per violation`

### 🔴 CRITICAL — body — 'What Deployers Must Do' (impact assessments + risk management program), 'Safe Harbor', and overall framing

- **Page says:** Deployers must conduct annual impact assessments and maintain a documented risk management program, exercising 'reasonable care' to prevent algorithmic discrimination; these are presented as current obligations under the law as amended by SB 26-189.
- **Reality (June 2026):** SB 26-189 (signed May 14, 2026) did not merely amend the Colorado AI Act — it repealed and reenacted it, ELIMINATING the freestanding duty of reasonable care, the mandatory risk management program, and the annual impact assessment requirements. The new framework (effective Jan 1, 2027) is a narrower disclosure/transparency regime for automated decision-making technology (ADMT): pre-use notice, a plain-language adverse-decision explanation (within ~30 days), consumer rights to inspect/correct data and request human review, and 3-year recordkeeping. The page's core obligations sections describe the repealed SB 24-205 law, not current law.
- **Source:** https://www.afslaw.com/perspectives/alerts/colorado-replaces-its-landmark-ai-act-new-framework-what-developers-and

### 🟠 HIGH — frontmatter description + body 'Safe Harbor' section + FAQ

- **Page says:** The NIST AI RMF is recognized as a safe harbor for satisfying the reasonable-care standard, and a documented NIST-aligned program is the deployer's 'primary defense.'
- **Reality (June 2026):** The NIST AI RMF / ISO 42001 rebuttable-presumption safe harbor was part of the original SB 24-205 and was NOT carried forward into SB 26-189. There is no codified NIST safe harbor / affirmative defense under the current law. NIST RMF remains useful as a documentation backbone but is no longer a statutory defense.
- **Source:** https://www.buchalter.com/insights/colorado-rewrites-its-ai-law-what-employers-must-know-about-sb-26-189/

### 🟡 MEDIUM — body 'What Changed With SB 26-189' (line 73) and FAQ (SB 26-189 question)

- **Page says:** SB 26-189 'passed May 9, 2026' and 'passed the Colorado legislature on May 9, 2026.'
- **Reality (June 2026):** The legislature passed SB 26-189 and sent it to the Governor on May 12, 2026, and Governor Polis signed it into law on May 14, 2026. The 'May 9, 2026' passage date is incorrect, and the page never states the actual May 14, 2026 signing date.
- **Source:** https://leg.colorado.gov/bills/sb26-189

### 🟡 MEDIUM — body framing of SB 26-189's scope ('substantially rewrote' / 'modifies several compliance requirements' / 'small business provisions revised')

- **Page says:** Describes SB 26-189 as moving the effective date, mandating rulemaking, and modifying/revising several requirements and exemption thresholds — implying the same EU-style risk-management framework with adjusted details.
- **Reality (June 2026):** SB 26-189 'repealed and reenacted' the statute, pivoting away from the EU/Colorado risk-management model to a disclosure-and-rights ADMT framework. It also removed the original under-50-employee small-business exemption (it did not merely 'revise' thresholds). The magnitude of the change is materially understated.
- **Source:** https://www.crowell.com/en/insights/client-alerts/colorado-hits-reset-on-ai-regulation-sb-26-189-repeals-and-reenacts-the-colorado-ai-act

### ⚪ LOW — body 'Penalty Structure' / 'Enforcement Reality' — cure period and new obligations

- **Page says:** Notes a 60-day cure notice but omits the cure-period sunset and does not describe the new ADMT obligations.
- **Reality (June 2026):** Under SB 26-189 the AG's 60-day right-to-cure provision SUNSETS on January 1, 2030 (and no cure applies for knowing or repeated violations). The page also omits the new operative obligations (pre-use notice, adverse-decision disclosure, consumer inspect/correct/human-review rights, 3-year recordkeeping) that actually take effect Jan 1, 2027.
- **Source:** https://www.afslaw.com/perspectives/alerts/colorado-replaces-its-landmark-ai-act-new-framework-what-developers-and

**Researcher notes:** Frontmatter and high-level facts are mostly CORRECT and verified: status=enacted; effective/enforcement date Jan 1, 2027; max penalty $20,000 per violation (enforced as a deceptive trade practice under the Colorado Consumer Protection Act); AG exclusive enforcement with no private right of action; 60-day cure notice; mandatory AG rulemaking (rules due by Jan 1, 2027); and the federal enforcement stay (xAI v. Weiser, order dated April 27, 2026) is real and accurately described. The covered consequential-decision domains the page lists also broadly match the new law's seven domains (employment, education, residential real estate/housing, financial/lending, insurance, health care, essential government services) — though the page's 'legal services' category is not among the new law's enumerated domains and may be stale.

The CENTRAL problem is that the page advertises itself as 'updated for SB 26-189' (updatedAt 2026-05-17) yet its substantive body still teaches the REPEALED SB 24-205 obligations: impact assessments, risk management program, duty of reasonable care, and the NIST safe harbor. SB 26-189 repealed and reenacted the statute, removing all of those. A deployer following this page's 'What Deployers Must Do' and 'Compliance Checklist' would be building to a law that no longer exists. The frontmatter looks current; the body is the old law — a dangerous mismatch.

Cross-referenced regulations (EU AI Act, Texas TRAIGA, CCPA ADMT) are only linked, not described, on this page, so they generate no issues here. For the record I confirmed: EU AI Act high-risk dates are under the Digital Omnibus (provisional Council/Parliament agreement May 7, 2026) proposing to make high-risk application conditional with long-stop dates of Dec 2, 2027 (Annex III) / Aug 2, 2028 (embedded) — relevant to the eu-ai-act page, not this one. Texas TRAIGA (HB 149) signed June 22, 2025, effective Jan 1, 2026 — confirmed; no AI preemption moratorium survived in federal law.

---

## `texas-traiga`

**Page currently asserts:** status `enforced` · effective `January 1, 2026` · enforcement `January 1, 2026` · max penalty `DTPA civil penalties (up to $10,000 per violation)`

### 🔴 CRITICAL — maxPenalty (frontmatter) + Enforcement and Penalties section

- **Page says:** DTPA civil penalties (up to $10,000 per violation). TRAIGA is enforced by the Texas AG under the Deceptive Trade Practices Act (DTPA) framework. Up to $10,000 per violation; each individual decision could be a separate violation.
- **Reality (June 2026):** TRAIGA is enforced EXCLUSIVELY by the Texas AG directly under the new statute (Tex. Bus. & Com. Code ch. 552) — NOT under the DTPA. Penalties are a three-tier structure: $10,000–$12,000 per curable violation (or breach of a statement to the AG); $80,000–$200,000 per uncurable violation; and $2,000–$40,000 per day for continuing violations. The 'up to $10,000 / via DTPA' figure is wrong on both the amount (max is $200,000, not $10,000) and the legal vehicle (not DTPA).
- **Source:** https://www.bakerbotts.com/thought-leadership/publications/2025/july/texas-enacts-responsible-ai-governance-act-what-companies-need-to-know

### 🔴 CRITICAL — description (frontmatter) + 'Four Core Obligations' section + 'High-Risk AI System' section

- **Page says:** TRAIGA requires deployers of high-risk AI systems to conduct impact assessments, maintain risk management programs, provide consumer notices, and file annual reports with the AG. Defines 'high-risk AI system' via 'consequential decision' / 'substantial factor' and lists four core deployer obligations.
- **Reality (June 2026):** These obligations do NOT exist in the enacted law. The March 2025 amendments stripped out the entire Colorado-style framework BEFORE enactment. The signed HB 149 contains NO mandatory impact assessments, NO risk management program requirement, NO consumer-notice/opt-out mandate for private employers, and NO annual AG reporting. The enacted law is intent-based: it prohibits AI developed/deployed with INTENT to unlawfully discriminate, intent to incite self-harm/crime, producing CSAM/illegal deepfakes, and government social scoring. The page describes the superseded December 2024/HB 1709 draft as if it were current law.
- **Source:** https://www.klgates.com/Pared-Back-Version-of-the-Texas-Responsible-Artificial-Intelligence-Governance-Act-Signed-Into-Law-6-24-2025

### 🔴 CRITICAL — 'High-Risk AI System' section + 'Why Employment AI' section (seven domains)

- **Page says:** A high-risk AI system is any AI that makes or is a 'substantial factor' in making a 'consequential decision.' TRAIGA covers seven domains: employment, housing, credit, education, healthcare, insurance, legal services.
- **Reality (June 2026):** The enacted TRAIGA does not use the 'high-risk AI system,' 'consequential decision,' or 'substantial factor' concepts, and it does not enumerate seven covered domains. Those are Colorado AI Act (SB 24-205) concepts that were removed from TRAIGA in March 2025. The enacted law applies broadly to anyone who develops/deploys AI in Texas or offers AI products/services to Texas residents, via intent-based prohibitions — not a domain/risk-tier scheme.
- **Source:** https://www.insidetechlaw.com/blog/2025/07/texas-responsible-artificial-intelligence-governance-act

### 🟠 HIGH — Enforcement and Penalties — 'Small business relief'

- **Page says:** Companies with fewer than 25 employees or less than $5 million in annual revenue get scaled-down obligations, not exemptions.
- **Reality (June 2026):** No such small-business threshold (fewer than 25 employees / under $5M revenue) appears in the enacted TRAIGA. That 25-employee/Colorado-style threshold belonged to the Colorado-modeled deployer-obligation framework that was removed. Because the enacted law imposes no impact-assessment/risk-program obligations to scale down, this 'small business relief' tier is not part of the law.
- **Source:** https://www.klgates.com/Pared-Back-Version-of-the-Texas-Responsible-Artificial-Intelligence-Governance-Act-Signed-Into-Law-6-24-2025

### 🟠 HIGH — Consumer Notices section + TRAIGA-vs-LL144 table ('Opt-out mechanism: Explicit opt-out with an alternative pathway required')

- **Page says:** When a high-risk AI system makes/influences a consequential decision you must tell the person AI was used, explain how it influenced the decision, and provide a real opt-out mechanism with an actual alternative human-reviewed pathway.
- **Reality (June 2026):** The enacted TRAIGA imposes no such consumer-notice or opt-out-with-alternative-pathway obligation on private employers. AI-disclosure duties in the final law are directed primarily at government agencies (and there is a separate health-care disclosure context) — not a private-employer opt-out regime. This requirement was part of the superseded draft.
- **Source:** https://www.insidetechlaw.com/blog/2025/07/texas-responsible-artificial-intelligence-governance-act

### 🟡 MEDIUM — Enforcement and Penalties — cure period (omission)

- **Page says:** Page describes enforcement (AG, DTPA, penalties) but never mentions the 60-day cure period, which is the single most consequential procedural feature of the enacted law.
- **Reality (June 2026):** Enacted TRAIGA gives the AG a notice-and-cure process: the AG must provide written notice and a 60-day cure period before bringing an action; a timely, properly certified cure bars the civil action for that violation. The curable-vs-uncurable distinction drives the entire penalty tiering. Omitting it materially misstates the enforcement posture.
- **Source:** https://www.bakerbotts.com/thought-leadership/publications/2025/july/texas-enacts-responsible-ai-governance-act-what-companies-need-to-know

### 🟡 MEDIUM — Related-regulation cross-reference: Colorado AI Act

- **Page says:** Colorado's law doesn't kick in until January 1, 2027 (stated in body); TRAIGA 'is closely modeled on Colorado SB 24-205 and covers the same high-risk AI categories.'
- **Reality (June 2026):** The Jan 1, 2027 date is now correct, but the reason is material context the page omits: Colorado repealed-and-replaced SB 24-205 via SB 26-189 (signed by Gov. Polis May 14, 2026), which both pushed the date to Jan 1, 2027 AND gutted the Colorado-style impact-assessment/risk-program/duty-of-care framework in favor of a transparency/ADMT model. So TRAIGA being 'closely modeled on SB 24-205 and covering the same high-risk categories' is doubly outdated: TRAIGA dropped that model in 2025, and Colorado itself dropped it in 2026.
- **Source:** https://www.wsgr.com/en/insights/colorado-legislature-repeals-and-replaces-colorado-ai-act-what-sb-189-means-for-your-business.html

### ⚪ LOW — Body / structure (omission) — AI regulatory sandbox

- **Page says:** Page does not mention TRAIGA's regulatory sandbox program at all.
- **Reality (June 2026):** A central feature of enacted TRAIGA is an AI regulatory sandbox administered by the Texas Department of Information Resources, allowing approved participants to test AI systems under modified regulation for up to 36 months. Its absence reflects that the page is describing a different (superseded) version of the bill.
- **Source:** https://www.insidetechlaw.com/blog/2025/07/texas-responsible-artificial-intelligence-governance-act

**Researcher notes:** CRITICAL: The page describes the WRONG version of the law. It documents the original December 2024 draft (and predecessor HB 1709) — a Colorado-modeled, high-risk/impact-assessment/deployer-obligation regime — and presents it as enacted, effective law. The March 2025 amendments stripped that entire framework out BEFORE enactment. The TRAIGA that actually took effect January 1, 2026 is a narrow, intent-based prohibition statute enforced exclusively by the Texas AG (not under the DTPA) with a $10k–$200k tiered penalty structure and a 60-day cure period, plus a DIR regulatory sandbox.\n\nWhat the page gets RIGHT: signed June 22, 2025 by Gov. Abbott; effective Jan 1, 2026; status 'enforced'; HB 149 superseded HB 1709 (page says March 2025, which matches the amendment timeline); no private right of action; Colorado's law now effective Jan 1, 2027. The frontmatter effectiveDate/enforcementDate/status are accurate.\n\nWhat the page gets WRONG (and these are load-bearing for HR/compliance readers): (1) the penalty amount and legal vehicle (says max $10k via DTPA; reality is up to $200k enforced directly by AG under Tex. Bus. & Com. Code ch. 552); (2) the four 'core obligations' (impact assessments, risk programs, consumer notices, annual AG reporting) — none exist in enacted law; (3) the high-risk/consequential-decision/substantial-factor framework and seven domains — removed; (4) the 25-employee/$5M small-business relief tier — not in enacted law; (5) the opt-out-with-alternative-pathway requirement — not in enacted law. The entire 'TRAIGA vs NYC LL 144' table is built on these false obligations and is misleading.\n\nThis page needs a substantive rewrite, not a date patch. Recommend rewriting around the actual enacted law: intent-based prohibitions, AG-exclusive enforcement, tiered penalties, 60-day cure, DIR sandbox, and a more honest framing for HR teams (the enacted law is far lighter on private employers than the page implies — there is no mandatory impact-assessment/notice/reporting regime).\n\nSources used:\n- K&L Gates (pared-back version signed into law): https://www.klgates.com/Pared-Back-Version-of-the-Texas-Responsible-Artificial-Intelligence-Governance-Act-Signed-Into-Law-6-24-2025\n- Baker Botts (what companies need to know): https://www.bakerbotts.com/thought-leadership/publications/2025/july/texas-enacts-responsible-ai-governance-act-what-companies-need-to-know\n- Norton Rose Fulbright / Inside Tech Law: https://www.insidetechlaw.com/blog/2025/07/texas-responsible-artificial-intelligence-governance-act\n- Texas Legislature HB 149 enrolled text: https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm\n- Wilson Sonsini on Colorado SB 189: https://www.wsgr.com/en/insights/colorado-legislature-repeals-and-replaces-colorado-ai-act-what-sb-189-means-for-your-business.html

---

## `california-ab-2013`

**Page currently asserts:** status `enacted` · effective `January 1, 2026` · enforcement `January 1, 2026` · max penalty `Civil action for injunctive relief + actual damages`

### 🔴 CRITICAL — Compute threshold (10^23 FLOPs / CPPA-keyed)

- **Page says:** Applies only to systems trained above a compute threshold, 'initially keyed to systems trained with more than 10^23 floating point operations,' referenced to the California Privacy Protection Agency's implementing guidance. Repeated in FAQ, 'Who It Applies To,' 'Exemptions,' and 'Compliance Steps' (Step 1).
- **Reality (June 2026):** AB 2013 contains NO compute/FLOP threshold and makes NO reference to the California Privacy Protection Agency. The statute applies broadly to all qualifying generative AI systems regardless of training compute. This is the law's key distinction from SB 1047 (which did target frontier models by compute). The entire threshold premise on the page is fabricated.
- **Source:** https://www.cooley.com/news/insight/2024/2024-10-16-californias-new-ai-laws-focus-on-training-data-content-transparency

### 🔴 CRITICAL — Scope trigger / who it applies to

- **Page says:** Applies to developers of generative AI systems 'trained primarily on California consumers' data or that are made publicly available to California consumers' AND that exceed compute thresholds (FAQ + body).
- **Reality (June 2026):** The actual trigger has nothing to do with training on 'California consumers' data' and no compute test. It applies to a 'developer' (anyone who designs, codes, produces, or substantially modifies a generative AI system) that makes that system publicly available to Californians, where the system was released or substantially modified on or after January 1, 2022. The 'trained primarily on California consumers' data' framing is incorrect.
- **Source:** https://www.crowell.com/en/insights/client-alerts/californias-ab-2013-requires-generative-ai-data-disclosure-by-january-1-2026

### 🔴 CRITICAL — Exemptions

- **Page says:** Lists exemptions for open-source models (modified compliance path), internal/enterprise models, research/academic models (per 'CPPA implementing rules'), and below-compute-threshold models.
- **Reality (June 2026):** None of the page's listed exemptions are in the statute. AB 2013's actual exemptions are: (1) AI whose sole purpose is to help ensure security and integrity; (2) AI for the operation of aircraft in the national airspace; (3) AI developed for national security, military, or defense purposes made available only to a federal entity. The page omits all three real exemptions and invents four false ones (including non-existent CPPA rulemaking).
- **Source:** https://www.goodwinlaw.com/en/insights/publications/2026/01/alerts-otherindustries-californias-ab-2013-takes-effect

### 🟠 HIGH — Backward-looking January 1, 2022 scope

- **Page says:** The page never states the law's backward-looking coverage. Compliance Timeline lists only 'Sep 28 2024 signed' and 'Jan 1 2026 effective.'
- **Reality (June 2026):** AB 2013 covers generative AI systems released or substantially modified on or after January 1, 2022 — a wide net over already-deployed models. By Jan 1, 2026, developers (e.g., OpenAI, Anthropic, Google) had to post a high-level training-data summary for these pre-existing systems. This material scope element is missing from the page.
- **Source:** https://www.goodwinlaw.com/en/insights/publications/2026/01/alerts-otherindustries-californias-ab-2013-takes-effect

### 🟠 HIGH — Open-source repository compliance path

- **Page says:** Open-source developers may satisfy disclosure by including documentation in the model repository (Model Card / GitHub / Hugging Face) instead of a website; Compliance Step 8 repeats this.
- **Reality (June 2026):** There is no open-source exemption or alternative repository-based compliance path in AB 2013. The statute requires the developer to post the required documentation on the developer's website. This claim is fabricated.
- **Source:** https://www.cooley.com/news/insight/2024/2024-10-16-californias-new-ai-laws-focus-on-training-data-content-transparency

### 🟠 HIGH — Penalties / private right of action / maxPenalty

- **Page says:** maxPenalty: 'Civil action for injunctive relief + actual damages.' Body and FAQ assert a private right of action where individuals may sue for injunctive relief and actual damages, and the AG may also enforce.
- **Reality (June 2026):** AB 2013 itself specifies no penalties and no dedicated enforcement mechanism. Commentary indicates it will likely be enforced under California's Unfair Competition Law (Bus. & Prof. Code 17200), via the AG, district attorneys, and prosecutors. Any private right of action under the UCL is narrow — limited to plaintiffs who lost money or property as a result of the violation — not a general right to sue for 'injunctive relief and actual damages' for non-disclosure. The page overstates and mis-describes both the remedy and the PRA scope.
- **Source:** https://www.cooley.com/news/insight/2024/2024-10-16-californias-new-ai-laws-focus-on-training-data-content-transparency

### 🟡 MEDIUM — Disclosure requirements detail

- **Page says:** Lists required disclosures including 'whether data subjects were provided an opt-out mechanism' and 'whether any data was subject to a robots.txt exclusion that was not honored,' plus a detailed 'data governance practices' section.
- **Reality (June 2026):** The statutory high-level summary requires specific items: data sources/owners, how datasets further the system's purpose, number of data points (ranges OK), types/labels, whether datasets are protected by copyright/trademark/patent or are public domain, whether purchased/licensed, whether the data includes personal information or aggregate consumer information (CCPA terms), whether/how data was cleaned/processed/modified, the time period of collection, the dates first used in development, and whether synthetic data was used. The page's 'opt-out mechanism' and 'robots.txt exclusion not honored' items are not statutory AB 2013 disclosure requirements as framed.
- **Source:** https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2013

### ⚪ LOW — Related regulation context (Colorado AI Act)

- **Page says:** Lists Colorado AI Act as a related regulation (no date asserted on this page).
- **Reality (June 2026):** No error on this page (no date claim made), but for cross-page consistency: the Colorado AI Act (SB 24-205) was amended by SB 189, signed by Gov. Polis on May 14, 2026, which delayed the effective date from June 30, 2026 to January 1, 2027 and scaled back requirements. (The known-context label 'SB 26-189' is informal; the enacted vehicle is SB 189 / 2026 session.)
- **Source:** https://www.hunton.com/privacy-and-cybersecurity-law-blog/colorado-ai-act-amended-and-effective-date-delayed

**Researcher notes:** Effective/enforcement date of January 1, 2026 and the September 28, 2024 signing are correct, and the law is in force. The page's core defect is that it describes AB 2013 as if it were a frontier-model / compute-threshold law (10^23 FLOPs, CPPA-keyed) — it is not. AB 2013 has no compute threshold, no CPPA role, and applies broadly to any generative AI made available to Californians that was released or substantially modified on/after Jan 1, 2022. The exemptions section is the second major defect: the page invents open-source/internal/research/below-threshold carve-outs and omits the three real statutory exemptions (security/integrity, aircraft in national airspace, federal national-security/defense). The maxPenalty and private-right-of-action framing are overstated; enforcement is expected via the Unfair Competition Law with a narrow UCL private right of action. By Jan 1, 2026, OpenAI, Anthropic, and Google had posted training-data summaries to comply. Cross-reference accuracy note for sibling pages: Colorado AI Act effective date is now Jan 1, 2027 per SB 189 (signed May 14, 2026). Sources used: Cooley (https://www.cooley.com/news/insight/2024/2024-10-16-californias-new-ai-laws-focus-on-training-data-content-transparency), Crowell & Moring (https://www.crowell.com/en/insights/client-alerts/californias-ab-2013-requires-generative-ai-data-disclosure-by-january-1-2026), Goodwin (https://www.goodwinlaw.com/en/insights/publications/2026/01/alerts-otherindustries-californias-ab-2013-takes-effect), CA Legislature bill text (https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2013), Hunton on Colorado SB 189 (https://www.hunton.com/privacy-and-cybersecurity-law-blog/colorado-ai-act-amended-and-effective-date-delayed).

---

## `ccpa-admt`

**Page currently asserts:** status `enacted` · effective `September 22, 2025 (finalized); January 1, 2026 (general CCPA updates); April 1, 2027 (ADMT obligations)` · enforcement `April 1, 2027 (ADMT-specific); January 1, 2026 (risk assessments, cybersecurity audits)` · max penalty `$7,500 per violation (intentional or involving minors)`

### 🔴 CRITICAL — effectiveDate / enforcementDate (frontmatter) + body + FAQs + compliance timeline

- **Page says:** ADMT-specific obligations take effect April 1, 2027 (stated in frontmatter effectiveDate and enforcementDate, in two FAQ answers, in the Overview/Key Provisions framing, and as the final row of the Compliance Timeline table)
- **Reality (June 2026):** The finalized CCPA ADMT regulations set the ADMT compliance deadline at January 1, 2027, not April 1, 2027. Businesses using ADMT for significant decisions before January 1, 2027 must comply by that date; use beginning after January 1, 2027 must comply before implementation. April 1, 2027 was a deadline in an EARLIER DRAFT and was superseded by the final rules. CPPA's own announcement and every major law-firm alert (White & Case, Skadden, Akin, Littler, Greenberg Traurig) cite January 1, 2027.
- **Source:** https://cppa.ca.gov/announcements/2025/20250923.html

### 🟡 MEDIUM — Significant decision definition (Who It Applies To / FAQ / What qualifies)

- **Page says:** A significant decision covers financial or lending services, housing, education, employment (including independent contracting opportunities), and healthcare — but does not list 'compensation'
- **Reality (June 2026):** The final regulatory definition of 'significant decision' covers 'employment or independent contracting opportunities OR COMPENSATION.' The page omits 'compensation,' which materially narrows the apparent employment scope (e.g., pay, bonus, and compensation-setting ADMT are explicitly in scope).
- **Source:** https://cppa.ca.gov/announcements/2025/20250923.html

### 🟡 MEDIUM — Risk Assessments — Retention and Submission

- **Page says:** Risk assessments must be maintained 5 years, updated on material change, and 'made available to the CPPA upon request' (no affirmative submission deadline stated)
- **Reality (June 2026):** In addition to availability on request, the final regulations require businesses to SUBMIT to the CPPA — by April 1, 2028 — an attestation that required risk assessments were completed plus a summary of risk assessment information (covering assessments conducted/updated in 2026 and 2027). The page omits this affirmative April 1, 2028 submission obligation.
- **Source:** https://www.skadden.com/insights/publications/2025/10/california-finalizes-cppa-regulations

### ⚪ LOW — OAL approval date (frontmatter / Overview / timeline)

- **Page says:** OAL approved the regulations on September 22, 2025
- **Reality (June 2026):** Minor: CPPA's official press announcement is dated September 23, 2025; many firms cite September 22, 2025 as the OAL approval/filing date. The date is essentially correct and not materially misleading. Note only for precision.
- **Source:** https://cppa.ca.gov/announcements/2025/20250923.html

**Researcher notes:** Page source: /Users/fernandobalino/Projects/regulome/content/regulations/ccpa-admt.mdx. The headline problem is the ADMT compliance date: the page is built around 'April 1, 2027' (frontmatter effectiveDate + enforcementDate, two FAQ answers, the Overview/Key Provisions framing, and the final Compliance Timeline row). The finalized CCPA regulations set the ADMT compliance deadline at JANUARY 1, 2027. April 1, 2027 was a date in an earlier rulemaking DRAFT and was superseded. This is a repeated, load-bearing error and the single most important fix — every instance of 'April 1, 2027' for ADMT obligations should become 'January 1, 2027.' Two secondary substantive gaps: (1) the 'significant decision' definition omits 'compensation' (employment OR independent contracting opportunities OR compensation); (2) the risk-assessment section omits the affirmative April 1, 2028 submission-to-CPPA obligation (attestation + summary). Verified-correct elements (no change needed): general CCPA reg effective date Jan 1, 2026; July 24, 2025 Board adoption; advertising removed from final significant-decision definition; penalties $2,500/$7,500; CCPA jurisdictional thresholds; AG + CPPA dual enforcement; 5-year risk-assessment retention. No 2026 amendments or delays to these regulations were found as of June 2026 — the rules remain as finalized in late 2025. Note: WebFetch returned HTTP 403 for whitecase.com and akingump.com; those facts were corroborated via WebSearch result summaries and the CPPA primary source and Skadden alert instead.

---

## `nist-ai-rmf`

**Page currently asserts:** status `enforced` · effective `January 26, 2023` · enforcement `Voluntary framework — no direct enforcement` · max penalty `N/A — voluntary framework; however, referenced by enforceable state AI laws`

### 🔴 CRITICAL — body — Overview, Who It Applies To, AI Intersection, FAQs, Regulatory References, Compliance Timeline

- **Page says:** Executive Order 14110 (§4.1, October 2023) mandated NIST AI RMF adoption across all federal agencies and makes adoption effectively mandatory for federal agencies and their contractors (stated present-tense as live, operative authority throughout the page).
- **Reality (June 2026):** EO 14110 was rescinded on January 20, 2025 by President Trump's day-one revocation order, and superseded by EO 14179 ('Removing Barriers to American Leadership in AI,' Jan 23, 2025). EO 14110 is no longer in force. The NIST AI RMF documents themselves survive (they are voluntary and independently published), but the page's repeated framing of EO 14110 as a current federal mandate is outdated.
- **Source:** https://www.federalregister.gov/documents/2025/01/31/2025-02172/removing-barriers-to-american-leadership-in-artificial-intelligence

### 🔴 CRITICAL — body — Overview, Who It Applies To, AI Intersection, FAQs ('Which US state AI laws reference the NIST AI RMF', 'Can NIST AI RMF compliance protect against enforcement actions'), Regulatory References

- **Page says:** The Colorado AI Act (SB 24-205, §6-1-1702(4)) treats alignment with recognized AI risk management frameworks (including NIST AI RMF) as evidence of 'reasonable care' / an explicit safe harbor — the law's central legal standard — and this is presented as the primary live US legal driver for adopting NIST AI RMF.
- **Reality (June 2026):** Colorado SB 26-189 (signed by Gov. Polis May 14, 2026; effective Jan 1, 2027) repealed and reenacted the Colorado AI Act. It eliminated the duty of reasonable care to prevent algorithmic discrimination, the mandatory risk-management programs, the annual impact assessments, AND the affirmative-defense/safe-harbor tied to NIST AI RMF / ISO 42001. SB 26-189 is a narrower notice/disclosure/consumer-rights regime for automated decision-making technology (ADMT) and does NOT reference the NIST AI RMF or grant a Colorado-specific liability shield for framework alignment. The page's central thesis that Colorado law rewards NIST AI RMF alignment as reasonable care is no longer correct.
- **Source:** https://www.crowell.com/en/insights/client-alerts/colorado-hits-reset-on-ai-regulation-sb-26-189-repeals-and-reenacts-the-colorado-ai-act

### 🟠 HIGH — body — Overview, Who It Applies To, AI Intersection, Regulatory References, Compliance Timeline (multiple OMB M-24-10 cites)

- **Page says:** OMB M-24-10 (March 28, 2024) translated the EO 14110 mandate into specific minimum practices and requires federal agencies to inventory, classify, and manage AI against AI RMF outcomes (cited as the operative federal requirement).
- **Reality (June 2026):** OMB M-24-10 was rescinded and replaced by OMB M-25-21 ('Accelerating Federal Use of AI Through Innovation, Governance, and Public Trust') on April 3, 2025. M-25-21 retains CAIO designation, AI use-case inventories, and minimum risk-management practices for 'high-impact' AI, but takes a pro-innovation posture and notably omits direct prescriptive references to the NIST AI RMF as the required guidance. Every M-24-10 citation on the page is to a superseded memo.
- **Source:** https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf

### 🟠 HIGH — body — Manage function (MANAGE 3.1 incident response)

- **Page says:** Colorado SB 24-205 requires AG notification within 90 days of discovering algorithmic discrimination — that process must exist before the incident occurs.
- **Reality (June 2026):** This deployer obligation to notify the Colorado AG within 90 days of discovering algorithmic discrimination was part of repealed SB 24-205. Under the replacement SB 26-189 (effective Jan 1, 2027) the duty-of-care and associated AG-notification-for-discrimination regime was eliminated; the new law's disclosure/transparency framework does not impose this 90-day discrimination-notification duty. The claim describes a requirement that will not be in effect.
- **Source:** https://www.hklaw.com/en/insights/publications/2026/05/colorado-governor-signs-sb-189

### 🟠 HIGH — body — Who It Applies To ('Companies subject to the Colorado AI Act'), Measure function (MEASURE 2.5–2.7), Implementation Steps

- **Page says:** Colorado SB 24-205 requires bias testing records and impact assessments as part of the impact assessment, and organizations that complete a NIST AI RMF profile have a documented paper trail before the January 1, 2027 enforcement date.
- **Reality (June 2026):** Mandatory impact assessments and risk-management-program/bias-testing-record obligations were eliminated by SB 26-189. While framework alignment remains good practice operationally, it is no longer a Colorado statutory requirement nor a Colorado liability shield, so the page overstates the live Colorado obligations NIST AI RMF supposedly satisfies.
- **Source:** https://www.finnegan.com/en/insights/articles/colorado-replaces-landmark-ai-act-an-overview-of-the-new-sb-26-189-framework.html

### 🟠 HIGH — body — FAQ 'Is the NIST AI RMF legally binding?' (both frontmatter faqs and body FAQ) and FAQ answer referencing EO 14110

- **Page says:** Federal agencies are required to use the framework under Executive Order 14110, and EO 14110 directs federal agencies to adopt it (stated as current).
- **Reality (June 2026):** EO 14110 is rescinded (Jan 20, 2025). The current basis for federal agency AI governance is OMB M-25-21 under EO 14179, not EO 14110. The FAQ should be updated to reflect that EO 14110 is no longer in force.
- **Source:** https://www.nist.gov/artificial-intelligence/ai-congressional-mandates-executive-orders-and-actions

### ⚪ LOW — body — AI & NIST AI RMF Intersection table / Regulatory References (EU AI Act risk classification timing context)

- **Page says:** References the EU AI Act risk classification (high-risk) requirements as a current crosswalk target alongside an implied 2026/2027 high-risk timeline.
- **Reality (June 2026):** Minor/contextual: the EU 'Digital Omnibus' agreement (provisional political agreement May 6, 2026; Council confirmation May 13, 2026) deferred high-risk obligations — Annex III stand-alone high-risk systems pushed from Aug 2, 2026 to Dec 2, 2027, and Annex I embedded systems from Aug 2, 2027 to Aug 2, 2028. The page does not assert a specific EU high-risk date in the body so the impact is limited, but any companion EU AI Act references should reflect the deferred timeline.
- **Source:** https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/

**Researcher notes:** The page's description of the NIST AI RMF *itself* is accurate and current: AI RMF 1.0 (AI 100-1) published Jan 26, 2023 is still the latest version (no 2.0 as of June 2026; next formal review expected no later than 2028); the four functions (Govern/Map/Measure/Manage), seven trustworthiness characteristics, and the Generative AI Profile (AI 600-1, July 26, 2024) with its 12 risk categories are all correctly stated. The frontmatter (status=enforced is reasonable given it's described as a voluntary-but-widely-adopted framework; effectiveDate, enforcementDate='Voluntary framework — no direct enforcement', and maxPenalty='N/A — voluntary') is accurate and needs no change.

The problem is entirely in the page's external regulatory-relevance claims — which is the page's whole value proposition for why NIST AI RMF matters legally in the US. Three of the page's three pillars of 'real legal obligation flowing from NIST AI RMF' are now stale: (1) EO 14110 was rescinded Jan 20, 2025; (2) OMB M-24-10 was rescinded/replaced by M-25-21 on Apr 3, 2025; (3) the Colorado SB 24-205 'reasonable care' safe harbor that referenced AI risk management frameworks was REPEALED by SB 26-189 (signed May 14, 2026, effective Jan 1, 2027), which also eliminated the duty of care, risk-management programs, impact assessments, and the 90-day AG discrimination-notification duty. SB 26-189 does not reference the NIST AI RMF at all.

Recommended rewrite priorities: (1) Recast EO 14110 and OMB M-24-10 in the past tense and add EO 14179 / OMB M-25-21 as the current federal posture, noting M-25-21 de-emphasizes direct NIST RMF references. (2) Substantially rewrite all Colorado references — the NIST RMF safe harbor / reasonable-care framing is gone; reframe NIST RMF as a voluntary best-practice / cross-jurisdiction operational backbone rather than a Colorado liability shield. (3) Fix the Compliance Timeline row 'Colorado AI Act takes effect Jan 1, 2027 ... NIST AI RMF alignment serves as evidence of reasonable care' — the date is right but the 'reasonable care' rationale is wrong. (4) Remove/rewrite the MANAGE 3.1 90-day-AG-notification claim. (5) Optionally update EU AI Act crosswalk context for the Digital Omnibus high-risk deferral. Note: the page was last updated 2026-04-18, before SB 26-189 was signed (May 14, 2026), which explains the Colorado drift; the EO 14110/OMB M-24-10 rescissions (Jan–Apr 2025) predate the last update and should have been caught.

All source URLs were retrieved via live web search/fetch on June 21, 2026 and are authoritative (NIST.gov, federalregister.gov, whitehouse.gov, and major law firm client alerts: Holland & Knight, Crowell & Moring, Finnegan, Gibson Dunn).

---

## `eu-ai-act`

**Page currently asserts:** status `enforced` · effective `August 1, 2024` · enforcement `August 2026` · max penalty `€35 million or 7% of global turnover`

### 🔴 CRITICAL — enforcementDate / Compliance Timeline (Aug 2, 2026 high-risk) / FAQ 'When do high-risk AI requirements take effect'

- **Page says:** High-risk AI (Annex III) requirements are enforceable August 2, 2026 — this is presented as the headline enforcementDate and repeated in the body timeline ('August 2, 2026 — High-risk AI (Annex III) requirements enforceable') and FAQs ('core obligations for high-risk AI systems (Annex III) take effect in August 2026').
- **Reality (June 2026):** The Digital Omnibus on AI defers Annex III stand-alone high-risk obligations from 2 August 2026 to 2 DECEMBER 2027. A provisional trilogue agreement was reached 7 May 2026 and approved by Member State ambassadors (Coreper) on 13 May 2026; the file is 'close to adoption' with the European Parliament plenary vote expected in the June 2026 session. The change becomes legally binding on publication in the Official Journal (expected before 2 August 2026). The page does not mention the Omnibus at all and still treats 2 August 2026 as the operative high-risk date.
- **Source:** https://www.europarl.europa.eu/legislative-train/package-digital-package/file-digital-omnibus-on-ai

### 🟠 HIGH — Compliance Timeline (Aug 2, 2027 — Annex I high-risk)

- **Page says:** August 2, 2027 — High-risk AI (Annex I, product safety integrated) requirements enforceable.
- **Reality (June 2026):** Under the Digital Omnibus agreement, Annex I product-embedded high-risk obligations are deferred from 2 August 2027 to 2 AUGUST 2028.
- **Source:** https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/

### 🟡 MEDIUM — Prohibited AI Practices (count and list) / Compliance Timeline

- **Page says:** Lists exactly EIGHT prohibited AI practices, all enforceable since February 2, 2025; no other prohibitions noted.
- **Reality (June 2026):** The Digital Omnibus adds a NEW Article 5 prohibition on AI systems that generate/manipulate non-consensual intimate imagery (NCII) and child sexual abuse material (CSAM), with a transitional period running to 2 December 2026. The page's list of prohibitions is now incomplete.
- **Source:** https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/

### 🟡 MEDIUM — Compliance Timeline (Aug 2, 2030 — legacy systems) and overall absence of Omnibus

- **Page says:** High-risk AI systems already on the market before August 2026 must comply by August 2, 2030; the timeline contains no reference to the Digital Omnibus simplification package.
- **Reality (June 2026):** Because the high-risk application dates themselves moved (Annex III to Dec 2, 2027; Annex I to Aug 2, 2028), the 'before August 2026' legacy reference point and downstream transitional dates are anchored to a now-superseded schedule, and the page omits the most significant 2026 development (the Digital Omnibus on AI, which also includes SME/mid-cap exemptions and AI Office/registration changes). The timeline should be reworked once the Omnibus is published in the OJ.
- **Source:** https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/

**Researcher notes:** Verified June 21, 2026. The page's core framework is largely accurate and unchanged: entry into force (July 12, 2024 / Aug 1, 2024), prohibited-practice enforcement (Feb 2, 2025), GPAI obligations (Aug 2, 2025), the penalty tiers (€35M/7%, €15M/3%, €7.5M/1.5%), and the 10^25 FLOP systemic-risk threshold are all still current and were NOT changed by the Omnibus (multiple sources confirm penalties, GPAI rules, and prohibited practices remain in force and unchanged). The decisive problem is timeline currency: the Digital Omnibus on AI (Commission proposal 19 Nov 2025; political/trilogue agreement 7 May 2026; Coreper approval 13 May 2026; 'close to adoption,' EP plenary vote expected June 2026) postpones the high-risk obligations the page headlines — Annex III from 2 Aug 2026 to 2 Dec 2027, and Annex I from 2 Aug 2027 to 2 Aug 2028 — and adds a new NCII/CSAM prohibition (transition to 2 Dec 2026). The known-context KPI was confirmed: the EU did pursue a 2026 'stop-the-clock'/Omnibus delay, and it materially changed the August 2026 high-risk date. Caveat: as of June 21, 2026 these deferrals are 'close to adoption' but only become legally binding upon Official Journal publication (expected before 2 Aug 2026); however, the page's failure to mention the Omnibus or the impending deferral at all makes it materially misleading for any reader planning to an August 2026 high-risk deadline. Frontmatter enforcementDate should be updated to reflect the December 2, 2027 Annex III date (with an Omnibus/OJ-publication caveat) and updatedAt is stale (2026-04-13, pre-dating the May 7 agreement). Sources: European Parliament Legislative Train (https://www.europarl.europa.eu/legislative-train/package-digital-package/file-digital-omnibus-on-ai), Council/Consilium press release 7 May 2026 (https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/), Gibson Dunn (https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/), Hogan Lovells, White & Case, Travers Smith, Pinsent Masons, Cooley.

---

## `iso-42001`

**Page currently asserts:** status `enforced` · effective `December 18, 2023` · enforcement `Certification available from accredited bodies` · max penalty `N/A — voluntary standard; loss of certification for non-conformance`

### 🔴 CRITICAL — body — EU AI Act harmonization timing / certification urgency

- **Page says:** 'The EU AI Act's main obligations apply in August 2026.' The page repeatedly anchors ISO 42001 certification urgency to 'the August 2026 enforcement deadline' for providers of high-risk AI (e.g., 'The time to complete an 18-month certification process is before the August 2026 enforcement deadline, not after').
- **Reality (June 2026):** The EU's Digital Omnibus on AI deferred the high-risk obligations. Under the provisional agreement reached 6-7 May 2026 and confirmed by the Council on 13 May 2026 (formal adoption/Official Journal publication expected June-July 2026), high-risk obligations for stand-alone Annex III systems are pushed from 2 August 2026 to 2 December 2027, and for AI embedded in Annex I regulated products from 2 August 2027 to 2 August 2028. August 2026 is no longer the high-risk applicability/enforcement date. (Note: Article 50 transparency obligations still apply 2 August 2026.)
- **Source:** https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/

### 🟠 HIGH — body & FAQ — 'ISO 42001 is a candidate harmonized standard under the EU AI Act'

- **Page says:** States in multiple places (intro, EU AI Act section, Regulatory Alignment, and FAQ) that ISO 42001 'is a candidate harmonized standard under the EU AI Act,' is 'in the process of becoming a harmonized standard,' is 'moving through the European standardization bodies as of mid-2026,' and that 'harmonization is expected around the same timeframe' such that certified orgs will gain a presumption of conformity for Articles 17 and 9.
- **Reality (June 2026):** ISO/IEC 42001 is NOT part of the EU AI Act harmonization process. The EU AI Office indicated (May 2024) that ISO/IEC 42001 is not fully aligned with the final AI Act text. The actual harmonized QMS standard is prEN 18286 (CEN-CENELEC JTC 21), a distinct, EU-specific, product-centric standard whose enquiry phase closed January 2026 and which still requires comment resolution, formal vote, and OJ citation. ISO 42001 will not itself be cited in the Official Journal or confer presumption of conformity; prEN 18286 (which maps to ISO 42001 Annex A in its Annex D) is the harmonization vehicle.
- **Source:** https://cms-lawnow.com/en/ealerts/2025/12/the-first-draft-ai-act-standard-for-public-consultation-what-pren-18286-quality-management-system-for-eu-ai-act-regulatory-purposes-signals-for

### ⚪ LOW — body — 'BSI issued the world's first ISO 42001 certificates in June 2024'

- **Page says:** BSI (British Standards Institution) — BSI issued the world's first ISO 42001 certificates in June 2024.
- **Reality (June 2026):** The first organization globally to achieve BSI-issued ISO/IEC 42001 certification was KPMG Australia in October 2024 (announced late October / November 2024), not June 2024. Accredited certification (UKAS/RvA) for ISO 42001 only came in November 2025. The 'June 2024' month appears inaccurate.
- **Source:** https://kpmg.com/au/en/media/media-releases/2024/10/kpmg-first-company-to-achieve-ai-management-system-standard-certification-by-bsi.html

**Researcher notes:** The frontmatter (status=enforced/voluntary-standard, effectiveDate=Dec 18 2023, enforcementDate, maxPenalty=N/A voluntary) is accurate — ISO 42001 is a published voluntary standard and certification is available. The cost/timeline figures and management-system structure (Clauses 4-10, Annex A, PDCA) are not regulatory facts and were not contested. The two material currency problems are EU-AI-Act-related: (1) The page is built around an 'August 2026 high-risk enforcement deadline' that the Digital Omnibus has moved to December 2 2027 (Annex III standalone) / August 2 2028 (Annex I embedded) — this affects the intro, the 'EU AI Act harmonization' section, and the 'Is Certification Worth It?' section. (2) The page incorrectly treats ISO 42001 itself as the EU candidate harmonized standard; the EU AI Office has said ISO 42001 is not aligned with the final Act text and the real harmonized QMS standard is prEN 18286. Texas TRAIGA (HB 149, effective Jan 1 2026) and the Colorado AI Act references are only mentioned in passing and are consistent with current law (Colorado SB 24-205 was repealed/replaced by SB 26-189, signed May 14 2026, effective Jan 1 2027 — the page does not assert anything that contradicts this). The omnibus delay was still provisional as of the page's framing but is expected to be formally adopted/published June-July 2026, so the page should be updated. Sources: Gibson Dunn (omnibus deadlines), Consilium press release 7 May 2026, CMS/CSA on prEN 18286 vs ISO 42001, KPMG Australia/BSI on first certificate.

---

## `illinois-ai-video-interview-act`

**Page currently asserts:** status `enforced` · effective `January 1, 2020` · enforcement `January 1, 2020` · max penalty `Injunctive relief + actual damages`

### 🔴 CRITICAL — maxPenalty / Penalties & Enforcement section / private-right-of-action FAQ

- **Page says:** The Act 'provides a private right of action — applicants can sue employers directly,' with a remedies table of injunctive relief, actual damages, and attorneys' fees; frontmatter maxPenalty = 'Injunctive relief + actual damages'; 'There is a private right of action, unlike many AI laws'; 'Enforcement is entirely through private litigation.'
- **Reality (June 2026):** The AIVIRA statute (820 ILCS 42) is SILENT on enforcement, penalties, remedies, and damages. It contains NO private right of action and does not specify injunctive relief, actual damages, or attorneys' fees. Authoritative law-firm and SHRM analyses uniformly note the Act 'does not prescribe any penalties for violating it' and 'does not specify what types of remedies are available.' The page's entire penalty/private-action framework is fabricated. (Note: a private right of action / damages exist under the SEPARATE 2026 IHRA amendments via HB 3773, not under AIVIRA.)
- **Source:** https://www.shrm.org/topics-tools/employment-law-compliance/illinois-employers-must-comply-artificial-intelligence-video-interview-act

### 🟠 HIGH — Core Requirements / Who It Applies To (omission of Section 20 demographic reporting)

- **Page says:** Lists only four obligations (notify, explain, consent, delete) and states there is no size/industry threshold; never mentions any demographic data reporting obligation to a state agency.
- **Reality (June 2026):** Public Act 102-0047, effective January 1, 2022, added Section 20 to AIVIRA: an employer that relies SOLELY on AI analysis of a video interview to decide whether an applicant advances to an in-person interview must collect and report the race and ethnicity of applicants (selected, not selected, and hired) to the Illinois Department of Commerce and Economic Opportunity (DCEO) annually by December 31. DCEO must report to the Governor and General Assembly by July 1 on whether the data shows racial bias. This is a material, in-force statutory obligation the page omits entirely.
- **Source:** https://law.justia.com/codes/illinois/chapter-820/act-820-ilcs-42/

### 🟡 MEDIUM — Overview / Related context (omission of 2026 IHRA AI amendments)

- **Page says:** No mention of HB 3773 / Public Act 103-0804 amending the Illinois Human Rights Act to regulate AI in employment, which took effect January 1, 2026.
- **Reality (June 2026):** HB 3773 (Public Act 103-0804), signed Aug 9, 2024 and effective January 1, 2026, amends the Illinois Human Rights Act to prohibit employers from using AI/automated decision systems in employment decisions where the use has a discriminatory effect on protected classes (and bars zip code as a proxy), with notice requirements and IHRA enforcement (charge with the Human Rights Commission or civil action). On June 2, 2026, IDHR temporarily withdrew its proposed notice rules (canceling the June 10, 2026 hearing), though the statutory obligations remain in effect. For an Illinois AI-in-hiring page updated April 2026, this overlapping, now-effective law is a significant omission.
- **Source:** https://www.ilga.gov/Legislation/publicacts/view/103-0804

### ⚪ LOW — updatedAt (2026-04-13) vs. content currency

- **Page says:** Frontmatter updatedAt: '2026-04-13', implying the page reflects the legal landscape as of April 2026.
- **Reality (June 2026):** Despite the April 2026 update stamp, the content omits the Section 20 demographic-reporting requirement (in force since Jan 1, 2022) and the IHRA AI amendments effective Jan 1, 2026, and misstates the enforcement regime. The update date overstates the page's currency.
- **Source:** https://dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html

**Researcher notes:** Accurate elements confirmed against the statute: signed Aug 9, 2019; effective Jan 1, 2020; status 'enforced'; the notice/explanation/consent obligations (Section 10); the 30-day on-request deletion (Section 15); and the sharing restrictions are all correct, as is the 'no size/industry threshold' point. Statute section map (820 ILCS 42): §1 short title, §5 definitions, §10 consent, §15 destruction of videos (30 days), §20 demographic data reporting to DCEO (added by PA 102-0047, eff. 1/1/2022). Most important fix: the page invents a private right of action and a remedies/penalty scheme that the AIVIRA does not contain — the statute is silent on enforcement (confirmed by Ogletree, SHRM, Baker Sterchi, SGR). DCEO has published annual AI Video Interview Act demographic reports (e.g., 2022 and 2024 reports at dceo.illinois.gov), confirming the §20 reporting requirement is actively operative. Cross-cutting items requested were verified incidentally and are not relevant to this page: this is the IL AIVIRA, not Colorado SB 24-205/SB 26-189, EU AI Act, Texas TRAIGA, or CCPA ADMT. Sources used: SHRM (https://www.shrm.org/topics-tools/employment-law-compliance/illinois-employers-must-comply-artificial-intelligence-video-interview-act); Justia 2025 codification of 820 ILCS 42 (https://law.justia.com/codes/illinois/chapter-820/act-820-ilcs-42/); Ogletree privacy-implications analysis (https://ogletree.com/insights-resources/blog-posts/the-artificial-intelligence-video-interview-act-privacy-implications-of-illinoiss-ai-statute/); ILGA Public Act 103-0804 (https://www.ilga.gov/Legislation/publicacts/view/103-0804); Seyfarth on IDHR withdrawing proposed AI rules June 2026 (https://www.seyfarth.com/news-insights/illinois-department-of-human-rights-temporarily-withdraws-proposed-rules-on-use-of-artificial-intelligence-in-employment.html); Aronberg Goldgehn on the §20 reporting mandate (https://www.agdglaw.com/the-artificial-intelligence-video-interview-act-mandates-reporting-for-employers-electing-to-use-videorecorded-interviews).

---

## `illinois-bipa`

**Page currently asserts:** status `enforced` · effective `October 3, 2008` · enforcement `October 3, 2008` · max penalty `$5,000 per intentional/reckless violation`

### 🟠 HIGH — Per-Scan Accrual section (body, lines 199-201)

- **Page says:** In Cothron v. White Castle (2023), the Illinois Supreme Court held that a separate BIPA violation accrues each time biometric data is scanned or transmitted without consent — not just upon the first collection. This ruling dramatically increased potential damages for repeat-scan scenarios like employee fingerprint time clocks.
- **Reality (June 2026):** This is no longer how damages work. Illinois SB 2979, signed by Gov. J.B. Pritzker on August 2, 2024 (effective immediately), legislatively overturned Cothron's per-scan holding: when the same biometric identifier is collected from the same person using the same method of collection, it is a single violation entitling the person to, at most, one recovery (amending 740 ILCS 14/20). The page presents the superseded per-scan rule as current law and even emphasizes that it 'dramatically increased' damages, which is now backwards.
- **Source:** https://www.reedsmith.com/articles/illinois-bipa-amendment-brings-relief-to-private-entities/

### 🟠 HIGH — Per-Scan Accrual / retroactivity (body)

- **Page says:** (Page contains no mention of the SB 2979 amendment or any appellate ruling on it.)
- **Reality (June 2026):** The U.S. Court of Appeals for the Seventh Circuit, in Clay v. Union Pacific Railroad Co. (No. 25-2185, decided April 1, 2026), held that the SB 2979 single-recovery amendment is remedial/procedural and therefore applies RETROACTIVELY to cases pending when it was enacted — eliminating per-scan damages even for pre-amendment conduct within the Seventh Circuit. A page updated 2026-04-18 should reflect this.
- **Source:** https://datamatters.sidley.com/2026/04/08/seventh-circuit-limits-potential-damages-under-bipa-holds-2024-amendment-applies-retroactively/

### 🟡 MEDIUM — Consent Requirements / Written Release (body, lines 119-134)

- **Page says:** Obtain a written release executed by the individual ... Written or electronic (verbal consent is insufficient).
- **Reality (June 2026):** Substantially correct but now incomplete: SB 2979 (Aug 2, 2024) expressly amended BIPA to provide that an 'electronic signature' satisfies the 'written release' requirement, defining it as 'an electronic sound, symbol, or process attached to or logically associated with a record and executed or adopted by a person with the intent to sign the record.' The page gestures at electronic consent but does not reflect this statutory clarification, which is a notable 2024 update to the consent regime.
- **Source:** https://www.kslaw.com/news-and-insights/illinois-bipa-reform-takes-effect

### ⚪ LOW — Overview — settlement total (body, line 62)

- **Page says:** its enforcement through class action litigation has driven over $4 billion in settlements since 2015
- **Reality (June 2026):** Plausible but unverifiable as stated and likely understated/stale. Sources do not confirm a precise '$4 billion' aggregate; large 2025-2026 resolutions (e.g., Clearview AI $51.75M approved March 2025, Snap $35M, YouTube/Google $6M final approval Jan 2026) have continued to accumulate beyond the figures listed. The round '$4 billion since 2015' should be sourced or softened.
- **Source:** https://www.privacyworld.blog/2025/12/2025-year-in-review-biometric-privacy-litigation/

**Researcher notes:** The BIPA fundamentals are accurate and current: enactment date (Oct 3, 2008 / 740 ILCS 14), private right of action, $1,000 negligent / $5,000 intentional-or-reckless statutory damages, the 3-year retention rule, the covered-identifier list, exemptions (government, GLBA, HIPAA), and the headline settlements (Facebook $650M, Google $100M, TikTok $92M, BNSF $228M verdict) all check out. The single material currency failure is the 'Per-Scan Accrual' section, which treats the overturned Cothron v. White Castle (2023) per-scan rule as live law. That rule was superseded by SB 2979 (signed Aug 2, 2024) and the Seventh Circuit held the fix retroactive in Clay v. Union Pacific Railroad (Apr 1, 2026). Recommended fix: rewrite the Per-Scan Accrual section to (1) note Cothron's original 2023 holding, (2) state that SB 2979 (Aug 2024) overturned it with a single-violation/single-recovery rule under 740 ILCS 14/20, (3) note the Seventh Circuit's April 1, 2026 retroactivity ruling, and (4) add the electronic-signature-as-written-release point to the consent section. Note: the known-context items (Colorado SB 26-189, EU AI Act timelines, Texas TRAIGA, CCPA ADMT) are not referenced on this BIPA page and are out of scope for this specific page; they should be checked on their own pages. Sources: https://www.reedsmith.com/articles/illinois-bipa-amendment-brings-relief-to-private-entities/ ; https://datamatters.sidley.com/2026/04/08/seventh-circuit-limits-potential-damages-under-bipa-holds-2024-amendment-applies-retroactively/ ; https://www.paulhastings.com/insights/ph-privacy/7th-circuit-confirms-bipa-amendment-has-retroactive-application ; https://www.kslaw.com/news-and-insights/illinois-bipa-reform-takes-effect

---

## `nyc-local-law-144`

**Page currently asserts:** status `enforced` · effective `July 5, 2023` · enforcement `July 5, 2023` · max penalty `$1,500 per violation per day`

### 🟠 HIGH — body (Penalties table) + faqs (penalty FAQ)

- **Page says:** First violation cured within 30 days = $375; first violation not cured = up to $1,500; each subsequent violation up to $1,500 per day. FAQ: 'Civil penalties range from $375 for the first violation (if cured within 30 days) up to $1,500 per violation per day.'
- **Reality (June 2026):** NYC Local Law 144 / NYC Admin. Code provides: not more than $500 for a first violation (and each additional violation occurring the same day as the first), and not less than $500 nor more than $1,500 for each subsequent violation. There is NO $375 amount and NO 30-day cure period in LL 144 — that figure/cure appears to be confused with a different NYC statute. The penalty floor is $500, not $375, and the 30-day cure mechanism does not exist under this law.
- **Source:** https://perkinscoie.com/insights/update/new-york-city-adopts-final-rules-law-governing-automated-employment-decision-tools

### 🟡 MEDIUM — compliance-timeline / enforcement context (missing 2025-2026 development)

- **Page says:** Page (updatedAt 2026-04-13) describes DCWP enforcement generally but does not mention the December 2025 NY State Comptroller audit or its 'ineffective enforcement' findings.
- **Reality (June 2026):** On Dec 2, 2025 the NY State Comptroller published an audit concluding DCWP's enforcement of LL 144 is 'ineffective' — 75% of 311 test calls about AEDT issues were misrouted and never reached DCWP; DCWP's review of 32 audits found 1 issue while the Comptroller found at least 17 potential non-compliance issues in the same set; DCWP failed to use its Enforcement Workbook. Law firms (e.g., DLA Piper, Jan 2026) warn employers to expect a new phase of stricter enforcement. This is a material, recent development a 2026-updated page should reflect.
- **Source:** https://www.dlapiper.com/en-us/insights/publications/2026/01/critical-audit-of-nyc-ai-hiring-law-signals-increased-risk-for-employers

**Researcher notes:** VERIFIED AS ACCURATE: status 'enforced'; effective/enforcement date July 5, 2023; DCWP final rules effective April 6, 2023; the '10 business days' candidate notice period (confirmed by Crowell & Moring client alert quoting 'ten business days' notice, and by statutory-text searches); AEDT definition and 'substantially assist or replace' test; bias audit selection rate / impact ratio / 0.80 four-fifths rule; annual + material-change audit cadence; public disclosure on website; NYC-location geographic trigger with no size/revenue threshold; no private right of action (DCWP exclusive enforcement). The frontmatter maxPenalty '$1,500 per violation per day' is defensible (each day of use = a separate violation), so it was not flagged as an issue — but the BODY's framing of the penalty structure is factually wrong (the $375 amount and the 30-day cure period do not exist in LL 144; the correct floor is $500 and the structure is first-violation-up-to-$500 / subsequent-$500-to-$1,500). The penalty error is the single material factual defect and appears twice (body table + FAQ). Firecrawl CLI was out of credits and direct WebFetch of nyc.gov/osc.ny.gov returned HTTP 403, so the statute's primary text was confirmed via two independent law-firm client alerts (Perkins Coie, Crowell & Moring), National Law Review, and corroborating search snippets quoting the Administrative Code language rather than the .gov PDF directly.

---

## `texas-cubi`

**Page currently asserts:** status `enforced` · effective `September 1, 2009` · enforcement `September 1, 2009` · max penalty `$25,000 per violation (AG enforcement)`

### 🔴 CRITICAL — body — AI applicability / Does CUBI apply to AI systems

- **Page says:** Repeatedly states CUBI applies to AI systems without qualification: 'Does CUBI apply to AI facial recognition systems? Yes. Any system that captures or uses face geometry — including AI-powered facial recognition, verification, or analysis — must comply with CUBI' and 'Does CUBI apply to AI systems? Yes. Any AI system capturing or using face geometry, voiceprints, or other covered biometric identifiers must comply.'
- **Reality (June 2026):** HB 149 (TRAIGA), signed by Gov. Abbott June 22, 2025 and effective January 1, 2026, amended CUBI Section 503.001 to add a statutory AI exemption. CUBI's capture/consent restrictions now do NOT apply to the training, processing, or storage of biometric identifiers used in developing, training, evaluating, disseminating, or otherwise offering AI models or systems — UNLESS the system is used or deployed to uniquely identify a specific individual. There is also a carve-out for AI used for security/fraud/identity-theft purposes. The page's blanket 'yes, all AI systems must comply' framing is now materially incomplete and partly inaccurate as of the page's own April 18, 2026 updatedAt date. (Possession/destruction duties and penalties still attach if AI-training data is later put to a non-exempt commercial purpose.)
- **Source:** https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf

### 🟠 HIGH — body — Penalties & Enforcement: Notable Enforcement (Google row)

- **Page says:** Google | AG lawsuit | 2022 | Alleged capture of voiceprints and face geometry through Google Assistant, Photos, and Nest without consent — listed as an open/pending 2022 lawsuit with no resolution.
- **Reality (June 2026):** The Texas v. Google matter (which included the CUBI biometric claims) was settled for $1.375 billion. Texas AG Paxton announced the settlement agreement on May 9, 2025 and finalized it (per the AG's release) on October 31, 2025, resolving the biometric (CUBI), geolocation, and incognito claims. The page is stale: it omits the largest-ever single-state Google privacy settlement, which is directly on point for CUBI enforcement.
- **Source:** https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-finalizes-historic-settlement-google-and-secures-1375-billion-big-tech

### 🟡 MEDIUM — frontmatter.updatedAt / overall currency

- **Page says:** updatedAt: 2026-04-18, with no mention of the January 1, 2026 HB 149 amendments to CUBI or the 2025 Google settlement.
- **Reality (June 2026):** Two material developments predate the stated update date: the HB 149/TRAIGA CUBI amendment (effective Jan 1, 2026) and the Google $1.375B settlement (announced May 9, 2025; finalized Oct 31, 2025). A page updated April 18, 2026 should reflect both. The updatedAt is not consistent with the content's currency.
- **Source:** https://www.securityindustry.org/2025/06/24/groundbreaking-texas-ai-law-also-brings-needed-clarity-on-use-of-biometric-technologies-for-security/

### ⚪ LOW — body — Exemptions: financial institution voiceprint carve-out

- **Page says:** 'Voiceprints used by financial institutions for fraud prevention (specific carve-out)' is listed among CUBI exemptions.
- **Reality (June 2026):** The statutory exemption is broader and not limited to 'fraud prevention': CUBI does not apply to voiceprint data retained by a financial institution or an affiliate of a financial institution governed by the Gramm-Leach-Bliley Act (the exemption is tied to GLBA-covered financial institutions and to voiceprint data generally, not to a fraud-prevention purpose). Minor imprecision rather than a false statement.
- **Source:** https://www.alstonprivacy.com/texas-enacts-responsible-ai-governance-act/

**Researcher notes:** Core statutory facts on the page are accurate as of June 2026: CUBI = Tex. Bus. & Com. Code Ch. 503, enacted June 19, 2009 / effective Sept 1, 2009; $25,000 max civil penalty per violation; AG-only enforcement with no private right of action; destruction no later than the first anniversary (one year) after the collection purpose expires; covered identifiers (retina/iris, fingerprint, voiceprint, hand/face geometry); photographs excluded unless used to extract an identifier. The Meta claim is correct: $1.4B settlement announced July 30, 2024, and it remains the largest privacy settlement obtained by a single state (Meta's $1.4B > Google's $1.375B), per the Texas AG's own press release. The two material problems are (1) the page's unqualified 'CUBI applies to all AI systems' framing, which is now wrong because HB 149/TRAIGA added an AI training/development exemption to CUBI effective Jan 1, 2026 (unless the system uniquely identifies a specific individual) — this is the most important fix given the page's explicit AI angle; and (2) the Google enforcement row is stale, omitting the $1.375B settlement (announced May 9, 2025; finalized Oct 31, 2025). Recommend: (a) add the HB 149 §503.001 AI exemption to the body (Overview, Who It Applies To/Exemptions, and the AI FAQs) and qualify the 'applies to AI = yes' answers; (b) update the Google row to 'settled $1.375B (2025)'; (c) optionally tighten the financial-institution voiceprint carve-out wording. No change needed to status/effectiveDate/enforcementDate/maxPenalty frontmatter.

---

## `gdpr`

**Page currently asserts:** status `enforced` · effective `May 25, 2018` · enforcement `May 25, 2018` · max penalty `€20 million or 4% of global annual turnover`

### 🟠 HIGH — body — Notable AI-Related Enforcement table (OpenAI row)

- **Page says:** OpenAI — 'Under investigation' — 2024+ — GDPR compliance of ChatGPT data processing
- **Reality (June 2026):** The Italian Garante CONCLUDED its investigation and imposed a €15 million fine on OpenAI on December 20, 2024 (plus a mandatory 6-month media information campaign), for unlawful processing/training data, transparency failures, inadequate age verification, and an unreported March 2023 data breach. The fine was then ANNULLED by the Court of Rome (decision reported March 2026) on jurisdictional grounds — that the Irish DPC had become OpenAI's lead supervisory authority on Feb 15, 2024, before the Garante's final decision. The page's 'under investigation, 2024+' status is stale on both counts.
- **Source:** https://www.lewissilkin.com/insights/2025/01/14/openai-faces-15-million-fine-as-the-italian-garante-strikes-again-102jtqc

### 🟡 MEDIUM — body — Notable AI-Related Enforcement table (Clearview AI row)

- **Page says:** Clearview AI — €20M (France), €20M (Italy), €9M (UK) — 2022 — Scraping facial images for AI training without consent
- **Reality (June 2026):** Incomplete and partly questionable. The single largest Clearview GDPR fine is missing: the Dutch DPA (Autoriteit Persoonsgegevens) imposed €30.5 million in September 2024, plus an additional non-compliance penalty of up to €5.1M. Greece's DPA also fined Clearview €20M in 2022 (omitted). Cumulative EU fines are roughly €100M. Separately, the UK ICO's ~£7.5M/~€9M penalty was overturned by the UK First-tier Tribunal in Oct 2023 on jurisdiction (status has shifted since), so listing it flatly as '€9M (UK) 2022' is misleading.
- **Source:** https://techcrunch.com/2024/09/03/clearview-ai-hit-with-its-largest-gdpr-fine-yet-as-dutch-regulator-considers-holding-execs-personally-liable/

### 🟡 MEDIUM — body — missing development: GDPR Procedural Regulation

- **Page says:** No mention. Page describes cross-border enforcement only as 'lead supervisory authority determined by where the controller has its main establishment' and was last updated 2026-04-18.
- **Reality (June 2026):** Regulation (EU) 2025/2518 (the GDPR Procedural Regulation) was adopted by the Council on November 17, 2025, entered into force January 1, 2026, and applies from April 2, 2027. It harmonizes cross-border GDPR complaint admissibility and imposes binding investigation deadlines (e.g., ~15 months, +12-month extension). This is a material amendment to GDPR enforcement procedure that post-dates the page's stated 'updatedAt' and is absent.
- **Source:** https://www.consilium.europa.eu/en/press/press-releases/2025/11/17/council-adopts-new-eu-law-to-speed-up-handling-cross-border-data-protection-complaints/

### ⚪ LOW — body — missing pending development: Digital Omnibus (GDPR amendments)

- **Page says:** No mention of any pending GDPR reform; page presents Articles 13/14/15 rights and the 72-hour-style breach regime as settled.
- **Reality (June 2026):** On November 19, 2025 the European Commission published the Digital Omnibus Package, which PROPOSES amendments to the GDPR — including statutory limitations on the Articles 13/14/15 information/access rights, a consolidated breach 'single entry point' with the reporting deadline potentially extended from 72 to 96 hours, and SME/small-mid-cap relief. Still a proposal (likely adoption ~mid-2027, not yet law), but a material pending change worth flagging given the EDPB/EDPS Joint Opinion 2/2026 on it.
- **Source:** https://www.whitecase.com/insight-alert/gdpr-under-revision-key-takeaways-from-gdpr-under-revision-key-takeaways-from-the-digital-omnibus-regulation-proposal

**Researcher notes:** Frontmatter is accurate: status 'enforced', effectiveDate/enforcementDate May 25 2018, and maxPenalty '€20 million or 4% of global annual turnover' all match current law (Regulation (EU) 2016/679 unamended in substance). The two-tier penalty structure (€20M/4% upper, €10M/2% lower), Article 3/5/6/9/22/35 descriptions, and lawful-bases/special-categories content are all correct and stable. The Meta €1.2B Ireland (2023) entry is accurate. Discrepancies are concentrated in (1) the enforcement table being stale (OpenAI status superseded by a €15M fine then annulment; Clearview figures incomplete and the UK entry questionable post-2023 tribunal) and (2) two 2025-2026 legislative developments absent despite an updatedAt of 2026-04-18: the adopted GDPR Procedural Regulation (EU) 2025/2518 (in force Jan 1 2026, applies Apr 2 2027) and the proposed Digital Omnibus GDPR amendments (Nov 19 2025). Re the task's KNOWN CONTEXT list (Colorado AI Act SB 189, EU AI Act staggering, Texas TRAIGA, CCPA ADMT): none of those are asserted on the GDPR page — they belong to other regulation pages — so no GDPR-page issue arises from them. The page's substantive legal text needs no correction; only the enforcement examples and a 'recent developments' note are out of date. Note: one source URL in the Digital Omnibus issue may have a malformed path from search; the canonical White & Case alert is at whitecase.com/insight-alert/gdpr-under-revision-key-takeaways-from-the-digital-omnibus-regulation-proposal and the EDPB news page at edpb.europa.eu corroborates the Joint Opinion 2/2026.

---

## `nis2-directive`

**Page currently asserts:** status `enforced` · effective `January 16, 2023` · enforcement `October 17, 2024` · max penalty `€10 million or 2% of global turnover (essential); €7 million or 1.4% (important)`

### 🟡 MEDIUM — body — Compliance Timeline / overall currency

- **Page says:** The page makes no mention of the European Commission's January 20, 2026 cybersecurity package, which proposes targeted amendments to NIS2 (alongside a new Cybersecurity Act 2 / CSA2). The page's updatedAt is 2026-04-18, post-dating the proposal.
- **Reality (June 2026):** On January 20, 2026 the Commission published a cybersecurity package proposing targeted NIS2 amendments: simplified jurisdictional rules, streamlined ransomware-incident reporting, expanded EU-representative obligations (extending to e.g. credit institutions and certain product manufacturers), scope adjustments (adding submarine-cable/data-transmission operators, removing chemical distributors while keeping manufacturers), size-threshold tweaks, and a reinforced coordinating role for ENISA. It is a PROPOSAL, not yet binding, but is a material missing development for a page last updated April 2026.
- **Source:** https://digital-strategy.ec.europa.eu/en/library/proposal-directive-regards-simplification-measures-and-alignment-cybersecurity-act

### 🟡 MEDIUM — body — Compliance Timeline table ('October 17, 2024 — Organizations must comply with transposed national NIS2 laws')

- **Page says:** The timeline table presents Oct 17, 2024 as the point at which organizations 'must comply with transposed national NIS2 laws,' implying obligations went live EU-wide on that date.
- **Reality (June 2026):** As of mid-2026 only ~22 of 27 member states have transposed NIS2 into national law; five (France, Ireland, Luxembourg, Netherlands, Spain) remain in legislative procedure. Only Belgium, Croatia, Italy and Lithuania met the Oct 17, 2024 deadline. The Commission opened infringement proceedings against 23 states (Nov 28, 2024) and issued reasoned opinions to 19 states (May 7, 2025). The page's trailing note flags variance, but the table row overstates that compliance obligations are uniformly live across the EU.
- **Source:** https://www.skadden.com/insights/publications/2026/03/european-commission-announces-potential-nis2-cybersecurity-reform

### ⚪ LOW — body — Key Requirements / Digital Infrastructure / Significant incident

- **Page says:** The page describes the ten baseline measures and the 'significant incident' definition generically, with no reference to the binding technical specification adopted for digital-infrastructure and digital-provider entities.
- **Reality (June 2026):** Commission Implementing Regulation (EU) 2024/2690 (in force since October 2024) lays down binding technical and methodological cybersecurity requirements (13 thematic areas) and specifies when an incident is 'significant' for DNS providers, TLD registries, cloud/data-centre/CDN providers, MSPs/MSSPs, online marketplaces, search engines, social platforms and trust service providers — accompanied by ENISA Technical Implementation Guidance. Scope-limited to those entity types but directly relevant to the page's digital-infrastructure and MSP sections.
- **Source:** https://digital-strategy.ec.europa.eu/en/library/nis2-commission-implementing-regulation-critical-entities-and-networks

### ⚪ LOW — body — AI & NIS2 Intersection (EU AI Act cross-reference context)

- **Page says:** The page leans on the EU AI Act as a parallel/cross-referenced framework (Article 15 cybersecurity for high-risk AI). It does not cite specific AI Act application dates, so there is no hard date error, but it presents the high-risk regime as a current parallel obligation without noting the 2026 deferral.
- **Reality (June 2026):** The EU AI Act's high-risk obligations (Annex III stand-alone systems) were deferred from August 2, 2026 to December 2, 2027 (and Annex I embedded high-risk to August 2, 2028) via the Digital Omnibus on AI (Commission proposal Nov 19, 2025; provisional political agreement May 6, 2026, confirmed by Council May 13, 2026; formal adoption expected before Aug 2, 2026). Informational context rather than a direct factual error on the NIS2 page.
- **Source:** https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/

**Researcher notes:** Core NIS2 facts on the page are accurate and verified: Directive (EU) 2022/2555 published Dec 27, 2022, in force Jan 16, 2023, transposition deadline Oct 17, 2024; penalties €10M/2% (essential) and €7M/1.4% (important) under Article 34; incident-reporting stages 24h/72h/1-month under Article 23; the April 17, 2025 entity-list deadline under Article 3(3); scope/Annex I-II sectors, two-tier essential/important supervision, management liability, and extraterritorial EU-representative rule all check out. The page is not factually wrong on the directive text, so the discrepancies are currency/completeness gaps rather than errors: (1) missing the Jan 20, 2026 Commission NIS2-amendment proposal + Cybersecurity Act 2 package (most significant omission given April 2026 updatedAt), (2) a compliance-timeline row that overstates uniform Oct 2024 go-live when most member states still hadn't transposed by mid-2026 (infringement proceedings ongoing), (3) no mention of binding Implementing Regulation (EU) 2024/2690 for digital-infrastructure entities, and (4) AI Act high-risk deferral context (Aug 2026 → Dec 2027) relevant to the cross-reference section. Recommend bumping updatedAt and adding a note on the pending 2026 amendment and real-world transposition status. None of the four KNOWN-CONTEXT items (Colorado SB 189, Texas TRAIGA, CCPA ADMT) apply to this page; only the EU AI Act item is tangentially relevant and is captured above.

---

## `dora`

**Page currently asserts:** status `enforced` · effective `January 16, 2023 (entry into force); fully applicable January 17, 2025` · enforcement `January 17, 2025` · max penalty `Up to 2% of total annual worldwide turnover for financial entities; CTPPs face periodic penalty payments up to 1% of average daily worldwide turnover for up to 6 months; criminal sanctions vary by member state`

### 🟡 MEDIUM — Compliance Timeline — CTPP designation status

- **Page says:** Lists '2025-2026 — ESAs designating critical ICT third-party providers (CTPPs)' and '2025-2026 — First CTPP oversight cycles begin' as ongoing/forward-looking milestones, with no mention that the first CTPP list has been published. The body similarly frames CTPP designation prospectively ('Systemic AI providers ... are most likely to be designated').
- **Reality (June 2026):** The ESAs completed and published the FIRST official list of designated CTPPs on November 18, 2025 — 19 named providers including Amazon Web Services EMEA, Microsoft Ireland, Google Cloud EMEA, IBM, Oracle, SAP, Bloomberg, Accenture, Capgemini, Equinix, Kyndryl, NTT DATA, Tata Consultancy Services, Deutsche Telekom, Orange, Colt, InterXion, LSEG Data & Risk, and Fidelity National Information Services (FIS). Active oversight of these designated CTPPs is now underway in 2026. The page's updatedAt is April 18, 2026 — five months after this list was public — so the prospective framing is materially stale.
- **Source:** https://legal.pwc.de/en/news/articles/esas-publish-first-list-of-critical-ict-third-party-providers-under-dora

**Researcher notes:** All hard factual claims on the page verify against current law as of June 2026. Entry into force (Jan 16, 2023) and full application (Jan 17, 2025) are correct (EIOPA, ESMA). Incident-reporting timeline (4h after classification as major / no later than 24h after awareness; 72h intermediate; 1-month final) matches the joint RTS (Commission Delegated Regulation (EU) 2025/302; EBA technical standards on major incident reporting). The 2% worldwide-turnover fine for financial entities and the Article 35 CTPP periodic penalty of up to 1% of average daily worldwide turnover for up to 6 months are both accurate. Subsequent developments the page does not mention but which do NOT contradict it: (1) The Subcontracting RTS had a rocky path — the Commission rejected the original draft in Feb 2025, the ESAs submitted a revised version, and Commission Delegated Regulation (EU) 2025/532 was published in the OJ on July 2, 2025 and applies from July 22, 2025 (regulationtomorrow.com; A&O Shearman). (2) First hard supervisory test of the Register of Information submissions is occurring in Q1/H1 2026 with NCAs cross-referencing data automatically. (3) CTPP designation is an annual data-driven exercise with a voluntary opt-in process (EUR 50,000 non-refundable opt-in fee), and annual oversight fees apply to designated CTPPs. No 'stop-the-clock' delay, omnibus simplification, or amendment to DORA's core dates has occurred. NOTE on prompt's KNOWN CONTEXT: the Colorado AI Act / EU AI Act / Texas TRAIGA / CCPA ADMT items are not relevant to this page — dora.mdx is exclusively about the EU Digital Operational Resilience Act and makes no claims about those regimes (it only lists Colorado AI Act, EU AI Act, and NIS2 as 'related regulations' links, asserting no facts about them).

---

## `virginia-hb-2094`

**Page currently asserts:** status `vetoed` · effective `None — bill never became law (would have taken effect July 1, 2026 had it been signed)` · enforcement `None` · max penalty `N/A — bill was vetoed (proposed civil penalties up to $7,500 per violation, AG-enforced)`

✅ **Verified accurate** — no material issues found.

**Researcher notes:** VERDICT: Page is up to date as of June 21, 2026. No material discrepancies found.

CORE CLAIMS VERIFIED:
1. Veto date March 24, 2025 — CONFIRMED by IAPP (https://iapp.org/news/a/virginia-governor-vetoes-ai-bill), Ogletree, National Law Review, Williams Mullen, and the Virginia LIS bill page (https://lis.virginia.gov/bill-details/20251/HB2094). The bill passed the General Assembly Feb 20, 2025 and was vetoed; it would have taken effect July 1, 2026 had it been signed. Status 'vetoed' and maxPenalty 'N/A' are correct.
2. Proposed $7,500-per-violation AG-enforced civil penalty — CONFIRMED consistent with law-firm analyses (Saul Ewing, Mayer Brown, Alston & Bird) describing HB 2094's AG enforcement modeled on the VCDPA penalty structure (Va. Code § 59.1-584, up to $7,500/violation).
3. Coverage areas (employment, credit, education, healthcare, housing, insurance/consequential decisions) — CONFIRMED.
4. 'Modeled on Colorado SB 24-205' — CONFIRMED.
5. Forward-looking 'Colorado AI Act (effective January 1, 2027)' — CONFIRMED CURRENT. Colorado SB 24-205 was amended/replaced by SB 26-189, signed by Gov. Polis May 14, 2026, pushing the effective date from June 30, 2026 to January 1, 2027 with scaled-back transparency-focused requirements and mandated AG rulemaking (Seyfarth, Hunton, Norton Rose Fulbright, McDermott). The VA page's Jan 1, 2027 reference is accurate.
6. No enacted 2026 Virginia AI law — CONFIRMED. Sources only signal intent to reintroduce; no comprehensive Virginia AI statute exists as of June 2026, so the page's 'Virginia does not currently have a comprehensive AI-specific law' is correct.

MINOR (non-currency, not raised as an issue): The body characterizes the bill's opt-out rights as 'mirroring aspects of the EU AI Act.' HB 2094's consumer opt-out/appeal rights actually derive from the Colorado SB 24-205 / VCDPA lineage, not the EU AI Act (which is a risk-tiered regime, not an individual opt-out framework). This is an editorial characterization quibble about a never-enacted bill, not a factual-currency error.

NOT A PAGE ERROR but worth awareness for sibling pages: The EU AI Act high-risk (Annex III) application date moved from Aug 2, 2026 to Dec 2, 2027 via the Digital Omnibus (provisional agreement May 6, 2026; Council confirmation May 13, 2026; formal adoption expected before Aug 2, 2026). The VA page only references 'the EU AI Act if they serve EU residents' without citing a specific high-risk date, so this shift does NOT create a discrepancy on this page — but the standalone eu-ai-act page should be checked separately.

---
