const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

// 既存機能
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

// 1. BMI計算機
app.get("/bmi", (req, res) => {
  const height = parseFloat(req.query.height) || 0;
  const weight = parseFloat(req.query.weight) || 0;
  let bmi = "入力が不正です";

  if (height > 0 && weight > 0) {
    bmi = (weight / ((height / 100) ** 2)).toFixed(2); // BMI計算
  }

  res.render('bmi', { height, weight, bmi });
});

// 2. 曜日計算機
app.get("/weekday", (req, res) => {
  const date = req.query.date;
  let weekday = "正しい日付を入力してください";

  if (date) {
    const day = new Date(date);
    if (!isNaN(day)) {
      const days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
      weekday = days[day.getUTCDay()];
    }
  }

  res.render('weekday', { date, weekday });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
