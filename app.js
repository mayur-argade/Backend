require("dotenv").config();
require('./config/database').connect();
const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./model/user')
const auth = require('./middleware/auth');
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json());
app.use(cookieParser());

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

// login flow
// get all information
// check mandatory field
// get user from database
// compare and verify password
// give token or other information to the user

app.post("/login", async(req, res)=>{
try {
    const {email, password} = req.body
    if(!(email && password)){
        res.status(400).send("filed is missing.")
    }
    
    const user = await User.findOne({email})

    // if(!(user)){
    //     res.status(400).send("you are not registered")
    // }

    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            }
        )
        user.token = token 
        user.password = undefined
        // res.status(200).send(user)

        // if you want to use cookies
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 ),
            httpOnly: true,
        }
        res.status(200).cookie('token', token, options).json({
            success: true,
            token,
            user
        })
    }

    res.send(400).send("email or password is incorrect")

} catch (error) {
    console.log(error);  
}
})

// protecting the route
// use middleware
// check for token presence
// verify the token
// extract info from payload
// NEXT()

app.get("/dashboard", auth, (req, res) => {
    res.send("welcome to protected information")

})
module.exports = app;
