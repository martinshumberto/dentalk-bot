'use strict';

const path = require('path');

require('dotenv').config(
    process.env.NODE_ENV === 'development' ?
        { path: path.join(__dirname, '../.env') } :
        { path: path.join(__dirname, '.env') }
);

process.env.PORT = 8080;
process.env.VUE_APP_BASE_API = process.env.APP_URL;
process.env.VUE_APP_APP_EMAIL = process.env.APP_EMAIL;

module.exports = {
    outputDir: path.resolve(__dirname, '../public')
};
