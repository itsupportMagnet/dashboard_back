import { createPool } from "mysql2/promise";

const {dbHost, dbUser, dbPassword, dbDataBase} = process.env

export const pool = createPool({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
	port: dbPort,
	database: dbDataBase
})
