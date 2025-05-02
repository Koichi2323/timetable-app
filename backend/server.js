const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// フロント表示用に必要な設定
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// 仮のデータ保存
const timetable = [];

// フォームからの登録処理
app.post('/api/timetable', (req, res) => {
  const { subject } = req.body;
  if (!subject) {
    return res.status(400).json({ error: '科目名が必要です' });
  }
  timetable.push({ subject });
  res.json({ subject });
});

// 一覧取得（おまけ）
app.get('/api/timetable', (req, res) => {
  res.json(timetable);
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});

