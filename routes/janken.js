"use strict";

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const choices = ["グー", "チョキ", "パー"];
    const userChoice = req.body.choice;
    const serverChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (userChoice === serverChoice) {
        result = "引き分け";
    } else if (
        (userChoice === "グー" && serverChoice === "チョキ") ||
        (userChoice === "チョキ" && serverChoice === "パー") ||
        (userChoice === "パー" && serverChoice === "グー")
    ) {
        result = "あなたの勝ち";
    } else {
        result = "あなたの負け";
    }

    res.json({ userChoice, serverChoice, result });
});

module.exports = router;
