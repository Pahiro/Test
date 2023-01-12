const mariadb = require('mariadb');
const ejs = require('ejs');
const express = require('express');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Connect to the MariaDB database
const pool = mariadb.createPool({
  host: 'localhost',
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName,
});

app.get('/', (req, res) => {
  // Query the "table" table
  pool.query('SELECT * FROM mytable WHERE line1 = 1').then( rows => {
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
