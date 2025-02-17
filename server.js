"use strict";
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // index.htmlなどの静的ファイルを配信

// メモリ内にコメントを保持する仕組み
// 各コメントは { id, text, likes } の形式
let comments = [];
let nextCommentId = 1;

const upload = multer({ dest: 'uploads/' });

// 【コメント投稿】POST /comment
app.post('/comment', (req, res) => {
    const { comment } = req.body;
    if (!comment) {
        return res.status(400).json({ error: "コメントが空です" });
    }
    const newComment = {
        id: nextCommentId++,
        text: comment,
        likes: 0
    };
    comments.push(newComment);
    res.json({ message: "コメント追加", comment: newComment, allComments: comments });
});

// 【コメントにいいね】POST /comment/like
app.post('/comment/like', (req, res) => {
    const { id } = req.body;
    const comment = comments.find(c => c.id === parseInt(id));
    if (!comment) {
        return res.status(404).json({ error: "コメントが見つかりません" });
    }
    comment.likes++;
    res.json({ message: "コメントにいいね", comment });
});

// 【全コメント取得】GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// 【ファイルアップロード】POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "ファイルが選択されていません" });
    }
    res.json({ message: `アップロード成功: ${req.file.originalname}` });
});

app.listen(port, () => {
    console.log(`🚀 サーバー起動: http://localhost:${port}`);
});
