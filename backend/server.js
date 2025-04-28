const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('APIサーバーが動いています！');
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
