'use strict';

require('dotenv').config();

const ENV_VARS = [
    'PORT',
    'APP_URL',
    'APP_EMAIL',
    'SITE_URL',
    'NAME_COMPANY',
    'FB_PAGE_ID',
    'FB_APP_ID',
    'FB_PAGE_ACCESS_TOKEN',
    'FB_VERIFY_TOKEN',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_LANGUAGE_CODE',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_CALENDAR_ID',
    'SMS_API_KEY',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DATABASE'
];

export default {
    mPlatformDomain: 'https://graph.facebook.com',
    mPlatformVersion: 'v3.2',

    PORT: process.env.PORT || 3000,

    APP_URL: process.env.APP_URL,
    APP_EMAIL: process.env.APP_EMAIL,
    SITE_URL: process.env.SITE_URL,
    NAME_COMPANY: process.env.NAME_COMPANY,

    FB_PAGE_ID: process.env.FB_PAGE_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_APP_SECRET: process.env.FB_APP_SECRET,
    FB_PAGE_ACCESS_TOKEN: process.env.FB_PAGE_ACCESS_TOKEN,
    FB_VERIFY_TOKEN: process.env.FB_VERIFY_TOKEN,

    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_LANGUAGE_CODE: process.env.GOOGLE_LANGUAGE_CODE,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,

    SMS_API_KEY: process.env.SMS_API_KEY,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    

    get mPlatfom() {
        return this.mPlatformDomain + '/' + this.mPlatformVersion;
    },

    get webhookUrl() {
        return this.APP_URL + '/webhook';
    },

    get whitelistedDomains() {
        return [this.APP_URL, this.SITE_URL];
    },

    checkEnv: function() {
        ENV_VARS.forEach(function(key) {
            if (!process.env[key]) {
                console.log(
                    '❌ [BOT CONSILIO] WARNING: Missing the environment variable ' + key
                );
            } else {
                if (['APP_URL', 'SITE_URL'].includes(key)) {
                    const url = process.env[key];
                    if (!url.startsWith('https://')) {
                        console.log(
                            '❌ [BOT CONSILIO] WARNING: Your ' +
                key +
                ' does not begin with "https://"'
                        );
                    }
                }
            }
        });
    }
};
