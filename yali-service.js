const fetch = require('node-fetch')
const _ = require('lodash')
const moment = require('moment')
const config = require('./config')

class Yali {
	constructor() {
		this.token = config.getYaliToken()
		this.baseUrl = config.getYaliWebUrl()
		this.yodayOnline = config.getYaliOnlineUrl()
	}

	getCategory(businessId) {
	}

	async addBusinessCustomer(businessId, customerId, profile) {
		let body = {
			"CustomerId": customerId,
			"BusinessId": businessId,
			"CustomerName": profile.first_name,
			"FirstName": profile.first_name,
			"LastName": profile.last_name,
			"CustomerGender": profile.gender,
			"Timezone": profile.timezone,
			"Locale": profile.locale,
			"ProfilePicture": profile.profile_pic
		}

		console.log("addBusinessCustomer ", body)
		return (await fetch(`${this.yodayOnline}/AddBusinessCustomer`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authorization': this.token
				},
				body: JSON.stringify(body)
			})).json()
	}

	async createReservation({ reservationDate, reservationTime, reservationCount, name, phone, businessId }) {
		let body = {
			"PartySize": reservationCount,
			"Service": "BOT",
			"DateTime": new Date(),
			"CustomerName": name,
			"CustomerPhonenumber": phone,
			"ResStatus": "Reservation",
			"Date": reservationDate,
			"Time": reservationTime,
			"ReservationStatusTypeID": 1,
			"BusinessID": businessId,
		}
		console.log('body ', JSON.stringify(body))
		console.log(`${this.baseUrl}/api/Reservation/CreateReservation`)
		console.log(`this.token`, this.token)
		return (await fetch(`${this.baseUrl}/api/Reservation/CreateReservation`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authorization': this.token
				},
				body: JSON.stringify(body)
			})).json()
	}

	async createFeedback({ feedback, name, businessId }) {
		let body = {
			"Food": feedback.food,
			"Service": feedback.service,
			"Ambience": feedback.ambience,
			"FoodReason": feedback.foodReason,
			"ServiceReason": feedback.serviceReason,
			"AmbienceReason": feedback.ambienceReason,
			"Feedback1": feedback.comments,
			"Name": name,
			"Date": moment.utc().format(),
			"BusinessID": businessId
		}
		console.log('body ', JSON.stringify(body))
		console.log(`${this.baseUrl}/api/Feedback/CreateFeedBack`)
		console.log(`this.token`, this.token)
		return (await fetch(`${this.baseUrl}/api/Feedback/CreateFeedBack`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authorization': this.token
				},
				body: JSON.stringify(body)
			})).json()
	}
}

module.exports = Yali