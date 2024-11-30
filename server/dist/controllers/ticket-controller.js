"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = void 0;
const ticket_js_1 = require("../models/ticket.js");
const user_js_1 = require("../models/user.js");
// GET /tickets
const getAllTickets = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticket_js_1.Ticket.findAll({
            include: [
                {
                    model: user_js_1.User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllTickets = getAllTickets;
// GET /tickets/:id
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield ticket_js_1.Ticket.findByPk(id, {
            include: [
                {
                    model: user_js_1.User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        if (ticket) {
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTicketById = getTicketById;
// POST /tickets
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, status, description, assignedUserId } = req.body;
    try {
        const newTicket = yield ticket_js_1.Ticket.create({ name, status, description, assignedUserId });
        res.status(201).json(newTicket);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createTicket = createTicket;
// PUT /tickets/:id
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        const ticket = yield ticket_js_1.Ticket.findByPk(id);
        if (ticket) {
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            ticket.assignedUserId = assignedUserId;
            yield ticket.save();
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateTicket = updateTicket;
// DELETE /tickets/:id
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield ticket_js_1.Ticket.findByPk(id);
        if (ticket) {
            yield ticket.destroy();
            res.json({ message: 'Ticket deleted' });
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTicket = deleteTicket;
