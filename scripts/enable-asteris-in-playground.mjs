#!/usr/bin/env node
/**
 * enable-asteris-in-playground.mjs
 *
 * One-shot: replaces the `_PENDING_asteris_install` placeholder step in
 * public/playground/blueprint.json with a real Playground `installPlugin`
 * step pointing at the Asteris Free listing on WordPress.org.
 *
 * Run AFTER Asteris Free is approved on WordPress.org (gated by the
 * Model C plugin refactor + WP.org submission cycle, see roadmap).
 *
 * Usage:
 *   node scripts/enable-asteris-in-playground.mjs <wp-org-slug>
 *
 * Default slug: asteris-affiliates
 *
 * Example:
 *   node scripts/enable-asteris-in-playground.mjs asteris-affiliates
 *
 * The script also bumps the "$schema" reference + landingPage so the
 * Playground demo boots directly into the Asteris dashboard after install.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const blueprintPath = join(__dirname, '..', 'public', 'playground', 'blueprint.json');

const slug = process.argv[2] || 'asteris-affiliates';
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Refusing — slug must match /^[a-z0-9-]+$/. Got:', JSON.stringify(slug));
  process.exit(1);
}

const blueprint = JSON.parse(readFileSync(blueprintPath, 'utf8'));

// Find the placeholder step
const idx = blueprint.steps.findIndex((s) => s.step === '_PENDING_asteris_install');
if (idx === -1) {
  console.error('Refusing — could not find the _PENDING_asteris_install step in blueprint.json.');
  console.error('Either the blueprint has been edited already, or it was reset. Inspect:');
  console.error('  ' + blueprintPath);
  process.exit(2);
}

// Replace with the real install step
blueprint.steps[idx] = {
  step: 'installPlugin',
  pluginData: {
    resource: 'wordpress.org/plugins',
    slug: slug,
  },
  options: { activate: true },
};

// Land the visitor directly on the Asteris dashboard after boot, not just WC admin
blueprint.landingPage = '/wp-admin/admin.php?page=asteris';

// Update the description to reflect that Asteris IS now in the sandbox
if (blueprint.meta && blueprint.meta.description) {
  blueprint.meta.description = blueprint.meta.description.replace(
    /All 19 modules ready to explore\.?$/,
    'All 19 modules pre-installed and ready to explore.'
  );
}

writeFileSync(blueprintPath, JSON.stringify(blueprint, null, 2) + '\n', 'utf8');
console.log('✓ Enabled Asteris install in Playground blueprint:');
console.log('  - slug:        ' + slug);
console.log('  - landingPage: ' + blueprint.landingPage);
console.log('  - file:        ' + blueprintPath);
console.log('');
console.log('Next steps:');
console.log('  1. Rebuild + redeploy the site so /playground/blueprint.json reflects the change.');
console.log('  2. Test in a fresh browser session: https://playground.wordpress.net/?blueprint-url=https://asterisaffiliates.com/playground/blueprint.json');
console.log("  3. Update /demo page copy to remove the \"Asteris isn't on WordPress.org yet\" banner.");
