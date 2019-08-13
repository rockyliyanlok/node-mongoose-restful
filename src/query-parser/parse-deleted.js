const isNil = require('../helpers/is-nil')

const parseDeleted = query => {
  const options = {}

  const { deleted } = query
  options.deleted = !isNil(deleted) && (deleted.toLowerCase() === 'true' || parseInt(deleted) > 0)

  return options
}

module.exports = parseDeleted
