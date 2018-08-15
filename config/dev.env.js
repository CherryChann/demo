'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CHATBOT_URL: '"http://192.168.43.164:5003"',
  HOST: '"localhost"'
})
