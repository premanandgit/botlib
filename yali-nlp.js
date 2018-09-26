const data = require('./yali-nlp-data.json')
class YaliNLP {
  constructor() {

  }
  hasGreet(message) {
    return (data.greets.indexOf(message.toLowerCase()) >= 0)
  }
}

module.exports = YaliNLP