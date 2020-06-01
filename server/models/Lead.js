'use strict';

import { Model, DataTypes } from 'sequelize';
class Lead extends Model {
    static init(sequelize) {
        super.init({
            sender_id: DataTypes.STRING,
            profile_pic: DataTypes.STRING(1234),
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            gender: DataTypes.STRING,
            locale: DataTypes.STRING
        }, {
            sequelize 
        });
    }
}

export default Lead;