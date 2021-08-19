const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017/mydb";

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

//app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(upload.array()); 
app.use( express.static( "public" ) );

const food = {"details": [{"name": "chicken", "quantity": "2", "place": "sydney", "contact": "987654321", "type":"food"}, {"name": "bread", "quantity": "4", "place": "darwin", "contact": "987654321", "type":"food"}, {"name": "milk", "quantity": "3", "place": "perth", "contact": "987654321", "type":"drink"}, {"name": "milk", "quantity": "3", "place": "perth", "contact": "987654321", "type":"drink"}]}

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/search', (req, res) => {
    //results in a table
    res.render('food', {food: food})
})

app.post('/donate_food', (req, res) => {
    // donate food add
})

app.listen(3000, function() {
    console.log('listening on 3000')
})