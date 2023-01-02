const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('count');
});

app.post('/count', (req, res) => {
  const name = req.body.name;
  const letterCount = name.length;
  res.send(`Your name has ${letterCount} letters.`);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
