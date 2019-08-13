'use strict'

const express = require('express')
const HttpStatus = require('http-status-codes')
const Document = require('./document.model')
const MongooseRestful = require('../src')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(MongooseRestful.queryParser({ model: Document }), (req, res, next) => {
  const { filter, options } = req
  res.status(HttpStatus.OK).json({ filter, options })
})

module.exports = app
