const User = require('../../db_config/schema-db').User
const Comment = require('../../db_config/schema-db').Comment
const Album = require('../../db_config/schema-db').Album

const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const commentFunctions = {}

commentFunctions.getCommentsCountPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Comment.count({ where: { albumId, statusItem: 0 } })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

commentFunctions.getCommentsPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Album.findOne({
      where: { id: albumId },
      include: [
        {
          model: Comment,
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

commentFunctions.saveOne = ( comment, res ) => {
  sequelizeConnection.transaction( t => {
    return Comment.create(comment)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = commentFunctions