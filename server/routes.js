'use strict';
import webhook from './app/webhook';
import LeadsController from './api/LeadsController';
import CalendarController from './api/CalendarController';

export default function (app) {
    /**
     * Routes BOT
    */
    app.route('/profile').get(webhook.setProfile);
    app.route('/webhook').get(webhook.verifyWebhook);
    app.route('/webhook').post(webhook.messageHandler);
    /**
     * Routes API
    */
    app.route('/api/leads').get(LeadsController.index);
    app.route('/api/events').get(CalendarController.index);
}