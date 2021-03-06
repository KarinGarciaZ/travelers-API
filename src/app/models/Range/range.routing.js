const express = require('express')
const range = require('./range.model')
const router = express.Router()

router

.get('/', (req, res) => {
  range.getAll(res)
})

.get('/:id/withCities', (req, resp) => {
  range.getOneWithCities(req.params.id, resp)
})

.get('/:id', (req, resp) => {
  range.getOne(req.params.id, resp)
})

.post('/', (req, res) => {
  const newRange = {
    name: req.body.name,
    medal: req.body.medal,
    statusItem: 0
  }

  range.saveOne( newRange, res )
})

.put('/', (req, res) => {
  const rangeUpdated = {
    name: req.body.name,
    medal: req.body.medal
  }

  let id = req.body.id

  range.update( id, rangeUpdated, res )
})

module.exports = router