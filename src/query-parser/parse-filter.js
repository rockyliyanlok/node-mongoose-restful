const ts = require('@rockyli/timestamp')
const isNil = require('../helpers/is-nil')
const isNumeric = require('../helpers/is-numeric')

const parseFilter = (model, query) => {
  const filter = {}

  if (!isNil(model) && !isNil(model.schema) && !isNil(model.schema.paths)) {
    const paths = Object.keys(model.schema.paths)
    const { order, offset, skip, limit, deleted, select, q, ...filters } = query
    Object.keys(filters).forEach(key => {
      const sign = key.slice(-1)
      const path = (sign === '>' || sign === '<') ? key.slice(0, -1) : key
      if (paths.includes(path)) {
        const { instance } = model.schema.paths[path] || {}
        const value = 
          instance === 'Number' ? parseInt(filters[key]) :
          instance === 'Date' ? (isNumeric(filters[key]) ? ts.toDate(parseInt(filters[key])) : new Date(filters[key])) : 
          filters[key]
        if (['>', '<'].includes(sign)) {
          if (sign === '>') filter[path] = { $gte: value }
          else if (sign === '<') filter[path] = { $lte: value }
        } else {
          filter[path] = value
        }
      }
    })
  }

  return filter
}

module.exports = parseFilter
