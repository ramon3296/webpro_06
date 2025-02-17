"use strict";
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // index.html などを配信
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // アップロードファイルを配信

// コメントの管理
let comments = [];
let nextCommentId = 1;

// 画像の管理（アップロードされた画像情報）
let images = [];
let nextImageId = 1;

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

// 【画像アップロード】POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "ファイルが選択されていません" });
    }
    // 画像の場合は画像情報を保存する
    if (req.file.mimetype.startsWith('image/')) {
        const newImage = {
            id: nextImageId++,
            filename: req.file.filename,        // multer が生成したファイル名
            originalName: req.file.originalname,  // 元のファイル名
            likes: 0
        };
        images.push(newImage);
    }
    res.json({ message: `アップロード成功: ${req.file.originalname}` });
});

// 【全画像取得】GET /images
app.get('/images', (req, res) => {
    res.json(images);
});

// 【画像にいいね】POST /image/like
app.post('/image/like', (req, res) => {
    const { id } = req.body;
    const image = images.find(img => img.id === parseInt(id));
    if (!image) {
        return res.status(404).json({ error: "画像が見つかりません" });
    }
    image.likes++;
    res.json({ message: "画像にいいね", image });
});

app.listen(port, () => {
    console.log(`🚀 サーバー起動: http://localhost:${port}`);
});
