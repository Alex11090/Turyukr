const express = require('express')
const app = express()

const config = require('./config')

const http = require('http')

const server = http.createServer(app)

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cors = require('cors')

const toursRouter = require('./Routes/tours')
const parser = require('./parser')
const { path } = require('path')

mongoose.connect(config.mongoKey)
    .then(() => console.log('Connected to mongo successfully'))
    .catch(err => console.error(err))

app.use('/static', express.static(__dirname + '/Front'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(config.corsOptions))



app.use('/tours', toursRouter)

parser();
// setInterval(parser, 86400000)

server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`)
})