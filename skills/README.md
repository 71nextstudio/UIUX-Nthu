# Claude Skills · 課程工具包

這個資料夾放的是可以安裝到 Claude 的 **Skill（技能包）**。安裝後，Claude 會依照課程教過的規範幫你檢查設計。

| Skill | 用途 | 依據的單元 |
|---|---|---|
| [`uiux-check`](uiux-check/SKILL.md) | 審查 UI/UX 介面，產出問題清單與修正建議 | Unit 06 十大易用性原則、Unit 07 完形心理學與 Laws of UX、Unit 08 介面視覺基礎 |

---

## Skill 是什麼？

Skill 是一個資料夾，裡面放著「教 Claude 怎麼做某件事」的說明與工具。Claude 只有在任務用得到時才會讀取它，平常不會佔用對話空間。

```
uiux-check/
├── SKILL.md                    ← 必要：開頭的 name / description 決定 Claude 什麼時候會用它
├── references/                 ← 規則細節，需要時才讀
│   ├── heuristics.md           ← Unit 06：H1–H10
│   ├── gestalt-laws.md         ← Unit 07：G1–G8、L1–L7
│   └── visual-foundations.md   ← Unit 08：版面、排版、色彩、一致性
└── scripts/                    ← 需要精確計算時執行的程式
    ├── contrast.py             ← WCAG 對比度計算
    └── css_audit.py            ← 掃描 CSS 的間距、字級、行高、色碼
```

打開 `SKILL.md` 看看：最上面 `---` 之間的 **frontmatter** 是 Skill 的「名片」，`description` 寫得越清楚，Claude 越知道什麼時候該用它。下面的內文則是工作流程與報告格式。想自己做 Skill 時，可以照這個結構改寫。

---

## 安裝方式

### A. Claude Code（終端機）

Skill 放在 `~/.claude/skills/` 底下，所有專案都能用。

**方法 1：一行指令下載（需要 Node.js）**

```bash
npx degit sexfat/2026UIUX-Class-tibame/skills/uiux-check ~/.claude/skills/uiux-check
```

**方法 2：clone 整個課程 repo 再複製**

```bash
git clone https://github.com/sexfat/2026UIUX-Class-tibame.git
mkdir -p ~/.claude/skills
cp -R 2026UIUX-Class-tibame/skills/uiux-check ~/.claude/skills/
```

Windows（PowerShell）：

```powershell
git clone https://github.com/sexfat/2026UIUX-Class-tibame.git
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse 2026UIUX-Class-tibame\skills\uiux-check "$HOME\.claude\skills\"
```

> 只想在某一個專案裡使用？把資料夾放到該專案的 `.claude/skills/uiux-check/` 即可，還可以跟著專案一起 commit 分享給組員。

裝好後**重新開啟 Claude Code**，輸入 `/` 就能在清單中看到 `uiux-check`。

### B. Claude 網頁版 / 桌面版

1. 下載 [`uiux-check.zip`](uiux-check.zip)（點進去後按右上角的下載按鈕）。
2. 到 Claude 的「設定」→「功能（Capabilities）」，找到 Skills 區塊，上傳這個 zip。
3. 確認 `uiux-check` 已經開啟。

> 選單名稱可能會隨 Claude 版本調整；找不到時，在設定頁搜尋「Skills」。網頁版需要開啟程式碼執行功能，對比度計算等 scripts 才能執行。

---

## 怎麼使用

直接用一般的話描述就好，Claude 會判斷要不要使用這個 Skill：

```
幫我用 uiux-check 檢查這張首頁截圖（附上圖片）
```

```
這是我的 Figma 設計稿連結，幫我做 UI 走查：https://www.figma.com/design/...
```

```
/uiux-check 只看色彩和對比度：src/styles/
```

報告會包含：

- **總覽**：三套規則各自符合／不符合的數量，以及最該優先處理的 3 件事
- **問題清單**：依嚴重度（🔴 嚴重、🟠 中度、🟡 輕微）排列，每筆都有規則代碼、證據與具體修正數值
- **做得好的地方**
- **逐條檢核表**：H1–H10、G1–G8、L1–L7、視覺基礎逐項 ✅ ❌ ➖

也可以單獨使用裡面的工具：

```bash
# 對比度：灰字配白底，夠不夠 AA？
python3 ~/.claude/skills/uiux-check/scripts/contrast.py "#999999" "#FFFFFF"

# 掃描自己的 CSS：間距是不是 4 的倍數、字級有幾種
python3 ~/.claude/skills/uiux-check/scripts/css_audit.py ./my-project/
```

---

## 小提醒

- 截圖審查時，間距與字級是 Claude 目測估計的，報告會標「約」；要精確數值請提供 Figma 連結或程式碼。
- Skill 給的是依規範的判斷，最後的設計決策仍然由你決定。
