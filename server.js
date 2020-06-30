require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function serveApp(_, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port)
