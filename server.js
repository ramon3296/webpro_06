"use strict";
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // フォーム対応
app.use(express.static(path.join(__dirname)));   // index.htmlを公開

let likes = 0;
let comments = [];
const upload = multer({ dest: 'uploads/' });

// 📌 いいね機能（フォーム対応）
app.post('/like', (req, res) => {
    likes++;
    if (req.headers.accept.includes('html')) {
        res.send(`<h2>いいねが増えました: ${likes}</h2><a href="/">戻る</a>`);
    } else {
        res.json({ message: "いいねが増えました", likes });
    }
});

// 📌 コメント機能（フォーム対応）
app.post('/comment', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    if (req.headers.accept.includes('html')) {
        res.send(`<h2>コメント追加: ${comment}</h2><a href="/">戻る</a>`);
    } else {
        res.json({ message: "コメント追加", comments });
    }
});

// 📌 ファイルアップロード機能（フォーム対応）
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.headers.accept.includes('html')) {
        res.send(`<h2>アップロード成功: ${req.file.originalname}</h2><a href="/">戻る</a>`);
    } else {
        res.json({ message: `アップロード成功: ${req.file.originalname}` });
    }
});

// サーバー起動
app.listen(port, () => {
    console.log(`🚀 サーバー起動: http://localhost:${port}`);
});
