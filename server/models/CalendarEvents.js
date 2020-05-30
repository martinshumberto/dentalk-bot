'use strict';

import { Model, DataTypes } from 'sequelize';
import CustomDataTypes from '../utils/sequelize-timestamp';

class CalendarEvents extends Model {
    static init(sequelize) {
        super.init({
            sender_id: DataTypes.STRING,
            event_id: DataTypes.STRING,
            status: DataTypes.STRING,
            link: DataTypes.STRING(1234),
            summary: DataTypes.STRING,
            description: DataTypes.STRING,
            start: CustomDataTypes.TIMESTAMP,
            end: CustomDataTypes.TIMESTAMP
        }, {
            sequelize 
        });
    }
}


export default CalendarEvents;