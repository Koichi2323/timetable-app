const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// ミドルウェア設定
app.use(cors());
app.use(express.json());
app.use(express.static('frontend')); // フロントエンドファイルの提供

// データ保存用のファイルパス
const dataFilePath = path.join(__dirname, 'timetable-data.json');

// データの読み込み関数
function loadTimetableData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('データ読み込みエラー:', error);
    return [];
  }
}

// データの保存関数
function saveTimetableData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('データ保存エラー:', error);
    return false;
  }
}

// メモリ上の時間割データ初期化（起動時にファイルから読み込む）
let timetable = loadTimetableData();

// APIエンドポイント：時間割の一覧を取得
app.get('/api/timetable', (req, res) => {
  res.json(timetable);
});

// APIエンドポイント：新しい科目を追加
app.post('/api/timetable', (req, res) => {
  const { day, period, subject, room } = req.body;
  
  // 入力チェック
  if (!day || !period || !subject) {
    return res.status(400).json({ error: '曜日、時限、科目名は必須項目です' });
  }
  
  // 重複チェック（同じ曜日・時限の登録がある場合は上書き）
  const existingIndex = timetable.findIndex(
    item => item.day === day && item.period === period
  );
  
  if (existingIndex !== -1) {
    // 既存の登録を更新
    timetable[existingIndex] = { day, period, subject, room };
  } else {
    // 新規登録
    timetable.push({ day, period, subject, room });
  }
  
  // データを保存
  saveTimetableData(timetable);
  
  res.status(201).json({ day, period, subject, room });
});

// APIエンドポイント：科目を削除
app.delete('/api/timetable/:index', (req, res) => {
  const index = parseInt(req.params.index);
  
  if (isNaN(index) || index < 0 || index >= timetable.length) {
    return res.status(400).json({ error: '無効なインデックスです' });
  }
  
  // 指定された要素を削除
  timetable.splice(index, 1);
  
  // データを保存
  saveTimetableData(timetable);
  
  res.json({ message: '削除完了' });
});

// サーバー起動
app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
