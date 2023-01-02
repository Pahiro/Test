express = require('express');
app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {name: 'Bennet'});
});

app.get('/tertius', (req, res) => {
  res.render('tertius', {name: 'All', year: '2023' });
});


app.listen(3000, function() {
  console.log('App listening on port 3000');
});