'use strict';
import facebookAPI from '../services/facebook.service';
import utils from '../utils';
import config from '../config/variables';

/**
 * Send action typing on using the Service API
 * @param {Number} recipientId
 */
const sendTypingOn = recipientId => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: 'typing_on'
    };

    facebookAPI.sendCall(messageData, 0);
};

/**
 * Send action typing off using the Service API
 * @param {Number} recipientId
 */
const sendTypingOff = recipientId => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: 'typing_off'
    };

    facebookAPI.sendCall(messageData, 0);
};

/**
 * Send type text message using the Service API
 * @param {Number} recipientId
 * @param {String} text
 */
const sendTextMessage = async (recipientId, text) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: text
        }
    };
    await facebookAPI.sendCall(messageData, 0);
};

/**
 * Send text message with persona
 * @param {Number} recipientId
 * @param {String} text
 * @param {Number} persona_id
 */
const sendTextWithPersona = async (recipientId, text, persona_id) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: text,
            persona_id: persona_id
        }
    };
    await facebookAPI.sendCall(messageData, 0);
};

/*
     * Send a Gif using the Send API.
     *
     */
const sendGifMessage = async (recipientId, GifName) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: 'image',
                payload: {
                    url: config.APP_URL + GifName
                }
            }
        }
    };
    await facebookAPI.sendCall(messageData, 0);
};

/*
     * Send a image using the Send API.
     *
     */
const sendImageMessage = async (recipientId, imageName) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: 'image',
                payload: {
                    url: config.APP_URL + imageName
                }
            }
        }
    };

    await facebookAPI.sendCall(messageData, 0);
};

/**
 * Send type quick reply message using the Service API.
 * @param {Number} recipientId
 * @param {String} text
 */
const sendQuickReply = async (recipientId, text, replies, metadata) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: text,
            metadata: utils.isDefined(metadata) ? metadata : '',
            quick_replies: replies
        }
    };
    await facebookAPI.sendCall(messageData, 0);
};

/**
 * Send a button message using the Send API.
 *
 */
const sendButtonMessage = async (recipientId, text, buttons) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: text,
                    buttons: buttons
                }
            }
        }
    };
    await facebookAPI.sendCall(messageData, 0);
};

/**
 * Send type template generic message using the Service API.
 * @param {Number} recipientId
 * @param {Object} elements
 */
const sendGenericMessage = async (recipientId, elements) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: elements
                }
            }
        }
    };
    await facebookAPI.sendCall(messageData, 0);
};

export default {
    sendTypingOn,
    sendTypingOff,
    sendTextMessage,
    sendTextWithPersona,
    sendQuickReply,
    sendButtonMessage,
    sendGifMessage,
    sendImageMessage,
    sendGenericMessage
};
