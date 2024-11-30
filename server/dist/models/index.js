"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = exports.User = exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
const user_js_1 = require("./user.js");
const ticket_js_1 = require("./ticket.js");
const sequelize = process.env.DB_URL
    ? new sequelize_1.Sequelize(process.env.DB_URL)
    : new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
exports.sequelize = sequelize;
const User = (0, user_js_1.UserFactory)(sequelize);
exports.User = User;
const Ticket = (0, ticket_js_1.TicketFactory)(sequelize);
exports.Ticket = Ticket;
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
