const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // ← 追加
app.use(express.json());
app.use(express.static('frontend')); // ← フロント表示用
app.use(express.static('frontend'));

const timetable = [];

app.post('/api/timetable', (req, res) => {
  const { subject } = req.body;
  timetable.push({ subject });
  res.json({ subject });
});

app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});

