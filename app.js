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

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'))
})

app.listen(3000, function() {
    console.log('listening on 3000')
})