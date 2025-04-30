import { pool } from '../../db.js';
export const saveCompanyRow = async (body) => {
  const query = 'INSERT INTO companies SET ?';
  try {
    const [result] = await pool.query(query, [body]);
    return { id: result.insertId, ...body };
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error('Database error');
  }
};