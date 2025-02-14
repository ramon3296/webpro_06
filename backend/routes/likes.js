"use strict";

const express = require("express");
const router = express.Router();

// いいねカウントを保存する仮のデータ
let likes = {};

// いいねを増やすAPI
router.post("/like", (req, res) => {
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).json({ error: "postId is required" });
    }
    likes[postId] = (likes[postId] || 0) + 1;
    res.json({ postId, likes: likes[postId] });
});

// いいねの数を取得
router.get("/like/:postId", (req, res) => {
    const postId = req.params.postId;
    res.json({ postId, likes: likes[postId] || 0 });
});

module.exports = router;
