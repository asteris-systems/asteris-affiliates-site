---
title: "AI Suite"
description: "Multi-provider AI generation for WooCommerce product descriptions, SEO meta, and image alt text, for store owners who want one key across every model and no monthly cap."
---

## What it does

AI Suite adds a sidebar metabox to every WooCommerce product, plus four bulk actions on the Products list, that generate long descriptions, short descriptions, SEO meta (title + description), and image alt text using your own API key. It supports four providers — OpenRouter (recommended, one key across GPT-5, Claude, Gemini, Llama, Mistral and more), Google Gemini direct, OpenAI direct, and Anthropic direct. Generations use product name, categories, tags, price, your per-product brief, and your target keywords as context. The image alt text generator is vision-capable on all four providers and reads the featured image directly.

Your API key is stored as a WordPress option on your own site. Asteris calls the provider endpoint directly — there is no proxy server, no markup, and no monthly token allowance imposed by Asteris. This module replaces AI Engine (~USD 79/yr), GetGenie (~USD 99/yr), and Rank Math Content AI (~USD 199/yr).

## Quick start

1. Go to **WP Admin → Asteris → AI Suite** and pick a provider. OpenRouter is the recommended default — one signup gets you every major model.
2. Paste your API key (OpenRouter keys start with `sk-or-v1-`, Gemini with `AIza`, OpenAI with `sk-`, Anthropic with `sk-ant-`).
3. Pick a model. For OpenRouter use the preset dropdown — Auto-pick, Best quality (GPT/Claude/Gemini), Balanced, or Free/cheapest. For direct providers, edit the model slug field.
4. Click **Test connection**. A green tick with a sample reply confirms the key + model combination works.
5. Set tone, language (ISO 639-1 code), and an optional brand-voice paragraph that is injected into every generation.
6. Save settings, then open any product. The **Asteris — AI Suite** metabox appears in the sidebar with four generator buttons.
7. For multiple products at once, select rows on **Products → All Products**, choose an *Asteris AI* bulk action, and confirm in the progress screen.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Provider | Which AI service to call. | `openrouter` | `openrouter`, `gemini`, `openai`, `anthropic`, `disabled` |
| API key | Bearer token for the chosen provider. Stored as a WordPress option. | empty | Provider-specific prefix |
| OpenRouter preset | High-level model picker that maps to a slug. | `auto` | `auto`, `gpt`, `claude`, `gemini`, `balanced`, `cheap`, `custom` |
| OpenRouter model slug | Raw slug sent to OpenRouter. Editable only when preset is Custom. | `openrouter/auto` | Any slug from openrouter.ai/models |
| OpenAI model | Slug for direct OpenAI calls. | `gpt-4o-mini` | Any OpenAI chat-completions model |
| Anthropic model | Slug for direct Anthropic calls. | `claude-haiku-4-5-20251001` | Any Anthropic Messages model |
| Gemini model | Slug for direct Gemini calls. | `gemini-2.5-flash` | Any Gemini generateContent model |
| Tone | Writing register applied to descriptions. | `professional` | `professional`, `friendly`, `luxury`, `playful`, `direct` |
| Language | Output language for generations. | `en` | ISO 639-1 (en, fr, de, es, it, ja, …) |
| Brand voice | Free-text style guide injected into every prompt. | empty | Up to several paragraphs |
| Monthly request cap | Soft ceiling on generations per calendar month. | `100` | `0` (unlimited) to `100000` |
| Show long description button | Toggle the long-description generator. | `1` (on) | `0` or `1` |
| Show short description button | Toggle the short-description generator. | `1` (on) | `0` or `1` |
| Show SEO meta button | Toggle the SEO meta generator. | `1` (on) | `0` or `1` |
| Show alt text button | Toggle the image alt text generator. | `1` (on) | `0` or `1` |

Option keys are prefixed by the core module helper — the canonical names are `asteris_ai_suite_provider`, `asteris_ai_suite_api_key`, and so on. Usage data lives under `asteris_ai_suite_usage` (rolling 12-month rollup, keyed by `YYYY-MM`).

## Common workflows

### Generate copy for a single product

1. Open the product editor. The **Asteris — AI Suite** metabox is in the sidebar.
2. Fill **Target keywords** (comma-separated, primary first) and an optional **Brief / key facts** paragraph. Both auto-save with the product.
3. Click one of the four generator buttons. The preview shows the output.
4. For long or short descriptions use **Replace**, **Append**, or **Copy**. For SEO meta, if the Asteris SEO metabox is on the page, the title and description fields are auto-filled — otherwise paste into Yoast or Rank Math. For alt text, copy and paste into the Media Library alt field.
5. Click **WP Update** to persist any write-back.

### Bulk-generate descriptions across the catalogue

1. Go to **Products → All Products** and select rows (filter by category, stock status, etc. as needed).
2. From the bulk-action dropdown pick one of **Asteris AI — Generate long / short / SEO / alt text**.
3. You are redirected to a progress screen. If selection exceeds 500 products a cost-preview warning appears; selections over 5000 are refused outright.
4. Choose **Skip products that already have content** (recommended) or **Force overwrite everything**, then **Start**.
5. The runner drains the queue one product at a time over AJAX. Closing the tab pauses the job — reopen the URL with the token to resume within an hour.

### Author a store-wide brand voice

1. Open **AI Suite → Settings** and find **Brand voice**.
2. Write a paragraph describing your audience, forbidden words, preferred phrasing, and country-of-origin conventions.
3. Save. The text is appended to the system prompt on every generation across every product and every bulk job.
4. Re-run a single product generation to confirm the voice carries through before kicking off a bulk job.

### Cap monthly spend

1. Set **Monthly request cap** to a number you are comfortable with (e.g. 500).
2. The metabox footer shows running usage. Once the cap is reached, both the per-product AJAX endpoint and the bulk processor refuse new requests until the next calendar month.
3. Set to `0` for no internal cap (the provider still bills you per call).

### Recover from a deprecated OpenRouter model

1. If OpenRouter rejects the configured slug, AI Suite automatically retries the call with `openrouter/auto` and persists the change so the bad slug is not retried.
2. A warning banner appears on the settings page naming the stale slug.
3. Pick a fresh preset (Auto-pick, Best quality, Balanced) and save — the banner clears.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

AI Suite currently exposes no public extension points. All AJAX actions (`asteris_ai_test`, `asteris_ai_generate`, `asteris_ai_save_inputs`, `asteris_ai_bulk_process`), the `admin_post_asteris_ai_save` settings handler, and the `bulk_actions-edit-product` entries are internal to the admin UI and may change without notice. Post-meta keys written by the generators are listed in the Settings reference. If you need a hook for a specific integration use case, raise it on the support forum.

## Troubleshooting

### Generate button does nothing or returns "Permission denied"

The AJAX handler requires `edit_products` and a valid `asteris_ai_nonce`. The nonce is printed by the metabox, so if the metabox is hidden via screen options or a role plugin strips the capability, generation fails. Check **Screen Options → Asteris — AI Suite** is ticked and confirm the role has `edit_products`.

### "Monthly request cap reached"

The single-product AJAX and the bulk processor both consult `get_monthly_usage()` against the **Monthly request cap** setting. Raise the cap (or set to `0` for unlimited) under **AI Suite → Usage limits**. The counter rolls over at the start of each calendar month.

### "OpenRouter rejected the configured model"

The configured slug is deprecated or misspelled. AI Suite auto-falls-back to `openrouter/auto` and persists the change so subsequent calls do not retry the bad slug. Pick a fresh preset on the settings page and save to clear the warning. Browse current slugs at openrouter.ai/models.

### Alt text generation returns generic copy

Vision support requires the featured image to be accessible. AI Suite fetches the WordPress `large` size (~1024 px) and base64-encodes it. If the image lives on an external CDN that blocks `wp_remote_get` from your server, the call falls back to a text-only prompt and quality drops. Ensure the featured image is locally hosted or the CDN allows server-side fetches.

### Bulk job stalls or shows "Queue expired"

The queue transient has a 1-hour TTL. If a job is paused longer than an hour, the transient is garbage-collected and the runner cannot resume. Restart the bulk action from the Products list. For very large catalogues split into batches of a few hundred — the hard cap is 5000 per job and the warn threshold is 500.

## Known plugin conflicts

- **Other AI-writer plugins (AI Engine, GetGenie, Rank Math Content AI)** — no hard conflict, but running them on the same product editor adds two metaboxes doing the same job. Pick one.
- **Role / capability plugins** that strip `edit_products` from shop managers will silently disable the generate buttons.
- **External-CDN media plugins** that block server-to-server image fetches reduce alt-text quality (see Troubleshooting above).
- No conflicts are currently known with Yoast SEO, Rank Math, WooCommerce core, Polylang or WPML. If you find one, please report it on the support forum.

## What is in Free vs Paid

AI Suite is a paid-tier module. Available in Starter, Pro, Agency, and Founder. It is not included in Asteris Free and there is no lite version of this module in the free plugin.

## Related

- [All modules](/modules)
- [Pricing](/pricing)
- [SEO module](/docs/modules/seo) — the SEO metabox that AI Suite auto-fills
- [Migration from AI Engine](/migrate/from-yith)
- [Migration from GetGenie](/migrate/from-yith)
- [Migration from Rank Math Content AI](/migrate/from-yith)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
