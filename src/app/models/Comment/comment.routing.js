const express = require('express')
const router = express.Router()
const comment = require('./comment.model')

router

.get('/getCommentsPerAlbum/:id/count', (req, res) => {
  comment.getCommentsCountPerAlbum(req.params.id, res)
})

.get('/getCommentsPerAlbum/:id', (req, res) => {
  comment.getCommentsPerAlbum(req.params.id, res)
})

.post('/', (req, res) => {
  const newComment = {
    userId: req.body.userId,
    albumId: req.body.albumId,
    text: req.body.text,
    statusItem: 0,
  }
  comment.saveOne(newComment, res)
})

module.exports = router