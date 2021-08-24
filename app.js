const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

const uri = "mongodb://localhost:27017/mydb";

mongoose.connect("mongodb://localhost:27017/foodDonate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to db");
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

const User = new mongoose.Schema({
  username: String,
  password: String,
});

User.plugin(passportLocalMongoose);
const UserDetails = mongoose.model("userInfo", User, "userInfo");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

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
  res.status(200).render("index");
});

app.get("/login", (req, res) => {
  return res.render('login');
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login?info=" + info);
    req.login(user, function (err) {
      if (err) return next(err);
    });
    return res.redirect("/");
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.logout();
  return res.redirect('/');
});

// app.get("/register", (req, res) => {

// })

// app.post("/register", (req, res) => {
//   User.register({ username: req.body.username, active: false }, req.body.password);
// })


// Register users SEED
//UserDetails.register({ username: "shikhar", active: false }, "shikhar");
//UserDetails.register({ username: "admin", active: false }, "admin");

app.get("/search", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  //results in a table
  const data = await Food.find().sort({ location: 1 });
  const food = { details: data };
  //console.log(data);
  res.status(200).render("food", { food: food });
});

app.get("/donate_food", (req, res) => {
  // donate food add
});

app.post("/food_added", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  //console.log(req.body);
  if (
    req.body.food == "" ||
    req.body.quantity == "" ||
    req.body.contact == "" ||
    req.body.location == ""
  ) {
    return res.status(200).redirect("/");
  }
  data = new Food({
    name: req.body.food,
    quantity: req.body.quantity,
    location: req.body.location,
    contact: req.body.contact,
    type: req.body.type,
  });

  data.save(function (err, book) {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    }
    console.log(`Data Added: ${data}`);
    res.send(`Food Added for DONATION: ${data.name} : ${data.location}`);
  });
});

app.post("/food_request", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  console.log(req.body);
  //add food req in collection
  if (req.body.person == "" || req.body.location == "") {
    return res.redirect("/");
  }
  data = new Requests({
    quantity: req.body.person,
    location: req.body.location,
  });

  data.save(function (err, book) {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    }
    console.log(`Data Added: ${data}`);
    res.send(
      `Requested successfully: ${req.body.location} -- ${req.body.person}`
    );
  });
});

app.get("/search_request", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  // do
  const data = await Requests.find().sort({ location: 1 });
  const requests = { details: data };
  console.log(data);
  res.render("request.ejs", { data: requests });
});

app.listen(3000, function () {
  console.log("Listening on 3000");
});
