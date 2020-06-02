import Sequelize from 'sequelize';
import configDB from '../config/database';
import Lead from '../models/Lead';
import CalendarEvent from '../models/CalendarEvent';

const models = [Lead, CalendarEvent];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(configDB);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();