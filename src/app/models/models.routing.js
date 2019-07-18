const express = require('express')
const router = express.Router()

const City = require('./City/city.routing')
const Range = require('./Range/range.routing')

router.use('/city', City)
router.use('/range', Range)

module.exports = router;