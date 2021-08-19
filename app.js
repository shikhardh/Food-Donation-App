const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/mydb";

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("COnnected to db")
  // we're connected!
});

const foodSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    location: String,
    contact: Number
  });

const Food = mongoose.model('Food', kittySchema);

const seedData = new Food({ name: 'Silence' });

//app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/donate_food', (req, res) => {
    // donate food add
})

app.post('/food_added', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

app.listen(3000, function() {
    console.log('Listening on 3000')
})