const Album = require('../../db_config/schema-db').Album
const Image = require('../../db_config/schema-db').Image

const album = require('../Album/album.model')
const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const imageFunctions = {}

imageFunctions.save = ( images, res ) => {
  sequelizeConnection.transaction( t => {
    return Image.bulkCreate(images)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = imageFunctions