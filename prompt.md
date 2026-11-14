You are a university student building a web assignment. Build a small web page as 3 normal files: index.html, style.css, script.js. Use the provided file `realistic_human_heart.glb` as the 3D model (reference it with a relative path: heart.src = "realistic_human_heart.glb"). Vanilla HTML/CSS/JS only, no frameworks.

═══ CODE STYLE (very important) ═══
Write the code the way a student would write it by hand:
- Normal readable formatting: one property per line in CSS, 2-space indentation, blank lines between sections. NEVER minified or squeezed into long one-liners.
- Clear, descriptive names (e.g. applyLanguage, addParagraph, zoomIn, startDistance, blockCount). No single-letter variable names, no clever shortcuts.
- Short, simple, casual comments in plain English (e.g. "// build the side menu", "// stop the auto rotate when the user starts dragging"). Not too many, not too polished, no fancy section banners.
- Use function declarations and simple loops. No over-engineering, no unnecessary helper abstractions.
- Class and id names must be meaningful: .logo, .badge, .shape, .outline, .delete-btn, #resizer, #hero, #content, #controls, #zoom-value, #to-top, #lang-btn, #add-btn, #clear-btn, #heart, #heart-box.
- First line of index.html after doctype: <!-- Name: [FULL NAME] | University ID: [ID] -->

═══ GENERAL ═══
- <html lang="en" dir="ltr">, <title>Grid Layout</title>
- Load: <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
- CSS reset: * {box-sizing:border-box; margin:0}. html, body {height:100%; overflow:hidden}
- body is a CSS Grid: grid-template: auto minmax(0,1fr) auto / var(--w,240px) minmax(0,1fr); font: 15px system-ui, sans-serif; color:#222.
- Icons: one hidden inline <svg> sprite with <symbol>s (viewBox 0 0 24 24) used with <svg class="icon"><use href="#id"/></svg>. .icon = width:1em; height:1em; flex:none; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round. Symbols: cap (graduation cap), globe, plus, minus, trash, grid, code, pen, term, comp, tpl, clip, fold, eye, mon, pal, type, spark, bug, gear, rot, reset, full, close (an X made of two crossing lines).

═══ LAYOUT (4 areas) ═══
1) HEADER (grid-area 1/1/2/3): dark red #9b0000, white text, flex row, wrap, space-between, padding 8px 16px, gap 8px 16px, box-shadow 0 4px 10px #0007, z-index 3, max-height 40vh, overflow auto.
   - Left: <h1> (18px, flex, gap 10px) with a 28x28 white rounded (8px) square .logo (red graduation-cap icon, 17px) + title text.
   - Right: <menu> (flex, gap 6px, no padding) with 3 transparent buttons (12px font, white text, padding 5px 10px, radius 4px, icon + label, hover background #fff3):
       • Globe icon: language toggle (label shows the OTHER language: "العربية" / "English")
       • Plus icon: "Add content"
       • Trash icon: "Clear content"
   - Paragraphs added into the header (<p class="extra">): flex:1 1 100%, display:flex, align-items:center, justify-content:space-between, gap 10px, padding 6px 10px, background #fff2, radius 4px. Each one contains a text part (<span class="block-text">) and a small delete button (<button class="delete-btn" type="button">) at the end: 22x22 circle, no border, transparent background, white "close" icon (font-size 14px), cursor pointer, hover background #fff3.

2) SIDE NAV (grid-area 2/1): background #e2e2e2, overflow-y auto. A <ul> (no bullets, padding 6px 0) with 15 <li> items (flex, gap 10px, padding 9px 14px, nowrap, 12px font, pointer cursor, hover #ccc). Each has a colored icon (15px) + label. Items (icon, color, EN, AR):
   grid #1e88e5 "Dashboard"/"لوحة التحكم"; code #00a870 "HTML Editor"/"محرر HTML"; pen #f57c00 "CSS Styles"/"أنماط CSS"; term #d81b8a "JS Console"/"وحدة JS"; comp #7c4dff "Components"/"المكونات"; tpl #00a870 "Templates"/"القوالب"; clip #f9a825 "Snippets"/"المقتطفات"; fold #e91e63 "Projects"/"المشاريع"; eye #1e88e5 "Live Preview"/"معاينة مباشرة"; mon #00a870 "Responsive Design"/"التصميم المتجاوب"; pal #f9a825 "Color Palette"/"لوحة الألوان"; type #e91e63 "Typography"/"الخطوط"; spark #1e88e5 "Animations"/"الحركات"; bug #00a870 "Debugger"/"المصحح"; gear #f9a825 "Settings"/"الإعدادات".
   - #resizer: 6px-wide vertical handle in the same grid cell as nav, justify-self:end, cursor col-resize, z-index 2, touch-action none; hover/drag background #9b000066. Dragging (pointer events + setPointerCapture) updates the CSS var --w on body, clamped between 160 and 400px. In Arabic (RTL) the width is innerWidth - clientX.

3) MAIN (grid-area 2/2): grid with rows minmax(0,1fr) minmax(0,2fr), min-width/height 0.
   a) #hero (top row): 2 equal columns.
      - LEFT <article>: relative, overflow hidden, centered content, background linear-gradient(180deg,#c00000,#600000), white. Contains <h2> "CSS Animation" (Georgia/serif, font-size clamp(18px,3vw,32px), centered, z-index 1), exactly centered in the red box. Behind it, 9 floating decorative <span class="shape"> elements created with JS: random size 35–150px, random left/top (-10%…90%), border-radius 8% 35%, background #fff3; every 2nd one also has class "outline" (no fill, 3px solid #fffa). Each uses @keyframes float (0%,100%: translate(0,0) rotate(0) scale(.8) opacity .1; 50%: translate(var(--x),var(--y)) rotate(var(--rot)) scale(1.5) opacity .8), ease-in-out infinite, with random duration 8–20s (var --duration), random negative animation-delay, random ± x (120–380px), ± y (80–260px), ± rotation (30–120deg).
      - RIGHT <aside id="heart-box">: background #e8e8e8, relative, overflow hidden, contains:
          • <model-viewer id="heart"> 100% x 100%, display:block, alt="3D heart", camera-controls, auto-rotate, auto-rotate-delay="0", interaction-prompt="none", min-camera-orbit="auto auto 15%", max-camera-orbit="auto auto 400%", zoom-sensitivity="1.5", shadow-intensity="1", touch-action:none, --poster-color:transparent.
          • #hint at the top (8px from top, centered, 11px, #555, pointer-events none): "Drag to rotate · scroll or pinch to zoom · right-drag to move" (hidden under 900px width).
          • #controls floating pill at the bottom (10px from bottom, centered, flex, gap 4px, padding 4px, radius 999px, background #fffd, shadow 0 2px 8px #0004, z-index 2) with: zoom-out (minus), zoom % label (#zoom-value, min-width 44px, 12px bold, #600000, tabular-nums, starts "100%"), zoom-in (plus), reset-view, auto-rotate toggle (starts with class "on"), fullscreen. Buttons are 32px circles, transparent, red #9b0000 icons 17px; hover: background #9b00001a + scale(1.1); ".on": red background, white icon. Under 900px: buttons 26px, icons 14px, gap 0.
          • #heart-box:fullscreen background #e8e8e8.
   b) #content (bottom row): overflow auto, padding 16px 24px. <h2> "HTML, CSS & JavaScript" (margin-bottom 8px), intro paragraph (line-height 1.5, margin-bottom 12px), then 3 rows (flex, gap 14px, align flex-start, margin-bottom 12px), each = colored .badge + paragraph: "HTML" bg #ff4500 white; "CSS" bg #1e88e5 white; "JS" bg #ffd600 with text #222. .badge: min-width 64px, centered, padding 6px 10px, radius 12px, bold, white.

4) FOOTER (grid-area 3/1/4/3): relative, z-index 2, flex wrap centered, gap 4px 16px, padding 4px 8px, background #f4f4f4, border-top 1px solid #ccc, 12px centered text. Contains the copyright text + "[FULL NAME] · [ID]". Also #to-top, a floating round button: absolute, top:-24px, inset-inline-end:16px, 48x48 circle, bg #d00000 (hover #f00000), white plus icon 26px, shadow 0 3px 8px #0006, infinite "pulse" animation (2.4s, box-shadow ring expanding 0→14px and fading, #d0000088 → #d0000000); on hover: scale(1.15) rotate(90deg) and no pulse. Click → smooth scroll #content to top.

═══ TEXT (bilingual, stored in a JS object "texts" = {en:{...}, ar:{...}}) ═══
EN: title "Training 2026"; anim "CSS Animation"; h2 "HTML, CSS & JavaScript";
intro "HTML, CSS and JavaScript are the three core technologies of the web. Together they define a page's structure, its look and its behavior.";
html "HTML gives a page its structure and meaning using elements such as headings, lists and links. Every website is built on top of it.";
css "CSS controls colors, fonts, spacing and layout. It lets one structure look good on any screen size.";
js "JavaScript makes pages interactive by reacting to clicks, loading data and updating content. It runs directly in the browser.";
foot "© 2026 Training 2026. All rights reserved."; blk "New header block"; lp = "Long test paragraph: web pages combine structure, style and behavior, and this text only exists to make the content area long enough to scroll. " repeated 6 times.
Tooltips (title + aria-label): Zoom in / Zoom out / Reset view / Auto-rotate / Full screen / remove: "Delete".
AR: title "تدريب 2026"; btn "English"; add "إضافة محتوى"; clear "مسح المحتوى"; anim "رسوم CSS المتحركة"; h2 "HTML و CSS و JavaScript";
hint "اسحب للتدوير · العجلة أو القرص للتكبير · السحب بالزر الأيمن للتحريك";
intro "HTML وCSS وJavaScript هي التقنيات الأساسية الثلاث للويب. معًا تحدد بنية الصفحة ومظهرها وسلوكها.";
html "تمنح HTML الصفحة بنيتها ومعناها عبر عناصر مثل العناوين والقوائم والروابط. كل موقع إلكتروني مبني عليها.";
css "تتحكم CSS في الألوان والخطوط والمسافات والتخطيط. وتجعل البنية نفسها تبدو جيدة على أي حجم شاشة.";
js "تجعل JavaScript الصفحات تفاعلية عبر الاستجابة للنقرات وتحميل البيانات وتحديث المحتوى. وتعمل مباشرة في المتصفح.";
foot "© 2026 Training 2026. جميع الحقوق محفوظة."; blk "كتلة جديدة في الترويسة"; lp = "فقرة اختبار طويلة: تجمع صفحات الويب بين البنية والتنسيق والسلوك، وهذا النص موجود فقط لجعل منطقة المحتوى طويلة بما يكفي للتمرير. " ×6.
Tooltips AR: تكبير / تصغير / إعادة الضبط / تدوير تلقائي / ملء الشاشة / remove: "حذف".
Text elements use data-i="key" attributes and tooltips use data-t="key"; a function applyLanguage() fills them from texts[language].

═══ BEHAVIOR (JS) ═══
- Language toggle: switches EN↔AR, sets document lang and dir (rtl for Arabic), re-renders all texts. The layout mirrors automatically by using logical CSS properties (inset-inline, inset-block, etc.).
- "Add content": increase blockCount; append a new <p class="extra"> to the header (a <span class="block-text"> "New header block #n" + a small delete X button) and a long test paragraph "#n" to #content, then scroll the last one into view (block:"nearest"). 
- The small X button (.delete-btn, "close" icon, title + aria-label from texts[language].remove via data-t="remove") deletes ONLY its own header block. The matching long paragraph in #content stays.
- "Clear content": remove all .extra elements (header and content). This still clears everything at once.
- applyLanguage() must update only the .block-text span of header blocks (and the whole text of content blocks), so switching language never removes the X button.
- 3D controls: zoom range 15%–400% relative to the default camera distance (saved when the model fires "load", using getCameraOrbit().radius). Zoom buttons multiply by 1.3 / (1/1.3); #zoom-value shows the current zoom % and updates on "camera-change". Reset: set cameraOrbit / cameraTarget / fieldOfView to "auto" + resetTurntableRotation(); also reset on double-click of the model. The auto-rotate button toggles heart.autoRotate + the "on" class. Fullscreen toggles requestFullscreen on #heart-box / exitFullscreen. Any pointerdown on the model turns auto-rotate off (and removes "on" from the button). Wheel over the model: preventDefault ({passive:false}) so it zooms the model and never scrolls the page.
- Model loading: heart.src = "realistic_human_heart.glb". On the model "error" event show a bold red (#9b0000) message in #hint: "Could not load the 3D model". After 8 seconds, if customElements.get("model-viewer") is missing, show: "3D viewer library could not load — check your internet connection".
- @media (prefers-reduced-motion: reduce): turn off the shapes and pulse animations.

Output the 3 files separately, each in its own code block with the file name above it. No explanations.
