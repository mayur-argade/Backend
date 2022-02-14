require("dotenv").config()
require('./config/database').connect()
const User = require('./model/user')

const bcrypt = require('bcryptjs')
const express = require('express')
const app = express();
app.use(express.json)

app.get("/", (req,res) => {
    res.send("Authentication system")
})

app.post("/register", async(req,res) =>{
    const { firstname, lastname, email, password } = req.body

    if (!(email && password && firstname && lastname )) {
        res.status(400).send("all fields are mandatory")
    }

    const existingUser = await User.findOne({ email });

    if(existingUser){
        res.status(401).send("user already exits");
    }

    const myEncPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase,
        password: myEncPassword
    })
})

module.exports = app