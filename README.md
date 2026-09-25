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

## Data currency and maintenance

**What this release contains.** This release is a static snapshot: the Dubai Municipality GIS community layer **Community_20260815**, obtained from Dubai Data (data.dubai) as Open-classified data, retrieved **2026-08-25**. Nothing in this package calls a live service — the numbers, names and coordinates were downloaded once and committed as-is.

**Why a package, not an API call.** Community boundaries are administrative reference data that change rarely. An application that queries a live service on every page view places continuous load on that service for data that is effectively static. Shipping the list as a versioned package lets an application resolve it locally, with no network call. Any application that needs authoritative, real-time data should use the official Dubai Data portal and its APIs directly — this package is a convenience copy with its retrieval date recorded, not a substitute for the source.

**How it will be kept current (Planned).** Nothing below this line is in place yet. Trivos Labs intends to refresh this dataset periodically from the official source, publish a new package version only when the source data actually changes, and record the source and retrieval date of every update in both the data file and the commit message. This refresh is intended to run on our side, outside this repository's CI, because the official APIs are reachable only from within the United Arab Emirates.

### Attribution and corrections

Community data sourced from Dubai Municipality via Dubai Data (data.dubai). Names and numbers are reproduced from the source layer and are not edited by this package. If you spot a discrepancy with the official source, please open an issue — the official portal is authoritative, not this package.

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

## حداثة البيانات وصيانتها

**ما تتضمنه هذه النسخة:** هذه النسخة لقطة ثابتة من طبقة مجتمعات بلدية دبي الجغرافية **Community_20260815**، تم الحصول عليها من بيانات دبي (data.dubai) بتصنيف **مفتوح**، وتاريخ الاسترجاع **2026-08-25**. لا تستدعي هذه الحزمة أي خدمة حيّة؛ تم تنزيل الأرقام والأسماء والإحداثيات مرة واحدة وإدراجها كما هي.

**لماذا حزمة بدلاً من استدعاء واجهة برمجية:** حدود المجتمعات بيانات مرجعية إدارية نادراً ما تتغيّر، بينما يضع تطبيقٌ يستدعي خدمة حيّة في كل تحميل صفحة حِملاً مستمراً على تلك الخدمة لبيانات شبه ثابتة فعلياً. نشر القائمة كحزمة ذات إصدار يتيح للتطبيق حلّها محلياً دون أي اتصال شبكي. أي تطبيق يحتاج بيانات رسمية وفي الوقت الحقيقي يجب أن يستخدم بوابة بيانات دبي الرسمية وواجهاتها البرمجية مباشرة؛ هذه الحزمة نسخة مساعدة مسجَّل عليها تاريخ الاسترجاع، وليست بديلاً عن المصدر.

**كيف ستُحدَّث مستقبلاً (مخطَّط له):** كل ما يلي غير قائم حالياً. تنوي تريفوس لابز تحديث هذه البيانات دورياً من المصدر الرسمي، ونشر إصدار جديد فقط عند تغيّر البيانات المصدرية فعلياً، مع تسجيل مصدر كل تحديث وتاريخ استرجاعه في ملف البيانات ورسالة الإيداع. من المزمع أن يتم هذا التحديث من جانبنا خارج نظام التكامل المستمر لهذا المستودع، لأن الواجهات البرمجية الرسمية لا يمكن الوصول إليها إلا من داخل دولة الإمارات العربية المتحدة.

### الإسناد والتصحيحات

بيانات المجتمعات مصدرها بلدية دبي عبر بيانات دبي (data.dubai). الأسماء والأرقام منقولة كما وردت من الطبقة المصدر دون تعديل. إن لاحظت أي تعارض مع المصدر الرسمي، يُرجى فتح issue، فالبوابة الرسمية هي المرجع المعتمد وليست هذه الحزمة.

## الترخيص

Apache-2.0 © تريفوس لابز

</div>
