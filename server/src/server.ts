import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Optional: Control whether to force database refresh (useful for development/testing)
const forceDatabaseRefresh = process.env.FORCE_DB_REFRESH === 'true';

// Middleware to serve static files from the client's dist folder
app.use(express.static('../client/dist'));

// Middleware to parse incoming JSON requests
app.use(express.json());

// API routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize
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

export default app; // Useful for testing
