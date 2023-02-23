const mariadb = require('mariadb');
const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const dotenv = require('dotenv');
var results = []

dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the MariaDB database
const pool = mariadb.createPool({
  host: 'localhost',
  user: process.env.dbUser,
  password: process.env.dbPass,
  database: process.env.dbName,
});

app.get('/', (request, response) => {
  response.render('index', { table: results });
});

app.post('/submit', (request, response) => {
  if (request.query.action === 'search') {
    var sql_var = request.body.inputbox;
    pool.query('SELECT * FROM mytable where line1 = ' + sql_var).then(rows => {
      results = rows;
      response.redirect('/');
    }).catch(err => {
      console.log(err);
    });
  } else if (request.query.action === 'upload') {
    console.log('Upload')
    var var_name = request.body.name;
    var var_surname = request.body.surname;
    pool.query('INSERT INTO mytable (line2, line3) VALUES ("' + var_name + '", "' + var_surname + '")').then(rows => {
      response.redirect('/');
    }).catch(err => { 
      console.log(err);
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
