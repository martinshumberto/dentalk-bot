require('dotenv').config();

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
    logging: true,
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data'
};