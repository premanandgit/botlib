const fb = require('./fb')
module.exports = (name) => {
  switch(name.toLowerCase()) {
    case "fb":
      return fb
    default:
      return fb
  }
}