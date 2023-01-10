const mariadb = require('mariadb');
const ejs = require('ejs');
const express = require('express');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Connect to the MariaDB database
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'maria',
});

app.get('/', (req, res) => {
  // Query the "table" table
  pool.query('SELECT * FROM mytable WHERE line1 = 2').then( rows => {
    res.render('index', { table: rows });
  }).catch( err => {
    console.log(err);
  });

  // Render the EJS template and pass the table data
  
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
