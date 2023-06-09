const connectToMongo = require("./db");

connectToMongo();
const express = require('express')
const port = 5000
var cors = require('cors')
var app = express()
 
app.use(cors())

app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/land', require('./routes/land'))
app.use('/api/openai', require('./routes/openai'))
app.use('/api/schemes', require('./routes/schemes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})