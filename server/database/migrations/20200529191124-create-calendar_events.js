'use strict';

export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('calendar_events', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            eventID: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            senderID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
            },
            link: {
                type: Sequelize.STRING(1234),
            },
            summary: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            start: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            end: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
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
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('leads');
    }
};
