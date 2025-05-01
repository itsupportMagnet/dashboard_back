import { pool } from '../../db.js';
import crypto from 'crypto';
export const saveCompanyRow = async (body) => {
  const invite_code = crypto.randomBytes(5).toString('hex');
  const bodyWithCode = { ...body, invite_code };
  const query = 'INSERT INTO companies SET ?';
  try {
    const [result] = await pool.query(query, [bodyWithCode]);
    return { id: result.insertId, ...body };
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error('Database error');
  }
};