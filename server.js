const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./Controllers/register");
const signin = require("./Controllers/signin");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "smart-brain"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/signin", signin.handleSignIn(db,bcrypt));

app.post("/register",register.handleRegister(db,bcrypt));

app.get("/profile/:id", profile.handleProfileGet(db));
  
app.put('/image', image.handleImage(db));
  
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});

app.listen(process.env.PORT||3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
