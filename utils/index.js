'use strict';
const uuid = require('uuid');
import facebookAPI from '../services/facebook.service';

/**
 * Define is undefined
 * @param {Object} obj
 */
const isDefined = obj => {
    if (typeof obj == 'undefined') {
        return false;
    }
    if (!obj) {
        return false;
    }
    return obj != null;
};

/**
 * Resolve after x time
 * @param {*} x 
 */
const resolveAfterXSeconds = async (x) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, x * 1000);
    });
};

/**
 * Set userid
 * @param {Number} senderID
 */
const sessionIds = new Map();
const usersMap = new Map();

const setSessionandUser = senderID => {
    return new Promise(function(resolve, reject) {
        if (!sessionIds.has(senderID)) {
            sessionIds.set(senderID, uuid.v4());
        }
        if (!usersMap.has(senderID)) {
            try {
                facebookAPI.addUser(function(user) {
                    resolve(usersMap.set(senderID, user));
                }, senderID);
            } catch (err) {
                reject(err);
            }
        }
    });
};

/**
 * Resolve after x time
 * @param {*} x 
 */
const getEventID = async (event) => {
    return new Promise(resolve => {
        
        var query = event.htmlLink.slice(1);
        var partes = query.split('&');
        let eventID = {};
        partes.forEach(function (parte) {
            var chaveValor = parte.split('=');
            var valor = chaveValor[1];
            eventID = valor;
        });

        const buf = Buffer.from(eventID, 'base64').toString('ascii');
        eventID = buf.split(' ');

        resolve(eventID[0]);
    });
};

export default {
    isDefined,
    setSessionandUser,
    resolveAfterXSeconds,
    getEventID,
    sessionIds,
    usersMap
};
