import { createPool } from "mysql2/promise";

const { dbHost, dbUser, dbPassword, dbDataBase, dbPort } = process.env

export const pool = createPool({
	host: 'tms-database-do-user-15719841-0.c.db.ondigitalocean.com',
	user: 'doadmin',
	password: 'AVNS_MDpFBK2FccFXVeXfw5r',
	port: '25060',
	database: 'develop'
})