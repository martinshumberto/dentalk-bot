import mysql from 'mysql';
import config from './variables';

const connection = mysql.createPool({
    connectionLimit : 10,
    host     : config.DB_HOST,
    port     : config.DB_PORT || 3306,
    user     : config.DB_USER,
    password : config.DB_PASSWORD,
    database: config.DB_DATABASE,
    wait_timeout : 28800,
    connect_timeout: 10,
    queueLimit: 0 
});

connection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;
});


function execQuery(sqlQry){
    return new Promise((resolve, reject) => {
        connection.query(sqlQry, function(error, results){
            if(error) {
                if (error.code == 'ER_DUP_ENTRY') {
                    reject('Registro duplicado no banco de dados.');
                } else {
                    reject(JSON.parse(JSON.stringify(error)));
                }
            }
            else {
                const countResults = results.length;

                if (countResults > 1) {
                    const response = results;
                    resolve(response);
                } else {
                    const response = results[0];
                    resolve(response);
                }
            }
        });
    });
}



export default {
    execQuery
};