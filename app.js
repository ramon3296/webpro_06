"use strict";

// 必要なモジュールをインポート
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// JSON形式のリクエストを処理するミドルウェア
app.use(bodyParser.json());

// 各機能のルートをインポート
const jankenRoutes = require("./routes/janken");
const bmiRoutes = require("./routes/bmi");
const weekdayRoutes = require("./routes/weekday");

// ルートを適用
app.use("/api/janken", jankenRoutes);  // じゃんけん機能
app.use("/api/bmi", bmiRoutes);        // BMI計算機能
app.use("/api/weekday", weekdayRoutes); // 曜日計算機能

// サーバーを起動
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
