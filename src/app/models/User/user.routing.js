const express = require('express')
const router = express.Router()
const user = require('./user.model')

router

.get('/:id', (req, res) => {
  user.getOne(req.params.id, res)
})

router.post('/', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    statusItem: 0,
  }

  user.saveOne(newUser, res)
})

router.post('/userInfo', (req, res) => {
  const userInfo = {
    biography: req.body.biography,
    phone: req.body.phone,
    gender: req.body.gender,
    website: req.body.website,
    profilePictureUrl: req.body.profilePictureUrl,
    userId: req.body.userId
  }
  user.saveInfo(userInfo, res)
})

module.exports = router