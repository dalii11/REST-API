const express = require("express");
const router = require("express").Router();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userModel = require("./models/User");
const connectDB = require("./config/connectDB");
require("dotenv").config({ path: "./config/.env" });

const app = express();

connectDB();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//routes

//add new user
router.post("/addUser", async (req, res) => {
  const { name, age, email } = req.body;

  try {
    const newUser = new userModel({ name, age, email, favouriteFoods });

    await newUser.save();
    // console.log(newPerson);
    res.status(200).json({ msg: `Person added`, newUser });
  } catch (error) {
    console.log(error);
  }
});

//Edit user by id
router.put("/edit/:Id", async (req, res) => {
  try {
    const { Id } = req.params;
    //   const id=req.params.Id
    const userFound = await userModel.findOneAndUpdate(
      { _id: Id },
      { $set: { ...req.body } }
    );
    res.status(200).send({ msg: "user edited", userFound });
  } catch (error) {
    res.status(500).send("impossible to edit user");
  }
});

//Get all users
router.get("/seeUsers", async (req, res) => {
  try {
    const Users = await userModel.find();
    res.status(200).json(Users);
  } catch (error) {
    console.log(error);
  }
});

//Delete user by id
router.delete("/:Id", async (req, res) => {
  try {
    const { Id } = req.params;
    const userToDelete = await userModel.findByIdAndDelete(Id);
    res.status(200).send({ msg: "user deleted", userToDelete });
  } catch (error) {
    res.status(500).send("impossible to delete user");
  }
});

//listen on port
const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}.`);
});
