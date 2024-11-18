const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

// 既存の機能
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = num === 1 ? 'グー' : num === 2 ? 'チョキ' : 'パー';

  let judgement = '';
  if ((hand === 'グー' && cpu === 'チョキ') ||
      (hand === 'チョキ' && cpu === 'パー') ||
      (hand === 'パー' && cpu === 'グー')) {
    judgement = '勝ち';
    win++;
  } else if (hand === cpu) {
    judgement = 'あいこ';
  } else {
    judgement = '負け';
  }
  total++;

  res.render('janken', { your: hand, cpu, judgement, win, total });
});

// 新機能1: 日にちから曜日を計算
app.get("/weekday", (req, res) => {
  const dateInput = req.query.date; // "YYYY-MM-DD"形式
  if (dateInput) {
    const date = new Date(dateInput);
    const daysOfWeek = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    const day = daysOfWeek[date.getDay()];
    res.render('weekday', { date: dateInput, day });
  } else {
    res.render('weekday', { date: null, day: null });
  }
});

// 新機能2: BMIを計算
app.get("/bmi", (req, res) => {
  const weight = parseFloat(req.query.weight) || null;
  const height = parseFloat(req.query.height) || null; // cm単位
  let bmi = null;
  if (weight && height) {
    const heightInMeters = height / 100;
    bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  res.render('bmi', { weight, height, bmi });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
