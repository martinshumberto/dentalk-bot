'use strict';

/*
 ** Import packages
 */

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import cors from 'cors';
import routes from './routes';
import config from './config/variables';
import path from 'path';
import './database';

dotenv.config(
    process.env.NODE_ENV === 'development' ?
        { path: path.join(__dirname, '../../.env') } :
        { path: path.join(__dirname, '../.env') }
);
        
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

config.checkEnv();

/*
 ** Routes configuration
 */

routes(app);

const staticFileMiddleware = express.static(
    process.env.NODE_ENV === 'development' ?
        path.join(__dirname, '../../public') :
        path.join(__dirname, '../public')
);
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

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