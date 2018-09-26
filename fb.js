const config = require('./config')
const FacebookMessenger = require('fb-messenger')
const messenger = new FacebookMessenger({ token: config.getPageToken() })
module.exports = messenger