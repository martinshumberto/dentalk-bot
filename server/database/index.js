import Sequelize from 'sequelize';
import Leads from '../models/Lead';
import CalendarEvents from '../models/CalendarEvent';
import databaseConfig from '../config/database';

const models = [Leads, CalendarEvents];
class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection));
    }
}
export default new Database();