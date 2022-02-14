const app = require('./app')

const {PORT} = process.env

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
})