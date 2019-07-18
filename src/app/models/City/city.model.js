const City = require('../../db_config/schema-db').City
const responseMW = require('../../middlewares/response')

const cityFunctions = {}

cityFunctions.getAll = res => {
  City.findAll({ where: { statusItem: 0 } })
  .then( resp => responseMW(null, res, resp, 200 ))
}

cityFunctions.saveOne = ( range, res ) => {
  Range.create(range).then( data => responseMW(null, res, data, 201) )
}

module.exports = cityFunctions