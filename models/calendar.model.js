import mysql from '../config/mysql';

const getEvent = async (sender) => {
    return new Promise((resolve) => {
        const query = mysql.execQuery(`SELECT * FROM calendar_events WHERE senderID='${sender}' ORDER BY id DESC LIMIT 1`).catch(err => {
            console.log('❌ ERRO: ', err);
        });
        resolve(query);
    });
}; 
const cancelEvent = async (sender) => {
    return new Promise((resolve) => {
        const query = mysql.execQuery(`SELECT * FROM calendar_events WHERE senderID='${sender}' ORDER BY id DESC LIMIT 1`).catch(err => {
            console.log('❌ ERRO: ', err);
        });
        resolve(query);
    });
}; 

export default {
    getEvent,
    cancelEvent
};