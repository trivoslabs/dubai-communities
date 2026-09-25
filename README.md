# dubai-communities

**The 224 communities of Dubai with official community numbers, English and Arabic names, sectors and approximate coordinates. Zero dependencies.**

Identity is the **community number** — the official number assigned by the source layer, whose first digit is the sector (1-9). Names are display only: `name` is verbatim from the source layer (English in upper case, as published); `nameDisplay` is the same names title-cased for user interfaces. Store and match on `communityNumber`, never on a name.

Built and maintained by [Trivos Labs](https://trivoslabs.com), Dubai.

## Install

```bash
npm install @trivoslabs/dubai-communities
```

Node 18+ or any modern bundler. No dependencies.

## Usage

```js
import {
  communities,
  sectors,
  findCommunity,
  toSelectOptions,
  dataSource,
} from "@trivoslabs/dubai-communities";

// All 224, sorted for the locale, using the title-cased display names
communities({ locale: "ar" });

// Only sector 3, sorted in English
communities({ sector: 3, locale: "en" });

// Verbatim (upper-case) English names instead of the title-cased display form
communities({ display: false });

// Sector counts (official sector NAMES are not in this dataset — see below)
sectors();
// [{ sector: 1, communityCount: 23 }, { sector: 2, communityCount: 35 }, ...]

// Look up by community number or exact name, in either language/form
findCommunity("373");             // → Al Barsha First
findCommunity(373);
findCommunity("AL BARSHA FIRST");
findCommunity("Al Barsha First");
findCommunity("البرشاء الأولى");
```

### In a form

```js
const options = toSelectOptions(communities({ sector: 3, locale: "ar" }), {
  locale: "ar",
});
// [{ value: "373", label: "البرشاء الأولى" }, ...]
```

```html
<select name="community" dir="rtl">
  <!-- value is the community number; the label is display only -->
</select>
```

## Standards and source

| Layer | Source |
|---|---|
| Identity | The official **community number** (first digit = sector) |
| Data | Dubai Municipality GIS community layer **Community_20260815**, obtained from [Dubai Data](https://www.dubaipulse.gov.ae/) (data.dubai) as **Open**-classified data, retrieved **2026-08-25** |
| Coordinates | `centroid` (`[lon, lat]`) and `bbox` (`[minLon, minLat, maxLon, maxLat]`), WGS 84, **derived from the source boundary polygons** — approximate, not official coordinates |
| Arabic ordering | `Intl.Collator("ar")` — built into JavaScript |

Call `dataSource()` for the source layer, retrieval date and record count at runtime.

This package is built from Open-classified Dubai Data and is not endorsed by, and does not represent, Dubai Municipality, Dubai Data or Digital Dubai.

**Attribution:** community data sourced from Dubai Municipality via Dubai Data (data.dubai).

## Not included

- **Official sector names** — e.g. a label for sector 1 — are not part of this dataset. They are pending the Dubai Data Sectors dataset; this package does not invent names or labels for sectors.
- **Full boundary polygons** — only derived centroid/bbox are included here. A full GeoJSON release is a possible future version.

## Tests

```bash
npm test
```

## License

Apache-2.0 © Trivos Labs FZCO

---

<div dir="rtl">

# مجتمعات دبي

**مجتمعات دبي الـ224 بأرقامها الرسمية، وأسمائها بالعربية والإنجليزية، وقطاعاتها، وإحداثيات تقريبية. بدون أي اعتماديات.**

الهوية هي **رقم المجتمع** الرسمي، الذي يمثّل رقمه الأول القطاع (من 1 إلى 9). الأسماء للعرض فقط: `name` هو الاسم كما ورد من الطبقة المصدر (بالأحرف الكبيرة بالإنجليزية كما نُشر)، بينما `nameDisplay` هو الاسم نفسه بصياغة عناوين للواجهات. يجب التخزين والمطابقة برقم المجتمع لا بالاسم.

مصدر البيانات: طبقة مجتمعات بلدية دبي الجغرافية **Community_20260815**، المتاحة عبر [بيانات دبي](https://www.dubaipulse.gov.ae/) بتصنيف **مفتوح**، بتاريخ استرجاع **2026-08-25**. الإحداثيات (`centroid` و`bbox`) مشتقة من حدود الطبقة المصدر وهي تقريبية، وليست إحداثيات رسمية. أسماء القطاعات الرسمية غير متضمنة في هذه البيانات، وهي بانتظار مجموعة بيانات القطاعات من بيانات دبي.

هذه الحزمة مبنية على بيانات دبي المفتوحة، وهي غير معتمدة من قبل بلدية دبي أو بيانات دبي أو دبي الرقمية ولا تمثلها.

## الترخيص

Apache-2.0 © تريفوس لابز

</div>
