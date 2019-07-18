const express = require('express')
const range = require('./range.model')
const router = express.Router()

router

.get('/', (req, res, next) => {
  range.getAll(res)
})

.post('/', (req, res, next) => {
  const newRange = {
    name: req.body.name,
    medal: req.body.medal,
    statusItem: 0
  }

  range.saveOne( newRange, res )
})

module.exports = router