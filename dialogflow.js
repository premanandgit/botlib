const DialogFlow = require('dialogflow')
const SessionsClient = new DialogFlow.SessionsClient();
const config = require('./config')
const dialogflowId = config.getDialogflowId()
const languageCode = 'en-US';

module.exports = (sessionId, intent) => {
  const sessionPath = SessionsClient.sessionPath(dialogflowId, sessionId);
  const dialogflowRequest = {
    session: sessionPath, queryInput: {
      text: {
        text: intent,
        languageCode
      }
    }
  }

  return SessionsClient.detectIntent(dialogflowRequest)
}