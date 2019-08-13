const parseFilter = require('./parse-filter')
const parseQ = require('./parse-q')
const parseOrder = require('./parse-order')
const parseOffsetLimit = require('./parse-offset-limit')
const parseDeleted = require('./parse-deleted')
const parseSelect = require('./parse-select')

const queryParser = (opts = {}) => {
  return (req, res, next) => {
    const { model } = opts
    const query = opts.query || req.query || {}
    const filter = Object.assign({}, 
      parseFilter(model, query), 
      parseQ(model, query)
    )
    const options = Object.assign({}, 
      parseOrder(query), 
      parseOffsetLimit(query), 
      parseDeleted(query), 
      parseSelect(query)
    )
    req.filter = filter
    req.options = options
    next()
  }
}

module.exports = queryParser
