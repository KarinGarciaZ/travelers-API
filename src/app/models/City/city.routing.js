const express = require('express')
const router = express.Router()
const city = require('./city.model')

router

.get( '/', (req, res) => {
  city.getAll(res)
})

.get('/:id', (req, res) => {
  city.getOne(req.params.id, res)
})

router.post( '/', (req, res) => {
  const newCity = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rangeId: req.body.rangeId,
    countryId: req.body.countryId,
    statusItem: 0,
  }
  city.saveOne(newCity, res)
})

router.put( '/', (req, res) => {
  const updatedCity = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rangeId: req.body.rangeId,
    countryId: req.body.countryId
  }

  let id = req.body.id

  city.update(id, updatedCity, res)
})

module.exports = router