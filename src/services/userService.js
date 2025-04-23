import { pool } from '../../db.js';
export const createUser = async (fullName, userName, email, password, phone, role) => {
  const query = 'INSERT INTO users (fullName, userName, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [fullName, userName, email, password, phone, role]);
    return { id: result.insertId, fullName, userName, email, password, phone, role };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database error');
  }
};