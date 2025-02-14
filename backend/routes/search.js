"use strict";

const express = require("express");
const router = express.Router();

// 仮の投稿データ
let posts = [
    { id: 1, content: "こんにちは、BBSへようこそ！" },
    { id: 2, content: "このBBSはシンプルだけど便利！" },
    { id: 3, content: "検索機能を追加しました！" }
];

// 投稿の検索API
router.post("/search", (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: "検索ワードが必要です" });
    }
    const results = posts.filter(post => post.content.includes(query));
    res.json({ query, results });
});

module.exports = router;
