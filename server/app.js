'use strict';

/*
 ** Import packages
 */

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/variables';
import mysql from './config/mysql';
import profileRoute from './routes/profile.route';
import webhookRoute from './routes/webhook.route';
import path from 'path';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
    process.env.NODE_ENV === 'development' ?
        express.static(path.join(__dirname, 'public')) : express.static(path.join(__dirname, '../public'))
);

config.checkEnv();

/*
 ** Routes configuration
 */

webhookRoute(app);
profileRoute(app);

app.get('/leads', async (req, res) =>{
    const leads = await mysql.execQuery('SELECT * FROM leads');
    res.status(200).send(leads);
});
app.get('/events', async (req, res) =>{
    const events = await mysql.execQuery('SELECT * FROM calendar_events');
    res.status(200).send(events);
});

app.get('/', (req, res) => {
    process.env.NODE_ENV === 'development' ? res.sendFile(path.join(__dirname, 'public/index.html')) : res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.listen(config.PORT, () => {
    console.log('⚡️ [BOT CONSILIO] Express server is listening.');

    if (
        config.APP_URL &&
        config.SITE_URL
    ) {
        console.log(
            '⚡️ [BOT CONSILIO] Make sure to set the both the Messenger profile ' +
        'and webhook by visiting:\n⚡️ [BOT CONSILIO] ' +
        config.APP_URL +
        '/profile?mode=all&verify_token=' +
        config.FB_VERIFY_TOKEN
        );
    }
    if (config.FB_PAGE_ID) {
        console.log('⚡️ [BOT CONSILIO] Test app by messaging:');
        console.log('⚡️ [BOT CONSILIO] https://m.me/' + config.FB_PAGE_ID);
    }
});