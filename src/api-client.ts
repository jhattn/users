import { Client } from 'pg';

const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'tabcorp',
  password: '12345',
  port: parseInt(process.env.DB_PORT ?? '5432', 10)
});

pgClient
  .connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err.stack));

export default pgClient;
