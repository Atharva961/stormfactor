const connectToMongo = require("./db");

connectToMongo();
const express = require('express')
// const app = express()
const port = 5000
var cors = require('cors')
var app = express()
 
app.use(cors())

app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})