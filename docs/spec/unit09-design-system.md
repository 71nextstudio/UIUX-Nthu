# [SPEC] Unit 09 改以 Design System 為主軸

- **日期**：2026-11-17
- **負責人**：bryant_huang
- **狀態**：done
- **變更紀錄**：[docs/changelog/unit09-design-system.md](../changelog/unit09-design-system.md)

---

## 背景

Unit 09（11/18）在 index.html 定位為 Design System，但教材只有 APP UI 規範案例與 AI 寫規範文件，沒有 Design Tokens、Variables、元件庫。

## 功能說明

講義 §1–§4 由下往上講 Design System 三層；§5–§15 的 APP UI 規範改為規範層案例；§16 用 AI 寫規範。簡報對應新增 6 張。

## 實作範圍

- 講義新增 4 節、節號重編與跨檔引用同步
- 簡報新增 6 張、封面與標題改名
- README、index.html 單元說明

## 不在範圍內

- 課堂練習與回家作業內容（用戶指定不改）
- Figma 示意板

## 驗收條件

- [x] validate.py 全綠（31 張、16 節、交叉引用正確）
- [x] 新內容每條事實可對回 Figma Help Center 或 W3C DTCG
- [x] Codex 事實審查的 4 處已修正
