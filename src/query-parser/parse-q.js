const isNil = require('../helpers/is-nil')

const parseQ = (model, query) => {
  const filter = {}
  
  const or = []
  const { q } = query || {}

  if (!isNil(q) && !isNil(model) && !isNil(model.schema) && !isNil(model.schema.paths)) {
    Object.keys(model.schema.paths)
      .filter(key => model.schema.paths[key].instance === 'String')
      .forEach(key => {
        or.push({
          [key]: { $regex: q, $options: 'i' }
        })
      })
  }
  if (or.length > 0) filter.$or = or

  return filter
}

module.exports = parseQ
