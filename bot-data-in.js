// class botDataIn {
//   constructor() {

//   }
//   read(data, next) {
//     if(data.object === 'page') {
//       data.entry.forEach(entry => {
//         (entry.messaging || []).forEach(messaging => {
//           messaging.message ? processMessage(messaging) : processPostback(messaging)
//         })
//       });
//     }
//     next(null);
//   }
// }

// module.exports = botDataIn