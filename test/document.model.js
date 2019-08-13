const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  }
}, {
    collection: 'documents',
    timestamps: true
  })

DocumentSchema.index({ name: 'text' })

module.exports = mongoose.model('Document', DocumentSchema)
