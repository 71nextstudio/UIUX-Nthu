# [SPEC] 全站 SEO／AEO 基礎建設

- **日期**：2026-09-14
- **負責人**：bryant_huang
- **狀態**：done
- **變更紀錄**：[docs/changelog/seo-aeo-setup.md](../changelog/seo-aeo-setup.md)

---

## 背景

網站即將從 GitHub Pages（`sexfat.github.io/2026UIUX-Class/`）換部署到自訂網域 `https://nthu.71next.com/`（實際採 cPanel／Apache 主機），此前站台沒有任何 SEO／AEO 基礎設施：`index.html` 只有基本 `<title>`，沒有 meta description、Open Graph、結構化資料，也沒有 `robots.txt`／`sitemap.xml`。使用者先要求做傳統 SEO，之後追加要求做 AEO（Answer Engine Optimization，讓 ChatGPT／Perplexity／Google AI Overview 等答案引擎能直接讀懂並引用網站內容）。

## 功能說明

在不改動任何頁面可見內容的前提下，補齊首頁的搜尋引擎／答案引擎中繼資料，並新增站台根目錄的技術檔案：

- `index.html` `<head>`：SEO meta 標籤（description／keywords／author／robots／canonical）、Open Graph、Twitter Card、`Course` 結構化資料（含 provider／instructor／courseInstance）、`FAQPage` 結構化資料（7 組 Q&A，隱藏式，不顯示於頁面）。
- `robots.txt`：允許所有爬蟲，並明列常見 AI 答案引擎 User-agent，指向 sitemap。
- `sitemap.xml`：首頁＋全部 39 個單元頁面（從 `index.html` 現有連結自動抓取）。
- `llms.txt`：依 llms.txt 慣例格式提供課程摘要與主要頁面連結，給 AI 爬蟲直接讀取。
- `.htaccess`：cPanel／Apache 環境下的 HTTPS／canonical host 強制轉址，與 gzip 壓縮／瀏覽器快取。

## 實作範圍

- 首頁 `index.html` 的 SEO／AEO 中繼資料（meta、OG、Twitter、JSON-LD）。
- 站台層級技術檔案：`robots.txt`、`sitemap.xml`、`llms.txt`、`.htaccess`。
- 結構化資料裡的老師／機構身分資訊（黃庭豪／布萊恩老師、秦毅數位科技有限公司）。

## 不在範圍內

- 12 個單元、40+ 個 slides/article/exercises 等內頁的個別 SEO meta 標籤（使用者選擇「首頁為主」，內頁維持現狀）。
- Open Graph／Twitter 分享圖（`og:image`／`twitter:image`，目前無素材，未設定）。
- 結構化資料的 `sameAs` 實體連結（LinkedIn、公司關於頁等，目前無可用連結）。
- 首頁可見版面／文字內容的任何調整（FAQ 內容依使用者指示只放結構化資料，不顯示在頁面上）。
- `CNAME` 檔案（GitHub Pages 專用，確認不採用該平台後未新增）。

## 驗收條件

- [x] `index.html` 的 `<head>` 新增 meta description／keywords／author／robots／canonical，且不影響任何可見版面
- [x] `index.html` 新增 Open Graph 與 Twitter Card 標籤
- [x] `index.html` 新增 `Course` JSON-LD（provider／instructor／hasCourseInstance），語法以 `python3 json.loads` 驗證通過
- [x] `index.html` 新增 `FAQPage` JSON-LD（7 組 Q&A，內容全部取自頁面既有事實），語法驗證通過，且未顯示在頁面上
- [x] 新增 `robots.txt`，允許主要 AI 答案引擎爬蟲並指向 sitemap
- [x] 新增 `sitemap.xml`，涵蓋首頁＋全部 39 個單元頁面，以 `xml.dom.minidom` 驗證格式正確
- [x] 新增 `llms.txt`，提供課程摘要與主要頁面連結
- [x] 新增 `.htaccess`，強制 HTTPS／canonical host（無 www）轉址，並開壓縮與快取
- [x] `git status` 確認除 `index.html` 外皆為新檔，且 `index.html` 只有 `<head>` 區塊被修改
