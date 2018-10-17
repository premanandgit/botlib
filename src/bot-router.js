const config = require('./config')
const express = require('express')
const EventEmitter = require('events')

class BotRouter extends EventEmitter{
	init() {
		this.router = express.Router()
		this.router.get('/', (req, res) => res.send(`I am ${config.getBotName()}`))

		this.router.get('/webhook', (req, res) => {
			console.log('inside get')
			req.query['hub.verify_token'] === config.getHubVerifyToken() ? res.send(req.query['hub.challenge']) : res.send('Invalid verify token')
		})
		
		// this.router.post('/webhook/jot', (req, res) => {
		// 	console.log('inside jott', req)
		// 	// req.query['hub.verify_token'] === config.getHubVerifyToken() ? res.send(req.query['hub.challenge']) : res.send('Invalid verify token')
		// })

		this.router.post('/webhook', (req, res) => {
			let data = req.body
			if(data.object === 'page') {
				data.entry.forEach(entry => {
					(entry.messaging || []).forEach(messaging => {
						if(messaging.message) {
							this.emit('botMessage', messaging)
						}
						else if(messaging.postback)	{
							this.emit('botPostBack', messaging)
						}
						// else 
						// 	console.log('unknown message', entry)	
					})
				});
			}
			res.sendStatus(200);
		})
	}
	
	getRouter() {
		return this.router
	}
}

module.exports = BotRouter;