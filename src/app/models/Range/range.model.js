const Range = require('../../db_config/schema-db').Range
const City = require('../../db_config/schema-db').City
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

rangeFunctions.getOne = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Range.findOne({ where: { id, statusItem: 0 } })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

rangeFunctions.getOneWithCities = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Range.findOne({ 
      where: { id, statusItem: 0 },
      include: [
        {
          model: City,
          required: false,
          where: { statusItem: 0 }
        }
      ]
    })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

rangeFunctions.saveOne = ( range, res ) => {
  sequelizeConnection.transaction( t => {
    return Range.create(range)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

rangeFunctions.update = ( id, range, res ) => {
  sequelizeConnection.transaction( t => {
    return Range.update(range, { where: { id } })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = rangeFunctions