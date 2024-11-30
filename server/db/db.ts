import { Pool } from 'pg';

// Define the pool type for better TypeScript support
const pool = new Pool({
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || '5432', 10), // Default to 5432 if DB_PORT is undefined
});

export default pool;
