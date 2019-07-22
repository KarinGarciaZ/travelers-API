const User = require('../../db_config/schema-db').User
const Like = require('../../db_config/schema-db').Like
const Album = require('../../db_config/schema-db').Album

const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const likeFunctions = {}

likeFunctions.getLikesCountPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Like.count({ where: { albumId, statusItem: 0 } })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

likeFunctions.getLikesPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Album.findOne({
      where: { id: albumId },
      include: [
        {
          model: Like,
          required: false,
          include: [
            {
              model: User
            }
          ]
        }
      ]
    })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

likeFunctions.saveOne = ( like, res ) => {
  sequelizeConnection.transaction( t => {
    return Like.create(like)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = likeFunctions