const express = require('express')
const router = express.Router()
const album = require('./album.model')

const responseMW = require('../../middlewares/response')

router

.get('/allUserAlbums/:id', async (req, res) => {
  let resp = await album.getAllPerUser(req.params.id)
  responseMW(null, res, resp, 200)
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

.put('/', (req, res) => {
  const updatedAlbum = {
    description: req.body.description,
  }

  let id = req.body.id

  album.update(id, updatedAlbum, res)
})

.delete('/:id', (req, res) => {
  const updatedAlbum = {
    statusItem: 1,
  }

  let id = req.params.id

  album.update(id, updatedAlbum, res)
})

module.exports = router