"use strict";

const express = require("express");
const router = express.Router();

// 投稿のピン留めデータ
let pinnedPosts = new Set();

// 投稿をピン留めするAPI
router.post("/pin", (req, res) => {
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).json({ error: "postId is required" });
    }
    pinnedPosts.add(postId);
    res.json({ pinnedPosts: Array.from(pinnedPosts) });
});

// ピン留めされた投稿を取得
router.get("/pin", (req, res) => {
    res.json({ pinnedPosts: Array.from(pinnedPosts) });
});

module.exports = router;
