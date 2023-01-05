const express = require('express');
const app = express();
const mariadb = require('mariadb');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const pool = mariadb.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'testdb',
});

app.get('/', (req, res) => {
  console.log('SQL query');

  pool.query('SELECT * FROM test_tbl')
  .then(results => {
    res.render('index', { value: results[0].value })
  })
  .catch(error => console.log(error));
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
