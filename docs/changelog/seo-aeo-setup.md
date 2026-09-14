# [LOG] 全站 SEO／AEO 基礎建設

對應規格：[docs/spec/seo-aeo-setup.md](../spec/seo-aeo-setup.md)

---

## 2026-09-14 — 首頁 SEO meta／結構化資料，站台 robots／sitemap／llms.txt／.htaccess

**修改檔案：**
- `index.html` — `<head>` 新增 description／keywords／author／robots meta、canonical（`https://nthu.71next.com/`）、Open Graph、Twitter Card、`Course` JSON-LD、`FAQPage` JSON-LD（body 未變動）
- `robots.txt`（新增）— `Allow: /` ＋ 常見 AI 答案引擎爬蟲 User-agent，指向 sitemap
- `sitemap.xml`（新增）— 首頁＋39 個單元頁面
- `llms.txt`（新增）— 課程摘要與主要頁面連結，llms.txt 慣例格式
- `.htaccess`（新增）— HTTPS／canonical host（無 www）301 轉址、gzip 壓縮、瀏覽器快取

**實作說明：**
第一輪（SEO）：先用 `AskUserQuestion` 確認部署平台（當時未定）、涵蓋範圍（選首頁為主）、OG 分享圖（無素材先跳過）三件事，才動手改 `index.html` 並新增 `robots.txt`／`sitemap.xml`。`sitemap.xml` 的 URL 清單用 `grep -oE 'href="[^"]+\.html"' index.html` 自動抓取，避免手動漏頁。

第二輪（AEO）：使用者追加「針對 AEO 也幫我做」，再次用 `AskUserQuestion` 確認 FAQ 要不要顯示在頁面上（使用者選「只加結構化資料，不要顯示在頁面上」）、要不要補 sameAs 實體連結（無可用連結，跳過）。因此新增的 `FAQPage` JSON-LD 是純 `<head>` 內容，`index.html` 的可見版面完全沒有變動；7 組 Q&A 全部改寫自頁面既有的課程資訊（時段、地點、對象、老師、作業規則），沒有引入新事實。同時新增 `llms.txt`（llms.txt 慣例格式：標題／摘要 blockquote／課程資訊／主要頁面連結）與更新 `robots.txt`（明列 GPTBot、ChatGPT-User、OAI-SearchBot、ClaudeBot、anthropic-ai、PerplexityBot、Google-Extended、CCBot、Applebot-Extended 九個 AI 爬蟲 User-agent，皆 `Allow: /`，與既有的萬用 `*` 規則並存不衝突）。

第三輪（部署平台確認）：使用者先說不部署在 GitHub Pages，後說明實際用 cPanel。因此沒有新增 `CNAME`，改為新增 `.htaccess`：用 `mod_rewrite` 把 `HTTPS off` 或 `www.` 開頭的請求 301 導到 `https://nthu.71next.com/`，與已設定的 canonical tag／`sitemap.xml`／`robots.txt` 裡使用的網址一致；並用 `mod_deflate`／`mod_expires` 開文字壓縮與靜態資源快取，改善頁面速度（間接影響搜尋排名）。已提醒使用者上傳時 cPanel 檔案總管要開「顯示隱藏檔案」才不會漏掉 `.htaccess`，且子網域需先掛好 SSL（AutoSSL）避免被自己的強制 HTTPS 規則擋住連線。

驗證方式：`python3 -c "json.loads(...)"` 逐一解析 `index.html` 裡的兩段 `application/ld+json`（`Course`、`FAQPage`）確認語法正確；`python3 -c "xml.dom.minidom.parse(...)"` 驗證 `sitemap.xml` 格式正確；`git status --short` 確認除 `index.html` 外都是新檔，且沒有動到既有頁面的可見內容或既有的 `README.md`／其他單元檔案。

**已知問題 / 備註：**
- Google 的 FAQ rich result 通常要求 Q&A 內容在頁面上可見，這裡依使用者指示做成純結構化資料、未顯示在頁面上，因此不預期會出現 Google 搜尋結果的 FAQ 摺疊區塊；但 ChatGPT／Perplexity／Claude 等答案引擎多半直接讀取原始 HTML／JSON-LD，不受頁面可見性限制影響。
- 12 個單元內頁（slides/article/exercises 等 40+ 檔）目前完全沒有個別 SEO meta，只被 `sitemap.xml` 收錄 URL；若之後要加強內頁搜尋能見度，需要另開一輪工作逐頁補 meta。
- `og:image`／`twitter:image`、結構化資料的 `sameAs` 尚未設定，等使用者提供品牌素材／官方連結後可再補上。
