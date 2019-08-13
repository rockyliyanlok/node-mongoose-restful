const isNil = require('../helpers/is-nil')

const parseOrder = query => {
  const options = {}

  if (!isNil(query.order)) {
    options.sort = {}
    const orders = query.order.replace(/\s+/g, '').split(',')
    orders.forEach(order => {
      const sign = order.charAt(0)
      if (['-', '+'].includes(sign)) {
        const field = order.slice(1)
        options.sort[field] = sign === '-' ? -1 : 1
      } else {
        options.sort[order] = 1
      }
    })
  }

  return options
}

module.exports = parseOrder
