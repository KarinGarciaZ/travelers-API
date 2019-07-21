const express = require('express')
const router = express.Router()
const follow = require('./follow.model')

router

.get('/getAllFollowersPerUser/:id', (req, res) => {
  follow.getAllFollowersPerUser(req.params.id, res)
})

.get('/getAllFollowingPerUser/:id', (req, res) => {
  follow.getAllFollowingPerUser(req.params.id, res)
})

.get('/getAllFollowersPerUser/:id/count', (req, res) => {
  follow.getAllFollowersCountPerUser(req.params.id, res)
})

.get('/getAllFollowingPerUser/:id/count', (req, res) => {
  follow.getAllFollowingCountPerUser(req.params.id, res)
})

.post('/', (req, res) => {
  const newFollow = {
    userId: req.body.userId,
    idFollowing: req.body.idFollowing,
    statusItem: 0,
  }
  follow.saveOne(newFollow, res)
})

module.exports = router