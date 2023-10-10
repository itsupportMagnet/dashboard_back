import { pool } from '../../db.js';

export const getSales = async () => {
    const query = "SELECT * FROM sales_gross";
    return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    })
  }