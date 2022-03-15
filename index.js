const express = require('express')
const fileupload = require('express-fileupload')

const app = express();

app.set('view engine', 'ejs')
// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.post("/mypost", (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.send(req.body);
})

app.get('/get', (req, res) => {
    res.render("getform")
})
app.get('/post', (req, res) => {
    res.render("postform")
})


app.listen( 4000, () => {
    console.log("server is running on port 4000...");
})