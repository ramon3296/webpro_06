const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ルートを追加
app.use("/api", require("./routes/likes"));
app.use("/api", require("./routes/search"));
app.use("/api", require("./routes/pin"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
