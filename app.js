const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const mongoose = require("mongoose")
require("dotenv/config")


//MIDDLEWARES
app.use(bodyParser.json());


//import routes
const postsRoutes = require("./routes/people");
app.use("/people", postsRoutes);

//ROUTES
app.get("/", (req, res) => {
    res.send("We are on home");
});

//Connect to DB

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true} , () => {
    console.log("connected to db!");
});

//LISTEN
app.listen(3000);
