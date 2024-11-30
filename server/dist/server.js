"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const index_js_2 = require("./models/index.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Optional: Control whether to force database refresh (useful for development/testing)
const forceDatabaseRefresh = process.env.FORCE_DB_REFRESH === 'true';
// Middleware to serve static files from the client's dist folder
app.use(express_1.default.static('../client/dist'));
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// API routes
app.use(index_js_1.default);
// Sync Sequelize models and start the server
index_js_2.sequelize
    .sync({ force: forceDatabaseRefresh })
    .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error syncing the database:', err);
    process.exit(1); // Exit with failure if the database connection fails
});
exports.default = app; // Useful for testing
