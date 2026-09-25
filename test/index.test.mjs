import { test } from "node:test";
import assert from "node:assert/strict";
import {
  communities,
  sectors,
  findCommunity,
  toSelectOptions,
  dataSource,
} from "../src/index.mjs";

test("224 records, well-formed", () => {
  const all = communities();
  assert.equal(all.length, 224);
  for (const c of all) {
    assert.match(c.communityNumber, /^\d{3}$/);
    assert.equal(Number(c.communityNumber[0]), c.sector);
    assert.ok(c.name.en.length > 0);
    assert.ok(c.name.ar.length > 0);
    assert.ok(c.nameDisplay.en.length > 0);
    assert.ok(c.nameDisplay.ar.length > 0);
  }
});

test("communityNumber values are unique", () => {
  const all = communities();
  const numbers = all.map((c) => c.communityNumber);
  assert.equal(new Set(numbers).size, numbers.length);
});

test("Arabic ordering uses Arabic collation, not English order", () => {
  const ar = communities({ locale: "ar" });
  const coll = new Intl.Collator("ar");
  for (let i = 1; i < ar.length; i++) {
    assert.ok(
      coll.compare(ar[i - 1].nameDisplay.ar, ar[i].nameDisplay.ar) <= 0
    );
  }
  const en = communities({ locale: "en" });
  const arOrder = ar.map((c) => c.communityNumber);
  const enOrder = en.map((c) => c.communityNumber);
  assert.notDeepEqual(arOrder, enOrder);
});

test("English ordering is sorted by English collation", () => {
  const en = communities({ locale: "en" });
  const coll = new Intl.Collator("en");
  for (let i = 1; i < en.length; i++) {
    assert.ok(
      coll.compare(en[i - 1].nameDisplay.en, en[i].nameDisplay.en) <= 0
    );
  }
});

test("sector filter returns only that sector, matching sectors() count", () => {
  const sector3 = communities({ sector: 3 });
  assert.ok(sector3.length > 0);
  for (const c of sector3) assert.equal(c.sector, 3);
  const counts = sectors();
  const entry = counts.find((s) => s.sector === 3);
  assert.equal(sector3.length, entry.communityCount);
});

test("sectors() returns 9 entries whose counts sum to 224", () => {
  const counts = sectors();
  assert.equal(counts.length, 9);
  assert.deepEqual(
    counts.map((s) => s.sector),
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  const total = counts.reduce((sum, s) => sum + s.communityCount, 0);
  assert.equal(total, 224);
});

test("findCommunity matches number or name in either language/form", () => {
  const byNumberString = findCommunity("373");
  const byNumberNumeric = findCommunity(373);
  const byNameUpper = findCommunity("AL BARSHA FIRST");
  const byNameDisplay = findCommunity("Al Barsha First");
  const byNameArabic = findCommunity("البرشاء الأولى");

  assert.ok(byNumberString);
  assert.equal(byNumberString.communityNumber, "373");
  assert.equal(byNumberNumeric.communityNumber, "373");
  assert.equal(byNameUpper.communityNumber, "373");
  assert.equal(byNameDisplay.communityNumber, "373");
  assert.equal(byNameArabic.communityNumber, "373");

  assert.equal(findCommunity("Nowhere"), null);
});

test("invalid locale and out-of-range sector throw", () => {
  assert.throws(() => communities({ locale: "fr" }));
  assert.throws(() => communities({ sector: 0 }));
  assert.throws(() => communities({ sector: 10 }));
});

test("coordinates are inside the UAE and bbox is well-formed", () => {
  const all = communities();
  for (const c of all) {
    const [lon, lat] = c.centroid;
    assert.ok(lon >= 54 && lon <= 57);
    assert.ok(lat >= 24 && lat <= 26);
    const [minLon, minLat, maxLon, maxLat] = c.bbox;
    assert.equal(c.bbox.length, 4);
    assert.ok(minLon <= maxLon);
    assert.ok(minLat <= maxLat);
  }
});

test("toSelectOptions returns value/label pairs", () => {
  const options = toSelectOptions(communities({ sector: 3 }), {
    locale: "en",
  });
  assert.ok(options.length > 0);
  for (const o of options) {
    assert.ok(typeof o.value === "string");
    assert.ok(typeof o.label === "string");
  }
});

test("dataSource reports provenance", () => {
  const info = dataSource();
  assert.equal(info.communityCount, 224);
  assert.ok(info.source.length > 0);
  assert.ok(info.sourceLayer.length > 0);
  assert.ok(info.retrieved.length > 0);
});
