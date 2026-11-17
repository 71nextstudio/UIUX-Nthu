# 單元 9：Design System

> 對應清華大學課程時段：11/18（三）13:20–16:20

## 教材入口

- [課程簡報](slides.html) — 31 張：第 2–7 張是 Design System 三層（Tokens、Figma Variables、元件庫），第 8–29 張是「APP UI 設計規範」案例，第 30–31 張是用 AI 撰寫規範文件
- [完整講義](article.html) — 16 節：§1–§4 是 Design System 三層、Design Tokens、Figma Variables、元件庫；§5–§15 是規範文件案例；§16 是用 AI 撰寫你自己的規範文件
- [課堂練習與回家作業](exercises.html) — 45 分鐘課堂練習（三步驟寫規範文件）＋ 回家作業兩部分（作業 9 高保真頁面、規範文件正式版）
- [APP 介面檢核表](checklist.html) — 8 組 29 項，本單元案例規範轉出來的可勾選檢核表範本
- [Stark 與 Material Theme Builder 操作指南](tools-stark-material.html) — 對比度檢查與 Material 配色兩個 Figma 外掛的安裝與使用步驟
- [設計指南是建議，上架規範是規定](guideline-vs-policy.html) — 遵守程度分級、70/30 Design System、平台行為拆解、Figma 資料夾建議
- [Unit 09 示意板（Figma）](https://www.figma.com/design/LU76FDo4H2sNFsOO8KQuJI) — Safe Area、觸控目標、Tab Bar、單位對應四張原始檔

## 單元目標

- 說得出 Design System 的三層：Tokens（數值）、Components（元件庫）、Guidelines（規範文件），以及少一層會出什麼問題。
- 能用原始值／語意值兩層替 Design Tokens 命名，並在 Figma 用 Variables（collection、mode、aliasing）建出來。
- 能把元件的填色、內距、圓角綁到變數，用 Variants 與 component properties 整理元件狀態。
- 理解一份設計規範文件的結構：規則、原因、Do/Don't 範例，以及可勾選的檢核表。
- 能拆解一份現成的規範文件（本班 APP UI 設計規範），看懂它怎麼把平台差異寫成規則。
- 能用 AI 協助把自己專題的判斷，整理成別人看得懂、能照著做的規範文件。
- 知道 AI 幫不了的部分：數字要回頭核對來源，規則要不要收進文件是設計判斷。

## 課程介紹

這個單元的主軸是 Design System，由下往上講三層：先講 Design Tokens 與 Figma Variables（數值層），再講元件庫、Variants 與 Library（元件層），接著把原本「APP UI 設計規範」單元的內容（iOS／Android 的畫布、單位、安全區域、導覽、表單、無障礙判斷，內容沿用不變）當成規範層的**範例**——「一份好的規範文件長這樣」——最後帶到怎麼用 AI 把自己專題的判斷寫成一份規範文件、寫成一份檢核表。

⚠️ **First draft 備註：** §5–§15（原 APP UI 規範內容）保留原有的來源與數字，可以直接使用。§16 與簡報第 30–31 張（AI 撰寫規範文件）是先前新寫的教學設計，沿用 `Unit_01/persona-prompt.html`、`Unit_02/interview-prompt.html` 已建立的提示詞頁寫法，尚未實際在課堂測試過，建議你使用前先讀一遍、視班級狀況調整用詞與範例。

## 課程內容

- §1–§4（2026-11-17 新增）：Design System 三層、Design Tokens 兩層命名與 alias、Figma Variables（六種類型、collection、mode、aliasing、Variables 與 Styles 的分工、方案限制）、元件庫（主元件與實例、Variants、component properties、Library 發布）。依據 Figma Help Center 與 W3C Design Tokens Community Group 官方文件，連結見講義參考資料。課堂練習沒有因此調整，新內容只在簡報與講義。
- §5–§15（案例）：iOS / Android 規範概念、單位、Safe Area、導覽、觸控、表單、無障礙、作業與雙平台對照總表。
- §16（新增）：規範文件的三步驟寫法——草稿、找漏洞、轉檢核表，附三份可複製的 AI 提示詞。
- AI 不能取代的部分：數字核對、規則取捨、實際套用驗證。

## 對應清大日期與時段

- 11/18（三）13:20–16:20

## 本單元產出

- 對應 `清華大學課程大綱.md`：使用 AI 撰寫設計規範文件（如按鈕用法說明、無障礙設計準則）。
- 回家作業分兩部分（見 `exercises.html`）：
  - Part A · 作業 9：一個套用平台規範的高保真 APP 頁面（沿用 §14 案例規範的檢查項目，交件前用 `checklist.html` 跑一遍）。
  - Part B：用 §16 的提示詞，為自己專題的一個元件（按鈕／表單／色彩等）寫一份至少 4 條規則的規範文件，並轉成至少 6 項的可勾選檢核表。
