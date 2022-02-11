const express = require('express')
const format = require('date-format')
const app = express()


const PORT = process.env.PORT || 40000

app.get("/", (req, res) => {
    res.status(200).send("Hello there")
})

app.get("/api/v1/instagram", (req, res) => {
    const instagram = {
        username: "Mayur-Argade",
        followers: 55,
        follows: 55,
        date: format.asString('dd-MM-yy hh:mm:ss.', new Date()),
    };
    res.status(200).send(instagram);
})

app.get("/api/v1/facebook", (req,res) => {
    const facebook = {
        username: "mayur-argade",
        followers: 77,
        follows: 66,
        date: format.asString('dd-MM-yy hh:mm:ss.', new Date()),
    };
    res.status(200).send(facebook);
})

app.get("/api/v1/linkdein", (req,res) => {
    const linkdein = {
        username: "mayur*argade",
        followers: 77,
        follows: 77,
        date: format.asString('dd-MM-yy hh:mm:ss.', new Date()),
    };
    res.status(200).send(linkdein);
})

//while working with : remember to use it below everything 
app.get("/api/v1/:token", (req, res) => {
    console.log(req.params.token);
    res.status(200).json({ params: req.params.token})
});


app.listen(PORT, () => {
console.log(`server is running ${PORT}`);
})