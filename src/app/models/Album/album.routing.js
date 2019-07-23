const express = require('express')
const router = express.Router()
const album = require('./album.model')

router

.get('/allUserAlbums/:id', (req, res) => {
  album.getAllPerUser(req.params.id, res)
})

.get('/:id', (req, res) => {
  album.getOne(req.params.id, res)
})

.post('/', (req, res) => {
  const newAlbum = {
    userId: req.body.userId,
    cityId: req.body.cityId,
    description: req.body.description,
    statusItem: 0,
  }
  album.saveOne(newAlbum, res)
})

module.exports = router