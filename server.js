"use strict";

// 必要な機能を読み込み
const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// 💡 ミドルウェア設定: JSONなどを受け取れるようにする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 💬 コメントを受け取る場所
app.post('/comment', (req, res) => {
  console.log('💬 コメント:', req.body);
  res.status(200).send({ message: 'コメントを受け付けました！' });
});

// 👍 いいねを受け取る場所
app.post('/like', (req, res) => {
  console.log('👍 いいね:', req.body);
  res.status(200).send({ message: '「いいね！」を受け付けました！' });
});

// 📂 ファイルを受け取る場所
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('📂 ファイル:', req.file);
  res.status(200).send({ message: 'ファイルを受け付けました！' });
});

// 🚀 確認用のページ
app.get('/', (req, res) => {
  res.send('🚀 APIサーバーが動いてます！');
});

// サーバー起動！
app.listen(port, () => {
  console.log(`🚀 サーバー起動: http://localhost:${port}`);
});
