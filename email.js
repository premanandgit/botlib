const mailer = require('nodemailer')
const config = require('./config')

module.exports = class Email {
  constructor() {
    this.service = "gmail"
    this.from = "foodtrontech@gmail.com"
    this.pwd = "Yali4business"
    this.transporter = this.transporter()
  }
  transporter() {
    return mailer.createTransport({
      service: this.service,
      auth: {
          user: this.from,
          pass: this.pwd
      }
    })
  }

  async send(subject, text, to, from) {
    return await this.transporter.sendMail({subject, text, to: to, from: from || this.from})
  }
}

