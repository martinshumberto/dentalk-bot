'use strict';

export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('leads', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            sender_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            profile_pic: {
                type: Sequelize.STRING(1234),
            },
            first_name: {
                type: Sequelize.STRING,
            },
            last_name: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
            locale: {
                type: Sequelize.STRING,
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            updated_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.DATE,
                defaultValue: null
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('leads');
    }
};
