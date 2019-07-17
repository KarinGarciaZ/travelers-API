'use strict'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from 'dotenv'
env.config();
const { Cities } = require('./src/app/db_config/schema-db')

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.listen(5000, '127.0.0.1', () => {
  console.log(`API ready to get requests...`)
  console.log('running on port ')
})