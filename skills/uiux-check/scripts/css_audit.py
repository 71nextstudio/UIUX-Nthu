#!/usr/bin/env python3
"""掃描 CSS / HTML / JSX / Vue 原始碼，找出違反 Unit 08 視覺規範的數值。

用法：
  python3 css_audit.py src/                 # 掃描整個資料夾
  python3 css_audit.py index.html style.css

檢查項目（對應 references/visual-foundations.md）：
  V-L1  間距（margin / padding / gap）不是 4 的倍數
  V-T1  使用的字級種類數量（建議 ≤ 5 種）
  V-T3  行高不在 1.2–1.6 之間（標題 1.2–1.3、內文 1.4–1.6）
  V-C2  寫死的色碼數量（建議改用 CSS 變數 / Tokens）
  V-S1  圓角種類數量（建議 2–3 種）
這是靜態掃描：只能看到寫在原始碼裡的數值，看不到瀏覽器實際算出的結果，請搭配畫面判斷。
"""
import os
import re
import sys
from collections import Counter, defaultdict

EXTS = {".css", ".scss", ".sass", ".less", ".html", ".htm", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte"}
SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", "vendor", "coverage"}

SPACING_PROPS = r"(?:margin|padding|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left|inline|block)(?:-start|-end)?)?"
RE_SPACING = re.compile(rf"(?<![\w-])({SPACING_PROPS})\s*:\s*([^;}}\n]+)", re.I)
RE_FONT_SIZE = re.compile(r"font-size\s*:\s*([\d.]+)(px|rem|em)\b", re.I)
RE_LINE_HEIGHT = re.compile(r"line-height\s*:\s*([\d.]+)(px|%)?\s*[;}\n]", re.I)
RE_RADIUS = re.compile(r"border-radius\s*:\s*([^;}\n]+)", re.I)
RE_HEX = re.compile(r"#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")
RE_PX = re.compile(r"(-?[\d.]+)px")


def iter_files(paths):
    for p in paths:
        if os.path.isfile(p):
            yield p
        elif os.path.isdir(p):
            for root, dirs, files in os.walk(p):
                dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
                for f in files:
                    if os.path.splitext(f)[1].lower() in EXTS:
                        yield os.path.join(root, f)


def to_px(value, unit):
    v = float(value)
    return v * 16 if unit in ("rem", "em") else v


def main(argv):
    if not argv:
        print(__doc__)
        return 2
    spacing_bad = []
    font_sizes = Counter()
    lh_bad = []
    radii = Counter()
    hex_count = Counter()
    hex_in_var_defs = 0
    files = list(iter_files(argv))
    for path in files:
        try:
            text = open(path, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        for lineno, line in enumerate(text.splitlines(), 1):
            loc = f"{path}:{lineno}"
            for m in RE_SPACING.finditer(line):
                for px in RE_PX.findall(m.group(2)):
                    v = abs(float(px))
                    if v not in (0, 1, 2) and v % 4 != 0:
                        spacing_bad.append((loc, f"{m.group(1)}: {px}px"))
            for m in RE_FONT_SIZE.finditer(line):
                font_sizes[round(to_px(m.group(1), m.group(2).lower()), 1)] += 1
            for m in RE_LINE_HEIGHT.finditer(line):
                val, unit = float(m.group(1)), (m.group(2) or "").lower()
                if unit == "%":
                    val = val / 100
                if unit == "px":
                    continue  # 需要對照字級才能換算倍數
                if val and not (1.2 <= val <= 1.6):
                    lh_bad.append((loc, f"line-height: {m.group(0).split(':', 1)[1].strip(' ;}')}"))
            for m in RE_RADIUS.finditer(line):
                radii[m.group(1).strip()] += 1
            stripped = line.strip()
            for h in RE_HEX.findall(line):
                if stripped.startswith("--") or re.match(r"\$[\w-]+\s*:", stripped):
                    hex_in_var_defs += 1
                else:
                    hex_count[h.upper()] += 1

    print(f"掃描 {len(files)} 個檔案\n")

    print(f"V-L1 間距不是 4 的倍數：{len(spacing_bad)} 處")
    for loc, desc in spacing_bad[:30]:
        print(f"  {loc}  {desc}")
    if len(spacing_bad) > 30:
        print(f"  …另有 {len(spacing_bad) - 30} 處")

    print(f"\nV-T1 字級種類：{len(font_sizes)} 種（建議 ≤ 5）")
    for size, n in sorted(font_sizes.items()):
        print(f"  {size:g}px × {n}")

    print(f"\nV-T3 行高不在 1.2–1.6：{len(lh_bad)} 處（標題 1.2–1.3、內文 1.4–1.6；px 單位未檢查）")
    for loc, desc in lh_bad[:20]:
        print(f"  {loc}  {desc}")

    print(f"\nV-S1 圓角種類：{len(radii)} 種（建議 2–3 種）")
    for r, n in radii.most_common(15):
        print(f"  {r} × {n}")

    total_hex = sum(hex_count.values())
    print(f"\nV-C2 寫死在樣式中的色碼：{total_hex} 處、{len(hex_count)} 種顏色（定義在變數裡的 {hex_in_var_defs} 處不計）")
    for h, n in hex_count.most_common(15):
        print(f"  {h} × {n}")
    if total_hex:
        print("  → 建議把顏色收斂成 CSS 變數 / Design Tokens，並用語意命名（color-text-secondary 而不是 gray-500）。")
    print("\n對比度請另外用 contrast.py 計算實際的前景 / 背景組合。")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
