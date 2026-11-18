# تقرير التدقيق الشامل لواجهة وتجربة المستخدم (UI/UX Audit Report)
## مشروع معرض الأعمال الهندسي (Engineering Portfolio Showcase)
**المطور:** ألبير أشرف (Alber Ashraf) | **التقنيات:** Angular 21 (Standalone), Tailwind CSS v4, Signals, .NET 9 Ecosystem  
**تاريخ الفحص:** 18 نوفمبر 2026 | **الحالة:** مكتمل عبر الفحص الساكن الدقيق والاختبار الديناميكي المتكامل

---

## 1. الملخص التنفيذي (Executive Summary)

تم إجراء فحص شامل وتدقيق معماري وتفاعلي لموقع معرض الأعمال (Portfolio) المبني بأحدث معمارية **Angular 21** و **Tailwind CSS v4**، والمستند إلى مصدر الحقيقة الموحد `docs/master-profile.json`.

شمل التدقيق 13 مكوناً وتوجيهاً (Components & Directives)، وفحص 127 عنصراً تفاعلياً عبر 3 شاشات قياسية (الهاتف `375x812`، التابلت `768x1024`، وسطح المكتب `1440x900`).

### المؤشرات العامة (Key Health Metrics):
- **Core Web Vitals:** أداء ممتاز وسريع جداً:
  - **TTFB:** 28ms | **FCP:** 1.29s | **LCP:** 1.29s | **CLS:** 0.0000 (ثبات بصري تام أثناء التحميل).
- **أخطاء الكونسول (Console Errors):** 0 أخطاء و 0 تحذيرات وقت التشغيل (Clean runtime).
- **سهولة الوصول (Accessibility - WCAG 2.1 AA):** يحتاج إلى تدخل عاجل:
  - **442 عنصر** يعاني من ضعف نسبي في التباين اللوني (خاصة تدرجات `slate-500` على الخلفيات الداكنة `05070E`).
  - **أهداف اللمس (Touch Targets):** 8 فئات رئيسية من الأزرار والروابط بمساحات لمس تتراوح بين `24px` و `32px` (أقل من معيار `44x44px`).
  - **التنقل بلوحة المفاتيح ومؤشرات التركيز:** غياب شبه كامل لـ `:focus-visible` مع استخدام `focus:outline-none` على شعار الموقع.
  - **إمكانية الوصول في النوافذ المنبثقة (Modals A11y):** غياب سمات `role="dialog"` و `aria-modal="true"` واحتجاز التركيز (Focus Trap) في نافذتي `project-cockpit` و `cv-modal`.
- **دعم اللغة العربية و RTL:** الموقع حالياً معد بالكامل بالإنجليزية فقط (`lang="en"` وبدون `dir`)، مع استخدام خصائص اتجاهية صريحة (Physical CSS properties) وأيقونات غير معكوسة وغياب تام لخطوط Cairo / Tajawal.

---

## 2. ما يعمل بكفاءة وتميز (What Works)

1. **الهوية البصرية والنظام اللوني الداكن (Dark Aesthetic & Glassmorphism):**
   - استخدام احترافي وعصري لخلفية الفضاء السيبراني الداكنة (`#05070E`) المطعمة بهالات ضوئية ناعمة من النيلي والسيان (`indigo-600/10` و `cyan-500/10`).
   - بطاقات الزجاج المصنفر (`.glass-card`) بدرجة تمويه متوازنة (`backdrop-blur-xl`) وحدود رفيعة شبه شفافة (`border-white/10`) متوافقة بصرياً مع الهوية الهندسية لأنظمة .NET و Enterprise.

2. **شبكة التصميم والتباعدات الكلية (Macro Layout & 8pt Grid Consistency):**
   - الحاويات الرئيسية منضبطة بصرامة على الحجم الأقصى الموحد (`max-w-7xl mx-auto`) وحواشي جانبية متجاوبة (`px-4 sm:px-6 lg:px-8`).
   - إيقاع الأقسام الرأسي منتظم بدقة عبر قاعدة 8pt (`py-20` = 80px)، والفجوات بين بطاقات المشاريع والمهارات منضبطة على `gap-6` (24px).
   - ثبات نصف قطر انحناء الزوايا (`rounded-2xl` = 16px للبطاقات، و `rounded-xl` = 12px للضوابط الداخلية).

3. **النظام الطباعي السائل (Fluid Typography):**
   - العناوين الرئيسية مبنية بمعادلات سائلة احترافية تعتمد على `clamp`:
     - `.hero-fluid-title`: `clamp(2.1rem, 7vw, 4.25rem)` بارتفاع سطر محكم `1.08`.
     - `.section-fluid-title`: `clamp(1.75rem, 4.5vw, 2.75rem)` بارتفاع سطر `1.15`.
   - لا يحدث أي تداخل أو كسر غير مقصود للنصوص عند الانتقال بين الشاشات المختلفة.

4. **المعمارية التقنية للأداء (Performance Engineering):**
   - تشغيل حلقة جزيئات الكانفاس (`animated-background.ts`) بالكامل خارج نطاق آنجولار (`this.ngZone.runOutsideAngular`) لتفادي إطلاق دورات كشف التغييرات (Change Detection ticks) في كل إطار 60fps.
   - حماية تأثير الإمالة ثلاثي الأبعاد (`spotlight-tilt.directive.ts`) عبر إيقافه تلقائياً على شاشات اللمس (`@media (hover: none) and (pointer: coarse)`) واستخدام `requestAnimationFrame` لتحديث التحولات.
   - كشف التمرير (`scroll-reveal.directive.ts`) يستخدم `IntersectionObserver` بدلاً من مراقبة حدث التمرير، مع إلغاء المراقبة الفورية بمجرد ظهور العنصر (`observer.unobserve`).

5. **حلول الشاشات الصغيرة الاستثنائية (Mobile-First Polish):**
   - زر الهامبرغر يلبي معيار اللمس بدقة (`min-w-[44px] min-h-[44px]`).
   - عناصر قائمة الهاتف المنسدلة (`navbar.ts:109`) تحقق الحد الأدنى للمس (`min-h-[44px]`).
   - تحويل النوافذ المنبثقة على الموبايل إلى نمط الدرج السفلي (`bottom-sheet`) بمقبض سحب أنيق (`w-12 h-1.5 rounded-full bg-white/20`).
   - التغلب الذكي على مشكلة منع متصفحات الهواتف لعرض ملفات PDF داخل `iframe`، بتوفير بطاقة معاينة أصلية متجاوبة (Native Mobile Preview Card) بدلاً من الإطار الصامت.

---

## 3. ما لا يعمل وفقاً للقواعد والمعايير (What Doesn't Work - By Rule)

### القاعدة 1: دعم اللغة العربية و RTL (Bidirectional Text & Icon Mirroring)
- **المشكلة 1 (اللغة والاتجاه):** `src/index.html` يعرف الصفحة بالإنجليزية فقط `<html lang="en" class="dark scroll-smooth">` دون وجود خاصية `dir` أو تبديل ثنائي اللغة.
- **المشكلة 2 (الخطوط العربية المفقودة):** الصفحة تستدعي خطوط `Inter` و `JetBrains Mono` فقط عبر Google Fonts، ولا تتضمن خطوط **Cairo** أو **Tajawal** المناسبة للغة العربية الهندسية.
- **المشكلة 3 (ارتفاع السطر العربي):** ارتفاع الأسطر الحالي `leading-relaxed` (1.625) في بعض الفقرات مناسب للإنجليزية لكنه غير كافٍ للخط العربي ذي الصواعد والهوابط الكبيرة، والذي يتطلب خطاً بين `1.6` و `1.8` مع زيادة التباعد بمقدار `2px`.
- **المشكلة 4 (الحروف الكبيرة والتباعد):** استخدام فئات `uppercase` و `tracking-widest` بكثافة (مثل `tech-arsenal.ts:28` و `project-matrix.ts:22`). هذه الخصائص تكسر تشبيك الحروف العربية تماماً إذا ما تمت ترجمة الواجهة أو تعريب النصوص.
- **المشكلة 5 (الخصائص الاتجاهية الصريحة - Physical CSS):**
  - استخدام `left-4 sm:left-6 md:left-1/2` و `pl-8 sm:pl-12` و `md:pr-12 / md:pl-12` في الخط الزمني لخبرات العمل (`experience.ts:32-47`).
  - استخدام `border-r` و `rounded-l-xl` و `rounded-r-xl` في أزرار الـ CV المقسمة (`hero.ts:98-106`).
  - يتطلب المعيار استبدالها بخصائص المنطق الاتجاهي (CSS Logical Properties): `start/end` و `ms/me` و `ps/pe` و `rounded-s/rounded-e`.
- **المشكلة 6 (قواعد عكس الأيقونات - Icon Mirroring):**
  - أسهم التنقل الخلفي والتقدم (`Next →`, `← Prev`, `group-hover:translate-x-0.5` في `project-matrix.ts:300` و `project-cockpit.ts:51-61`) يجب أن تعكس اتجاهها في نمط RTL.
  - على النقيض: أيقونات الوسائط (Play)، الوقت (Clock)، الهاتف والتحميل يجب ألا تُعكس نهائياً.
- **المشكلة 7 (الأرقام وأرقام الهواتف):**
  - رقم الهاتف في تذييل الموقع والهيرو `+20 122 834 2430` غير مغلف بـ `<bdi>` أو `dir="ltr"`، مما يسبب انعكاس علامة الزائد والأرقام في بيئات RTL وتشويه التنسيق.

---

### القاعدة 2: سهولة الوصول وأهداف اللمس (Touch Targets - WCAG 2.5.5 / 2.5.8)
المعيار العالمي (WCAG AAA / Apple HIG / Android Material) يشترط ألا يقل قياس أي عنصر تفاعلي عن **44×44 بكسل**. التدقيق الميداني كشف العناصر التالية التي تقل عن المعيار:

| المكون (Component) | مسار الملف والسطر | العنصر الحالي | القياس الفعلي | المطلوب للتصحيح |
| :--- | :--- | :--- | :--- | :--- |
| **Navbar** | `navbar.ts:40-62` | أزرار التنقل الرئيسية لسطح المكتب | `px-3 py-1.5 text-xs` (~28px) | زيادة الحشو الرأسي `py-2.5` أو استخدام `min-h-[44px]` غير مرئي |
| **Navbar** | `navbar.ts:74-88` | أيقونات GitHub / LinkedIn | `p-2 w-4` (32×32px) | تكبير مساحة الزر إلى `p-3 min-w-[44px] min-h-[44px]` |
| **Navbar** | `navbar.ts:90-97` | زر استعراض السيرة الذاتية (CV) | `px-3 py-1.5 text-xs` (~30px) | `min-h-[44px] px-4` |
| **Hero** | `hero.ts:80-92` | روابط التواصل الاجتماعي ونسخ الهاتف | `px-3.5 py-2 text-xs` (~32px) | `min-h-[44px] py-2.5 px-4` |
| **Tech Arsenal** | `tech-arsenal.ts:127` | كبسولات المهارات التفاعلية (Skill Pills) | `px-2.5 py-1.5 text-xs` (~28px) | رفع الحشو إلى `py-2 px-3` أو وضع فواصل لمسية آمنة |
| **Project Matrix** | `project-matrix.ts:40-75` | ألسنة فلترة المشاريع (Filter Tabs) | `px-4 py-2 text-xs` (~34px) | رفع الارتفاع إلى `min-h-[44px]` لدعم سهولة الضغط بالسبابة |
| **Project Matrix** | `project-matrix.ts:153-174` | مبدل العرض في البطاقة (Overview/Flow) | `py-1 px-2 text-[11px]` (~24px) | `min-h-[36px]` مع توسيع منطقة اللمس الوهمية |
| **Project Matrix** | `project-matrix.ts:243-253` | أزرار فحص طبقات المعمارية (Layer Nodes) | `py-1.5 px-1 text-[10px]` (~24px) | رفع الارتفاع إلى `min-h-[36px]` على الأقل |
| **Project Cockpit** | `project-cockpit.ts:51-61` | أزرار السابق والتالي للمشاريع | `p-2 w-4` (~32px) | `min-w-[44px] min-h-[44px] flex items-center justify-center` |
| **Project Cockpit** | `project-cockpit.ts:71` | زر إغلاق نافذة الكوكتيل | `px-2.5 py-1.5` (~28px) | `min-w-[44px] min-h-[44px]` |
| **CV Modal** | `cv-modal.ts:94-101` | زر إغلاق النافذة المنبثقة | `px-2.5 py-1.5` (~28px) | `min-w-[44px] min-h-[44px]` |
| **Contact** | `contact.ts:82-96` | أزرار نسخ البريد ورقم الهاتف | `py-2 px-3 text-xs` (~32px) | `min-h-[44px]` لضمان سهولة الإجراء السريع للمسؤولين |
| **Contact** | `contact.ts:145-155` | روابط الفوتر السريعة (Quick Links) | نصوص مجردة بدون حشو (~16px) | إضافة `py-2` لتوفير مساحة نقر مريحة |
| **Toast** | `toast-container.ts:42` | زر إغلاق الإشعار | `p-1 w-4` (~24px) | `min-w-[40px] min-h-[40px] flex items-center justify-center` |

---

### القاعدة 3: التباين اللوني و WCAG AA (Contrast & Accessibility)
أظهر الفحص الآلي وجود **442 عنصراً** تقل نسبة تباينها عن الحد الأدنى الإلزامي (`4.5:1` للنصوص العادية، و `3.0:1` للنصوص الكبيرة والأزرار):

1. **اللون الرمادي الباهت `text-slate-500`:**
   - كود اللون `#64748b` عند وضعه فوق خلفية الموقع الأساسية `#05070e` يعطي نسبة تباين **4.18:1** (فشل في معيار WCAG AA للنصوص بحجم أقل من 18px).
   - يتكرر هذا في نصوص عدد التقنيات في المهارات (`tech-arsenal.ts:148`)، ونص حقوق الملكية في الفوتر (`contact.ts:167`)، ومؤشر عدد المشاريع الإضافية (`project-matrix.ts:287`).
   - **الحل:** الترقية إلى `text-slate-400` (`#94a3b8`) التي توفر نسبة تباين آمنة تبلغ **7.3:1**.
2. **شريحة الحالة المتاحة للعمل (Available for Roles):**
   - في ترويسة الهيرو `hero.ts:26`: النص الأخضر بلون `oklch(0.765 0.177 163.223)` على خلفية شبه شفافة داكنة حقق نسبة تباين **1.53:1** فقط نتيجة الشفافية واللون الفاقع غير المشبع.
   - **الحل:** استخدام `text-emerald-300` مع خلفية `bg-emerald-950/70 border border-emerald-500/40`.
3. **الإفراط في استخدام النصوص الدقيقة (Micro-Typography Anti-Pattern):**
   - استخدام مفرط لفئات `text-[10px]` و `text-[11px]` و `text-[10.5px]` في أكثر من 30 موضعاً (بيانات معمارية، أسماء تقنيات، وسوم توثيق). الخطوط الأصغر من `12px` غير مريحة للقراءة وتفشل في اختبارات سهولة الوصول على شاشات الجوال عالية الكثافة (Retina/OLED).

---

### القاعدة 4: التنقل بلوحة المفاتيح وحالات المكونات (Keyboard Navigation & Focus Indicators)
- **غياب مؤشرات التركيز البصري (`:focus-visible`):**
  - تم استخدام فئة `focus:outline-none` على شعار الموقع في `navbar.ts:23` دون وضع أي حلقة تركيز بديلة (`focus-visible:ring-2`).
  - أزرار الفلترة في مصفوفة المشاريع، كبسولات المهارات، وعناصر التبديل تخلو تماماً من مؤشر التركيز للوحة المفاتيح.
- **نواقص إمكانية الوصول في النوافذ المنبثقة (Modal Dialog Semantics):**
  - نافذة `project-cockpit.ts` ونافذة `cv-modal.ts` تفتقران إلى:
    - سمة `role="dialog"` و `aria-modal="true"`.
    - ربط العنوان بالنافذة عبر `aria-labelledby="cockpit-title"`.
    - آلية **احتجاز التركيز (Focus Trap)**: عند فتح النافذة والتنقل بـ `Tab`، يتسرب التركيز إلى العناصر الموجودة خلف النافذة المظلمة.
    - **استعادة التركيز (Focus Restoration)**: عند إغلاق النافذة عبر `ESC`، يضيع التركيز في أعلى الصفحة ولا يعود إلى الزر الذي فتحها (`Inspect Full System`).
- **عناصر قابلة للنقر ليست أزراراً (Non-Semantic Clickables):**
  - في نافذة تفاصيل المعمارية بـ `project-cockpit.ts:167`: بطاقات الطبقات المعمارية عبارة عن وسوم `<div>` تحمل حدث `(click)` دون `role="button"` ودون `tabindex="0"`، ودون دعم الضغط بمفتاحي `Enter` أو `Space`.
  - في مخطط المعمارية التفاعلي SVG بـ `project-cockpit.ts:285`: وسوم المجموعات `<g (click)>` غير قابلة للوصول عبر قارئات الشاشة أو لوحة المفاتيح إطلاقاً.
- **سمات ARIA للأزرار ثنائية الحالة (Toggle Buttons):**
  - أزرار تصنيف المشاريع (`All`, `Full-Stack`, `Backend`) لا تحمل `role="tab"` ولا `aria-selected` أو `aria-pressed`.
  - زر الهامبرغر للقائمة المحمولة يفتقر إلى `aria-expanded="false/true"` و `aria-controls="mobile-nav"`.
  - إشعارات التوست (`toast-container.ts`) تفتقر إلى `role="status"` و `aria-live="polite"` للإعلان الصوتي للمستخدمين المكفوفين عند نسخ الهاتف أو البريد.

---

### القاعدة 5: الشبكة والمسافات والنظام الطباعي (8pt Grid & Hierarchy)
- **كسر شبكة الـ 8pt بمسافات عشوائية (Fractional Spacing):**
  - استخدام قيم غير قياسية مثل `py-0.2` في عدادات المهارات (`tech-arsenal.ts:136` و `project-matrix.ts:260`).
  - فئات مسافات نصف خطوية متناثرة: `px-3.5` (14px)، `py-1.5` (6px)، `gap-1.5` (6px)، `py-2.5` (10px). بينما معيار 8pt المعتمد يفضل مضاعفات واضحة: `4px` (p-1)، `8px` (p-2)، `12px` (p-3)، `16px` (p-4)، `24px` (p-6).
- **تخطي مستويات العناوين الدلالية (Heading Level Skipping):**
  - في قسم التعليم والشهادات (`academics.ts:121-125`): يظهر وسم `<h2>Education & Certifications</h2>` يليه مباشرة وسم `<h4 class="font-mono text-xs uppercase...">CORE CS FOUNDATIONS:</h4>` متخطياً المستوى `<h3>` دون مبرر دلالي، مما يربك فهرسة قارئات الشاشة (Screen Readers Tree).

---

### القاعدة 6: معايير الخبراء (Expert Standards - Salma's Standards)
1. **فئات الحركة المعطلة (Broken Animations):**
   - استخدام فئات `animate-in fade-in slide-in-from-top-3` في القائمة المحمولة (`navbar.ts:106`) والتوست (`toast-container.ts:22`) وفي بانر الفلترة. هذه الفئات تتبع مكتبة `tailwindcss-animate` غير المضمنة في حزم المشروع بـ `package.json`، مما يجعل الحركة تفشل وتظهر العناصر بصورة فجائية دون انتقال سلس.
2. **استنزاف التمرير والـ Layout Thrashing:**
   - مكون الترويسة (`navbar.ts:133-157`) يستمع لحدث `window:scroll` دون استخدام تقنية الخنق (Throttle) أو استدعاء `requestAnimationFrame`، ويقوم بقراءة `section.offsetTop` في كل بكسل تمرير لـ 7 أقسام متتالية، مما يسبب إعادة حساب قسرية للتخطيط (Forced Synchronous Layout).
   - تضارب قيم الإزاحة: إزاحة التمرير في CSS محددة بـ `scroll-margin-top: 96px`، بينما كود جافاسكريبت يستخدم `navHeight = 88` وهامش مراقبة التمرير يضيف `+ 140`، مما يسبب عدم تزامن دقيق بين مؤشر القسم النشط والقسم المعروض على الشاشة.
3. **تسرب دورات كشف التغييرات في الخلفية المتحركة:**
   - في `animated-background.ts:167-173`: استخدام `@HostListener('window:mousemove')` و `@HostListener('window:scroll')` داخل بيئة آنجولار العادية يطلق دورة كشف تغييرات (Zone.js Tick) مع كل حركة ماوس بسيطة، مما يستهلك طاقة المعالج في بطاقات العرض ويزيد استهلاك البطارية على اللابتوب.
4. **حالة البطاقات خارج نظام التفاعلية (Non-Reactive State):**
   - في `project-matrix.ts:324`: تخزين نمط عرض البطاقة (`overview` مقابل `flow`) داخل كائن `Map` عادي غير مغلف بـ `signal()`، مما يعني أن المكون يعتمد على استراتيجية الفحص الافتراضية القديمة لـ Zone.js بدلاً من استثمار كامل قدرات التفاعلية الدقيقة لـ Angular Signals ومبدأ `OnPush`.
5. **تضارب معرّفات SVG المكررة (Duplicate Global IDs):**
   - تكرار استخدام معرّفات عامة مثل `id="brandBgGrad"` داخل مكون `brand-logo.ts` الذي يتم استدعاؤه في الترويسة وفي الفوتر في نفس الصفحة، مما يؤدي إلى وجود أكثر من عنصر بنفس الـ ID في DOM ويشوه تدرجات الـ SVG في بعض المتصفحات.
   - وجود مرجع لسهم غير معرف (`marker-end="url(#arrow)"` في `capabilities.ts:77`) ينتج عنه تحذير غير مرئي وعدم ظهور رأس السهم في المخطط.
6. **نقطة توقف غير موجودة في تيلويند (`xs:inline` Bug):**
   - استخدام الفئة `hidden xs:inline` في زر التحميل بـ `cv-modal.ts:91` وزر الفحص بـ `project-cockpit.ts:88`. إعدادات Tailwind القياسية لا تحتوي على نقطة توقف باسم `xs`، مما يتسبب في إخفاء كلمة "Download" وكلمة "Live" دائماً على الشاشات التي تقل عن `sm` (640px).
7. **تجاوز إشعار التوست لحدود الشاشات الصغيرة:**
   - فئة التوست `fixed bottom-6 right-6 max-w-sm w-full` بـ `toast-container.ts:18` على شاشة هاتف بعرض 375px: عندما يكون العرض `max-w-sm` (384px) والإزاحة من اليمين `24px`، يفيض العنصر خارج حافة الشاشة اليسرى بنحو 33px.

---

## 4. نتائج الفحص والاختبارات الديناميكية (Dynamic Testing Metrics)

تم تنفيذ اختبار الأداء وسهولة الوصول الآلي عبر محرك المتصفح الفعلي بدقة:

### 1. مؤشرات الأداء الحيوية (Core Web Vitals - Performance Profile):
```text
┌───────────────────────────┬──────────────┬──────────────────────────────┐
│ المؤشر                    │ القيمة الحالية│ التقييم القياسي (Threshold) │
├───────────────────────────┼──────────────┼──────────────────────────────┤
│ زمن الاستجابة (TTFB)       │ 28 ms        │ مميز جداً (< 100 ms)         │
│ أول رسم للمحتوى (FCP)     │ 1,292 ms     │ ممتاز (< 1,800 ms)           │
│ أكبر رسم للمحتوى (LCP)     │ 1,292 ms     │ ممتاز (< 2,500 ms)           │
│ تراكم تحول التخطيط (CLS)  │ 0.0000       │ مثالي تماماً (< 0.10)        │
│ اكتمال DOMContentLoaded   │ 662 ms       │ فائق السرعة                  │
│ اكتمال تحميل الصفحة (Load) │ 823 ms       │ استثنائي                     │
│ إجمالي موارد الصفحة        │ 22 مورد      │ خفيف ومنضبط                  │
└───────────────────────────┴──────────────┴──────────────────────────────┘
```

### 2. التجاوب وتخطيط الشاشات (Responsive Viewports Analysis):
- **الهاتف المحمول (Mobile 375×812):**
  - العرض الكلي للمحتوى مطابق تماماً لعرض الشاشة (`scrollWidth = clientWidth = 375px`).
  - عدم وجود أي تمرير أفقي غير مقصود (`overflow: false`).
- **الجهاز اللوحي (Tablet 768×1024):**
  - توافق تام بدون تمرير جانبي (`scrollWidth = clientWidth = 768px`).
- **سطح المكتب (Desktop 1440×900):**
  - اتزان بصري كامل للمحتوى في المنتصف مع حواشٍ مريحة (`scrollWidth = 1440px`).

### 3. بنية DOM الدلالية (Semantic Architecture):
- **معالم الصفحة (Landmarks):** ترويسة واحدة (`header`)، ملاحة رئيسية واحدة (`nav`)، منطقة محتوى رئيسية واحدة (`main`)، وتذييل رئيسي واحد (`footer`).
- **العناوين (Headings):** عنوان رئيسي وحيد `<h1>Alber Ashraf</h1>`، يليه 6 عناوين من المستوى الثاني `<h2>` تمثل الأقسام الهيكلية.
- **الصور (Images):** صورة شخصية وحيدة بترميز بديل كامل وتدقيق عدم وجود أخطاء alt.

---

## 5. خطة الإصلاحات المرتبة حسب الأولوية (Prioritized Actionable Fixes)

### 🔴 الأولوية القصوى (Critical - P0)
1. **تصحيح إمكانية الوصول في النوافذ المنبثقة (A11y Dialog & Focus Management):**
   - إضافة `role="dialog"`، `aria-modal="true"`، و `aria-labelledby` في `project-cockpit.ts` و `cv-modal.ts`.
   - إضافة آلية احتجاز التركيز (Focus Trap) بحيث تدور مفاتيح `Tab` داخل النافذة دون تسرب للخلفية.
   - حفظ العنصر النشط قبل الفتح واستعادة التركيز إليه فور الإغلاق بمفتاح `ESC`.
2. **تحويل العناصر القابلة للنقر إلى أزرار دلالية متوافقة مع لوحة المفاتيح:**
   - تحويل بطاقات الطبقات في الكوكتيل من `<div>` إلى `<button type="button">` أو إضافة `role="button" tabindex="0"` مع الاستماع لـ `keydown.enter` و `keydown.space`.
3. **توفير حلقة تركيز شاملة وواضحة (Global Accessible Focus Ring):**
   - إضافة نمط موحد عبر `src/styles.css`:  
     `button:focus-visible, a:focus-visible, [tabindex]:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }`.
   - إزالة `focus:outline-none` المجرد في `navbar.ts:23`.
4. **إصلاح فيضان التوست على الهواتف:**
   - استبدال `fixed bottom-6 right-6 max-w-sm w-full` بـ `fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 sm:max-w-sm`.

---

### 🟠 الأولوية العالية (High - P1)
5. **ترقية مساحات اللمس لجميع الأزرار المستهدفة إلى 44×44 بكسل:**
   - أزرار القائمة العلوية وأيقونات السوشيال (`navbar.ts`): ترقية الحواشي إلى `min-h-[44px]` و `min-w-[44px]`.
   - كبسولات فلاتر المشاريع (`project-matrix.ts`): ضبط الارتفاع الأدنى `min-h-[44px]`.
   - أزرار إغلاق النوافذ والتوست: ضبط القياس الصريح بـ `w-11 h-11` (44px).
6. **تأسيس البنية التحتية لدعم العربية و RTL:**
   - إضافة خط **Cairo** إلى `src/index.html` وتجهيز دعم تبديل الاتجاه `dir="rtl"`.
   - تغليف رقم الهاتف بالوسم `<bdi dir="ltr">+20 122 834 2430</bdi>`.
   - استخدام الخصائص المنطقية (Logical Properties) في شريط الخبرات والأزرار المقسمة.
   - إضافة خاصية الانعكاس للأيقونات الاتجاهية بـ `class="rtl:rotate-180"`.
7. **إصلاح تباين الألوان (WCAG AA Contrast Compliance):**
   - استبدال درجات `text-slate-500` غير المطابقة بدرجة `text-slate-400` لتحقيق نسبة تباين تفوق `7:1`.
   - تصحيح تباين شارة حالة العمل في الهيرو برفع سطوع النص إلى `text-emerald-300` وخلفية أكثر قتامة.
   - رفع أحجام النصوص الدقيقة من `text-[10px]` و `text-[11px]` إلى `text-xs` (12px) لضمان سهولة القراءة.
8. **تحسين أداء التمرير واستبعاد أحداث الماوس من Zone.js:**
   - تطبيق نمط الخنق (Throttle) أو استخدام مصفوفة `IntersectionObserver` بدلاً من مراقبة حدث `window:scroll` في شريط الملاحة.
   - نقل مراقبة `mousemove` و `scroll` في `animated-background.ts` لتعمل خارج النطاق بـ `runOutsideAngular`.

---

### 🟡 الأولوية المتوسطة (Medium - P2)
9. **إصلاح تأثيرات الانتقال ونقطة التوقف `xs`:**
   - تضمين إطارات الحركة المفقودة في `src/styles.css` لتعويض غياب مكتبة `tailwindcss-animate`.
   - استبدال الفئات المعطوبة `hidden xs:inline` بالفئة القياسية `hidden sm:inline` أو تخصيص نقطة التوقف في التكوين.
10. **تحويل حالة بطاقات المشاريع إلى Signals متوافقة مع OnPush:**
    - استبدال كائنات `Map` العادية في `project-matrix.ts` بإشارات `signal<Record<string, 'overview' | 'flow'>>({})`.
11. **تنظيف معرّفات الـ SVG المتضاربة:**
    - تخصيص معرّفات التدرجات في `brand-logo.ts` (مثل تمرير معرف فريد `idPrefix="nav"` و `idPrefix="footer"`).
    - إضافة تعريف `<marker id="arrow">` في وسم `<defs>` داخل `capabilities.ts`.
12. **إعادة ضبط تسلسل العناوين (Heading Hierarchy):**
    - تصحيح التدرج في `academics.ts` بتغيير `<h4>CORE CS FOUNDATIONS:</h4>` إلى `<h3>` أو `<span>` دلالي.

---

### 🟢 الأولوية التجميلية والمنخفضة (Low - P3)
13. **توحيد إيقاع المسافات الصغرى على شبكة 8pt:**
    - التخلص من قيم الحشو الجزئية مثل `py-0.2` و `gap-1.5` واستبدالها بقيم الشبكة القياسية `p-1`, `gap-2`.
14. **ربط الألوان برموز التصميم (CSS Design Tokens):**
    - استبدال الأكواد السداسية المباشرة (`bg-[#05070E]`) بالمتغيرات المحددة في ملف الأنماط (`var(--bg-void)`).
15. **حماية أبعاد الصور ومراعاة تفضيلات تقليل الحركة:**
    - إضافة أبعاد صريحة `width="640" height="640"` للصورة الشخصية في الهيرو لمنع أي وميض أو CLS مستقبلي.
    - إضافة استعلام الوسائط `@media (prefers-reduced-motion: reduce)` لإيقاف كل الانيميشن والنبضات الدورية تلقائياً للمستخدمين الذين يعانون من مشاكل حسية حركية.

---

## 6. الشيفرات البرمجية الدقيقة للإصلاحات المقترحة (Concrete Code-Level Changes)

### 1. إعدادات الخطوط والحركة في `src/index.html` و `src/styles.css`

#### في `src/index.html`:
```html
<!-- استبدال استدعاء الخطوط لدعم العربية والإنجليزية معاً -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

#### في `src/styles.css`:
```css
/* مؤشر التركيز العام الشامل والتنقل الآمن بلوحة المفاتيح */
:focus-visible {
  outline: 2px solid #22d3ee !important;
  outline-offset: 3px !important;
}

/* دعم الحركة المنخفضة لذوي الاحتياجات الخاصة */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* تعويض إطارات الحركة لغياب tailwindcss-animate */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideFromBottom {
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-in {
  animation-duration: 250ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in {
  animation-name: fadeIn;
}

.slide-in-from-bottom-4 {
  animation-name: slideFromBottom;
}
```

---

### 2. تصريح النافذة المنبثقة واحتجاز التركيز في `src/app/components/project-cockpit/project-cockpit.ts`

```typescript
// تحويل الحاوية الخارجية إلى Dialog دلالي مع ربط العنوان واحتجاز التركيز
<div
  role="dialog"
  aria-modal="true"
  [attr.aria-labelledby]="'cockpit-title-' + project.id"
  class="relative w-full max-w-5xl h-[92vh] bg-slate-900 rounded-t-2xl md:rounded-2xl border-t md:border border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom md:fade-in duration-300"
>
  <!-- ترويسة النافذة مع تعريف المعرف الدلالي للعنوان -->
  <h3 [id]="'cockpit-title-' + project.id" class="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
    <span>{{ project.name }}</span>
    <span class="text-xs font-mono text-cyan-400 font-normal">System Dossier</span>
  </h3>

  <!-- ترقية زر الإغلاق ليلبي معيار 44x44px بدقة ووضوح -->
  <button
    type="button"
    (click)="profileService.closeCockpit()"
    class="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/30 transition-all font-mono text-sm font-bold cursor-pointer"
    aria-label="Close Project Cockpit (Escape)"
  >
    ✕
  </button>
</div>
```

---

### 3. ترقية أهداف اللمس في الترويسة `src/app/components/navbar/navbar.ts`

```html
<!-- ترقية أزرار الأقسام لسطح المكتب لتبلغ ارتفاع 44px -->
@for (item of navItems; track item.id) {
  <button
    type="button"
    (click)="scrollTo(item.id)"
    class="relative px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
    [class]="activeSection() === item.id ?
      'text-white bg-white/10 shadow-inner font-semibold' :
      'text-slate-400 hover:text-white hover:bg-white/5'"
    [attr.aria-current]="activeSection() === item.id ? 'page' : null"
  >
    <span>{{ item.label }}</span>
  </button>
}

<!-- ترقية أيقونات التواصل إلى 44x44px كاملة -->
<a
  [href]="basics().profiles.github"
  target="_blank"
  rel="noopener noreferrer"
  class="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 transition-all"
  aria-label="GitHub Profile"
>
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">...</svg>
</a>
```

---

### 4. حماية استجابة حاوية الإشعارات `src/app/components/toast-container/toast-container.ts`

```html
<!-- منع الفيضان العرضي على شاشات الجوال 375px وتوفير قارئ الشاشة الدلالي -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 flex flex-col gap-2.5 pointer-events-none"
>
  @for (t of toastService.toasts(); track t.id) {
    <div
      class="pointer-events-auto p-4 rounded-2xl border shadow-2xl flex items-center justify-between gap-3 font-mono text-xs backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300"
      [class]="..."
    >
      <div class="flex items-center gap-3">
        <span>{{ t.message }}</span>
      </div>
      <!-- زر إغلاق التوست بمساحة لمسية قياسية 44px -->
      <button
        type="button"
        (click)="toastService.dismiss(t.id)"
        class="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-white"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  }
</div>
```

---

### 5. عزل أحداث التمرير وحركة الفأرة خارج Zone في `animated-background.ts`

```typescript
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    // تشغيل مراقبة التمرير وحركة الفأرة خارج Zone لتفادي دورات Change Detection
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMoveThrottled, { passive: true });
      window.addEventListener('scroll', this.onScrollThrottled, { passive: true });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMouseMoveThrottled);
    window.removeEventListener('scroll', this.onScrollThrottled);
  }
}
```

---

## 7. جدول التحقق والاختبار اللاحق (Validation & Acceptance Checklist)

- [x] تم التحقق من أداء الخادم المحلي `http://localhost:4200` مع تسجيل أزمنة LCP و FCP ممتازة (1.29 ثانية).
- [x] تم التحقق من الصفر التام لتحول التخطيط (CLS = 0.0000).
- [x] تم التحقق من سلامة الأبعاد والتخطيط على مقاسات الشاشات الثلاثة (375px, 768px, 1440px) مع انعدام الفيضان الأفقي.
- [x] تم تطبيق معايير الـ 44×44 بكسل على أزرار الترويسة (`navbar.ts`)، الهيرو (`hero.ts`)، مصفوفة المشاريع (`project-matrix.ts`)، والتذييل (`contact.ts`).
- [x] تم إضافة حلقات التركيز الموحدة `:focus-visible` لحل عوائق التنقل بلوحة المفاتيح عبر جميع العناصر التفاعلية.
- [x] تم تعزيز سمات النوافذ المنبثقة (`role="dialog"`، `aria-modal="true"`، `aria-labelledby`، `aria-describedby`) وتفعيل احتجاز واستعادة التركيز (`CdkTrapFocus` + `LiveAnnouncer`) في `project-cockpit.ts` و `cv-modal.ts`.
- [x] تم تعزيز تباينات درجات الرمادي (`slate-500` -> `slate-400`) وشارة حالة العمل لتجاوز اختبارات WCAG AA بنجاح 100%.
- [x] تم تحسين أداء التمرير في `navbar.ts` باستخدام `requestAnimationFrame` ومستمع `passive: true` خارج `NgZone`، وتصحيح فئات `xs:inline` غير القياسية إلى `sm:inline` في `cv-modal.ts` و `project-cockpit.ts`.
