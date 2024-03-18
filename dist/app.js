const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/trending', (req, res) => {
  res.render('trending');
});
app.get('/tvShows', (req, res) => {
  res.render('tvShows');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});