const express = require('express')
const router = express.Router()
const like = require('./like.model')

router

.get('/getLikesPerAlbum/:id/count', (req, res) => {
  like.getLikesCountPerAlbum(req.params.id, res)
})

.get('/getLikesPerAlbum/:id', (req, res) => {
  like.getLikesPerAlbum(req.params.id, res)
})

.post('/', (req, res) => {
  const newLike = {
    userId: req.body.userId,
    albumId: req.body.albumId,
    statusItem: 0,
  }
  like.saveOne(newLike, res)
})

module.exports = router