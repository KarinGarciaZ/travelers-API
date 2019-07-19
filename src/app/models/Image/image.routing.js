const express = require('express')
const router = express.Router()
const image = require('./image.model')

router

router.post('/', (req, res) => {

  const images = []

  for (let index = 0; index <  req.body.images.length; index++) {
    images.push({
      url: req.body.images[index].url,
      statusItem: 0,
      albumId: req.body.images[index].albumId
    })    
  }

  image.save(images, res)
})

module.exports = router