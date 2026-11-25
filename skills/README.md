# AI Skills · 課程工具包

這個資料夾放的是可以安裝到 AI 工具的 **Skill（技能包）**。安裝後，AI 會依照課程教過的規範幫你檢查設計。

Skill 採用開放的 **Agent Skills** 格式（一個資料夾 + `SKILL.md`），不綁定特定廠商：Claude、ChatGPT／Codex、Gemini、GitHub Copilot、Cursor 等工具都能使用。不支援 Skill 的聊天 AI，也可以把檔案上傳或貼進對話來用（見下方「安裝方式 D」）。

| Skill | 用途 | 依據的單元 |
|---|---|---|
| [`uiux-check`](uiux-check/SKILL.md) | 審查 UI/UX 介面，產出問題清單與修正建議 | Unit 06 十大易用性原則、Unit 07 完形心理學與 Laws of UX、Unit 08 介面視覺基礎 |

---

## Skill 是什麼？

Skill 是一個資料夾，裡面放著「教 AI 怎麼做某件事」的說明與工具。AI 只有在任務用得到時才會讀取它，平常不會佔用對話空間。

```
uiux-check/
├── SKILL.md                    ← 必要：開頭的 name / description 決定 AI 什麼時候會用它
├── references/                 ← 規則細節，需要時才讀
│   ├── heuristics.md           ← Unit 06：H1–H10
│   ├── gestalt-laws.md         ← Unit 07：G1–G8、L1–L7
│   └── visual-foundations.md   ← Unit 08：版面、排版、色彩、一致性
└── scripts/                    ← 需要精確計算時執行的程式
    ├── contrast.py             ← WCAG 對比度計算
    └── css_audit.py            ← 掃描 CSS 的間距、字級、行高、色碼
```

打開 `SKILL.md` 看看：最上面 `---` 之間的 **frontmatter** 是 Skill 的「名片」，`description` 寫得越清楚，AI 越知道什麼時候該用它。下面的內文則是工作流程與報告格式。想自己做 Skill 時，可以照這個結構改寫。

---

## 安裝方式

### A. Claude Code（終端機）

Skill 放在 `~/.claude/skills/` 底下，所有專案都能用。

**方法 1：一行指令下載（需要 Node.js）**

```bash
npx degit 71nextstudio/UIUX-Nthu/skills/uiux-check ~/.claude/skills/uiux-check
```

**方法 2：clone 整個課程 repo 再複製**

```bash
git clone https://github.com/71nextstudio/UIUX-Nthu.git
mkdir -p ~/.claude/skills
cp -R UIUX-Nthu/skills/uiux-check ~/.claude/skills/
```

Windows（PowerShell）：

```powershell
git clone https://github.com/71nextstudio/UIUX-Nthu.git
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse UIUX-Nthu\skills\uiux-check "$HOME\.claude\skills\"
```

> 只想在某一個專案裡使用？把資料夾放到該專案的 `.claude/skills/uiux-check/` 即可，還可以跟著專案一起 commit 分享給組員。

裝好後**重新開啟 Claude Code**，輸入 `/` 就能在清單中看到 `uiux-check`。

### B. Claude 網頁版 / 桌面版

1. 下載 [`uiux-check.zip`](uiux-check.zip)（點進去後按右上角的下載按鈕）。
2. 到 Claude 的「設定」→「功能（Capabilities）」，找到 Skills 區塊，上傳這個 zip。
3. 確認 `uiux-check` 已經開啟。

> 選單名稱可能會隨 Claude 版本調整；找不到時，在設定頁搜尋「Skills」。網頁版需要開啟程式碼執行功能，對比度計算等 scripts 才能執行。

### C. 其他支援 Agent Skills 的工具

做法都一樣：把整個 `uiux-check/` 資料夾複製到該工具的 skills 目錄，再重新開啟工具。下載方式同 A（`npx degit` 或 `git clone`），只要把目的地換掉。

| 工具 | 常見位置（全域） | 常見位置（單一專案） |
|---|---|---|
| OpenAI Codex | `~/.codex/skills/uiux-check/` | `.codex/skills/uiux-check/` |
| Gemini CLI | `~/.gemini/skills/uiux-check/` | `.gemini/skills/uiux-check/` |
| GitHub Copilot | — | `.github/skills/uiux-check/` |
| Cursor | `~/.cursor/skills/uiux-check/` | `.cursor/skills/uiux-check/` |

例如裝到 Codex：

```bash
npx degit 71nextstudio/UIUX-Nthu/skills/uiux-check ~/.codex/skills/uiux-check
```

> 各工具的目錄名稱與支援程度會隨版本更新，上表僅供參考；找不到時請搜尋該工具官方文件的「Agent Skills」或「skills」。

### D. 一般聊天 AI（ChatGPT、Gemini 網頁版等）

不支援 Skill 的聊天 AI 不會自動觸發，但規則一樣能用：

1. 下載 [`uiux-check.zip`](uiux-check.zip) 並解壓縮。
2. 開新對話，上傳 `SKILL.md` 與 `references/` 裡的三個檔案，再附上要審查的截圖。
   想重複使用的話，可以把這些檔案放進 ChatGPT 的 GPTs（知識庫）、Gemini 的 Gems 或專案（Projects）。
3. 貼上以下提示詞：

```
你是 UI/UX 審查員。請完全依照我上傳的 SKILL.md 的流程與報告格式工作，
規則細節以 heuristics.md、gestalt-laws.md、visual-foundations.md 為準。
請審查附上的介面截圖，用繁體中文產出：總覽、依嚴重度排序的問題清單
（含規則代碼、證據、具體修正數值）、做得好的地方、逐條檢核表。
截圖上的間距與字級屬於目測，請標「約」；色碼取不到時標「估計值」。
```

> 有程式執行功能的 AI（例如 ChatGPT 的資料分析）也可以一起上傳 `scripts/contrast.py`，請它執行計算對比度。

---

## 怎麼使用

直接用一般的話描述就好，AI 會判斷要不要使用這個 Skill：

```
幫我用 uiux-check 檢查這張首頁截圖（附上圖片）
```

```
這是我的 Figma 設計稿連結，幫我做 UI 走查：https://www.figma.com/design/...
```

```
/uiux-check 只看色彩和對比度：src/styles/
```

> `/uiux-check` 是 Claude Code 的斜線指令寫法；其他工具直接說「用 uiux-check 檢查……」即可。

報告會包含：

- **總覽**：三套規則各自符合／不符合的數量，以及最該優先處理的 3 件事
- **問題清單**：依嚴重度（🔴 嚴重、🟠 中度、🟡 輕微）排列，每筆都有規則代碼、證據與具體修正數值
- **做得好的地方**
- **逐條檢核表**：H1–H10、G1–G8、L1–L7、視覺基礎逐項 ✅ ❌ ➖

也可以單獨使用裡面的工具（在 `uiux-check/` 資料夾裡執行，需要 Python 3）：

```bash
# 對比度：灰字配白底，夠不夠 AA？
python3 scripts/contrast.py "#999999" "#FFFFFF"

# 掃描自己的 CSS：間距是不是 4 的倍數、字級有幾種
python3 scripts/css_audit.py ../my-project/
```

---

## 小提醒

- 截圖審查時，間距與字級是 AI 目測估計的，報告會標「約」；要精確數值請提供 Figma 連結或程式碼。
- 不能執行程式的 AI 無法跑 `contrast.py`，對比度請改用 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) 計算。
- Skill 給的是依規範的判斷，最後的設計決策仍然由你決定。
