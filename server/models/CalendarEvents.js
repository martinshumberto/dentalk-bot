'use strict';

import { Model, DataTypes } from 'sequelize';

class CalendarEvents extends Model {
    static init(sequelize) {
        super.init({
            sender_id: DataTypes.STRING,
            event_id: DataTypes.STRING,
            status: DataTypes.STRING,
            link: DataTypes.STRING(1234),
            summary: DataTypes.STRING,
            description: DataTypes.STRING,
            start: DataTypes.DATE,
            end: DataTypes.DATE
        }, {
            sequelize 
        });
    }
}


export default CalendarEvents;