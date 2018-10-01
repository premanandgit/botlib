const NodeCache = require("node-cache");
const cacheSessions = new NodeCache({ useClones: false });
// const cacheSessions = new NodeCache({ stdTTL: 100, checkperiod: 120, useClones: false });
const messenger = require('./bot-messenger')('fb')

class customerSession {
  constructor() {
  }

  async getProfile(customerId) {
    return new Promise(function (resolve, reject) {
      messenger.getProfile({ id: customerId })
        .then(profile => resolve(profile))
        .catch(err => {
          console.log(`Error while getting user profile ${customerId}`)
          resolve(null)
        })
    })
  }

  async create(customerId, getCustomer) {
    let customer = this.find(customerId);
    if (customer) {
      return customer
    } else {
      let profile = await this.getProfile(customerId)
      let newCustomer = await getCustomer(customerId, profile)
      // let success = cacheSessions.set(customerId, newCustomer, 100);
      let success = cacheSessions.set(customerId, newCustomer);
      if (!success) {
        console.log(`Unable to cache customer ${customerId}`)
        return null
      } else {
        return this.find(customerId)
      }
    }
  }

  find(customerId) {
    try {
      let customer = cacheSessions.get(customerId, true);
      if(customer) {
        // cacheSessions.ttl( customerId, 100, ( err, changed ) => {
        //   if( err ){
        //     console.log( `Unable to extend the customer session ${customerId}` ); // true
        //   } else {
        //     console.log( `Extended the customer session ${customerId}` );
        //   }
        // })
        return customer
      }
      return null
    } catch (err) {
      if (err) console.log(`Customer session expired ${customerId} , ${err}`)
      return null
    }
  }
}

module.exports = customerSession