const Country = require('../../db_config/schema-db').Country
const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const countryFunctions = {}

countryFunctions.getAll = res => {
  sequelizeConnection.transaction( t => {
    return Country.findAll({ where: { statusItem: 0 } })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

countryFunctions.saveOne = ( country, res ) => {
  sequelizeConnection.transaction( t => {
    return Country.create(country)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = countryFunctions