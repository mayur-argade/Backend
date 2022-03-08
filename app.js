require("dotenv").config();
require('./config/database').connect();
const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./model/user')

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Authentication system");
});

app.post("/register", async(req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body; // get all the information
    
    if(!(email && password && firstname && lastname)){
        res.status(400).send("all fields are required");
    }

    const existingUser = await User.findOne({ email });

    if(existingUser){
        res.status(401).send("user already exits");
    }

    const myEncPass = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: myEncPass,
    });

    // token creation
    const token = jwt.sign(
        {user_id: user._id, email},
        process.env.SECRET_KEY,
        {
            expiresIn: '2h'
        }
    )
    user.token = token

    user.password = undefined
    // update pr not
    res.status(201).json(user)
    } catch (error) {
        console.log(error);  
        
    }
});

module.exports = app;
