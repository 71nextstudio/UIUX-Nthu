// Unit 09 · Design System 範本（Figma 插件）
// 使用方式見 Unit_09/figma-template.html
// Token 資料與 tokens/*.json、tokens.css 是同一份來源產生的。

const TOKENS = {
  "primitiveColors": {
    "slate/50": "#F8FAFC",
    "slate/100": "#F1F5F9",
    "slate/200": "#E2E8F0",
    "slate/300": "#CBD5E1",
    "slate/400": "#94A3B8",
    "slate/500": "#64748B",
    "slate/600": "#475569",
    "slate/700": "#334155",
    "slate/800": "#1E293B",
    "slate/900": "#0F172A",
    "teal/50": "#F0FDFA",
    "teal/100": "#CCFBF1",
    "teal/200": "#99F6E4",
    "teal/300": "#5EEAD4",
    "teal/400": "#2DD4BF",
    "teal/500": "#14B8A6",
    "teal/600": "#0D9488",
    "teal/700": "#0F766E",
    "teal/800": "#115E59",
    "teal/900": "#134E4A",
    "amber/50": "#FFFBEB",
    "amber/100": "#FEF3C7",
    "amber/400": "#FBBF24",
    "amber/500": "#F59E0B",
    "amber/600": "#D97706",
    "amber/700": "#B45309",
    "amber/900": "#78350F",
    "red/50": "#FEF2F2",
    "red/400": "#F87171",
    "red/600": "#DC2626",
    "red/700": "#B91C1C",
    "red/900": "#7F1D1D",
    "green/50": "#F0FDF4",
    "green/400": "#4ADE80",
    "green/600": "#16A34A",
    "green/700": "#15803D",
    "green/900": "#14532D",
    "blue/400": "#60A5FA",
    "blue/600": "#2563EB",
    "base/white": "#FFFFFF",
    "base/black": "#000000"
  },
  "primitiveNumbers": {
    "spacing/0": 0,
    "spacing/1": 4,
    "spacing/2": 8,
    "spacing/3": 12,
    "spacing/4": 16,
    "spacing/5": 20,
    "spacing/6": 24,
    "spacing/8": 32,
    "spacing/10": 40,
    "spacing/12": 48,
    "spacing/16": 64,
    "radius/none": 0,
    "radius/sm": 4,
    "radius/md": 8,
    "radius/lg": 12,
    "radius/xl": 16,
    "radius/full": 999,
    "font-size/xs": 12,
    "font-size/sm": 14,
    "font-size/md": 16,
    "font-size/lg": 18,
    "font-size/xl": 20,
    "font-size/2xl": 24,
    "font-size/3xl": 30,
    "font-size/4xl": 36,
    "font-size/5xl": 48
  },
  "semanticColors": {
    "color/bg/canvas": [
      "slate/50",
      "slate/900"
    ],
    "color/bg/surface": [
      "base/white",
      "slate/800"
    ],
    "color/bg/subtle": [
      "slate/100",
      "slate/700"
    ],
    "color/text/primary": [
      "slate/900",
      "slate/50"
    ],
    "color/text/secondary": [
      "slate/600",
      "slate/300"
    ],
    "color/text/disabled": [
      "slate/400",
      "slate/500"
    ],
    "color/text/link": [
      "teal/700",
      "teal/300"
    ],
    "color/text/error": [
      "red/600",
      "red/400"
    ],
    "color/text/warning": [
      "amber/700",
      "amber/400"
    ],
    "color/text/success": [
      "green/700",
      "green/400"
    ],
    "color/border/default": [
      "slate/200",
      "slate/700"
    ],
    "color/border/strong": [
      "slate/400",
      "slate/500"
    ],
    "color/border/focus": [
      "blue/600",
      "blue/400"
    ],
    "color/border/error": [
      "red/600",
      "red/400"
    ],
    "color/status/warning-bg": [
      "amber/50",
      "amber/900"
    ],
    "color/status/error-bg": [
      "red/50",
      "red/900"
    ],
    "color/status/success-bg": [
      "green/50",
      "green/900"
    ],
    "btn/primary/bg": [
      "teal/700",
      "teal/400"
    ],
    "btn/primary/bg-hover": [
      "teal/800",
      "teal/300"
    ],
    "btn/primary/bg-pressed": [
      "teal/900",
      "teal/200"
    ],
    "btn/primary/text": [
      "base/white",
      "slate/900"
    ],
    "btn/secondary/bg": [
      "base/white",
      "slate/800"
    ],
    "btn/secondary/bg-hover": [
      "teal/50",
      "slate/700"
    ],
    "btn/secondary/bg-pressed": [
      "teal/100",
      "slate/600"
    ],
    "btn/secondary/border": [
      "teal/700",
      "teal/400"
    ],
    "btn/secondary/text": [
      "teal/700",
      "teal/300"
    ],
    "btn/disabled/bg": [
      "slate/200",
      "slate/700"
    ],
    "btn/disabled/text": [
      "slate/400",
      "slate/500"
    ],
    "input/bg": [
      "base/white",
      "slate/800"
    ],
    "input/border": [
      "slate/300",
      "slate/600"
    ],
    "input/placeholder": [
      "slate/400",
      "slate/500"
    ]
  },
  "semanticNumbers": {
    "radius/button": "radius/md",
    "radius/input": "radius/md",
    "radius/card": "radius/lg",
    "radius/badge": "radius/full",
    "space/component-gap": "spacing/2",
    "space/input-padding-x": "spacing/3",
    "space/card-padding": "spacing/6",
    "space/section-gap": "spacing/12"
  },
  "textStyles": [
    [
      "Display",
      "5xl",
      "Bold",
      120
    ],
    [
      "Heading/H1",
      "4xl",
      "Bold",
      125
    ],
    [
      "Heading/H2",
      "3xl",
      "Bold",
      130
    ],
    [
      "Heading/H3",
      "2xl",
      "Bold",
      135
    ],
    [
      "Heading/H4",
      "xl",
      "Medium",
      140
    ],
    [
      "Body/Large",
      "lg",
      "Regular",
      160
    ],
    [
      "Body/Medium",
      "md",
      "Regular",
      160
    ],
    [
      "Body/Small",
      "sm",
      "Regular",
      150
    ],
    [
      "Label",
      "sm",
      "Medium",
      140
    ],
    [
      "Caption",
      "xs",
      "Regular",
      140
    ],
    [
      "Button/Large",
      "md",
      "Medium",
      150
    ],
    [
      "Button/Medium",
      "sm",
      "Medium",
      150
    ],
    [
      "Button/Small",
      "xs",
      "Medium",
      150
    ]
  ]
};

// ════════════════════════════════════════════════════════════
// Unit 09 · Design System 範本產生器
// 在一個新的 Figma 檔案執行一次，會建立：
//   1. Variables：Primitive（1 個 Mode）、Semantic（Light / Dark）
//   2. Styles：文字樣式、陰影與 Focus 效果、漸層
//   3. 📘 Foundations：色票、字級、陰影說明頁
//   4. 🧩 Components：Icon、Button、Input Field、Badge、Booking Card
//   5. 🎨 Preview：同一張卡片的 Light / Dark 對照
// ════════════════════════════════════════════════════════════

// ── 小工具 ───────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}
function rgba(hex, a) {
  const c = hexToRgb(hex);
  return { r: c.r, g: c.g, b: c.b, a: a };
}

const FONT_CANDIDATES = ['Noto Sans TC', 'Inter', 'Roboto'];
const fontCache = {};
async function resolveFont(style) {
  if (fontCache[style]) return fontCache[style];
  for (const family of FONT_CANDIDATES) {
    try {
      const f = { family: family, style: style };
      await figma.loadFontAsync(f);
      fontCache[style] = f;
      return f;
    } catch (e) { /* 試下一個字體 */ }
  }
  throw new Error('找不到可用的字體：' + style);
}

const ICONS = {
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'calendar': '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  'check': '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  'search': '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path d="M4 20.5c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
  'alert-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.5"/>',
  'plus': '<path d="M12 5v14M5 12h14"/>',
};

async function main() {
  // ── 防止重複匯入 ──
  const existing = await figma.variables.getLocalVariableCollectionsAsync();
  if (existing.some(c => c.name === 'Primitive' || c.name === 'Semantic')) {
    figma.closePlugin('⚠️ 這個檔案已經有 Primitive / Semantic 變數集合了。請開一個新的 Figma 檔案再執行。');
    return;
  }

  // ════════ 1. Variables ════════
  const prim = figma.variables.createVariableCollection('Primitive');
  const primMode = prim.modes[0].modeId;
  prim.renameMode(primMode, 'Value');
  const primVars = {};

  for (const name in TOKENS.primitiveColors) {
    const v = figma.variables.createVariable(name, prim, 'COLOR');
    v.setValueForMode(primMode, hexToRgb(TOKENS.primitiveColors[name]));
    v.scopes = []; // 基礎層不出現在選色器裡，引導大家使用語意層
    primVars[name] = v;
  }
  for (const name in TOKENS.primitiveNumbers) {
    const v = figma.variables.createVariable(name, prim, 'FLOAT');
    v.setValueForMode(primMode, TOKENS.primitiveNumbers[name]);
    if (name.indexOf('spacing/') === 0) v.scopes = ['GAP', 'WIDTH_HEIGHT'];
    else if (name.indexOf('radius/') === 0) v.scopes = ['CORNER_RADIUS'];
    else if (name.indexOf('font-size/') === 0) v.scopes = ['FONT_SIZE'];
    primVars[name] = v;
  }

  const sem = figma.variables.createVariableCollection('Semantic');
  const lightMode = sem.modes[0].modeId;
  sem.renameMode(lightMode, 'Light');
  const darkMode = sem.addMode('Dark');
  const semVars = {};

  for (const name in TOKENS.semanticColors) {
    const refs = TOKENS.semanticColors[name];
    const v = figma.variables.createVariable(name, sem, 'COLOR');
    v.setValueForMode(lightMode, figma.variables.createVariableAlias(primVars[refs[0]]));
    v.setValueForMode(darkMode, figma.variables.createVariableAlias(primVars[refs[1]]));
    if (name.indexOf('/text') > -1 || name.indexOf('placeholder') > -1) v.scopes = ['TEXT_FILL', 'STROKE_COLOR'];
    else if (name.indexOf('border') > -1) v.scopes = ['STROKE_COLOR'];
    else v.scopes = ['FRAME_FILL', 'SHAPE_FILL'];
    semVars[name] = v;
  }
  for (const name in TOKENS.semanticNumbers) {
    const ref = primVars[TOKENS.semanticNumbers[name]];
    const v = figma.variables.createVariable(name, sem, 'FLOAT');
    v.setValueForMode(lightMode, figma.variables.createVariableAlias(ref));
    v.setValueForMode(darkMode, figma.variables.createVariableAlias(ref));
    v.scopes = name.indexOf('radius/') === 0 ? ['CORNER_RADIUS'] : ['GAP'];
    semVars[name] = v;
  }

  // ════════ 2. Styles ════════
  const textStyles = {};
  for (const t of TOKENS.textStyles) {
    const name = t[0], sizeKey = t[1], weight = t[2], lh = t[3];
    const s = figma.createTextStyle();
    s.name = name;
    s.fontName = await resolveFont(weight);
    s.fontSize = TOKENS.primitiveNumbers['font-size/' + sizeKey];
    s.lineHeight = { unit: 'PERCENT', value: lh };
    try { s.setBoundVariable('fontSize', primVars['font-size/' + sizeKey]); } catch (e) { /* 不支援時保留固定數值 */ }
    textStyles[name] = s;
  }

  const effectStyles = {};
  function shadow(x, y, blur, spread, hex, a) {
    return { type: 'DROP_SHADOW', color: rgba(hex, a), offset: { x: x, y: y }, radius: blur, spread: spread,
      visible: true, blendMode: 'NORMAL', showShadowBehindNode: false };
  }
  const effectDefs = {
    'Shadow/Small': [shadow(0, 1, 2, 0, '#0F172A', 0.06), shadow(0, 1, 3, 0, '#0F172A', 0.10)],
    'Shadow/Medium': [shadow(0, 2, 4, -2, '#0F172A', 0.10), shadow(0, 4, 6, -1, '#0F172A', 0.10)],
    'Shadow/Large': [shadow(0, 4, 6, -4, '#0F172A', 0.10), shadow(0, 10, 15, -3, '#0F172A', 0.10)],
    'Focus/Ring': [shadow(0, 0, 0, 2, '#FFFFFF', 1), shadow(0, 0, 0, 4, '#2563EB', 1)],
  };
  for (const name in effectDefs) {
    const s = figma.createEffectStyle();
    s.name = name;
    s.effects = effectDefs[name];
    effectStyles[name] = s;
  }

  const gradDefs = { 'Gradient/Brand': ['#0F766E', '#2DD4BF'], 'Gradient/Warm': ['#F59E0B', '#DC2626'] };
  for (const name in gradDefs) {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: rgba(gradDefs[name][0], 1) },
        { position: 1, color: rgba(gradDefs[name][1], 1) },
      ],
    }];
  }

  // ════════ 共用的建構函式 ════════
  function paint(variable) {
    return [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', variable)];
  }
  function fill(varName) { return paint(semVars[varName]); }
  function bindRadius(node, varName) {
    ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']
      .forEach(f => node.setBoundVariable(f, semVars[varName]));
  }
  function bindPadding(node, varName) {
    ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
      .forEach(f => node.setBoundVariable(f, semVars[varName]));
  }
  async function text(chars, styleName, colorVar, layerName) {
    const t = figma.createText();
    t.fontName = textStyles[styleName].fontName;
    t.characters = chars;
    await t.setTextStyleIdAsync(textStyles[styleName].id);
    t.fills = fill(colorVar);
    if (layerName) t.name = layerName;
    return t;
  }
  function setupAuto(node, name, dir) {
    node.name = name;
    node.layoutMode = dir;
    node.primaryAxisSizingMode = 'AUTO';
    node.counterAxisSizingMode = 'AUTO';
    node.fills = [];
    return node;
  }
  function autoFrame(name, dir) { return setupAuto(figma.createFrame(), name, dir); }
  function autoComponent(name, dir) { return setupAuto(figma.createComponent(), name, dir); }
  function recolorIcon(instance, colorVar) {
    const SHAPES = ['VECTOR', 'ELLIPSE', 'RECTANGLE', 'LINE', 'POLYGON', 'STAR', 'BOOLEAN_OPERATION'];
    instance.findAll(n => SHAPES.indexOf(n.type) > -1).forEach(v => { v.strokes = fill(colorVar); });
  }
  function propKey(node, propName) {
    const defs = node.componentPropertyDefinitions || node.componentProperties;
    for (const k in defs) if (k.split('#')[0] === propName) return k;
    throw new Error('找不到元件屬性：' + propName);
  }
  function layoutSet(set, width) {
    set.layoutMode = 'HORIZONTAL';
    set.layoutWrap = 'WRAP';
    set.primaryAxisSizingMode = 'FIXED';
    set.resize(width, 100);
    set.counterAxisSizingMode = 'AUTO'; // 要放在 resize 之後，否則高度會被固定成 100
    set.itemSpacing = 16;
    set.counterAxisSpacing = 16;
    set.paddingLeft = set.paddingRight = set.paddingTop = set.paddingBottom = 24;
  }
  // 依變體順序排成固定欄數的表格（例如 Button：每列 5 個 State）
  function gridSet(set, cols, cellW, cellH) {
    const pad = 24;
    set.children.forEach((v, i) => {
      v.x = pad + (i % cols) * cellW;
      v.y = pad + Math.floor(i / cols) * cellH + (cellH - v.height) / 2;
    });
    const rows = Math.ceil(set.children.length / cols);
    set.resizeWithoutConstraints(pad * 2 + cols * cellW, pad * 2 + rows * cellH);
  }
  async function sectionTitle(parent, title, desc) {
    const wrap = autoFrame('Title · ' + title, 'VERTICAL');
    wrap.itemSpacing = 4;
    wrap.appendChild(await text(title, 'Heading/H2', 'color/text/primary'));
    if (desc) wrap.appendChild(await text(desc, 'Body/Medium', 'color/text/secondary'));
    parent.appendChild(wrap);
  }
  function pageColumn(name) {
    const col = autoFrame(name, 'VERTICAL');
    col.itemSpacing = 48;
    col.paddingLeft = col.paddingRight = col.paddingTop = col.paddingBottom = 64;
    col.fills = fill('color/bg/canvas');
    return col;
  }

  // ════════ 3. 📘 Foundations ════════
  const foundations = figma.createPage();
  foundations.name = '📘 Foundations';
  const fCol = pageColumn('Foundations');
  foundations.appendChild(fCol);
  await sectionTitle(fCol, 'Foundations 基礎規範', '所有元件都只引用 Semantic 變數；Primitive 只用來被 Semantic 指向。');

  // Primitive palette
  const palette = autoFrame('Primitive Palette', 'VERTICAL');
  palette.itemSpacing = 12;
  palette.appendChild(await text('Primitive · 基礎色票（描述「它是什麼」）', 'Heading/H4', 'color/text/primary'));
  const families = {};
  for (const name in TOKENS.primitiveColors) {
    const fam = name.split('/')[0];
    (families[fam] = families[fam] || []).push(name);
  }
  for (const fam in families) {
    const row = autoFrame('Row · ' + fam, 'HORIZONTAL');
    row.itemSpacing = 8;
    for (const name of families[fam]) {
      const chip = autoFrame(name, 'VERTICAL');
      chip.itemSpacing = 4;
      const sw = figma.createRectangle();
      sw.name = 'swatch';
      sw.resize(72, 48);
      sw.cornerRadius = 8;
      sw.fills = paint(primVars[name]);
      sw.strokes = fill('color/border/default');
      sw.strokeWeight = 1;
      chip.appendChild(sw);
      chip.appendChild(await text(name, 'Caption', 'color/text/secondary'));
      chip.appendChild(await text(TOKENS.primitiveColors[name], 'Caption', 'color/text/disabled'));
      row.appendChild(chip);
    }
    palette.appendChild(row);
  }
  fCol.appendChild(palette);

  // Semantic colors, Light vs Dark
  const semRow = autoFrame('Semantic Colors', 'HORIZONTAL');
  semRow.itemSpacing = 24;
  for (const m of [['Light', lightMode, 0], ['Dark', darkMode, 1]]) {
    const col = autoFrame('Semantic · ' + m[0], 'VERTICAL');
    col.itemSpacing = 8;
    col.paddingLeft = col.paddingRight = col.paddingTop = col.paddingBottom = 24;
    col.cornerRadius = 16;
    col.fills = fill('color/bg/surface');
    col.strokes = fill('color/border/default');
    col.strokeWeight = 1;
    col.setExplicitVariableModeForCollection(sem, m[1]);
    col.appendChild(await text('Semantic · ' + m[0] + '（描述「用在哪裡」）', 'Heading/H4', 'color/text/primary'));
    for (const name in TOKENS.semanticColors) {
      const r = autoFrame(name, 'HORIZONTAL');
      r.itemSpacing = 12;
      r.counterAxisAlignItems = 'CENTER';
      const sw = figma.createRectangle();
      sw.resize(32, 32);
      sw.cornerRadius = 6;
      sw.fills = fill(name);
      sw.strokes = fill('color/border/default');
      sw.strokeWeight = 1;
      r.appendChild(sw);
      const label = autoFrame('label', 'VERTICAL');
      label.appendChild(await text(name, 'Label', 'color/text/primary'));
      label.appendChild(await text('→ ' + TOKENS.semanticColors[name][m[2]], 'Caption', 'color/text/secondary'));
      r.appendChild(label);
      col.appendChild(r);
    }
    semRow.appendChild(col);
  }
  fCol.appendChild(semRow);

  // Type scale
  const typeBox = autoFrame('Type Scale', 'VERTICAL');
  typeBox.itemSpacing = 12;
  typeBox.appendChild(await text('Typography · 文字樣式', 'Heading/H4', 'color/text/primary'));
  for (const t of TOKENS.textStyles) {
    const r = autoFrame(t[0], 'HORIZONTAL');
    r.itemSpacing = 24;
    r.counterAxisAlignItems = 'BASELINE';
    const meta = await text(t[0] + ' · ' + TOKENS.primitiveNumbers['font-size/' + t[1]] + 'px / ' + t[2], 'Caption', 'color/text/secondary');
    meta.resize(200, meta.height);
    meta.textAutoResize = 'HEIGHT';
    r.appendChild(meta);
    r.appendChild(await text('設計系統 Design System 123', t[0], 'color/text/primary'));
    typeBox.appendChild(r);
  }
  fCol.appendChild(typeBox);

  // Shadows
  const fx = autoFrame('Effects', 'VERTICAL');
  fx.itemSpacing = 12;
  fx.appendChild(await text('Effects · 陰影（多層疊加，所以用 Styles）', 'Heading/H4', 'color/text/primary'));
  const fxRow = autoFrame('Effect Row', 'HORIZONTAL');
  fxRow.itemSpacing = 32;
  fxRow.paddingTop = fxRow.paddingBottom = 16;
  for (const name in effectStyles) {
    const b = autoFrame(name, 'VERTICAL');
    b.counterAxisSizingMode = 'FIXED';
    b.primaryAxisSizingMode = 'FIXED';
    b.resize(140, 88);
    b.primaryAxisAlignItems = 'CENTER';
    b.counterAxisAlignItems = 'CENTER';
    b.cornerRadius = 12;
    b.fills = fill('color/bg/surface');
    await b.setEffectStyleIdAsync(effectStyles[name].id);
    b.appendChild(await text(name, 'Caption', 'color/text/secondary'));
    fxRow.appendChild(b);
  }
  fx.appendChild(fxRow);
  fCol.appendChild(fx);

  // ════════ 4. 🧩 Components ════════
  const compPage = figma.createPage();
  compPage.name = '🧩 Components';
  const cCol = pageColumn('Components');
  compPage.appendChild(cCol);
  await sectionTitle(cCol, 'Components 元件庫', 'Atoms：Icon、Button、Input、Badge　→　Organism：Booking Card');

  // ── Icons（Atoms）──
  await sectionTitle(cCol, 'Icon', '20 × 20，線條 1.75。Button 與 Input 用 Instance Swap 替換。');
  const iconRow = autoFrame('Icons', 'HORIZONTAL');
  iconRow.itemSpacing = 16;
  const iconComps = {};
  for (const key in ICONS) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + ICONS[key] + '</svg>';
    const node = figma.createNodeFromSvg(svg);
    node.fills = [];
    node.rescale(20 / 24);
    const comp = figma.createComponentFromNode(node);
    comp.name = 'Icon/' + key;
    recolorIcon(comp, 'color/text/primary');
    iconRow.appendChild(comp);
    iconComps[key] = comp;
  }
  cCol.appendChild(iconRow);

  // ── Button ──
  await sectionTitle(cCol, 'Button', 'Variant：Type × Size × State ｜ Boolean：Show Left / Right Icon ｜ Text：Label ｜ Instance Swap：Left / Right Icon');
  const SIZES = { Large: [48, 20, 'Button/Large', 20], Medium: [40, 16, 'Button/Medium', 16], Small: [32, 12, 'Button/Small', 14] };
  const STATES = ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled'];
  const TYPES = ['Primary', 'Secondary', 'Ghost'];
  function buttonColors(type, state) {
    if (state === 'Disabled') {
      return { bg: type === 'Ghost' ? null : 'btn/disabled/bg', border: null, text: 'btn/disabled/text' };
    }
    if (type === 'Primary') {
      const bg = state === 'Hover' ? 'btn/primary/bg-hover' : state === 'Pressed' ? 'btn/primary/bg-pressed' : 'btn/primary/bg';
      return { bg: bg, border: null, text: 'btn/primary/text' };
    }
    const hoverBg = state === 'Hover' ? 'btn/secondary/bg-hover' : state === 'Pressed' ? 'btn/secondary/bg-pressed' : null;
    if (type === 'Secondary') return { bg: hoverBg || 'btn/secondary/bg', border: 'btn/secondary/border', text: 'btn/secondary/text' };
    return { bg: hoverBg, border: null, text: 'btn/secondary/text' };
  }
  const buttonVariants = [];
  for (const type of TYPES) {
    for (const size in SIZES) {
      for (const state of STATES) {
        const spec = SIZES[size];
        const c = buttonColors(type, state);
        const b = autoComponent('Type=' + type + ', Size=' + size + ', State=' + state, 'HORIZONTAL');
        b.counterAxisSizingMode = 'FIXED';
        b.resize(100, spec[0]);
        b.paddingLeft = b.paddingRight = spec[1];
        b.itemSpacing = 8;
        b.counterAxisAlignItems = 'CENTER';
        b.primaryAxisAlignItems = 'CENTER';
        bindRadius(b, 'radius/button');
        b.fills = c.bg ? fill(c.bg) : [];
        if (c.border) { b.strokes = fill(c.border); b.strokeWeight = 1.5; }
        if (state === 'Focus') await b.setEffectStyleIdAsync(effectStyles['Focus/Ring'].id);

        const left = iconComps['calendar'].createInstance();
        left.name = 'icon-left';
        left.rescale(spec[3] / 20);
        recolorIcon(left, c.text);
        left.visible = false;
        const label = await text('按鈕', spec[2], c.text, 'label');
        const right = iconComps['arrow-right'].createInstance();
        right.name = 'icon-right';
        right.rescale(spec[3] / 20);
        recolorIcon(right, c.text);
        right.visible = false;
        b.appendChild(left);
        b.appendChild(label);
        b.appendChild(right);
        cCol.appendChild(b);
        buttonVariants.push(b);
      }
    }
  }
  const buttonSet = figma.combineAsVariants(buttonVariants, cCol);
  buttonSet.name = 'Button';
  gridSet(buttonSet, STATES.length, 160, 72);
  const bLabel = buttonSet.addComponentProperty('Label', 'TEXT', '按鈕');
  const bShowL = buttonSet.addComponentProperty('Show Left Icon', 'BOOLEAN', false);
  const bIconL = buttonSet.addComponentProperty('Left Icon', 'INSTANCE_SWAP', iconComps['calendar'].id);
  const bShowR = buttonSet.addComponentProperty('Show Right Icon', 'BOOLEAN', false);
  const bIconR = buttonSet.addComponentProperty('Right Icon', 'INSTANCE_SWAP', iconComps['arrow-right'].id);
  for (const v of buttonSet.children) {
    v.findOne(n => n.name === 'label').componentPropertyReferences = { characters: bLabel };
    v.findOne(n => n.name === 'icon-left').componentPropertyReferences = { visible: bShowL, mainComponent: bIconL };
    v.findOne(n => n.name === 'icon-right').componentPropertyReferences = { visible: bShowR, mainComponent: bIconR };
  }

  // ── Input Field ──
  await sectionTitle(cCol, 'Input Field', 'Variant：State ｜ Boolean：Show Required、Show Left Icon、Show Helper Text ｜ Text：Label、Placeholder、Helper Text');
  const inputVariants = [];
  for (const state of ['Default', 'Focus', 'Error', 'Disabled']) {
    const f = autoComponent('State=' + state, 'VERTICAL');
    f.counterAxisSizingMode = 'FIXED';
    f.resize(320, 100);
    f.itemSpacing = 6;

    const labelRow = autoFrame('label-row', 'HORIZONTAL');
    labelRow.itemSpacing = 2;
    labelRow.appendChild(await text('欄位名稱', 'Label', state === 'Disabled' ? 'color/text/disabled' : 'color/text/primary', 'label'));
    labelRow.appendChild(await text('*', 'Label', 'color/text/error', 'required'));
    f.appendChild(labelRow);

    const box = autoFrame('input', 'HORIZONTAL');
    box.counterAxisSizingMode = 'FIXED';
    box.resize(320, 40);
    box.counterAxisAlignItems = 'CENTER';
    box.itemSpacing = 8;
    box.setBoundVariable('paddingLeft', semVars['space/input-padding-x']);
    box.setBoundVariable('paddingRight', semVars['space/input-padding-x']);
    bindRadius(box, 'radius/input');
    box.fills = fill(state === 'Disabled' ? 'color/bg/subtle' : 'input/bg');
    box.strokes = fill(state === 'Focus' ? 'color/border/focus' : state === 'Error' ? 'color/border/error' : 'input/border');
    box.strokeWeight = state === 'Focus' || state === 'Error' ? 2 : 1;
    const icon = iconComps['mail'].createInstance();
    icon.name = 'icon-left';
    icon.rescale(18 / 20);
    recolorIcon(icon, 'input/placeholder');
    icon.visible = false;
    box.appendChild(icon);
    const ph = await text('請輸入…', 'Body/Small', state === 'Disabled' ? 'color/text/disabled' : 'input/placeholder', 'placeholder');
    box.appendChild(ph);
    f.appendChild(box);
    box.layoutSizingHorizontal = 'FILL';
    ph.layoutSizingHorizontal = 'FILL';

    const helper = await text(state === 'Error' ? '請輸入正確的 Email 格式' : '說明文字', 'Caption', state === 'Error' ? 'color/text/error' : 'color/text/secondary', 'helper');
    f.appendChild(helper);
    helper.layoutSizingHorizontal = 'FILL';
    helper.textAutoResize = 'HEIGHT';

    cCol.appendChild(f);
    inputVariants.push(f);
  }
  const inputSet = figma.combineAsVariants(inputVariants, cCol);
  inputSet.name = 'Input Field';
  layoutSet(inputSet, 1440);
  const iLabel = inputSet.addComponentProperty('Label', 'TEXT', '欄位名稱');
  const iPh = inputSet.addComponentProperty('Placeholder', 'TEXT', '請輸入…');
  const iHelper = inputSet.addComponentProperty('Helper Text', 'TEXT', '說明文字');
  const iReq = inputSet.addComponentProperty('Show Required', 'BOOLEAN', true);
  const iShowIcon = inputSet.addComponentProperty('Show Left Icon', 'BOOLEAN', false);
  const iIcon = inputSet.addComponentProperty('Left Icon', 'INSTANCE_SWAP', iconComps['mail'].id);
  const iShowHelper = inputSet.addComponentProperty('Show Helper Text', 'BOOLEAN', true);
  for (const v of inputSet.children) {
    v.findOne(n => n.name === 'label').componentPropertyReferences = { characters: iLabel };
    v.findOne(n => n.name === 'required').componentPropertyReferences = { visible: iReq };
    v.findOne(n => n.name === 'placeholder').componentPropertyReferences = { characters: iPh };
    v.findOne(n => n.name === 'icon-left').componentPropertyReferences = { visible: iShowIcon, mainComponent: iIcon };
    v.findOne(n => n.name === 'helper').componentPropertyReferences = { visible: iShowHelper, characters: iHelper };
  }

  // ── Badge ──
  await sectionTitle(cCol, 'Badge', 'Variant：Status ｜ Text：Label');
  const BADGES = {
    Neutral: ['color/bg/subtle', 'color/text/secondary', '草稿'],
    Success: ['color/status/success-bg', 'color/text/success', '已確認'],
    Warning: ['color/status/warning-bg', 'color/text/warning', '待補資料'],
    Error: ['color/status/error-bg', 'color/text/error', '已取消'],
  };
  const badgeVariants = [];
  for (const status in BADGES) {
    const b = autoComponent('Status=' + status, 'HORIZONTAL');
    b.paddingLeft = b.paddingRight = 10;
    b.paddingTop = b.paddingBottom = 2;
    bindRadius(b, 'radius/badge');
    b.fills = fill(BADGES[status][0]);
    b.appendChild(await text(BADGES[status][2], 'Caption', BADGES[status][1], 'label'));
    cCol.appendChild(b);
    badgeVariants.push(b);
  }
  const badgeSet = figma.combineAsVariants(badgeVariants, cCol);
  badgeSet.name = 'Badge';
  layoutSet(badgeSet, 600);
  const bdLabel = badgeSet.addComponentProperty('Label', 'TEXT', '標籤');
  for (const v of badgeSet.children) {
    v.findOne(n => n.name === 'label').componentPropertyReferences = { characters: bdLabel };
  }

  // ── Booking Card（Organism：全部由上面的元件實例組成）──
  await sectionTitle(cCol, 'Booking Card', 'Organism：由 Badge、Input Field、Button 的實例組成。改母元件，這張卡片會自動更新。');
  const card = autoComponent('Booking Card', 'VERTICAL');
  card.counterAxisSizingMode = 'FIXED';
  card.resize(400, 100);
  card.itemSpacing = 16;
  bindPadding(card, 'space/card-padding');
  bindRadius(card, 'radius/card');
  card.fills = fill('color/bg/surface');
  card.strokes = fill('color/border/default');
  card.strokeWeight = 1;
  await card.setEffectStyleIdAsync(effectStyles['Shadow/Medium'].id);

  const head = autoFrame('header', 'VERTICAL');
  head.itemSpacing = 6;
  const badge = badgeSet.children.find(n => n.name === 'Status=Warning').createInstance();
  const badgeProps = {};
  badgeProps[propKey(badge, 'Label')] = '待補資料';
  badge.setProperties(badgeProps);
  head.appendChild(badge);
  const title = await text('顧問評估預約', 'Heading/H3', 'color/text/primary', 'title');
  head.appendChild(title);
  const desc = await text('留下聯絡方式，永續顧問會在 2 個工作天內與你聯繫，安排 30 分鐘的線上評估。', 'Body/Small', 'color/text/secondary', 'description');
  head.appendChild(desc);
  card.appendChild(head);
  head.layoutSizingHorizontal = 'FILL';
  title.layoutSizingHorizontal = 'FILL';
  desc.layoutSizingHorizontal = 'FILL';
  desc.textAutoResize = 'HEIGHT';

  const nameField = inputSet.defaultVariant.createInstance();
  nameField.name = 'Input · 公司名稱';
  const nameProps = {};
  nameProps[propKey(nameField, 'Label')] = '公司名稱';
  nameProps[propKey(nameField, 'Placeholder')] = '例如：綠色未來股份有限公司';
  nameProps[propKey(nameField, 'Show Helper Text')] = false;
  nameField.setProperties(nameProps);
  card.appendChild(nameField);
  nameField.layoutSizingHorizontal = 'FILL';

  const mailField = inputSet.defaultVariant.createInstance();
  mailField.name = 'Input · Email';
  const mailProps = { State: 'Error' };
  mailProps[propKey(mailField, 'Label')] = '聯絡 Email';
  mailProps[propKey(mailField, 'Placeholder')] = 'name@company';
  mailProps[propKey(mailField, 'Helper Text')] = '請輸入正確的 Email 格式，例如 name@company.com';
  mailProps[propKey(mailField, 'Show Left Icon')] = true;
  mailField.setProperties(mailProps);
  card.appendChild(mailField);
  mailField.layoutSizingHorizontal = 'FILL';

  const actions = autoFrame('actions', 'HORIZONTAL');
  actions.setBoundVariable('itemSpacing', semVars['space/component-gap']);
  const primary = buttonSet.defaultVariant.createInstance();
  const pProps = { Type: 'Primary', Size: 'Medium', State: 'Default' };
  pProps[propKey(primary, 'Label')] = '立即預約';
  pProps[propKey(primary, 'Show Left Icon')] = true;
  primary.setProperties(pProps);
  const secondary = buttonSet.defaultVariant.createInstance();
  const sProps = { Type: 'Ghost', Size: 'Medium', State: 'Default' };
  sProps[propKey(secondary, 'Label')] = '稍後再說';
  secondary.setProperties(sProps);
  actions.appendChild(primary);
  actions.appendChild(secondary);
  card.appendChild(actions);
  cCol.appendChild(card);

  // ════════ 5. 🎨 Preview ════════
  const preview = figma.createPage();
  preview.name = '🎨 Preview';
  const pRow = autoFrame('Light vs Dark', 'HORIZONTAL');
  pRow.itemSpacing = 0;
  preview.appendChild(pRow);
  for (const m of [['Light', lightMode], ['Dark', darkMode]]) {
    const canvas = autoFrame('Mode · ' + m[0], 'VERTICAL');
    canvas.itemSpacing = 16;
    canvas.paddingLeft = canvas.paddingRight = canvas.paddingTop = canvas.paddingBottom = 48;
    canvas.fills = fill('color/bg/canvas');
    canvas.setExplicitVariableModeForCollection(sem, m[1]);
    canvas.appendChild(await text(m[0] + ' Mode', 'Label', 'color/text/secondary'));
    canvas.appendChild(card.createInstance());
    pRow.appendChild(canvas);
  }

  await figma.setCurrentPageAsync(preview);
  figma.viewport.scrollAndZoomIntoView([pRow]);

  const varCount = Object.keys(primVars).length + Object.keys(semVars).length;
  figma.closePlugin('✅ 完成！' + varCount + ' 個變數、' + TOKENS.textStyles.length + ' 個文字樣式、' +
    buttonSet.children.length + ' 個按鈕變體，以及 Input、Badge、Booking Card 元件。');
}

main().catch(err => {
  console.error(err);
  figma.closePlugin('❌ 發生錯誤：' + (err && err.message ? err.message : err));
});
