import { pool } from '../../db.js';
export const generateNextQuoteID = async () => {
  const query = `
    SELECT CONCAT('MGT', LPAD(MAX(CAST(SUBSTRING(quoteID, 4) AS UNSIGNED)) + 1, 4, '0')) AS nextQuoteID
    FROM (
      SELECT quoteID FROM EasyFreightDB.quotes
      UNION ALL
      SELECT quoteID FROM EasyFreightDB.closed_quotes
    ) AS all_quotes;
  `;

  try {
    const [rows] = await pool.query(query);
    return rows[0].nextQuoteID;
  } catch (error) {
    console.error('Error fetching the next quoteID:', error);
    throw error;
  }
};

export const saveNewQuote = async (quoteID, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, hazardous, bonded, loadType, quoteStatus, cordinator, idCompany) => {
  try {
    const query = 'INSERT INTO quotes (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType, quoteStatus, cordinator, company_userID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    await pool.query(query, [quoteID, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, hazardous, bonded, loadType, quoteStatus, cordinator, idCompany]);
  } catch (error) {
    console.error('Error saving new quote:', error);
    throw error;
  }
};
