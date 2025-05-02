const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// ① HTMLなどを返す設定（←これが超重要！！）
app.use(express.static(path.join(__dirname, '../frontend')));

// ② APIエンドポイント
const timetable = [];

app.post('/api/timetable', (req, res) => {
  const { subject } = req.body;
  if (!subject) {
    return res.status(400).json({ error: '科目名が必要です' });
  }
  timetable.push({ subject });
  res.json({ subject });
});

app.get('/api/timetable', (req, res) => {
  res.json(timetable);
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
