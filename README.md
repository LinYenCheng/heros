## 相關連結

1. 專案使用 [Create React App](https://github.com/facebook/create-react-app)
2. 後端 [資料來源](https://github.com/hahow/hahow-recruit/blob/master/frontend.md)

## Scripts

可以執行:

### `npm start`

development mode<br>
用瀏覽器開啟 [http://localhost:3000](http://localhost:3000).

檔案有變更時會自動更新<br>
相關錯誤會顯示在 console 中

### `npm test`

開啟測試的 watch mode<br>
[更多資訊](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build`

建置及最佳化檔案至 `build` 資料夾<br>
會產生 bundles 並設定 React 在 production mode

### `npm run deploy`

完成後可以自行發布或是等待 Travis CI 進行自動發佈<br>
[更多資訊](https://facebook.github.io/create-react-app/docs/deployment)

## 專案架構

```bash

├── src/
│  ├── components/              # components 放置相關元件，單元測試檔案為 `元件名稱.test.js`
│  │  ├── HeroCard.js           # 英雄卡片
│  │  ├── HeroList.js           # 英雄列表
│  │  ├── HeroProfile.js        # 英雄資訊
│  │  ├── SkillChart.js         # 技能點數圖表
│  │  ├── SkillCounter.js       # 技能點數可調整計數器
│  │  └── Root.js               # 路由根目錄
│  ├── hooks/                   # hooks 相關
│  ├── middleware/              # 資料處理相關
│  ├── styles/                  # 樣式檔們
│  ├── index.js                 # 程式入口
│  ├── serviceWorker.js
│  └── setupTests.js            # 測試相關設定
├── .eslintrc                   # ESLint 設定檔
├── .prettierrc                 # prettierrc 工具設定
├── .travis.yml                 # 持續發佈工具
├── package-lock.json
├── package.json
└── README.md
```

### 第三方工具

- axios: 可以將非同步處理共用的邏輯抽出來共同實作
- classnames: 讓我們更方便的使用 JavaScript 去套入條件動態的操作 class
- gh-pages: 發佈到 github pages 的工具
- humps: 將收到的資料格式轉成駝峰式
- node-sass: 讓專案能夠使用 scss
- react-vis: 只用了一個雷達圖
- react-router: 處理前端路由
- sweetalert2: 負責跳提示用
- @testing-library/react, axios-mock-adapter, enzyme, enzyme-adapter-react-16, jest-enzyme 單元測試用的工具們，關於單元測試這個部分我還在摸索階段
- eslint-\*, lint-staged, husky, prettier: coding style 交給編輯器處理

### 註解的原則

- 自己不太熟可能又需要再查一次文件的地方，簡單提醒參數
- 暫時沒時間，但未來可改進的地方，可以加個 TODO:，裝完 TODO Highlight 之後會亮起來很好找
- 範例上本來就有的註解也不會拿掉

### 遇到的問題困難

- 頁面需求有限制能力值不能設定為負，但介面沒提示會讓使用者覺得奇怪，確認可以自由發揮後，用彈跳視窗及按鈕變化提示使用者
- 在打 patch 存檔 API 過後，不能讓使用者進行值的修改，因為這樣對於 UI 來說會有兩個資料來源，所以先把調整畫面隱藏，先確認修正的值正確或有回傳值後才可以繼續
- patch 那隻 API 無法只傳部分值，後來就全部值一起上傳
- 圖片是 http 因為 demo 頁在 github 所以有試看看 https 是否可以連，後來發現可以就取代連結字串中的 http 為 https
- 想讓畫面更酷炫一些，也希望能以第三方的角度來做網頁的修改與設計，所以與朋友討論後有加上雷達圖，讓技能數字圖像化
- Github Page 的路由因為伺服器的關係，所以改用 hash 的方式才能正常
- 單元測試目前還在摸索中，不太確定什麼該測什麼然後該怎麼測，透過部落格的搜尋閱讀，找出了一些工具可以去做，但目前還沒有下斷言，只有盡量先讓程式全部跑過一遍
- 做功課看了 Hahow 部落格後發現自己 commit 沒有固定的 convention，嘗試著加看看分類
  1. [feature] 新功能
  2. [fixed] 從 FIXME: 這個習慣的 highlight tag 來的，如果修好的可以用這個
  3. [config] 配置因為初始化或更新的改動
  4. [refactor] 重構
