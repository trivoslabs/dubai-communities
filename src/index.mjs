/**
 * dubai-communities — the 224 communities of Dubai with official community
 * numbers, English and Arabic names, sectors and approximate coordinates.
 * Zero dependencies.
 *
 * Identity is the community number; names are display only.
 *
 * (c) Trivos Labs FZCO — Apache-2.0
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(
  readFileSync(join(__dirname, "..", "data", "communities.json"), "utf8")
);

const LOCALES = ["en", "ar"];
const MIN_SECTOR = 1;
const MAX_SECTOR = 9;

function assertLocale(locale) {
  if (!LOCALES.includes(locale)) {
    throw new Error(
      `Unsupported locale: ${locale}. Supported: ${LOCALES.join(", ")}`
    );
  }
}

function assertSector(sector) {
  if (
    !Number.isInteger(sector) ||
    sector < MIN_SECTOR ||
    sector > MAX_SECTOR
  ) {
    throw new Error(
      `Invalid sector: ${sector}. Must be an integer from ${MIN_SECTOR} to ${MAX_SECTOR}.`
    );
  }
}

/**
 * All 224 communities, ordered for a dropdown.
 *
 * options.locale  — "en" | "ar" (default "en")
 * options.sector  — 1-9, restrict to one sector (default: all)
 * options.display — true (default) sorts/is intended to be shown using
 *                    nameDisplay (title-cased EN); false uses the verbatim
 *                    `name` (upper-case EN, as published)
 * options.collator — a custom Intl.Collator, if you need different rules
 */
export function communities({
  locale = "en",
  sector,
  display = true,
  collator,
} = {}) {
  assertLocale(locale);
  if (sector !== undefined) assertSector(sector);
  const coll = collator ?? new Intl.Collator(locale);
  const nameKey = display ? "nameDisplay" : "name";
  const all =
    sector === undefined
      ? DATA.communities
      : DATA.communities.filter((c) => c.sector === sector);
  return [...all].sort((a, b) =>
    coll.compare(a[nameKey][locale], b[nameKey][locale])
  );
}

/**
 * Community counts per sector, in numeric order.
 *
 * Note: official sector NAMES (e.g. a label for sector 1) are not present
 * in this dataset and are pending the Dubai Data Sectors dataset — this
 * package does not invent names or labels for sectors.
 */
export function sectors() {
  const counts = new Map();
  for (const c of DATA.communities) {
    counts.set(c.sector, (counts.get(c.sector) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([sector, communityCount]) => ({ sector, communityCount }));
}

/**
 * Look a community up by its number (string or number) or an exact name in
 * either language, in either the verbatim or display form. English matching
 * is case-insensitive; Arabic matching is exact.
 */
export function findCommunity(query) {
  if (query === null || query === undefined) return null;
  const q = String(query).trim();
  if (q === "") return null;
  const qUpper = q.toUpperCase();
  return (
    DATA.communities.find(
      (c) =>
        c.communityNumber === q ||
        c.name.en.toUpperCase() === qUpper ||
        c.nameDisplay.en.toUpperCase() === qUpper ||
        c.name.ar === q ||
        c.nameDisplay.ar === q
    ) ?? null
  );
}

/** Plain { value, label } pairs for a <select> or datalist. No DOM. */
export function toSelectOptions(list, { locale = "en", display = true } = {}) {
  assertLocale(locale);
  const nameKey = display ? "nameDisplay" : "name";
  return list.map((item) => ({
    value: item.communityNumber,
    label: item[nameKey][locale],
  }));
}

/** Data provenance: source layer, retrieval date, record count. */
export function dataSource() {
  return {
    source: DATA.source,
    sourceLayer: DATA.sourceLayer,
    retrieved: DATA.retrieved,
    communityCount: DATA.communities.length,
  };
}
