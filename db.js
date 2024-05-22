import { createPool } from "mysql2/promise";

const { dbHost, dbUser, dbPassword, dbDataBase, dbPort } = process.env

export const pool = createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  port: dbPort,
  database: dbDataBase
})

