const express = require('express')
const router = express.Router()

const City = require('./City/city.routing')
const Range = require('./Range/range.routing')
const Country = require('./Country/country.routing')
const User = require('./User/user.routing')
const Album = require('./Album/album.routing')

router.use('/city', City)
router.use('/range', Range)
router.use('/country', Country)
router.use('/user', User)
router.use('/album', Album)

module.exports = router;