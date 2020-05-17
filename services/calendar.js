'use strict';
import config from '../config/variables';
import moment from 'moment';
import { google } from 'googleapis';

const serviceAccountAuth = new google.auth.JWT({
    email: config.GOOGLE_CLIENT_EMAIL,
    key: config.GOOGLE_PRIVATE_KEY,
    scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');

const createCalendarEvent = (dateTimeStart, dateTimeEnd, userDB) => {
    return new Promise((resolve, reject) => {
        calendar.events.list({
            auth: serviceAccountAuth,
            calendarId: config.GOOGLE_CALENDAR_ID,
            timeMin: dateTimeStart.toISOString(),
            timeMax: dateTimeEnd.toISOString()
        }, (err, calendarResponse) => {
            if (err || calendarResponse.data.items.length > 0) {
                reject(err || new Error('O horário solicitado entra em conflito com outro compromisso.'));
            } else {
                calendar.events.insert({ auth: serviceAccountAuth,
                    calendarId: config.GOOGLE_CALENDAR_ID,
                    resource: {
                        summary: `Consulta de ${userDB[0].first_name}`,
                        description: `Nome do paciente: ${userDB[0].first_name} ${userDB[0].last_name} \nTelefone: ${userDB[0].phone} \nE-mail: ${userDB[0].email} \n\nAgendamento realizado em: Facebook - ${moment().format('DD/MM/YYYY HH:mm')}`,
                        start: {dateTime: dateTimeStart},
                        end: {dateTime: dateTimeEnd}
                    }
                }, (err, event) => {
                    err ? reject(err) : resolve(event);
                }
                );
            }
        });
    });
};

const updateCalendarEvent = (dateTimeStart, dateTimeEnd, eventID) => {
    return new Promise((resolve, reject) => {

        calendar.events.get({ 
            auth: serviceAccountAuth,
            calendarId: config.GOOGLE_CALENDAR_ID,
            eventId: eventID
        }, (err, calendarResponse) => {              
            if (err || calendarResponse.data.length > 0) {
                reject(err || new Error('O horário solicitado entra em conflito com outro compromisso.'));
            } else {
                const resource = {
                    start: {dateTime: dateTimeStart.toISOString()},
                    end: {dateTime: dateTimeEnd.toISOString()},
                };
                calendar.events.patch({
                    auth: serviceAccountAuth,
                    calendarId: config.GOOGLE_CALENDAR_ID,
                    eventId: eventID,
                    resource: resource
                }, (err, event) => {
                    err ? reject(err) : resolve(event);
                });
            }
        });
    });
};


export default { createCalendarEvent, updateCalendarEvent };