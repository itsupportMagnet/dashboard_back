import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

const { dbHost, dbUser, dbPassword, dbDataBase, dbPort } = process.env;
export const pool = createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  port: dbPort,
  database: dbDataBase
});

