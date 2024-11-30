"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
exports.TicketFactory = TicketFactory;
const sequelize_1 = require("sequelize");
class Ticket extends sequelize_1.Model {
}
exports.Ticket = Ticket;
function TicketFactory(sequelize) {
    Ticket.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        assignedUserId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'tickets',
        sequelize,
    });
    return Ticket;
}
