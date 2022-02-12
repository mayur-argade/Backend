const express = require('express')
const app = express()

// swagger related
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const fileupload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileupload());

let courses = [
    {
        id: "11",
        name: "Learn reactJs",
        price: 299
    },
    {
        id: "22",
        name: "Learn Angular",
        price: 399
    },
    {
        id: "33",
        name: "Learn MongoDB",
        price: 499
    }
]

app.get('/api/v1/mayur', (req,res) => {
    res.send("hello from Mayur")
})

app.get('/api/v1/object', (req,res) => {
    res.send({id:"55", name: "coolness", price: "499"})
})

app.get('/api/v1/courses', (req,res) => {
    res.send(courses)
})

app.get('/api/v1/mycourses/:courseId', (req,res) => {
    const myCourse = courses.find(course => course.id === req.params.courseId)
    res.status(200).json(myCourse);
})

app.post("/api/v1/addcourse", (req,res) => {
    console.log(req.body);
    courses.push(req.body)
    res.send(true);
})

app.get("/api/v1/coursequery", (req,res) => {
    let location = req.query.location
    let device = req.query.device

    res.send({ location, device })
})

app.post("/api/v1/courseupload", (req,res) => {
    console.log(req.headers);
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"   

    file.mv(path, (err) => {
        res.send(true)
    });
});

app.get("/", (req,res) => {
    res.send("hello there mayur here")
})

app.listen(4000, () => {
    console.log("server is running at port 4000...");
})