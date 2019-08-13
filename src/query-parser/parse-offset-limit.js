const isNil = require('../helpers/is-nil')
const isNumeric = require('../helpers/is-numeric')
const defaultLimit = 1000
const maxLimit = 9999

const parseOffsetLimit = query => {
  const options = {}

  let { offset, skip, limit } = query
  offset = !isNil(offset) && isNumeric(offset) ? parseInt(offset) : null
  skip = !isNil(skip) && isNumeric(skip) ? parseInt(skip) : null
  limit = !isNil(limit) && isNumeric(limit) ? parseInt(limit) : null

  options.limit = !isNil(limit) ? Math.min(limit, maxLimit) : defaultLimit
  options.skip = !isNil(offset) ? offset : !isNil(skip) ? skip : 0

  return options
}

module.exports = parseOffsetLimit
