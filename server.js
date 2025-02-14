"use strict";
const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
const storage = multer.diskStorage({ destination: (req, file, cb) => cb(null, 'uploads/'), filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) });
const upload = multer({ storage });
let posts = [], postIdCounter = 1;
app.post('/api/posts', (req, res) => { const { userId, content } = req.body; if (!userId || !content) return res.status(400).json({ status: 'error' }); posts.push({ id: postIdCounter++, userId, content, likes: 0, comments: [], file: null }); res.json({ status: 'success' }); });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// like.js
"use strict";
app.post('/api/posts/:id/like', (req, res) => { const post = posts.find(p => p.id == req.params.id); if (!post) return res.status(404).json({ status: 'error' }); post.likes++; res.json({ status: 'success', likes: post.likes }); });

// comment-upload.js
"use strict";
app.post('/api/posts/:id/comment', (req, res) => { const { userId, comment } = req.body; const post = posts.find(p => p.id == req.params.id); if (!post) return res.status(404).json({ status: 'error' }); post.comments.push({ userId, comment }); res.json({ status: 'success', comments: post.comments }); });
app.post('/api/upload', upload.single('file'), (req, res) => { if (!req.file) return res.status(400).json({ status: 'error' }); res.json({ status: 'success', filePath: `/uploads/${req.file.filename}` }); });
