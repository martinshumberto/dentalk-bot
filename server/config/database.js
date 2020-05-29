require('dotenv').config();

module.exports = {
    development: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true
        },
        migrationStorageTableName: 'sequelize_meta',
        seederStorageTableName: 'sequelize_data'
    },
    test: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true
        },
        migrationStorageTableName: 'sequelize_meta',
        seederStorageTableName: 'sequelize_data'
    },
    production: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true
        },
        migrationStorageTableName: 'sequelize_meta',
        seederStorageTableName: 'sequelize_data'
    }
};