const express = require('express')
const router = express.Router()

const City = require('./City/city.routing')
const Range = require('./Range/range.routing')
const Country = require('./Country/country.routing')
const USer = require('./User/user.routing')

router.use('/city', City)
router.use('/range', Range)
router.use('/country', Country)
router.use('/user', USer)

module.exports = router;