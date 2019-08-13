const isNil = require('../helpers/is-nil')

const parseSelect = query => {
  const options = {}
  
  const { select } = query
  if (!isNil(select)) {
    options.select = select.replace(/,/g, ' ')
  }

  return options
}

module.exports = parseSelect
