import Calendar from '../models/CalendarEvent';

export default {
    async index(req, res) {
        const calendarEvents = await Calendar.findAll();
        return res.json(calendarEvents);
    }
};