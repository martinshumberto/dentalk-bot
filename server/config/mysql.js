import mysql from 'mysql';
import config from './variables';

const connection = mysql.createConnection({
    host     : config.DB_HOST,
    port     : config.DB_PORT || 3306,
    user     : config.DB_USER,
    password : config.DB_PASSWORD,
    database : config.DB_DATABASE
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
                const response = results[0];
                resolve(response);
            }
        });
        connection.on('close', function (err) {
            console.log('SQL CONNECTION CLOSED.' + err);
        });
        connection.on('error', function (err) {
            console.log('SQL CONNECTION ERROR: ' + err);
        });
    });
}



export default {
    execQuery
};