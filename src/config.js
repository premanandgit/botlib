require('dotenv').config()

module.exports = class config {
	static getBotName() {
		return process.env.BOT_NAME
	}
	static getPageToken() {
		return process.env.PAGE_ACCESS_TOKEN
	}
	static getPort() {
		return process.env.PORT
	}
	static getHubVerifyToken() {
		return process.env.HUB_VERIFY_TOKEN
	}
	static getDialogflowId() {
		return process.env.DIALOG_FLOW_ID
	}
	static getYaliToken() {
		return process.env.YALI_TOKEN
	}
	static getYaliWebUrl() {
		return process.env.YALI_WEB_URL
	}
	static getYaliOnlineUrl() {
		return process.env.YALI_ONLINE_URL
	}
}