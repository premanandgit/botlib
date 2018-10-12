const Config = require('./config')
const BotRouter = require('./bot-router')
const botMessenger = require('./bot-messenger')
const FBMessenger = require('./fb')
const YaliNLP = require('./yali-nlp')
const customerSession = require('./customer-session')
const Algolia = require('./algolia')
const DialogFlow = require('./dialogflow')
const otp = require('./otp')
const YaliService = require('./yali-service')
const Email = require('./email')
exports.Config = Config
exports.BotRouter = BotRouter
exports.botMessenger = botMessenger
exports.YaliNLP = YaliNLP
exports.customerSession = customerSession
exports.Algolia = Algolia
exports.FBMessenger = FBMessenger
exports.DialogFlow = DialogFlow
exports.otp = otp
exports.YaliService = YaliService
exports.Email = Email
