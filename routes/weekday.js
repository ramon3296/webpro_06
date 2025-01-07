"use strict";

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { date } = req.body;
    if (!date) {
        return res.status(400).json({ error: "日付を入力してください。" });
    }

    const dayOfWeek = new Date(date).toLocaleDateString("ja-JP", { weekday: "long" });
    res.json({ date, weekday: dayOfWeek });
});

module.exports = router;
