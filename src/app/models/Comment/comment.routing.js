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

.put('/', (req, res) => {
  const updatedComment = {
    text: req.body.text
  }

  let id = req.body.id

  comment.update(id, updatedComment, res)
})

.delete('/:id', (req, res) => {
  const updatedComment = {
    statusItem: 1
  }

  let id = req.params.id

  comment.update(id, updatedComment, res)
})

module.exports = router