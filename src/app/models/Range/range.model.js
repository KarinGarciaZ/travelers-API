const Range = require('../../db_config/schema-db').Range
const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const rangeFunctions = {}

rangeFunctions.getAll = res => {

  sequelizeConnection.transaction( t => {
    return Range.findAll({ where: { statusItem: 0 } })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

rangeFunctions.saveOne = ( range, res ) => {
  Range.create(range).then( data => responseMW(null, res, data, 201) )
}

module.exports = rangeFunctions