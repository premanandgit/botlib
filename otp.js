const SendOtp = require('sendotp');
const sendOtp = new SendOtp('172656Ae1GcaFR659a954ea');
module.exports = {
  send: function (phoneNumber) {
    return new Promise((resolve, reject) => {
      sendOtp.send(phoneNumber, 'YALIIN', (error, data) => {
        if (data && data.type === 'success') {
          console.log(data)
          console.log('OTP generated successfully');
          resolve(data)
        } else {
          console.log('Failed to generate OTP', error);
          resolve(null)
        }
      });
    })
  },

  verify: function (phoneNumber, otp) {
    return new Promise((resolve, reject) => {
      sendOtp.verify(phoneNumber, otp, (error, data) => {
        console.log(data); // data object with keys 'message' and 'type'
        if (data.type === 'success') {
          console.log('OTP verified successfully')
          resolve(data)
        }
        else if (data.type === 'error') {
          console.log('OTP verification failed', error)
          resolve(null)
        }
      })
    })
  }
}
