'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('dotenv')
env.config();

const app = express()

app.use(bodyParser.json())
app.use(cors())

const modelsRouting = require('./src/app/models/models.routing')
app.use(modelsRouting)

const { host, port } = require('./enviroment')
app.listen(port, host, () => {
  console.log(`API ready to get requests...`)
  console.log('running on port ', port)
})