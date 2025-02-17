"use strict";
const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(express.json());

// 簡易データ保存用
let likes = {};  // {postId: likeCount}
let comments = {};  // {postId: [comments]}

// 📌 いいね機能
app.post('/like', (req, res) => {
    const { postId } = req.body;
    if (!likes[postId]) likes[postId] = 0;
    likes[postId]++;
    res.json({ postId, likes: likes[postId] });
});

// 📌 コメント機能
app.post('/comment', (req, res) => {
    const { postId, comment } = req.body;
    if (!comments[postId]) comments[postId] = [];
    comments[postId].push(comment);
    res.json({ postId, comments: comments[postId] });
});

// 📌 ファイルアップロード機能
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'ファイルがアップロードされました', filename: req.file.filename });
});

app.listen(port, () => {
    console.log(`BBS Server is running at http://localhost:${port}`);
});
