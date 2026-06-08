# Phase 3 + 3.5 — Adversarial audit chain · asterisaffiliates.com
Independent auditors: GROK (x-ai/grok-4.3) + GEMINI (google/gemini-2.5-flash), fired blind, then re-fired after each patch. 8 Jun 2026.

## Round 1 (Phase 3) — verdict NEEDS_FIXES
- BLOCKER: rival price figures in meta — "/pricing 3-9x cheaper", "/slicewp-vs $299/yr" (the latter equalled Asteris's own Pro price and slipped a naive scan). FIXED — removed; no rival figure in any meta.
- MEDIUM: redundant /pricing title; "honest comparison"; /migrate hub missing 2 links. FIXED.
- Dismissed false positives: "best" (target keyword), "compare" (not banned), "SliceWP pricing" (locked tagline), 8 Jun date (real release date).

## Round 2 (Phase 3.5 — CC patch round) — verdict NEEDS_FIXES → all FIXED
- A1 BLOCKER: FAQPage acceptedAnswer carried a "verify current rival pricing at publish" note-to-self. FIXED — compare FAQ rewritten; no notes, no rival figure.
- A2 BLOCKER: Organization.sameAs ["[PENDING social URLs]"] invalid. FIXED — property removed until real URLs exist.
- A3 BLOCKER: Organization.logo pointed at non-existent /logo.png. FIXED — generated a real 512x512 logo.png (mint #06D6A0), shipped in /seo/assets/.
- B1 HIGH: WebPage url:"X" placeholders on 7 pages. FIXED — canonical URL substituted on every WebPage/ContactPage.
- B2 HIGH: matrix referenced non-existent /about, /contact. FIXED — /contact added (ContactPage schema, mailto/form); /about merged into /founder; matrix re-derived, all links resolve.
- B3 HIGH: identical HowTo across 5 migration pages. FIXED — source-specific export steps per tool (AffiliateWP / SliceWP / Tapfiliate / YITH / Solid Affiliate). Bonus: caught that /docs/getting-started was wrongly emitting migration steps — now has its own install/setup HowTo. CC: confirm exact export menu labels per tool version.
- C1 MEDIUM: keyword-strategy.json was 22 entries. FIXED — regenerated to full 28-page scope (incl. solid-vs, easy-vs, migrate/from-solid, 4 legal, /contact).
- C2 MEDIUM: /founder author was Organization. FIXED — Person, name "Nick Lord".
- C3 MEDIUM: /changelog TechArticle lacked version. FIXED — about: SoftwareApplication softwareVersion 1.1.0.

## Round 3 (re-fire after 3.5) — schema completeness for Rich Results — FIXED
Both auditors confirmed all Round-2 items resolved, then flagged schema-completeness for Rich Results eligibility:
- SoftwareApplication missing url; offers missing availability/url. FIXED.
- Product missing description/image. FIXED.
- Article/TechArticle missing datePublished/image; mainEntityOfPage as bare string. FIXED — datePublished 2026-06-08, image (per-page OG), mainEntityOfPage now {"@type":"WebPage","@id":...}; publisher logo ImageObject added.

## Final state (post all rounds)
- 28 pages · JSON-LD 99/99 valid · firewall clean · AU English · titles ≤60 · descriptions 140-160
- No rival price figures anywhere · all internal links resolve · all schema enriched for Rich Results
- Real logo.png (512x512) shipped

## Verdict: PASS
Standing PUBLISH gate (not a content defect): verify every competitor price live before it appears in body copy (Sovereign BLOCKER); confirm migration export menu paths per tool version; run the live Google Rich Results test as the final pre-ship check.
