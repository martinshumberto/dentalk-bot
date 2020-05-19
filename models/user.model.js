import mysql from '../config/mysql';

const getUserDB = async (sender) => {
    return new Promise((resolve) => {
        const query = mysql.execQuery(`SELECT * FROM leads WHERE senderID= '${sender}'`).catch(err => {
            console.log('❌ ERRO: ', err);
        });
        resolve(query);
    });
};

export default {
    getUserDB
};