import Calendar from '../models/CalendarEvents';

export default {
    async index(req, res) {
        const calendarEvents = await Calendar.findAll();
        return res.json(calendarEvents);
    }
};