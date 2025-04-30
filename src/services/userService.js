import { pool } from '../../db.js';
export const createUser = async (fullName, userName, email, password, phone, role, company_userID) => {
  const query = 'INSERT INTO users (fullName, userName, email, password, phone, role, company_userID) VALUES (?, ?, ?, ?, ?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [fullName, userName, email, password, phone, role, company_userID]);
    return { id: result.insertId, fullName, userName, email, password, phone, role, company_userID };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database error');
  }
};

export const updateUserDetails = async (id, fullName, userName, phone, role) => {
  const query = 'UPDATE users SET fullName = ?, userName = ?, phone = ?, role = ? WHERE id = ?';
  try {
    const [result] = await pool.execute(query, [fullName, userName, phone, role, id]);
    if (result.affectedRows === 0) {
      throw new Error('User not found or no changes were made');
    }

    return { id, fullName, userName, phone, role };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Database error');
  }
};

export const updateUserPassword = async (id, hashedNewPassword) => {
  const query = 'UPDATE users SET password = ? WHERE id = ?';

  try {
    const [result] = await pool.execute(query, [hashedNewPassword, id]);

    if (result.affectedRows === 0) {
      throw new Error('User not found or no changes were made');
    }
    return { id: id};
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Database error');
  }
};


