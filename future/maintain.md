# 修復與調整紀錄

---

## 2026-06-29

### 1. 深色投影片的上下頁按鈕配色修正
**問題：** Unit 01、Unit 02 簡報在黑底（`.dark`）投影片時，右下角的上一頁／下一頁按鈕仍是深色，幾乎看不見。
**原因：** `#ctrls button` 採固定深色樣式（`rgba(29,29,31,.06)` + 深色文字），未隨投影片深淺背景切換。
**修正：** 翻頁時偵測目前投影片是否為 `.dark`，是則為控制列加上 `on-dark` class，按鈕改為白色半透明（hover 更亮）；切回淺色頁自動恢復。初始載入也會判斷第一頁。
**影響範圍：**
- `Unit_01/slides_unit01.html` — 新增 `#ctrls.on-dark` 樣式與 go()／初始化的 class 切換
- `Unit_02/slides_unit02.html` — 同上

### 2. 文章參考資料區塊暫時隱藏
**問題：** `article.html` 最下方「參考資料」區塊需暫時不顯示。
**原因：** 依需求暫時隱藏，但保留內容供日後恢復。
**修正：** 將 `.refs` 區塊以 HTML 註解包起（`<!-- ... -->`），需要時移除註解即可恢復。
**影響範圍：**
- `Unit_02/article.html` — 註解 `.refs` 區塊

### 3. 首頁連結改為另開新頁
**問題：** `index.html` 的連結預設在原分頁開啟。
**原因：** 需讓使用者點擊單元素材時不離開課程總覽頁。
**修正：** 為全部 6 個連結（Unit 01 ×2、Unit 02 ×3、頁尾課程大綱）加上 `target="_blank" rel="noopener"`。
**影響範圍：**
- `index.html` — 各 `<a>` 連結加上 target／rel

---

## 2026-08-02

### 1. Unit 05 講義的課堂練習時間未跟著改
**問題：** Unit 05 課堂練習時間從 90 分鐘調整為 80 分鐘時，簡報、練習頁、README 都改了，`article.html` 第 13 節卻仍寫「課堂練習：電商後台卡片分類法（90 分鐘）」，四階段時間也還是舊的 30／20／25。
**原因：** 同一個數字散在四個檔案，靠人工記憶同步，漏掉最不常回頭看的講義。
**修正：** 講義改為 80 分鐘與 25／18／22，並補上「四階段結束後另有 15 分鐘成果分享」。同時把 `exercises.html` 開頭 lead 的「用 90 分鐘跑完」一併改掉。這個問題是新寫的 `validate.py` 對帳報表列出時間數字後才發現的。
**影響範圍：**
- `Unit_05/article.html` — 第 13 節課堂練習時間與四階段時間
- `Unit_05/exercises.html` — hero lead 的時間敘述

### 2. 驗收腳本兩處漏檢
**問題：** `validate.py` 初版在其他單元上跑出假警報，且漏掉最該對帳的數字。
**原因：** 一是只認 `<section class="slide">` 與 `<p class="sec-num">數字</p>`，但 Unit_01–03 用的是 `<div class="slide">` 與 `SECTION 01` 前綴；二是時間數字的正則只抓「分／分鐘」，而簡報 Agenda 寫的是 `50 min`，導致課程總長沒進對帳報表。
**修正：** 標記比對放寬為 `(?:section|div)`、`sec-num` 允許非數字前綴；時間正則加入 `min`／`mins`。另外對於完全不使用 `.section` 結構的舊單元（Unit_02），改為輸出提示並跳過節號檢查，不再報成錯誤。
**影響範圍：**
- `.claude/skills/unit-materials/validate.py` — 標記相容性與時間數字擷取

---

## 2026-08-07

### 1. Unit 08 簡報封面標示的張數與實際會播的張數對不起來
**狀態：** 已修復
**問題：** `Unit_08/slides.html` 封面 `cover-meta` 寫「29 張投影片」，但第一頁右上角的頁碼顯示的是「01 / 22」。學生看到的兩個數字互相矛盾。
**原因：** 檔案裡有 7 張投影片被標記為備用補充頁（`class="slide ... drop"`）。`.slide.drop { display: none }` 讓它們不顯示，翻頁 JS 也用 `.slide:not(.drop)` 收集頁面，所以自動填的頁碼分母是 29 − 7 ＝ 22。但 `cover-meta` 是寫死的字串，不會跟著 `drop` 的增減走。README 也寫「29 張，其中 7 張為備用補充頁」，跟封面同一套算法，但跟畫面上的頁碼不同。
**佐證：**
```
$ grep -c '<section class="slide' Unit_08/slides.html        → 29
$ grep -c 'class="slide[^"]*drop' Unit_08/slides.html         → 7
$ grep -n '\.drop' Unit_08/slides.html
605:.slide.drop { display: none; }
1341:      const slides = Array.from(document.querySelectorAll('.slide:not(.drop)'));
```
排除掉的可能：不是 `drop` 沒有掛樣式或 JS（早先看的版本確實沒有，現在 CSS 與 JS 兩處都補上了），純粹是封面那個手寫數字沒跟著改。
**修正：** 採方向 ①，對外的數字一律用會播的張數。`cover-meta` 改成「22 張投影片 · 另有 7 張備用補充頁與 Figma 實作」，README 改成「22 張，另有 7 張標了 `drop` 的備用補充頁，預設不播」。沒有改用 JS 動態寫入，因為 `cover-meta` 裡還有其他寫死的文字，不值得為一個數字多掛一段初始化邏輯。
另外補上 `validate.py` 的漏檢：`check_slides()` 原本用 `<(?:section|div) class="slide[\s"]` 數總數，改成抓完整 class 字串後扣掉含 `drop` 的，比對封面標示時用會播的張數，並在報表註明備用頁有幾張。Unit_03／05／06／07／08 重跑全綠。
**影響範圍：**
- `Unit_08/slides.html` — `cover-meta` 的「29 張投影片」（查證位置：CSS 605 行、JS 1341 行）
- `Unit_08/README.md` — 第 6 行「課堂簡報（29 張，其中 7 張為備用補充頁）」
- `.claude/skills/unit-materials/validate.py` — `check_slides()` 張數比對排除 `.drop`

---

## 2026-08-11

### 1. RWD vs AWD 的示範網站實測不成立
**狀態：** 已修復
**問題：** Unit 09 簡報第 8 張要學生「用手機與桌機各開一次 PChome（RWD）與 momo（AWD），觀察載入行為的差異」。實際照做看不到差異，示範會失敗。
**原因：** 這段是從 master 分支的 Unit_12 逐字沿用下來的舊教材。用桌機與手機 User-Agent 實測，`www.momoshop.com.tw` 對兩種 UA 回的 HTML **完全相同**（byte-identical），不會依裝置轉址；`m.momoshop.com.tw` 雖然存在（HTTP 200），但要手動輸入才進得去。PChome 則因為擋爬蟲，兩種 UA 都只回空殼頁（142 bytes 對 1848 bytes），量不到有效結果。
**佐證：**
```
# 手機 UA 是否換網址（curl -sL -w %{url_effective}）
www.momoshop.com.tw   → https://www.momoshop.com.tw/main/   （未轉址）
www.etmall.com.tw     → https://m.etmall.com.tw/            （轉址）
www.ruten.com.tw      → https://www.ruten.com.tw/m/         （轉址）
591.com.tw            → https://m.591.com.tw/               （轉址）

# 同網址、兩種 UA 的 HTML 差異
www.momoshop.com.tw/main/  桌機 9832 / 手機 9832 bytes  → 完全相同
www.thsrc.com.tw           桌機 236527 / 手機 236527    → 完全相同
591.com.tw                 桌機 330032 / 手機 6079      → 兩套不同的站
```
排除掉的可能：不是 momo 沒有行動版（`m.momoshop.com.tw` 確實存在），是 www 入口不做 UA 轉址，因此「開同一個網址觀察差異」這個操作步驟本身不成立。另外 curl 只測得到伺服器端對 UA 的反應，client-side JS 轉址測不到，所以「沒換網址」不能反推一定是 RWD，但「有換網址」可以確定是 AWD。
**修正：** 示範對象換成實測有轉址行為的 **591**（AWD）與 HTML byte-identical 的 **台灣高鐵**（RWD）。591 特別適合教學：網址列會當場從 `591.com.tw` 變成 `m.591.com.tw`，分頁標題還自報「591 觸屏版」，桌機 330 KB 對行動版 6 KB 的落差也很直觀。README 補上實測對照表與另外兩個 AWD 案例（東森購物、露天市集），並記錄為什麼把 momo 換掉。兩處都註明是 2026/08/10 實測，提醒上課前重新確認。
**影響範圍：**
- `Unit_09/slides.html` — 第 8 張的比較表欄位與現場驗證說明
- `Unit_09/README.md` — 新增「課堂現場驗證的實例」對照表與換掉 momo 的原因

### 2. 各單元簡報播放中無法回到課程總覽
**狀態：** 已修復
**問題：** 14 份簡報（Unit 01–12 主簡報 + Unit 08、09 兩份補充簡報）的封面都沒有回 `index.html` 的入口，播放時只能改網址或按瀏覽器上一頁。
**原因：** 各單元簡報是不同時期做的，封面只放單元徽章與頁碼，從來沒有規劃回首頁的動線。講義與練習頁的 `foot-nav` 有「回到課程總覽」，簡報沒有。
**佐證：**
```
$ grep -l "index.html" Unit_*/slides*.html
Unit_09/slides.html      # 命中的是 sexfat.github.io/rwd/index.html 等外部示範網址
Unit_12/slides.html      # 同上
→ 實際上 14 份簡報沒有任何一份連得回 ../index.html
```
另外查證過三件事：`.slide-head` 沒有任何直接子選擇器或 `nth-child` 依賴（加第三個子元素不會破版）、專案內無 `to-index` 命名衝突、14 份封面全部是淺色頁（`currentColor` 取色安全）。
**修正：** 每份簡報的第一張封面，把單元徽章與新的「↩ 課程總覽」連結包進一個 `display:inline-flex` 容器，`slide-head` 維持「兩個子元素 + space-between」的原本佈局，頁碼位置不受影響。Unit_11 的 class 命名與其他單元不同（`head`／`unit`／`num`），個別對應處理。
第一版把樣式寫成 inline style，被 `validate.py` 抓出「使用但未定義的 class `to-index`」，改為在各檔 `<style>` 內新增 `.to-index` 規則（含 hover 由 55% 透明度轉全亮）。
**影響範圍：**
- `Unit_01/slides_unit01.html`、`Unit_02/slides_unit02.html`、`Unit_03`–`Unit_07`、`Unit_10`、`Unit_12` 的 `slides.html` — 封面連結與 `.to-index` 樣式
- `Unit_08/slides.html`、`Unit_08/gestalt-lawsofux.html`、`Unit_09/slides.html`、`Unit_09/usability-heuristics.html`、`Unit_11/slides.html` — 同上

### 3. Unit 11 教材樣式與其他單元不一致
**狀態：** 已修復
**問題：** Unit 11 的簡報與講義用的是另一套設計系統，色票、結構 class 與元件命名都跟 Unit 03–10 不同，從首頁點進去風格明顯斷裂。講義另有結構缺漏，`validate.py` 報三個錯。
**原因：** Unit 11 教材由另一個工作階段獨立建置，沒有沿用 `unit-materials` skill 的對標規則。簡報用 `--paper`／`--ink`／`--ios`／`--android` 等自訂 token 與 `head`／`unit`／`num`／`body`／`foot` 的 class 命名；講義缺 `side-nav`、`refs`，且 `sec-num` 寫成「01 · Context」，數字在後面的文字之前，不符合驗證腳本的格式。
**佐證：**
```
$ python3 .claude/skills/unit-materials/validate.py Unit_11
✗ article.html：sec-num 有 0 個，section id 有 10 個
✗ article.html：找不到 side-nav
✗ article.html：找不到 toc

# validate.py 第 142 行的正則
nums = re.findall(r'<p class="sec-num">[^<\d]*(\d+)\s*</p>', src)
→ 容許數字「前面」有標籤（Unit_03 的「SECTION 01」），不容許後面還有字
```
**修正：** 簡報換皮——色票整組換成標準色（與 Unit_10 逐項比對一致），平台區分改用 iOS→`--accent`、Android→`--accent2`；結構 class 對齊 `slide-head`／`unit-pill`／`slide-num`／`slide-body`／`slide-foot`，頁尾第二個標語欄改成圓點導航，深色頁的圓點與翻頁按鈕自動反白。固定 1920×1080 畫布、`localStorage` 記憶頁碼、分頁標題跟著投影片變這三項是本單元特有且堪用，予以保留；手機模型、Safe Area、觸控目標等平台示意圖只換色票，比例未動。
講義換成 Unit_08 的標準 CSS，補上 `side-nav`、`refs`、`sec-title`、表格的 `tbl-wrap` 與標準 JS。節號由「01 · Context」調整為「Context · 01」——字詞未增減，僅調換順序以符合標準的「標籤在前、數字在後」，同時讓正則解析得到。改版前後做過可見文字逐段 diff，34 處差異全部是新增的導覽 chrome 與節號順序，**教學內文未更動**。
**影響範圍：**
- `Unit_11/slides.html` — `:root` 色票、結構 class、頁首頁尾、圓點導航 JS
- `Unit_11/article.html` — CSS 全換、side-nav／refs／sec-title／tbl-wrap、標準 JS、節號順序

### 4. Unit_11/resources/常見標籤類型.md 與 sp-dp.md 內容完全重複
**狀態：** 已修復
**問題：** `Unit_11/resources/` 下兩份 `.md` 檔名不同，但內容一字不差，都是 Android SP／DP 單位的說明。依檔名判斷，`常見標籤類型.md` 原本應該放的是標籤類型的資料。
**原因：** 建立來源檔時複製貼上貼錯，兩個檔案都寫進了 SP／DP 的內容。
**佐證：**
```
$ md5 -q Unit_11/resources/sp-dp.md Unit_11/resources/常見標籤類型.md
（兩檔大小同為 1578 bytes，內容逐行比對一字不差，
  皆以「# **SP 與 DP 的差異**」開頭）
```
**修正：** 已由用戶於 2026-08-11 補上正確內容。現在是完整的 iOS 標籤規範：四種標籤類型（Large Title／Secondary／Body／Small Text）、SF Pro 的九列字級表（34／28／17／15／16／13／12／11pt 與對應粗細）、行高建議（字級的 1.2–1.4 倍）、邊距（上下 8–16pt、左右 16–20pt）與文字截斷原則。
```
$ md5 -q sp-dp.md 常見標籤類型.md
013c7983f794e3c9ee1a50cd9bd667ed
88e847363e1ca8331b07e421b7563d5a   → 已不相同（1578 vs 2368 bytes）
```
**待辦（不影響本筆狀態）：** 這份來源目前尚未被任何教材引用。查證後確認 `article.html` 與 `checklist.html` 命中的「SF Pro」是 CSS 字型堆疊而非內文；`slides.html` 只有一列 `17pt / 16sp` 的字級樣本，沒有完整字級表。若要讓這份來源真正發揮作用，適合放進講義 §8「文字與表單」與簡報第 15 張「文字系統需要回應縮放」。
**影響範圍：**
- `Unit_11/resources/常見標籤類型.md` — 內容已更新為 iOS 標籤規範（查證位置：全文與 md5 比對）

---

## 2026-08-13

### 1. Unit_11 Safe Area 一節缺少具體機型尺寸與邊距數字
**狀態：** 已修復
**問題：** `article.html` 第 4 節（Canvas）文字提到「教材中的裝置表」，但實際上沒有對應表格；第 5 節（Safe Area）只有原則說明，沒有任何 pt 數字，`slides.html` 對應投影片與 `checklist.html` 安全區域檢查項同樣缺數字依據。
**原因：** 建置時只把 `resources/App 設計.pdf` 的文字原則轉寫進教材，沒有把 PDF 裡的機型尺寸表與安全區邊距數字（頁 3–4）一併帶入。
**佐證：**
```
$ grep -n "375\|393\|852\|iPhone SE\|Pro Max\|裝置表" Unit_11/article.html
655: 裝置型號與尺寸會持續更新。教材中的裝置表可以協助理解倍率與畫布差異...
（無其他命中 — 說明文字引用的表格不存在）

$ pdftotext -layout "Unit_11/resources/App 設計.pdf" - | sed -n '80,230p'
（機型尺寸表：iPhone 17 Pro Max 440×956pt 至 iPhone SE 375×667pt 共 9 款；
  安全區邊距：頂部 47pt–59pt、底部 34pt（Home Indicator）、左右 16pt）
```
**修正：** 於 `article.html` 第 4 節補上 9 款 iPhone 機型的邏輯尺寸（pt）／物理像素（px）／倍率表；第 5 節補上安全區邊距表（頂部 47–59pt、底部 34pt、左右 16pt）與用法提醒（起始參考值，非固定答案，實際仍以 Figma 裝置框架自動產生的 Safe Area 為準）。`slides.html` 的 Safe Area 投影片清單同步加上三個邊距數字；`checklist.html` 安全區域檢查項的說明文字加入同一組邊距作為檢查依據。`參考資料` 區塊的來源說明同步標注 App 設計.pdf 對應第 4、5 節。已跑 `validate.py Unit_11` 全部通過（投影片 22 張、講義 10 節，數字未變動）。
**影響範圍：**
- `Unit_11/article.html` — 第 4 節新增機型尺寸表、第 5 節新增安全區邊距表與 callout、參考資料來源標注
- `Unit_11/slides.html` — Safe Area 投影片（08）plain-list 加入邊距數字
- `Unit_11/checklist.html` — 安全區域第 1 項 cl-why 加入邊距數字

### 2. Unit_11 參考資料連結多為空連結或引用未在地化版本，且雙平台對照資料未收錄
**狀態：** 已修復
**問題：** `article.html`「參考資料」清單只有 6 個連結，且部分連結（Apple Design Resources、Android Mobile UI）指向未在地化版本；使用者後續補上 `resources/參考資料.md` 與 Notion 匯出的 `resources/參考資料html/`（含 3 個子頁面），裡面有真實網址（中文版 HIG、Figma @apple、Roboto、Stark、Mobbin 等）與教材完全沒收錄的內容：Android 字級表、圖示密度輸出換算表、iOS／Android 雙平台規範對照大表。
**原因：** 前一版建置只讀了 `App 設計.pdf`，沒有比對使用者後續才提供的 Notion 匯出來源；`App 設計.pdf` 本身也沒有 Android 字級數字與雙平台按鈕/導覽對照。
**佐證：**
```
$ python3 -c "... 解析 'App 設計Plus + (1)....html' 的 <a href> ..."
→ 取得 14 組先前缺失或非在地化的真實網址（中文 HIG、Figma @apple、
  Roboto 字體、Material Theme Builder、Stark、Mobbin 等）

$ 解析子頁「iOS 和 Android 文字大小規範」「iOS 與 Android 設計規範比較」
  「px、pt、ppi、dpi、dp、sp 名詞解釋」
→ Android 字級表（Display 34sp ~ Overline 10sp）、
  24dp 圖示在 5 種密度的輸出尺寸（24/36/48/72/96px）、
  橫跨單位/字體/按鈕/版面/導覽的雙平台對照表，均未見於既有教材
```
**修正：** `article.html` 第 3 節補上 Android 圖示密度輸出換算表；第 8 節補上 Android 字級表（與既有 iOS 表並列）與可讀性下限提醒；新增第 11 節「iOS 與 Android 規範對照總表」（單位、字體、按鈕、版面、導覽五張對照表），side-nav 與 TOC 同步加入；「參考資料」清單改用在地化網址並新增 9 個先前缺失的連結，來源標注同步更新。`slides.html` 的 Resources 投影片加入 Mobbin 連結並把講義連結指到新的第 11 節；`checklist.html` 頁尾導覽加入第 11 節連結。已跑 `validate.py Unit_11` 全部通過（講義 10 節 → 11 節，投影片仍 22 張不變）。
**影響範圍：**
- `Unit_11/article.html` — 第 3、8 節新增表格、新增第 11 節、side-nav／TOC、參考資料清單
- `Unit_11/slides.html` — Resources 投影片（22）新增連結與講義錨點
- `Unit_11/checklist.html` — 頁尾導覽新增第 11 節連結

### 3. Unit_11 Safe Area／觸控／Tab Bar 缺少示意圖，CSS 手繪的舊圖也不含左右邊距與 Tab Bar 數字
**狀態：** 已修復
**問題：** 第 5 節原本用 CSS 手刻的 `.phone-demo` 只標了 TOP/BOTTOM SAFE AREA 兩個文字色塊，沒有 pt 數字、沒有左右邊距；第 6 節 Tab Bar 完全沒有高度／安全區疊加的視覺說明；第 7 節觸控目標只有文字敘述，沒有「圖示 24pt vs 熱區 44pt」的尺寸對照圖。使用者指出 Codex 沒辦法畫 Figma（headless 環境），示意圖需要由這邊直接建。
**原因：** 前幾版建置只顧補齊文字與表格數字，沒有依 `unit-materials` skill「需要新做的示意圖，去 Figma 做完匯出成圖檔」的規則補視覺化。
**佐證：**
```
$ grep -n "phone-demo\|fake-line\|fake-card" article.html
→ 只有 CSS 定義與一處引用，圖上無 pt 數字、無左右邊距
$ grep -n "Tab Bar" article.html （改動前）
→ 第 6 節完全沒有 49pt／83pt 相關文字或圖
```
**修正：** 用 Figma MCP（`use_figma`，已載入 figma-use skill）在團隊 Ateam 下新建檔案 `Unit 11 · iOS Safe Area 與規範示意板`（file key `LU76FDo4H2sNFsOO8KQuJI`），畫了 3 張卡片：①Safe Area（頂部 47–59pt／底部 34pt／左右 16pt，含圖例）②觸控目標（24pt 圖示 vs 44×44pt 熱區＋4 列規格表）③Tab Bar（49pt＋34pt＝83pt 剖面圖＋5 列規格表）。截圖匯出為 PNG 存入 `resources/`，嵌入講義：第 5 節取代舊的 `.phone-demo` CSS 手繪圖（連同 `.phone-demo`／`.phone-head`／`.phone-content`／`.fake-line`／`.fake-card`／`.safe` 這幾條沒用到的 CSS 一併刪除）；第 6 節新增「Tab Bar 的高度與安全區疊加」小節（此前教材完全沒有 Tab Bar pt 數字，數字取自 `resources/App 設計.pdf` 與 `參考資料html/`）；第 7 節在觸控說明段落後插入對照圖。參考資料來源清單同步標注三個圖檔路徑。已跑 `validate.py Unit_11` 全部通過（講義維持 11 節、投影片 22 張）。
**影響範圍：**
- `Unit_11/article.html` — 第 5、6、7 節插入 `<figure class="fig">` 圖片、第 6 節新增小節、刪除未使用的 `.phone-demo` 相關 CSS、參考資料來源標注
- `Unit_11/resources/safe-area-diagram.png`（新增）
- `Unit_11/resources/touch-target-diagram.png`（新增）
- `Unit_11/resources/tabbar-spec-diagram.png`（新增）
- Figma 檔案（外部）：`https://www.figma.com/design/LU76FDo4H2sNFsOO8KQuJI` — 團隊 Ateam，供後續調整示意板使用

### 4. Unit_11 三張 Figma 示意圖比例不準，Tab Bar 卡片還漏掉一列
**狀態：** 已修復
**問題：** 用戶指出示意圖要「符合真實尺寸，不是只做示意」。檢查後發現：①Safe Area 手機外框用了 220×640px，長寬比 2.91:1，跟真實 iPhone 393:852pt（2.17:1）對不上；頂部色塊 56px、底部 40px、左右邊距 16px 都是隨手抓的裝飾尺寸，沒有按同一比例換算。②Tab Bar 剖面圖用 1pt=5px 畫 49pt 列高（245px）與 34pt 安全區（170px），比其他兩張圖的比例完全不同，且卡片高度被寫死在 820px，內容溢出後第 5 列「標籤數量 2–5 個」被靜默裁掉，畫面上只看得到 4 列。
**原因：** 前一版建圖時把「示意」理解成「畫個像手機的形狀＋貼數字標籤」，沒有真的按 pt 數字換算成一致的比例尺；卡片又用 `resize()` 寫死高度，超出內容被 `clipsContent` 預設值悄悄裁掉，畫完沒有逐列核對截圖內容。
**佐證：**
```
原設計：phone 220×640（長寬比 2.91），頂部 56px／底部 40px／邊距 16px（無比例依據）
真實比例：393:852pt = 2.17；若外框高 640px，寬應為 640×393/852 ≈ 295px，
  頂部 59pt 應為 640×59/852 ≈ 44px，底部 34pt 應為 640×34/852 ≈ 26px，
  左右 16pt 應為 295×16/393 ≈ 12px — 原設計的寬度與各邊距都偏離真實比例

Tab Bar 卡片 card.resize(520, 820) 固定高度；table 5 列實際需要
 header~100 + diagram~505 + table~225 ≈ 830px，超出 820px 被裁掉最後一列
```
**修正：** 統一改用 0.72 px/pt 的比例尺，以講義既定的「主流開發基準 393×852pt（iPhone 16/15 Pro）」換算：手機外框 299×629px（螢幕 283×613）、頂部安全邊距 59pt→42px（取 Dynamic Island 機型上限，圖說註明瀏海機型較淺約 47pt）、底部 34pt→24px、左右 16pt→12px；Tab Bar 剖面圖沿用同一比例，列高 49pt→35px、安全區 34pt→24px（與 Safe Area 圖的底部色塊數字一致，兩張圖可互相對照）。三張卡片改成 `primaryAxisSizingMode='AUTO'`（依內容自動撐高），不再寫死高度，避免再次靜默裁切。改完逐張截圖核對（Tab Bar 卡片確認 5 列都完整顯示），重新匯出 PNG 覆蓋 `resources/` 內三個檔案，講義第 5 節的圖說文字同步註明比例尺與所取數值（59pt 而非模糊的「47–59pt」）。已跑 `validate.py Unit_11` 全部通過。
**影響範圍：**
- Figma 檔案 `LU76FDo4H2sNFsOO8KQuJI`：3 張卡片內容全部重建
- `Unit_11/resources/safe-area-diagram.png`（覆蓋）
- `Unit_11/resources/touch-target-diagram.png`（覆蓋，僅調整卡片高度模式，圖案本身原本比例已正確）
- `Unit_11/resources/tabbar-spec-diagram.png`（覆蓋）
- `Unit_11/article.html` — 第 5 節圖片 alt／figcaption 文字更新，說明比例尺與 59pt 取值依據

### 5. Unit_11 第 2 節缺少「設計指南 vs. 上架規範」的業界實務框架
**狀態：** 已修復
**問題：** 第 2 節只比較 iOS／Android 的元件與導覽差異，沒有講「HIG／Material 是建議還是規定」「哪些可以自訂、哪些幾乎不能碰」，學生容易誤以為所有畫面都要照著官方指南畫。使用者提供一段業界實務討論（涵蓋遵守程度分級、70% 平台習慣＋30% 品牌的三層 Design System、HIG 與上架審查規範的差異、優先順序），要求整理進教材。
**原因：** 原教材內容全部溯源自 `resources/App 設計.pdf` 與相關參考資料，這些來源只講「怎麼做」，沒有講「做到什麼程度算合格、哪些是法規等級的硬性要求」這個實務判斷角度。
**修正：** 於 `article.html` 第 2 節新增三個小節：①遵守程度表（視覺風格「不一定」到 Permission／Privacy／上架政策「必須」的 11 項分級）②70% 平台習慣＋30% 品牌的三層 Design System（Brand Layer／Product Component／Platform Behavior）③HIG／Material 不等於上架審查規範，附優先順序清單。內容依課程口吻改寫，原文的 ASCII 樹狀圖改成表格；`.refs` 標明此段落整理自業界實務討論、非官方文件逐條引用。`slides.html` 在投影片 04 後插入新的第 05 張「設計指南是建議，上架政策是規定」，後續投影片 `data-screen-label` 全部順移 +1（06→23），已用 Python 腳本以精確字串比對重新編號，避免正則誤傷。跑過 `validate.py Unit_11` 全部通過（講義維持 11 節、投影片 22→23 張）。
**影響範圍：**
- `Unit_11/article.html` — 第 2 節新增三個小節、參考資料來源標注
- `Unit_11/slides.html` — 新增投影片 05，後續 18 張投影片 `data-screen-label` 重新編號

### 6. Unit_11 補上單位對應圖與 Dynamic Type 名詞彈窗
**狀態：** 已修復
**問題：** ①「px、pt、ppi、dpi、dp、sp 名詞解釋」子頁裡的 Figma 單位對應表與 SP 縮放試算範例還沒用進教材。②講義與簡報裡出現 7 處「Dynamic Type」，都只是提到名詞，沒有解釋是什麼，學生得自己查。
**修正：**
1. 在 Figma 同一檔案（`LU76FDo4H2sNFsOO8KQuJI`）新增第 4 張卡片「單位對應表」，含 px/pt/dp/sp/dpi 五列對應說明與「16sp × 1.2 = 19.2px」試算範例，匯出為 `resources/unit-mapping-diagram.png`，嵌入講義第 3 節。參考資料清單補上 Pixels to DP/Sp Converter 外掛（來源只給名稱沒給網址，已在條目中註明要自行至 Figma 社群搜尋確認）。同時記錄該子頁列的裝置畫布尺寸與 `App 設計.pdf` 對不上（iPhone 14 Pro 兩份寫法不同），故未採用。
2. 新增可點擊的「Dynamic Type」名詞按鈕（`.term-btn`）與彈窗（`.term-modal-overlay`），點擊後彈出說明（語意樣式、`UIFontMetrics`、寫死字級等於關閉 Dynamic Type）。講義 5 處、簡報 2 處全部改成按鈕觸發彈窗；彈窗本身文字保持純文字，避免遞迴變成按鈕（第一次全域字串取代時誤把彈窗自己的標題與內文也換成按鈕，已修正為只轉換內文引用處）。簡報版另外在既有的鍵盤導覽 handler 加了守門：彈窗開啟時方向鍵／空白鍵不會繼續翻頁，只有 Esc 或點背景可關閉。
**影響範圍：**
- Figma 檔案 `LU76FDo4H2sNFsOO8KQuJI` — 新增第 4 張卡片
- `Unit_11/resources/unit-mapping-diagram.png`（新增）
- `Unit_11/article.html` — 第 3 節新增小節與圖片、參考資料清單、新增 term-modal CSS／HTML／JS、5 處 Dynamic Type 改按鈕
- `Unit_11/slides.html` — 新增 term-modal CSS／HTML／JS、鍵盤導覽加彈窗守門、2 處 Dynamic Type 改按鈕

### 7. Unit_11 業界實務內容拆成獨立頁、Dynamic Type 彈窗補正確資訊、Figma 連結補齊、簡報樣式對標
**狀態：** 已修復
**問題：** ①第 2 節塞了三個小節後偏長，使用者要求另開一頁放完整版，且要補上原本沒收錄的「平台行為要拆到多細」（iOS Navigation/Modal/Picker/Permission vs Android Navigation/Bottom Sheet/Back Behavior/Permission）與「Figma Design System 資料夾建議」兩塊。②Dynamic Type 彈窗內容不夠準確，使用者補充：iOS 7（2013）推出、三個好處（自動配合／視覺無障礙／保持排版）、開發者用語意樣式 .body/.title＋Auto Layout。③之前做的 Figma 示意板連結沒有放進講義、簡報、首頁。④新增的投影片 05 用了 `.plain-list` 條列，跟同類比較投影片（04、07、12 等）慣用的單段落 `.panel p` 風格不一致。
**修正：**
1. 新增 `Unit_11/guideline-vs-policy.html`（沿用標準版型），含 5 節：遵守程度表、70/30 Design System、平台行為拆解（新內容）、HIG vs 上架規範、Figma 資料夾建議（新內容）。第 2 節改成一段濃縮摘要＋連到新頁的 callout，`.refs` 同步更新出處。
2. 講義與簡報的 Dynamic Type 彈窗內容改寫為三段：推出時間與調整入口、三個好處、開發者實作方式（語意樣式＋Auto Layout），拿掉不夠貼近設計學生的 `UIFontMetrics` 技術詞。
3. Figma 示意板連結（`https://www.figma.com/design/LU76FDo4H2sNFsOO8KQuJI`）補進：`index.html` Unit 11 卡片新增第 4 個按鈕；講義 4 張圖的 figcaption 各自加上對應 node-id 深連結；講義參考資料清單與簡報 Resources 投影片各加一條全檔連結。
4. 投影片 05 的兩個 `.panel` 從 `.plain-list` 條列改成單段落 `<p>`，對齊 04、07、12 等既有比較型投影片的視覺語言。
跑過 `validate.py Unit_11` 全綠（講義 11 節、投影片 23 張不變），`guideline-vs-policy.html` 通過 skill 內建 HTML parser 檢查（無未閉合標籤、無重複 id）。App Store／Google Play 官方連結用 curl 驗證過是有效頁面（分別檢查標題確認內容相符，非隨意猜測網址）。
**影響範圍：**
- `Unit_11/guideline-vs-policy.html`（新增）
- `Unit_11/article.html` — 第 2 節精簡＋連結、4 張圖 figcaption 加 Figma 深連結、Dynamic Type 彈窗內容改寫、參考資料清單更新
- `Unit_11/slides.html` — 投影片 05 改回單段落樣式、Dynamic Type 彈窗內容改寫、Resources 投影片新增 2 條連結
- `Unit_11/README.md` — 教材入口新增 2 條
- `index.html` — Unit 11 卡片新增 Figma 連結按鈕

### 8. Unit_11 簡報第 10 頁觸控目標標籤文字跟框線重疊
**狀態：** 已修復
**問題：** 第 10 頁「視覺圖示可以小，觸控範圍需要足夠大」的兩個觸控目標方框，下方標籤文字（「iOS：44 × 44 pt 建議控制尺寸」）跟方框的虛線邊框重疊，看起來像被劃掉一樣。
**原因：** `.target strong { position: absolute; bottom: -50px; ... }` 用固定負值把標籤釘在方框下方 50px 處，這個距離只夠容納一行文字。實際標籤文字在 290px 寬度、24px 字級下會換成兩行，兩行文字的總高度超過 50px，導致文字區塊往上溢出、疊到方框底邊。
**佐證：**
```
用 headless Chrome 把 slides.html 複製一份、強制 JS 的 current = 9（第 10 頁）
後截圖，畫面清楚顯示「iOS：44 × 44 pt 建議控制」那一行文字壓在方框底邊虛線上。
```
**修正：** 把 `.target strong` 的定位從 `bottom: -50px`（固定負值，只適用單行文字）改成 `top: 100%; margin-top: 18px;`（相對方框底部往下推固定間距，不管文字換成幾行都會自動避開方框），並補上 `line-height: 1.35` 讓兩行文字間距一致。改完用同樣的 headless Chrome 流程重新截圖確認文字完全落在方框下方、不再重疊。跑過 `validate.py Unit_11` 全綠。
**影響範圍：**
- `Unit_11/slides.html` — `.target strong` CSS 定位方式

### 9. Unit_11 簡報字體與字級跟 Unit 9/10 不一致
**狀態：** 已修復
**問題：** 使用者指出簡報文字大小、左上角 unit-pill 的樣式風格都要跟 Unit 9/10 一樣。查證後發現不只是字級數字不同，是兩套底層架構：Unit 9/10 用響應式版面（`#deck{width:100%;height:100vh}`、字級用 `clamp()`、字體 Inter），Unit 11 用固定 1920×1080 畫布＋JS 縮放（`fitDeck()`）、字級寫死 px、字體 `"Avenir Next"` 且沒載入 Google Fonts（非 Mac 裝置會直接 fallback 成系統字體）。
**原因：** `future/maintain.md` 舊紀錄顯示 Unit 11 改版時「已經跟用戶確認過維持固定畫布，不改響應式」，當時只對過色票，沒對過字體與字級。
**佐證：**
```
Unit 10: .unit-pill{font-size:11px} .slide-num{12px} .course-label{11px}
         .cover-eyebrow{12px} h1(clamp max)=56.8px cover-title(clamp max)=80px
         .blist li(clamp max)=17.28px .stat b(clamp max)=52.8px
Unit 11（改前）: .unit-pill{16px} .slide-num{16px} .course-label{15px}
         .cover-eyebrow{22px} h1=76px .plain-list li=27px .panel p=25px .metric b=46px
→ 小型 UI 文字（pill/label/eyebrow/內文）比 Unit 10 大 35–80%；
  大標題級（h1/h2）本來就跟 Unit 10 的 clamp() 上限很接近，不需要大改
```
**修正：** 這次選擇「只換字體＋依 Unit 10 的 clamp() 上限調整字級比例，保留固定 1920×1080 畫布」（用戶明確選這個做法，不做整套響應式重建，避免手機示意圖、Safe Area 等平台示意圖比例又跑掉）。載入 Google Fonts Inter 並把 `font-family` 換成與 Unit 10 相同的 `'Inter', -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang TC", sans-serif`；22 條字級規則依 Unit 10 對應角色調整（pill/slide-num/course-label/cover-eyebrow/comparison th 等小型 UI 文字降到 11–17px、cover-sub 與 panel/plain-list 等內文降到 17–20px、metric b 大數字反而從 46px 提高到 53px 對齊 Unit 10 的 `.stat b` 上限），headline 級的 h1/h2 只做小幅微調。手機模擬畫面內部文字（status/appbar/tab 等）與示意圖裝飾文字不動，避免牽動版面比例。改完用 headless Chrome 對第 1、10、16 頁截圖比對，確認 pill／eyebrow／內文都變小、標題仍維持大字重、換行與間距正常。跑過 `validate.py Unit_11` 全綠。
**已知限制：** 只調了字級數字，沒有連動調整每張投影片的 margin/padding（例如 `.cover-eyebrow` 原本搭配大字級設計的間距）；文字變小後部分投影片可能留白略多，屬於已知取捨，之後如需要可以再個別微調版面間距。
**影響範圍：**
- `Unit_11/slides.html` — `<head>` 補 Google Fonts Inter 連結、`font-family` 換成 Inter、22 條字級規則調整

---

## 2026-08-29

### 10. Unit_07 全文殘留舊編號（自我指稱與跨單元引用都停留在改版前的編號）
**狀態：** 已修復
**問題：** 用戶要求「每個課程有設計範例、練習、作業」，盤點 Unit_07（風格發想與建立）時要新建 `exercises.html`，過程中發現整份單元的自我指稱寫成「Unit 08」（`<title>`、`.unit-pill`、`course-label` 等，slides.html 30 處、article.html 4 處、gestalt-lawsofux.html 23 處），跨單元引用也全部停在改版前的編號：把 Wireframe 講成「Unit 07」（應為新編號 Unit 04）、把 Persona／競品分析／旅程地圖講成「Unit 03」「Unit 04」（應為合併後的 Unit 02）、把多斷點版面講成「Unit 09」（應為 Unit 11），還有一個死連結 `../Unit_06/article.html`（Unit_06 資料夾現在是空的，內容已併入 Unit_04）。
**原因：** `docs/changelog/tsinghua-course-migration.md` 記錄「2026-08-14 Unit 資料夾依清大 12 場課綱重新編號」時，這個單元的內容是直接從舊 `Unit_08`（風格發想／gestalt）資料夾整批搬進新的 `Unit_07`，只搬了檔案位置，沒有同步更新檔案內文裡的編號——同一份 log 也承認「Unit_08 的 exercises.html 裡仍有幾處提到舊單元編號，屬全課程重編號後留下的殘留，未逐一校對」，只是那次沒發現 Unit_07（風格發想）這邊也有一樣的殘留範圍更大。
**佐證：**
```
git blame -L 1130,1135 Unit_07/article.html
→ 27db89a6 (2026-08-14 重新編號 commit) 就已經寫著「Unit 07 其中一張 Wireframe」
  代表遷移當下就沒有把舊編號換成新編號，不是後續哪次編輯改壞的
docs/changelog/tsinghua-course-migration.md:39-52 的新舊編號對照表：
  舊 Unit_08（風格發想/gestalt）→ 新 07（本單元）
  舊 Unit_02+03+04（訪談/競品分析/旅程地圖）→ 新 02
  舊 05+06（IA/Flowchart→Wireframe）→ 新 04
  舊 Unit_09（Web 設計規範）→ 參考資料併入新 11
```
**修正：**
- `Unit 08` 自我指稱 → `Unit 07`（slides.html、article.html、gestalt-lawsofux.html，`sed` 全文取代，確認每處都只出現在 `unit-pill`／`<title>` 這類自我標籤，沒有誤傷真正指向其他單元的文字）
- 「Unit 07／Unit 08 的 Wireframe」（舊指稱）→「Unit 04」
- 「Unit 03 競品分析／Persona」「Unit 04 旅程地圖」（舊指稱）→「Unit 02」
- 「Unit 09 排多斷點版面」（舊指稱）→「Unit 11」
- `../Unit_06/article.html` 死連結 → `../Unit_04/from-flowchart-wireframe/article.html`
- `Unit_07/README.md` 標題「單元 8：風格發想與建立」→「單元 7：風格發想與建立」
- 修完跑 Codex 複審一輪，確認沒有漏改或改錯的編號殘留
**影響範圍：**
- `Unit_07/slides.html`、`article.html`、`gestalt-lawsofux.html`、`README.md`

---

## 2026-09-02

### 1. Unit_01 簡報課程大綱「第 3 小時」內容與教材脫節
**狀態：** 已修復
**問題：** Slide 3 課程大綱卡片「第 3 小時」文字仍寫「課後作業練習 (Homework)｜探討 AI 輔助設計的可能性」，但單元已新增獨立講義 `design-thinking.html`（設計思考：雙鑽石模型、五階段、Crazy 8s 等），這張卡片內容跟教材脫節，agenda 看不出第三小時實際在上設計思考。
**原因：** `design-thinking.html` 是後來才建的獨立講義，加進 `slides.html` 時只在 agenda 下方補了 `.ext-link` 連結，沒有回頭更新原本「第 3 小時」卡片本身的文字。
**佐證：**
```
grep -n "sec-title" Unit_01/design-thinking.html
→ 什麼是設計思考？／核心模型：雙鑽石模型／設計思考五階段／
  Crazy 8s 發想工具／當 AI 走進設計思考／團體討論的規則／
  四階段 AI 提示詞／核心口訣
對照 Unit_01/slides.html Slide 3 原文：
  第 3 小時「課後作業練習 (Homework)」「探討 AI 輔助設計的可能性」
  → 與講義實際內容完全對不上
```
**修正：** 依用戶指示「課程大綱 第三小時 改為設計思考」，把 `.a-time`／`.a-desc` 改成「設計思考 / Design Thinking」與「雙鑽石模型與五階段（同理、定義、發想、原型、測試），搭配 AI 在各階段的協作方式」，跟下方既有的 `design-thinking.html` 連結內容對齊。改完起本機 http server，用 Chrome 自動化截圖確認畫面顯示正確。
**影響範圍：**
- `Unit_01/slides.html` — Slide 3「第 3 小時」agenda-card 文字

---

## 2026-11-17

### 1. Unit 09 簡報 localStorage key 誤用 unit11
**狀態：** 已修復
**問題：** `Unit_09/slides.html` 的 `storageKey` 是 `'unit11-slide-index'`，跟 Unit 11 簡報共用記憶頁碼，開 Unit 09 會跳到 Unit 11 上次看到的頁數。
**原因：** 簡報是從舊「APP UI 設計規範」（舊 Unit 11）搬過來，key 沒跟著改。
**佐證：** `grep -n "unit11-slide-index" Unit_09/slides.html` → 736 行。
**修正：** 改為 `'unit09-slide-index'`。
**影響範圍：**
- `Unit_09/slides.html` — storageKey
