'use strict';
import config from '../config/variables';
import moment from 'moment';
import { google } from 'googleapis';

const serviceAccountAuth = new google.auth.JWT({
    email: config.GOOGLE_CLIENT_EMAIL,
    key: process.env.NODE_ENV === 'development' ? config.GOOGLE_PRIVATE_KEY : JSON.parse(config.GOOGLE_PRIVATE_KEY),
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
                        summary: `Consulta de ${userDB.first_name}`,
                        description: `Nome do paciente: ${userDB.first_name} ${userDB.last_name} \nTelefone: ${userDB.phone} \nE-mail: ${userDB.email} \n\nAgendamento realizado em: Facebook - ${moment().format('DD/MM/YYYY HH:mm')}`,
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

const deleteCalendarEvent = (eventID) => {
    return new Promise((resolve, reject) => {

        calendar.events.delete({
            auth: serviceAccountAuth,
            calendarId: config.GOOGLE_CALENDAR_ID,
            eventId: eventID
        }, function(err) {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject();
            }
            resolve();
        });
    });
};

const currentlyOpen = () => {
    let date = new Date();
    date.setHours(date.getHours() + parseInt('-03:00'.split(':')[0]));
    date.setMinutes(date.getMinutes() + parseInt('-03:00'.split(':')[0][0] + '-03:00'.split(':')[1]));

    return date.getDay() >= 1 &&
      date.getDay() <= 5 &&
      date.getHours() >= 8 &&
      date.getHours() <= 18;
};

const daysFromSlots = (startTime, endTime) => {
    return new Promise((resolve) => {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        startDate.setHours('0', '00', '00');
        endDate.setHours('23', '59', '59');

        const check = {
            auth: serviceAccountAuth,
            resource: {
                items: [{id: config.GOOGLE_CALENDAR_ID}],
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                timeZone: '-03:00'
            }
        };
        calendar.freebusy.query(check).then((data) => {
            resolve(receivedSlotsDays(startDate, endDate, data.data.calendars[`${config.GOOGLE_CALENDAR_ID}`].busy));
        });
    });
};

const receivedSlotsDays = (start, end, events) => {
    return new Promise((resolve) => {
        const freeSlots = []; 
        
        events.forEach(function (event, index) {
            if (index == 0 && start < event.start) {
                freeSlots.push({startDate: start, endDate: event.start});
            }
            else if (index == 0) {
                start = event.end;
            }
            else if (events[index - 1].end < event.start) {
                freeSlots.push({startDate: events[index - 1].end, endDate: event.start});
            }
    
            if (events.length == (index + 1) && event.end < start) {
                freeSlots.push({startDate: event.end, endDate: start});
            }
        });
        resolve(freeSlots);
    });
};

const slotsFromEvents = (startTime) => {
    return new Promise((resolve) => {
        const startDate = new Date(startTime);
        const endDate = new Date(startTime);
        startDate.setHours('08', '00', '00', '00');
        endDate.setHours('18', '00', '00', '00');

        const check = {
            auth: serviceAccountAuth,
            resource: {
                items: [{id: config.GOOGLE_CALENDAR_ID}],
                timeMin: startDate.toISOString(),
                timeMax: endDate.toISOString(),
                timeZone: '-03:00'
            }
        };
        calendar.freebusy.query(check).then((data) => {
            resolve(receivedSlotsHours(startDate, endDate, data.data.calendars[`${config.GOOGLE_CALENDAR_ID}`].busy));
        });
    });
};

const receivedSlotsHours = (start, end, events) => {
    return new Promise((resolve) => {
        const start_org = start.toISOString();
        const end_org = end.toISOString();
        let freeSlots = [];
        let start_time = moment(start_org).format();
        let end_time = moment(end_org).format();
        end_time = end_time.valueOf();
        let appt_start_time = start_time;
        appt_start_time = new Date(appt_start_time).getTime();
        end_time = new Date(end_time).getTime();

        while (appt_start_time < end_time) {
            const appt_end_time = appt_start_time + 1799;
    
            let slot_available = true;
            events.forEach((event) => {
                const this_start = new Date(event['start']).getTime();
                const this_end = new Date(event['end']).getTime();
    
                if ((appt_start_time >= this_start && appt_start_time < this_end) ||
                (appt_end_time >= this_start && appt_end_time < this_end)) {
                    slot_available = false;
                    return false;
                }
            });
    
            if (slot_available) {
                const date = new Date(parseInt(appt_start_time));
                freeSlots.push(date);
            }
    
            appt_start_time += (600 * 6000);
        }
        resolve(freeSlots);
    });
};


export default { 
    createCalendarEvent, 
    updateCalendarEvent, 
    deleteCalendarEvent, 
    currentlyOpen, 
    daysFromSlots, 
    slotsFromEvents 
};