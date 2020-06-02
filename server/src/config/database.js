const path = require('path');
require('dotenv').config(
    process.env.NODE_ENV === 'development' ?
        { path: path.join(__dirname, '../../.env') } :
        { path: path.join(__dirname, '.env') }
);

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        paranoid: true
    },
    logging: console.log,
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data'  
};