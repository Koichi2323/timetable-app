const express = require('express');
const cors = require('cors');
const app = express();

// ミドルウェア設定
app.use(cors());
app.use(express.json());
app.use(express.static('frontend')); // ← フロントエンドを表示するため！

// メモリ上の時間割データ（今は仮保存）
const timetable = [];

// APIエンドポイント：新しい科目を追加
app.post('/api/timetable', (req, res) => {
  const { subject } = req.body;
  if (!subject) {
    return res.status(400).json({ error: '科目名が必要です' });
  }
  timetable.push({ subject });
  res.json({ subject });
});

// （お好みで）APIエンドポイント：今までの登録一覧を取得
app.get('/api/timetable', (req, res) => {
  res.json(timetable);
});

// サーバー起動
app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
