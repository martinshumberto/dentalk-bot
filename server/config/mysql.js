import mysql from 'mysql';
import config from './variables';

const connection = mysql.createPool({
    connectionLimit : 100,
    host     : config.DB_HOST,
    port     : config.DB_PORT || 3306,
    user     : config.DB_USER,
    password : config.DB_PASSWORD,
    database: config.DB_DATABASE,
    debug    :  true,
    wait_timeout : 28800,
    connect_timeout: 10,
     queueLimit: 0 
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
                const countResults = results.length

                if (countResults > 1) {
                    const response = results;
                    resolve(response);
                } else {
                    const response = results[0];
                    resolve(response);
                }
            }
        });
        connection.on('close', function (err) {
            console.log('SQL CONNECTION CLOSED.' + err);
            connection.release();
            reject(null, err);
            throw err;
        });
        connection.on('error', function (err) {
            console.log('SQL CONNECTION ERROR: ' + err);
            connection.release();
            reject(null, err);
            throw err;
        });
    });
}



export default {
    execQuery
};