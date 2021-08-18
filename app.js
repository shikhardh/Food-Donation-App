const express = require('express');
const path = require('path');
const app = express();
const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017/mydb";

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

//app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/search_results', (req, res) => {
    //results in a table
})

app.post('/donate_food', (req, res) => {
    // donate food add
})

app.listen(3000, function() {
    console.log('listening on 3000')
})