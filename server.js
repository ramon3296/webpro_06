"use strict";
const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(express.json());

// 簡易メモリ保存
let likes = 0;
let comments = [];
const upload = multer({ dest: 'uploads/' });

// 📌 いいね機能
app.post('/like', (req, res) => {
    likes++;
    res.json({ message: "いいねが増えました", likes });
});

// 📌 コメント機能
app.post('/comment', (req, res) => {
    const { comment } = req.body;
    comments.push(comment);
    res.json({ message: "コメント追加", comments });
});

// 📌 ファイルアップロード機能
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: `アップロード成功: ${req.file.originalname}` });
});

// サーバー起動
app.listen(port, () => {
    console.log(`🚀 サーバー起動: http://localhost:${port}`);
});
