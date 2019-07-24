const express = require('express')
const router = express.Router()
const country = require('./country.model')

router

.get( '/', (req, res) => {
  country.getAll(res)
})


router.post( '/', (req, res) => {
  const newCountry = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rangeId: req.body.rangeId,
    statusItem: 0,
  }
  country.saveOne(newCountry, res)
})

.put('/', (req, res) => {
  const countryUpdated = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rangeId: req.body.rangeId
  }

  let id = req.body.id

  country.update( id, countryUpdated, res )
})

module.exports = router