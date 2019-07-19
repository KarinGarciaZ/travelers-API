const City = require('../../db_config/schema-db').City
const Range = require('../../db_config/schema-db').Range
const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const cityFunctions = {}

cityFunctions.getAll = res => {
  sequelizeConnection.transaction( t => {
    return City.findAll({ where: { statusItem: 0 } })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

cityFunctions.getOne = (id, res) => {
  sequelizeConnection.transaction( t => {
    return City.findOne({ 
      where: { id, statusItem: 0 },
      include: [{ model: Range }]
     })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

cityFunctions.saveOne = ( city, res ) => {
  sequelizeConnection.transaction( t => {
    return City.create(city)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = cityFunctions