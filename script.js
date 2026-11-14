// all the text for both languages
var texts = {
  en: {
    title: "Training 2026",
    btn: "العربية",
    add: "Add content",
    clear: "Clear content",
    anim: "CSS Animation",
    h2: "HTML, CSS & JavaScript",
    hint: "Drag to rotate · scroll or pinch to zoom · right-drag to move",
    intro: "HTML, CSS and JavaScript are the three core technologies of the web. Together they define a page's structure, its look and its behavior.",
    html: "HTML gives a page its structure and meaning using elements such as headings, lists and links. Every website is built on top of it.",
    css: "CSS controls colors, fonts, spacing and layout. It lets one structure look good on any screen size.",
    js: "JavaScript makes pages interactive by reacting to clicks, loading data and updating content. It runs directly in the browser.",
    foot: "© 2026 Training 2026. All rights reserved.",
    blk: "New header block",
    lp: "Long test paragraph: web pages combine structure, style and behavior, and this text only exists to make the content area long enough to scroll. ".repeat(6),
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    reset: "Reset view",
    rotate: "Auto-rotate",
    full: "Full screen",
    remove: "Delete",
    dashboard: "Dashboard",
    htmlEditor: "HTML Editor",
    cssStyles: "CSS Styles",
    jsConsole: "JS Console",
    components: "Components",
    templates: "Templates",
    snippets: "Snippets",
    projects: "Projects",
    livePreview: "Live Preview",
    responsive: "Responsive Design",
    palette: "Color Palette",
    typography: "Typography",
    animations: "Animations",
    debugger: "Debugger",
    settings: "Settings"
  },
  ar: {
    title: "تدريب 2026",
    btn: "English",
    add: "إضافة محتوى",
    clear: "مسح المحتوى",
    anim: "رسوم CSS المتحركة",
    h2: "HTML و CSS و JavaScript",
    hint: "اسحب للتدوير · العجلة أو القرص للتكبير · السحب بالزر الأيمن للتحريك",
    intro: "HTML وCSS وJavaScript هي التقنيات الأساسية الثلاث للويب. معًا تحدد بنية الصفحة ومظهرها وسلوكها.",
    html: "تمنح HTML الصفحة بنيتها ومعناها عبر عناصر مثل العناوين والقوائم والروابط. كل موقع إلكتروني مبني عليها.",
    css: "تتحكم CSS في الألوان والخطوط والمسافات والتخطيط. وتجعل البنية نفسها تبدو جيدة على أي حجم شاشة.",
    js: "تجعل JavaScript الصفحات تفاعلية عبر الاستجابة للنقرات وتحميل البيانات وتحديث المحتوى. وتعمل مباشرة في المتصفح.",
    foot: "© 2026 Training 2026. جميع الحقوق محفوظة.",
    blk: "كتلة جديدة في الترويسة",
    lp: "فقرة اختبار طويلة: تجمع صفحات الويب بين البنية والتنسيق والسلوك، وهذا النص موجود فقط لجعل منطقة المحتوى طويلة بما يكفي للتمرير. ".repeat(6),
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    reset: "إعادة الضبط",
    rotate: "تدوير تلقائي",
    full: "ملء الشاشة",
    remove: "حذف",
    dashboard: "لوحة التحكم",
    htmlEditor: "محرر HTML",
    cssStyles: "أنماط CSS",
    jsConsole: "وحدة JS",
    components: "المكونات",
    templates: "القوالب",
    snippets: "المقتطفات",
    projects: "المشاريع",
    livePreview: "معاينة مباشرة",
    responsive: "التصميم المتجاوب",
    palette: "لوحة الألوان",
    typography: "الخطوط",
    animations: "الحركات",
    debugger: "المصحح",
    settings: "الإعدادات"
  }
};

var language = "en";
var blockCount = 0;
var hintError = "";

// get the elements we need
var header = document.getElementById("header");
var content = document.getElementById("content");
var resizer = document.getElementById("resizer");
var heart = document.getElementById("heart");
var heartBox = document.getElementById("heart-box");
var hint = document.getElementById("hint");
var zoomValue = document.getElementById("zoom-value");
var autoRotateButton = document.getElementById("auto-rotate");
var animationBox = document.getElementById("animation-box");

// fill all the texts from the texts object
function applyLanguage() {
  var textElements = document.querySelectorAll("[data-i]");
  for (var index = 0; index < textElements.length; index++) {
    var element = textElements[index];
    var key = element.dataset.i;

    // keep the error message if the model failed
    if (key === "hint" && hintError !== "") {
      continue;
    }
    element.textContent = texts[language][key];
  }

  var tooltipElements = document.querySelectorAll("[data-t]");
  for (var tipIndex = 0; tipIndex < tooltipElements.length; tipIndex++) {
    var tipElement = tooltipElements[tipIndex];
    var tipText = texts[language][tipElement.dataset.t];
    tipElement.title = tipText;
    tipElement.setAttribute("aria-label", tipText);
  }

  // update the extra blocks too
  var extraBlocks = document.querySelectorAll(".extra");
  for (var blockIndex = 0; blockIndex < extraBlocks.length; blockIndex++) {
    var block = extraBlocks[blockIndex];
    var number = block.dataset.number;
    if (block.dataset.kind === "header") {
      block.querySelector(".block-text").textContent = texts[language].blk + " #" + number;
    } else {
      block.textContent = "#" + number + " " + texts[language].lp;
    }
  }
}

// switch between english and arabic
function toggleLanguage() {
  if (language === "en") {
    language = "ar";
  } else {
    language = "en";
  }

  document.documentElement.lang = language;
  if (language === "ar") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }

  applyLanguage();
}

// add a new paragraph to the header and to the content
function addParagraph() {
  blockCount++;

  var headerParagraph = document.createElement("p");
  headerParagraph.className = "extra";
  headerParagraph.dataset.kind = "header";
  headerParagraph.dataset.number = blockCount;

  // the text part
  var headerText = document.createElement("span");
  headerText.className = "block-text";
  headerText.textContent = texts[language].blk + " #" + blockCount;

  // small x button to delete only this block
  var deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.dataset.t = "remove";
  deleteButton.title = texts[language].remove;
  deleteButton.setAttribute("aria-label", texts[language].remove);
  deleteButton.innerHTML = '<svg class="icon"><use href="#close"/></svg>';
  deleteButton.addEventListener("click", function () {
    headerParagraph.remove();
  });

  headerParagraph.appendChild(headerText);
  headerParagraph.appendChild(deleteButton);
  header.appendChild(headerParagraph);

  var contentParagraph = document.createElement("p");
  contentParagraph.className = "extra";
  contentParagraph.dataset.kind = "content";
  contentParagraph.dataset.number = blockCount;
  contentParagraph.textContent = "#" + blockCount + " " + texts[language].lp;
  content.appendChild(contentParagraph);

  headerParagraph.scrollIntoView({ block: "nearest" });
  contentParagraph.scrollIntoView({ block: "nearest" });
}

// remove everything that was added
function clearContent() {
  var extraBlocks = document.querySelectorAll(".extra");
  for (var index = 0; index < extraBlocks.length; index++) {
    extraBlocks[index].remove();
  }
}

document.getElementById("lang-btn").addEventListener("click", toggleLanguage);
document.getElementById("add-btn").addEventListener("click", addParagraph);
document.getElementById("clear-btn").addEventListener("click", clearContent);

// resize the side menu by dragging
var isDragging = false;

resizer.addEventListener("pointerdown", function (event) {
  isDragging = true;
  resizer.setPointerCapture(event.pointerId);
  resizer.classList.add("dragging");
});

resizer.addEventListener("pointermove", function (event) {
  if (!isDragging) {
    return;
  }

  var newWidth;
  if (document.documentElement.dir === "rtl") {
    newWidth = window.innerWidth - event.clientX;
  } else {
    newWidth = event.clientX;
  }

  // keep the width between 160 and 400
  if (newWidth < 160) {
    newWidth = 160;
  }
  if (newWidth > 400) {
    newWidth = 400;
  }

  document.body.style.setProperty("--w", newWidth + "px");
});

function stopDragging(event) {
  isDragging = false;
  resizer.classList.remove("dragging");
  if (resizer.hasPointerCapture(event.pointerId)) {
    resizer.releasePointerCapture(event.pointerId);
  }
}

resizer.addEventListener("pointerup", stopDragging);
resizer.addEventListener("pointercancel", stopDragging);

// make the floating shapes
function randomBetween(minimum, maximum) {
  return minimum + Math.random() * (maximum - minimum);
}

function randomSign() {
  if (Math.random() < 0.5) {
    return -1;
  }
  return 1;
}

function createShapes() {
  for (var index = 0; index < 9; index++) {
    var shape = document.createElement("span");
    shape.className = "shape";

    // every 2nd one is only an outline
    if ((index + 1) % 2 === 0) {
      shape.classList.add("outline");
    }

    var size = randomBetween(35, 150);
    shape.style.width = size + "px";
    shape.style.height = size + "px";
    shape.style.left = randomBetween(-10, 90) + "%";
    shape.style.top = randomBetween(-10, 90) + "%";

    var duration = randomBetween(8, 20);
    shape.style.setProperty("--duration", duration + "s");
    shape.style.animationDelay = "-" + randomBetween(0, duration) + "s";
    shape.style.setProperty("--x", randomSign() * randomBetween(120, 380) + "px");
    shape.style.setProperty("--y", randomSign() * randomBetween(80, 260) + "px");
    shape.style.setProperty("--rot", randomSign() * randomBetween(30, 120) + "deg");

    animationBox.appendChild(shape);
  }
}

// 3D heart controls
var defaultRadius = 0;

heart.src = "realistic_human_heart.glb";

// save the starting camera distance when the model is loaded
heart.addEventListener("load", function () {
  defaultRadius = heart.getCameraOrbit().radius;
  updateZoomValue();
});

function updateZoomValue() {
  if (defaultRadius === 0) {
    return;
  }
  var currentRadius = heart.getCameraOrbit().radius;
  var zoomPercent = Math.round((defaultRadius / currentRadius) * 100);
  zoomValue.textContent = zoomPercent + "%";
}

heart.addEventListener("camera-change", updateZoomValue);

function changeZoom(multiplier) {
  if (defaultRadius === 0) {
    return;
  }

  var orbit = heart.getCameraOrbit();
  var currentZoom = defaultRadius / orbit.radius;
  var newZoom = currentZoom * multiplier;

  // keep the zoom between 15% and 400%
  if (newZoom < 0.15) {
    newZoom = 0.15;
  }
  if (newZoom > 4) {
    newZoom = 4;
  }

  var newRadius = defaultRadius / newZoom;
  heart.cameraOrbit = orbit.theta + "rad " + orbit.phi + "rad " + newRadius + "m";
}

function zoomIn() {
  changeZoom(1.3);
}

function zoomOut() {
  changeZoom(1 / 1.3);
}

function resetView() {
  heart.cameraOrbit = "auto auto auto";
  heart.cameraTarget = "auto auto auto";
  heart.fieldOfView = "auto";
  heart.resetTurntableRotation();
}

function toggleAutoRotate() {
  heart.autoRotate = !heart.autoRotate;
  autoRotateButton.classList.toggle("on", heart.autoRotate);
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    heartBox.requestFullscreen();
  }
}

document.getElementById("zoom-in").addEventListener("click", zoomIn);
document.getElementById("zoom-out").addEventListener("click", zoomOut);
document.getElementById("reset-view").addEventListener("click", resetView);
autoRotateButton.addEventListener("click", toggleAutoRotate);
document.getElementById("fullscreen").addEventListener("click", toggleFullscreen);

heart.addEventListener("dblclick", resetView);

// stop the auto rotate when the user starts dragging
heart.addEventListener("pointerdown", function () {
  heart.autoRotate = false;
  autoRotateButton.classList.remove("on");
});

// the wheel should zoom the model, not scroll the page
heart.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

// show a message if something goes wrong
function showHintError(message) {
  hintError = message;
  hint.textContent = message;
  hint.classList.add("error");
}

heart.addEventListener("error", function () {
  showHintError("Could not load the 3D model");
});

setTimeout(function () {
  if (!customElements.get("model-viewer")) {
    showHintError("3D viewer library could not load — check your internet connection");
  }
}, 8000);

// scroll the content back to the top
document.getElementById("to-top").addEventListener("click", function () {
  content.scrollTo({ top: 0, behavior: "smooth" });
});

// start everything
createShapes();
applyLanguage();