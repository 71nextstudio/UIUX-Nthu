#!/usr/bin/env python3
"""WCAG 2.x 對比度計算。

用法：
  python3 contrast.py "#767676" "#FFFFFF"          # 一般文字
  python3 contrast.py "#F59E0B" "#FFF" --large     # 大字（≥18pt 或 ≥14pt 粗體）
  python3 contrast.py "rgb(29,29,31)" "#fbfbfd"

前景有透明度時（#RRGGBBAA 或 rgba()），會先疊在背景上再計算。
"""
import re
import sys


def parse_color(s):
    s = s.strip().lower()
    m = re.fullmatch(r"#?([0-9a-f]{3,8})", s)
    if m:
        h = m.group(1)
        if len(h) in (3, 4):
            h = "".join(c * 2 for c in h)
        if len(h) not in (6, 8):
            raise ValueError(f"無法解析色碼：{s}")
        r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
        a = int(h[6:8], 16) / 255 if len(h) == 8 else 1.0
        return r, g, b, a
    m = re.fullmatch(r"rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)", s)
    if m:
        r, g, b = (float(m.group(i)) for i in (1, 2, 3))
        a = float(m.group(4)) if m.group(4) else 1.0
        return r, g, b, a
    raise ValueError(f"無法解析色碼：{s}")


def blend(fg, bg):
    a = fg[3]
    return tuple(fg[i] * a + bg[i] * (1 - a) for i in range(3))


def luminance(rgb):
    def ch(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg, bg):
    bg_rgb = bg[:3]
    fg_rgb = blend(fg, bg) if fg[3] < 1 else fg[:3]
    l1, l2 = sorted((luminance(fg_rgb), luminance(bg_rgb)), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)


def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    large = "--large" in argv
    if len(args) != 2:
        print(__doc__)
        return 2
    fg, bg = parse_color(args[0]), parse_color(args[1])
    r = ratio(fg, bg)
    aa = 3.0 if large else 4.5
    aaa = 4.5 if large else 7.0
    kind = "大字" if large else "一般文字"
    print(f"前景 {args[0]} / 背景 {args[1]}")
    print(f"對比度 {r:.2f} : 1（{kind}）")
    print(f"AA  需 ≥ {aa}:1  → {'✅ 通過' if r >= aa else '❌ 不及格'}")
    print(f"AAA 需 ≥ {aaa}:1  → {'✅ 通過' if r >= aaa else '❌ 不及格'}")
    if not large:
        print(f"若為大字（≥18pt 或 ≥14pt 粗體）AA 需 ≥ 3:1 → {'✅ 通過' if r >= 3 else '❌ 不及格'}")
    if r >= 20:
        print("⚠ 接近純黑純白（21:1），長時間閱讀易眩光，可改用深灰與近白（V-C4）。")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
