const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/mydb";

mongoose.connect("mongodb://localhost:27017/foodDonate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("COnnected to db");
  // we're connected!
});

const foodSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    location: String,
    contact: Number,
    type: String,
  });

  // SEED DATA
   const Food = mongoose.model("Food", foodSchema);

//   let seedData = new Food({
//     name: "chicken",
//     quantity: "2",
//     location: "sydney",
//     contact: "987654321",
//     type: "food",
//   });

//   seedData.save(function (err, book){
//       if (err) {
//           console.log(err);
//           res.send("Something went wrong");
//       }
//       console.log(`Data Added: ${seedData}`);
//   })

//   seedData = new Food({
//     name: "milk",
//     quantity: "3",
//     location: "perth",
//     contact: "987654321",
//     type: "drink",
//   });

//   seedData.save(function (err, book){
//       if (err) {
//           console.log(err);
//           res.send("Something went wrong");
//       }
//       console.log(`Data Added 2: ${seedData}`);
//   })

//   seedData = new Food({
//     name: "Burger",
//     quantity: "3",
//     location: "perth",
//     contact: "987654321",
//     type: "food",
//   });

//   seedData.save(function (err, book){
//       if (err) {
//           console.log(err);
//           res.send("Something went wrong");
//       }
//       console.log(`Data Added 3: ${seedData}`);
//   })

const foodRequestSchema = new mongoose.Schema({
    location: String,
    quantity: Number,
  });

// SEED DATA
 const Requests = mongoose.model("Requests", foodRequestSchema);

//   let seedData = new Requests({
//     quantity: "5",
//     location: "sydney",
//   });

//   seedData.save(function (err, book){
//       if (err) {
//           console.log(err);
//           res.send("Something went wrong");
//       }
//       console.log(`Data Added: ${seedData}`);
//   })

//   seedData = new Requests({
//     quantity: "3",
//     location: "Perth",
//   });

//   seedData.save(function (err, book){
//       if (err) {
//           console.log(err);
//           res.send("Something went wrong");
//       }
//       console.log(`Data Added: ${seedData}`);
//   })

//   seedData = new Requests({
//     quantity: "1",
//     location: "Melbourne",
//   });

//   seedData.save(function (err, book){
//       if (err) {
//           console.log(err);
//           res.send("Something went wrong");
//       }
//       console.log(`Data Added: ${seedData}`);
//   })

//app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(upload.array());
app.use(express.static("public"));

// const food = {
//   details: [
//     ,
//     {
//       name: "bread",
//       quantity: "4",
//       place: "darwin",
//       contact: "987654321",
//       type: "food",
//     },
//     {
//       name: "milk",
//       quantity: "3",
//       place: "perth",
//       contact: "987654321",
//       type: "drink",
//     },
//     {
//       name: "milk",
//       quantity: "3",
//       place: "perth",
//       contact: "987654321",
//       type: "drink",
//     },
//   ],
// };

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", async (req, res) => {
  //results in a table
  const data = await Food.find().sort({'location': 1});
  const food = {'details': data}
  //console.log(data);
  res.render("food", { food: food });
});

app.get("/donate_food", (req, res) => {
  // donate food add
});

app.post("/food_added", (req, res) => {
  console.log(req.body);

  res.redirect("/");
});

app.post("/food_request", (req, res) => {
    console.log(req.body);
    // add food in collection
    res.send(`Requested successfully: ${req.body.location} -- ${req.body.person}`);
})

app.get("/search_request", async (req, res) => {
    // do
    const data = await Requests.find().sort({'location': 1});
    const requests = {'details': data}
    console.log(data);
    res.render('request.ejs', {data: requests});
})

app.listen(3000, function () {
  console.log("Listening on 3000");
});
