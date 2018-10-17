const data = require('./yali-nlp-data.json')
class YaliNLP {
  constructor() {
  }

  hasGreet(message) {
    return (data.greets.indexOf(message.toLowerCase()) >= 0)
  }

  getAction(message) {
    let index = data.actions.indexOf(message.toLowerCase())
    if (index >= 0) {
      return data.actions[index]
    }
    return null
  }

  findAction(message) {
    if (this.hasGreet(message))
      return "START"

    let menuAction = this.getAction(message)
    return menuAction ? menuAction : null
  }
}

module.exports = YaliNLP