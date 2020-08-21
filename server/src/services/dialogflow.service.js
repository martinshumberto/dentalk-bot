import dialogflow from 'dialogflow';
import config from '../config/variables';
import utils from '../utils';
import send from '../app/send';
import receive from '../app/receive';
import structjson from '../utils/structjson';

const credentials = {
    credentials: {
        private_key: process.env.NODE_ENV === 'development' ? config.GOOGLE_PRIVATE_KEY : JSON.parse(config.GOOGLE_PRIVATE_KEY),
        client_email: config.GOOGLE_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(credentials);

/**
* Send all messages to DialogFlow
* @param {*} sender
* @param {*} textString
* @param {*} params
*/
const sendTextToDialogFlow = async (sender, textString, params) => {
    send.sendTypingOn(sender);
  
    const sessionPath = sessionClient.sessionPath(
        config.GOOGLE_PROJECT_ID,
        utils.sessionIds.get(sender)
    );

    try {
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: textString,
                    languageCode: config.GOOGLE_LANGUAGE_CODE
                }
            },
            queryParams: {
                payload: {
                    data: params,
                }
            }
        };
      
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        receive.handleDialogFlowResponse(sender, result);
    } catch (e) {
        console.log('❌ [BOT CONSILIO] Error in process message in Dialogflow:');
        console.log(e);
    }
};

const sendEventToDialogFlow = async (sender, event, params = {}) => {
    send.sendTypingOn(sender);
    const sessionPath = sessionClient.sessionPath(
        config.GOOGLE_PROJECT_ID,
        utils.sessionIds.get(sender)
    );
    try {
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(params),
                    languageCode: config.GOOGLE_LANGUAGE_CODE
                }
            }
        };

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        receive.handleDialogFlowResponse(sender, result);
    } catch (e) {
        console.log('❌ [BOT CONSILIO] Error in process message in Dialogflow:');
        console.log(e);
    }
};

export default {
    sendTextToDialogFlow,
    sendEventToDialogFlow
};
