"use strict";

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { height, weight } = req.body;
    if (!height || !weight) {
        return res.status(400).json({ error: "身長と体重を入力してください。" });
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    res.json({ height, weight, bmi });
});

module.exports = router;
