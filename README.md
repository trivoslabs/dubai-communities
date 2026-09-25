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

## Standards used

| Layer | Detail |
|---|---|
| Identity | The official **community number** (first digit = sector) |
| Coordinates | `centroid` (`[lon, lat]`) and `bbox` (`[minLon, minLat, maxLon, maxLat]`), WGS 84, **derived from the source boundary polygons** — approximate, not official coordinates |
| Arabic ordering | `Intl.Collator("ar")` — built into JavaScript |
| Portal format | KML, from an ESRI SDE Geodatabase; dataset created 08 Jul 2019 |
| Portal update cadence | Source updated daily; published to the Dubai Data platform monthly |

Call `dataSource()` for the source layer, retrieval date and record count at runtime.

## Data source and licence

**Provenance.** The data in `data/communities.json` is derived from the Dubai Municipality GIS community layer **Community_20260815**, obtained from the [Dubai Data platform](https://data.dubai), retrieved **2026-08-25**.

**Licensing split.** The code in this repository (everything outside `data/`) is licensed under [Apache-2.0](LICENSE). The contents of `data/` are Adapted Material under the Dubai Data platform's Open Data Licence and are made available under that same licence — see [data/LICENSE-DATA.md](data/LICENSE-DATA.md) for details and a link to the source licence. The dataset's own "License" field on the portal is listed as "Not Specified"; this package relies on the platform's Open Data Licence as the governing terms for redistribution.

**Independent project, not affiliated.** dubai-communities is an independent open source project built and maintained by Trivos Labs. It is not affiliated with, endorsed by, sponsored by, or associated with Dubai Municipality, the Dubai Data platform, Digital Dubai, or any government entity. The data is redistributed under the terms of the Open Data Licence and is provided as-is, with no warranty of accuracy or fitness for purpose; the official Dubai Data platform is the authoritative source for current data.

**Accuracy.** Community names and numbers (`name`) are reproduced from the source layer without editing. `nameDisplay`, `centroid` and `bbox` are derived by this package. If you find a discrepancy with the official source, please open an issue — treat the official platform as authoritative, not this package.

## Data currency and maintenance

**What this release contains.** This release is a static snapshot: the Dubai Municipality GIS community layer **Community_20260815**, obtained from Dubai Data (data.dubai) as Open-classified data, retrieved **2026-08-25**. There is no API integration, automated pipeline or production access in this package — nothing here calls a live service; the numbers, names and coordinates were downloaded once and committed as-is. The portal's own "Last updated" field for this layer currently shows **31 Aug 2026** — after our retrieval date — so a newer version may already exist on the source; see "Planned" below.

**Why a package, not an API call.** Community boundaries are administrative reference data that change rarely. An application that queries a live service on every page view places continuous load on that service for data that is effectively static. Shipping the list as a versioned package lets an application resolve it locally, with no network call. The source platform publishes updates to this dataset monthly. Any application that needs authoritative, real-time data should use the official Dubai Data portal and its APIs directly — this package is a convenience copy with its retrieval date recorded, not a substitute for the source.

**Planned.** Nothing in this section is in place yet. Trivos Labs intends to refresh this dataset periodically from the official source, publish a new package version only when the source data actually changes, and record the source and retrieval date of every update in both the data file and the commit message. This refresh is intended to run on our side, outside this repository's CI, because the official APIs are reachable only from within the United Arab Emirates.

## Not included

- **Official sector names** — e.g. a label for sector 1 — are not part of this dataset. They are pending the Dubai Data Sectors dataset; this package does not invent names or labels for sectors.
- **Full boundary polygons** — only derived centroid/bbox are included here. A full GeoJSON release is a possible future version.

## Tests

```bash
npm test
```

## License

Code: Apache-2.0 © Trivos Labs FZCO — see [LICENSE](LICENSE).
Data (`data/`): Dubai Data Open Data Licence, as Adapted Material — see [data/LICENSE-DATA.md](data/LICENSE-DATA.md).

---

<div dir="rtl">

# مجتمعات دبي

**مجتمعات دبي الـ224 بأرقامها الرسمية، وأسمائها بالعربية والإنجليزية، وقطاعاتها، وإحداثيات تقريبية. بدون أي اعتماديات.**

الهوية هي **رقم المجتمع** الرسمي، الذي يمثّل رقمه الأول القطاع (من 1 إلى 9). الأسماء للعرض فقط: `name` هو الاسم كما ورد من الطبقة المصدر (بالأحرف الكبيرة بالإنجليزية كما نُشر)، بينما `nameDisplay` هو الاسم نفسه بصياغة عناوين للواجهات. يجب التخزين والمطابقة برقم المجتمع لا بالاسم.

بيانات البوابة: طبقة مجتمعات بلدية دبي الجغرافية **Community_20260815**، بتنسيق **KML** من قاعدة بيانات جغرافية ESRI SDE، أُنشئت في 08 يوليو 2019. الإحداثيات (`centroid` و`bbox`) مشتقة من حدود الطبقة المصدر وهي تقريبية، وليست إحداثيات رسمية. أسماء القطاعات الرسمية غير متضمنة في هذه البيانات، وهي بانتظار مجموعة بيانات القطاعات من بيانات دبي.

## مصدر البيانات وترخيصها

**المصدر:** بيانات `data/communities.json` مُشتقة من طبقة مجتمعات بلدية دبي الجغرافية **Community_20260815**، المتاحة عبر [منصة بيانات دبي](https://data.dubai)، بتاريخ استرجاع **2026-08-25**.

**تقسيم الترخيص:** الشيفرة البرمجية في هذا المستودع (كل ما هو خارج `data/`) مرخَّصة بموجب Apache-2.0. محتويات `data/` تُعدّ مادة مُعدَّلة (Adapted Material) بموجب رخصة البيانات المفتوحة الخاصة بمنصة بيانات دبي، وتُتاح بموجب الرخصة نفسها — راجع [data/LICENSE-DATA.md](data/LICENSE-DATA.md) للتفاصيل ورابط الرخصة الأصلية. حقل "الترخيص" الخاص بهذه المجموعة على البوابة مُدرج كـ"غير محدد"؛ وتعتمد هذه الحزمة على رخصة البيانات المفتوحة الخاصة بالمنصة عموماً كأساس لإعادة التوزيع.

**مشروع مستقل، غير تابع لأي جهة:** حزمة dubai-communities مشروع مفتوح المصدر ومستقل من تطوير تريفوس لابز. وهي غير تابعة لبلدية دبي أو منصة بيانات دبي أو دبي الرقمية أو أي جهة حكومية، وغير معتمدة أو مدعومة منها. تُعاد توزيع البيانات بموجب شروط رخصة البيانات المفتوحة وهي مقدَّمة كما هي دون أي ضمان للدقة أو الملاءمة لغرض معين؛ والمنصة الرسمية هي المرجع المعتمد للبيانات الحالية.

**الدقة:** أسماء المجتمعات وأرقامها (`name`) منقولة كما وردت من الطبقة المصدر دون تعديل. أما `nameDisplay` و`centroid` و`bbox` فهي مُشتقة بواسطة هذه الحزمة. إن لاحظت أي تعارض مع المصدر الرسمي، يُرجى فتح issue، واعتبار المنصة الرسمية هي المرجع المعتمد وليست هذه الحزمة.

## حداثة البيانات وصيانتها

**ما تتضمنه هذه النسخة:** هذه النسخة لقطة ثابتة من طبقة مجتمعات بلدية دبي الجغرافية **Community_20260815**، تم الحصول عليها من بيانات دبي (data.dubai)، بتاريخ استرجاع **2026-08-25**. لا يوجد في هذه الحزمة أي تكامل مع واجهة برمجية أو خط أنابيب آلي أو وصول إنتاجي؛ لا تستدعي هذه الحزمة أي خدمة حيّة، وقد تم تنزيل الأرقام والأسماء والإحداثيات مرة واحدة وإدراجها كما هي. حقل "آخر تحديث" في صفحة البوابة لهذه الطبقة يُظهر حالياً **31 أغسطس 2026** — بعد تاريخ استرجاعنا — فقد تكون هناك نسخة أحدث متاحة على المصدر؛ انظر "مخطَّط له" أدناه.

**لماذا حزمة بدلاً من استدعاء واجهة برمجية:** حدود المجتمعات بيانات مرجعية إدارية نادراً ما تتغيّر، بينما يضع تطبيقٌ يستدعي خدمة حيّة في كل تحميل صفحة حِملاً مستمراً على تلك الخدمة لبيانات شبه ثابتة فعلياً. نشر القائمة كحزمة ذات إصدار يتيح للتطبيق حلّها محلياً دون أي اتصال شبكي. تُنشر تحديثات هذه المجموعة على المنصة المصدر شهرياً. أي تطبيق يحتاج بيانات رسمية وفي الوقت الحقيقي يجب أن يستخدم بوابة بيانات دبي الرسمية وواجهاتها البرمجية مباشرة؛ هذه الحزمة نسخة مساعدة مسجَّل عليها تاريخ الاسترجاع، وليست بديلاً عن المصدر.

**مخطَّط له:** كل ما يلي غير قائم حالياً. تنوي تريفوس لابز تحديث هذه البيانات دورياً من المصدر الرسمي، ونشر إصدار جديد فقط عند تغيّر البيانات المصدرية فعلياً، مع تسجيل مصدر كل تحديث وتاريخ استرجاعه في ملف البيانات ورسالة الإيداع. من المزمع أن يتم هذا التحديث من جانبنا خارج نظام التكامل المستمر لهذا المستودع، لأن الواجهات البرمجية الرسمية لا يمكن الوصول إليها إلا من داخل دولة الإمارات العربية المتحدة.

## الترخيص

الشيفرة البرمجية: Apache-2.0 © تريفوس لابز — راجع [LICENSE](LICENSE).
البيانات (`data/`): رخصة البيانات المفتوحة لمنصة بيانات دبي، كمادة مُعدَّلة — راجع [data/LICENSE-DATA.md](data/LICENSE-DATA.md).

</div>
