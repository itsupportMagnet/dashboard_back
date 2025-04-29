import { pool } from '../../db.js';


export const getUserEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  return pool.query(query, [email])
    .then(rows => { return rows[0]; }).catch(error => {
      console.error(error);
      throw error;
    });
};

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  try {
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Database error');
  }
};

export const saveNewQuoteFee = async (id,
  modeOfOperation,
  pol,
  deliveryAddress,
  equipment,
  containerSize,
  containerType,
  weight,
  commodity,
  otherCommodity,
  hazardous,
  hazardousClass,
  bonded,
  loadType,
  date,
  carrierEmail,
  buyDrayageUnitRate,
  buyChassisUnitRate,
  buyaccessorialsJSON,
  sellDrayageUniteRate,
  sellChassisUnitRate,
  sellaccessorialsJSON,
  notes,
  companyID) => {
  const query = 'INSERT INTO carriers_fees (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, buyDrayageUnitRate, buyChassisUnitRate, buyAccesorials, sellDrayageUnitRate, sellChassisUnitRate, sellAccesorials, notes, company_userID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  
  try {
    await pool.query(query, [id, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, buyDrayageUnitRate, buyChassisUnitRate, buyaccessorialsJSON, sellDrayageUniteRate, sellChassisUnitRate, sellaccessorialsJSON, notes, companyID]);
  } catch (error) {
    console.error('Error to get specific quote:', error);
    throw error;
  }
};

export const saveQuoteSent = async (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accessorialsWithFee, client, clientEmailsList) => {

  const accessorialsWithFeeJSON = JSON.stringify(accessorialsWithFee);
  const clientEmailsListJSON = JSON.stringify(clientEmailsList);
  const query = 'INSERT INTO quotes_sent (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accessorialsWithFee, client, clientEmailsList) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  return pool.query(query, [quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accessorialsWithFeeJSON, client, clientEmailsListJSON])
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error('Error on SQL:', error);
      throw error;
    });
};

export const getCarrierFeeByQuoteId = async (id, idCompany) => {
  const query = 'SELECT * FROM carriers_fees WHERE quoteID = ? and company_userID = ?';
  try {
    const [rows] = await pool.query(query, [id, idCompany]);
    return [rows];
  } catch (error) {
    console.error('Error to get specific quote:', error);
    throw error;
  }
};

export const getQuoteFeeById = async (id) => {
  const query = 'SELECT * FROM carriers_fees WHERE quoteID = ?';
  try {
    const [rows] = await pool.query(query, [id]);
    return [rows];
  } catch (error) {
    console.error('Error to get specific quote:', error);
    throw error;
  }
};

export const updateCarrierFeeById = async (id, data) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    throw new Error('No valid fields provided for update');
  }

  const query = `UPDATE carriers_fees SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  return pool.query(query, values)
    .then(() => true)
    .catch(error => {
      console.log('Error trying to update fee', error);
      throw error;
    });
};

export const deleteClosedQuoteById = async (id) => {
  const query = 'DELETE FROM closed_quotes WHERE quoteID = ?';
  return pool.query(query, [id])
    .then(() => true)
    .catch(error => {
      console.error('Error trying to delete quote:', error);
      throw error;
    });
};

export const deleteQuoteById = async (id) => {
  const query = 'DELETE FROM quotes WHERE id = ?';
  return pool.query(query, [id])
    .then(() => true)
    .catch(error => {
      console.error('Error trying to delete quote:', error);
      throw error;
    });
};

//Check in quotes to move to closed_quotes
export const getQuoteById = async (id) => {
  const query = 'SELECT * FROM EasyFreightDB.quotes q LEFT JOIN EasyFreightDB.carriers_fees cf ON q.id = cf.quoteId WHERE q.id = ?';
  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all quotes:', error);
      throw error;
    });
};

export const getQuoteByIdAndCompanyID = async (id, idCompany) => {
  const query = 'SELECT * FROM quotes WHERE id = ? AND company_userID = ?';
  return pool.query(query, [id, idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all quotes:', error);
      throw error;
    });
};

export const allCarriers = async () => {
  const query = 'SELECT * FROM carrier_emails';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log('Error trying to get all carriers', error);
      throw error;
    });
};

export const getRoutes = async () => {
  const query = 'SELECT * FROM quotes_sent';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all quotes:', error);
      throw error;
    });
};

export const getPorts = async () => {
  const query = 'SELECT * from ports';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get the ports:', error);
      throw error;
    });
};


export const getQuotes = async (id) => {
  const query = 'SELECT id, modeOfOperation, quoteStatus , pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType, date ,cordinator FROM quotes WHERE company_userID = ? ';
  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all quotes:', error); //comment
      throw error;
    });
};


export const getApprovedQuotes = async (id) => {
  const query = 'SELECT * FROM quotes WHERE company_userID = ? and quoteStatus = 5';
  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all quotes:', error); //comment
      throw error;
    });
};

export const getSales = async (id) => {
  const query = `SELECT o.*, 
    f.operationId,
    f.buyAccesorials,
    f.buyAccesorialsQuantity,
    f.sellAccesorials,
    f.sellAccesorialsQuantity,
    f.notes,
    f.totalCost,
    f.totalSell,
    f.created_at,
    f.updated_at
    FROM operations o
    LEFT JOIN operation_fees f ON o.id = f.operationId
    WHERE o.status = 3 && o.company_userID = ?`;
  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getCities = async () => {
  const query = 'SELECT * FROM cities';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getCitiesID = async (id) => {
  const query = 'SELECT * FROM cities WHERE state_id = ?';
  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getClients = async () => {
  const query = 'SELECT * FROM clients';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getProviders = async (idCompany) => {
  const query = 'SELECT * FROM providers WHERE company_userID = ?';
  return pool.query(query, [idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getCarriers = async (selectedPort, idCompany) => {
  const query = 'SELECT * from carrier_emails WHERE port_id = ? AND company_userID = ?';
  return pool.query(query, [selectedPort, idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get the ports:', error);
      throw error;
    });
};

export const getCarriersList = async (id) => {
  const query = `
    SELECT c.id, 
           c.name, 
           c.contact, 
           c.mc, 
           c.dot, 
           c.SCAC, 
           c.EIN, 
           c.\`1099\`, 
           c.insurance, 
           c.address, 
           c.city, 
           c.state, 
           c.country, 
           c.DOCT, 
           c.type,
           c.contact_email, 
           c.phone_number, 
           c.ports
    FROM carriers c
    WHERE c.company_userID = ?;
`;


  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all quotes:', error);
      throw error;
    });
};

export const saveNewOperation = async (quoteID, warehouseID, idCompany, modeOfOperation, customer, businessLine, scheduledAction, coordinator, bookingBl, containerId, provider, port, inptEmptyPickUp, inptFullPickUp, ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, cargoCut, timeLine, lfd, status, containerStatus, qty) => {
  const query = 'INSERT INTO operations(quoteID, warehouseID, company_userID, modeOfOperation, customer, businessLine, scheduledAction, coordinator, bookingBl, containerId, provider, port, emptyPickUp, fullPickUp, ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous , bonded, cargoCut, timeLine, lfd, status, containerStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  try {
    for (let i = 0; i < qty; i++) {
      await pool.query(query, [
        quoteID, warehouseID, idCompany, modeOfOperation, customer, businessLine, scheduledAction, coordinator, bookingBl,
        containerId, provider, port, inptEmptyPickUp, inptFullPickUp, ssline, state, city, equipment, containerSize, containerType,
        weight, commodity, hazardous, bonded, cargoCut, timeLine, lfd, status, containerStatus
      ]);
    }
  } catch (error) {
    console.error('Error to ger specific newOperation:', error);
    throw error;
  }
};

export const getTerminals = async (id) => {
  const query = 'SELECT * from port_terminals WHERE port_id = ?';
  return pool.query(query, [id])
    .then(rows => { return rows[0]; })
    .catch(error => {
      console.error('Error trying to get all terminals of port', error);
      throw error;
    });
};

export const getAllOperations = async () => {
  const query = 'SELECT * FROM operations';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all operations', error);
      throw error;
    });
};

export const changeOperationStatus = async (idOperation, status, idCompany) => {
  const query = 'UPDATE operations SET status = ? WHERE idOperation = ? AND company_userID = ?';
  return pool.query(query, [status, idOperation, idCompany])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL:', error);
      throw error;
    });
};

export const changeOperationContainerStatus = async (idOperation, status, idCompany) => {
  const query = 'UPDATE operations SET containerStatus = ? WHERE idOperation = ? AND company_userID = ?';
  return pool.query(query, [status, idOperation, idCompany])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL:', error);
      throw error;
    });
};

export const changeBookingBl = async (idOperation, bookingBl, idCompany) => {
  const query = 'UPDATE operations SET bookingBl = ? WHERE idOperation = ? AND company_userID = ?';
  return pool.query(query, [bookingBl, idOperation, idCompany])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL:', error);
      throw error;
    });
};

export const changeContainerId = async (idOperation, containerId, idCompany) => {
  const query = 'UPDATE operations SET containerId = ? WHERE idOperation = ? AND company_userID = ?';
  return pool.query(query, [containerId, idOperation, idCompany])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL:', error);
      throw error;
    });
};

export const getOperationByIdAndCompany = async (operationId, idCompany) => {
  const query = `SELECT operations.*, closed_quotes.*
  FROM operations
  LEFT JOIN closed_quotes ON operations.quoteID = closed_quotes.quoteID
  WHERE operations.id = ? AND operations.company_userID = ?`;
  return pool.query(query, [operationId, idCompany])
    .then(data => {
      console.log(data[0]);
      return data[0];
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getOperationById = async (operationId) => {
  const query = 'SELECT * FROM operations WHERE quoteID = ?';
  return pool.query(query, [operationId, operationId])
    .then(data => {
      console.log(data[0]);
      return data[0];
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const addNewClient = async (clientData) => {
  const {
    customerType, 
    name, 
    contact, 
    phoneNumber, 
    email, 
    country, 
    city, 
    address, 
    creditTerms, 
    idCompany,
  } = clientData;
  const query = `
    INSERT INTO clients (type, name, contact, phone, email, country, city, address, creditTerms, company_userID) VALUES (?,?,?,?,?,?,?,?,?,?)`;

  try {
    const [result] = await pool.query(query, [
      customerType, name, contact, phoneNumber, email, country, city, address, creditTerms, idCompany
    ]); 

    const newClientId = result.insertId;
    return newClientId;
  } catch (error) {
    console.error('Error on SQL:', error.message || error);
    throw new Error('Failed to add new carrier');
  }
};

export const addNewCarrier = async (carrierData) => {
  const {
    name,
    contact,
    mc,
    dot,
    SCAC,
    EIN,
    form1099,
    insurance,
    address,
    city,
    zipcode,
    state,
    country,
    doct,
    carrierType,
    carrierPhone,
    carrierEmail,
    idCompany,
    ports
  } = carrierData;


  const query = `
    INSERT INTO carriers 
    (name, contact, mc, dot, SCAC, EIN, \`1099\`, insurance, address, city, state, country, DOCT, type, phone_number, contact_email, company_userID, ports) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await pool.query(query, [
      name, contact, mc, dot, SCAC, EIN, form1099, insurance, address, city, state, country, doct, 
      carrierType, carrierPhone, carrierEmail, idCompany, ports
    ]);

    const newCarrierId = result.insertId;
    return newCarrierId;
  } catch (error) {
    console.error('Error on SQL:', error.message || error);
    throw new Error('Failed to add new carrier');
  }
};

export const getStates = async () => {
  const query = 'SELECT * from states';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get the ports:', error);
      throw error;
    });
};

export const changeQuote = async (status, id) => {
  const query = 'UPDATE quotes SET quoteStatus = ? WHERE id = ?';
  return pool.query(query, [status, id])
    .then(() => { return true; })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getAllContainerStatus = async () => {
  const query = 'SELECT * FROM container_status';
  return pool.query(query)
    .then(row => row[0])
    .catch(error => {
      console.error('Error trying to get the ports:', error);
      throw error;
    });
};

export const getAllQuoteIds = async (idCompany) => {
  const query = 'SELECT quoteID FROM carriers_fees WHERE company_userID = ? ';
  return pool.query(query, [idCompany])
    .then(row => row[0])
    .catch(error => {
      console.error('Error trying to get the ports:', error);
      throw error;
    });
};

export const changeNote = async (note, idOperation, idCompany) => {
  //consulta SQL
  const query = 'UPDATE operations SET notes = ? WHERE idOperation = ? and company_userID = ?';
  //ejecución de consulta(query)
  return pool.query(query, [note, idOperation, idCompany])
    .then(() => { return true; })
    .catch(error => {
      console.log(error);
      throw (error);
    });
};
export const changeQuoteIdById = async (quoteID, idOperation, idCompany) => {
  const query = 'UPDATE operations SET quoteID = ? WHERE idOperation = ? AND company_userID = ?;';

  return pool.query(query, [quoteID, idOperation, idCompany])
    .then(() => { return true; })
    .catch(error => {
      console.log(error);
      throw error;
    });
};
export const changeWeightxId = async (weight, idOperation) => {
  const query = 'UPDATE operations SET weight = ? WHERE idOperation = ?;';
  return pool.query(query, [weight, idOperation])
    .then(() => { return true; })
    .catch((error) => console.log(error));
};


export const updateOperationFees = async (operationData) => {
  const keys = Object.keys(operationData);
  
  const fields = keys.join(', ');
  const placeholders = keys.map(() => '?').join(', ');
  const updateFields = keys
    .filter(key => key !== 'id') // evitar actualizar la PK
    .map(key => `${key} = VALUES(${key})`)
    .join(', ');

  const values = Object.values(operationData);

  const query = `
    INSERT INTO operation_fees (${fields})
    VALUES (${placeholders})
    ON DUPLICATE KEY UPDATE ${updateFields}
  `;

  return pool.query(query, values)
    .then(() => true)
    .catch((error) => console.log(error));
};

export const updateOperation = async (operationData) => {
  const fieldMappings = {
    inptEmptyPickUp: 'emptyPickUp',
    inptFullPickUp: 'fullPickUp',
    idCompany: 'company_userID'
  };

  Object.keys(fieldMappings).forEach((oldKey) => {
    if (Object.prototype.hasOwnProperty.call(operationData, oldKey)) {
      operationData[fieldMappings[oldKey]] = operationData[oldKey];
      delete operationData[oldKey];
    }
  });
  
  const setFields = Object.entries(operationData)
    .filter(([key, value]) => key !== 'idOperation' && value !== undefined && value !== null)
    .map(([key, value]) => `${key} = ?`)
    .join(', ');

  if (!setFields) throw new Error('No valid fields to update.');
  const values = Object.entries(operationData)
    .filter(([key, value]) => key !== 'idOperation' && value !== undefined && value !== null)
    .map(([key, value]) => value);
  values.push(operationData.idOperation);
  const query = `UPDATE operations SET ${setFields} WHERE id = ?`;

  return pool.query(query, values)
    .then(() => true)
    .catch((error) => console.log(error));
};

export const getAllOperationsForTable = async (id) => {
  const query = 'SELECT * FROM operations WHERE company_userID = ?';
  return pool.query(query, [id])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get all operations', error);
      throw error;
    });
};
export const getAllClosedCompletedQuotes = async (id) => {
  const query = `
  SELECT * 
  FROM closed_quotes 
  WHERE company_userID = ? 
  AND warehouseID IS NOT NULL 
  AND warehouseID != '';
  `;
  return pool.query(query, [id]).then(row => row[0])
    .catch(error => {
      console.error('Error trying to get all florida operations', error);
      throw error;
    });
};

export const getAllClosedQuotes = async (id) => {
  const query = 'SELECT * FROM closed_quotes WHERE company_userID = ? ';
  return pool.query(query, [id]).then(row => row[0])
    .catch(error => {
      console.error('Error trying to get all florida operations', error);
      throw error;
    });
};

export const getAllRequestedQuotes = async (id) => {
  const query = 'SELECT * FROM quotes WHERE company_userID = ? && quoteStatus != 5 && quoteStatus != 6';
  return pool.query(query, [id]).then(row => row[0])
    .catch(error => {
      console.error('Error trying to get all florida operations', error);
      throw error;
    });
};
export const getAllQuotesWithFees = async (id) => {
  const query = 'SELECT q.*, cf.carrierEmail FROM EasyFreightDB.quotes q JOIN EasyFreightDB.carriers_fees cf ON q.id = cf.quoteId WHERE q.company_userID = ? AND q.quoteStatus NOT IN (5, 6)';
  return pool.query(query, [id]).then(row => row[0])
    .catch(error => {
      console.error('Error trying to get all florida operations', error);
      throw error;
    });
};

export const deleteOperationByID = async (id) => {
  const query = 'DELETE FROM operations WHERE id = ?';
  return pool.execute(query, [id])
    .then(() => { console.log('Operation Deleted Successfully'); })
    .catch(error => {
      console.log('Error Operation Delete', error);
      throw error;
    });

};

export const create = async (userName, email, password) => {
  const query = 'INSERT INTO users (userID,email, password,rol, userName) VALUES (?,?,?,?,?)';
  let userID = `users${Math.floor(Math.random() * 100000) + 100}`;
  return pool.execute(query, [userID, email, password, 2, userName])
    .then(() => 'Se creo con éxito')
    .catch((error) => error);
};

export const newInputQuerySaleGross = async (bookingBl, containerId, provider, customer, date) => {
  const query = 'INSERT INTO sales_gross (booking_bl, container_id, provider, customer, invoice_date) VALUES (?,?,?,?,?)';

  return pool.query(query, [bookingBl, containerId, provider, customer, date])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL Query', error);
      throw error;
    });

};

export const newInputQueryFLSaleGross = async (operationId, bookingBl, containerId, provider, customer, buy, sell, profit, date, carrieraccessorials, magnetaccessorials, buyChassis, sellChassis) => {
  const query = 'INSERT INTO sales_gross (operation_id ,booking_bl, container_id, provider, customer, buy, sell, profit, invoice_date, buyaccessorials, sellaccessorials, buyChassis, sellChassis) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

  return pool.query(query, [operationId, bookingBl, containerId, provider, customer, buy, sell, profit, date, carrieraccessorials, magnetaccessorials, buyChassis, sellChassis,])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL Query test' + error);
    });
};

export const changeProviderSalesGross = async (idSalesGross, providerInvoice) => {
  const query = 'UPDATE sales_gross SET provider_invoice = ? WHERE id = ?';
  return pool.query(query, [providerInvoice, idSalesGross])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL: ', error);
      throw error;
    });
};

export const changeCustomerInvoiceSalesGross = async (idSalesGross, customerInvoice) => {
  const query = 'UPDATE sales_gross SET invoice = ? WHERE id = ?';
  return pool.query(query, [customerInvoice, idSalesGross])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL: ', error);
      throw error;
    });
};

export const changeStatusSalesGross = async (idSalesGross, statusSalesGross) => {
  const query = 'UPDATE sales_gross SET status = ? WHERE id = ?';
  return pool.query(query, [statusSalesGross, idSalesGross])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL :', error);
      throw error;
    });
};

export const changeBuySalesGross = async (idSalesGross, buySalesGross) => {
  const query = 'UPDATE sales_gross SET buy = ? WHERE id = ?';
  return pool.query(query, [buySalesGross, idSalesGross])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;
    });
};

export const changeSellSalesGross = async (idSalesGross, sellSalesGross) => {
  const query = 'UPDATE sales_gross SET sell = ? WHERE id = ?';
  return pool.query(query, [sellSalesGross, idSalesGross])
    .then(() => { return true; }).catch(error => {
      console.error('Error on SQl : ' + error);
      throw error;
    });
};

export const changeProfitSalesGross = async (idSalesGross, profitSalesGross) => {
  const query = 'UPDATE sales_gross SET profit = ? WHERE id = ?';
  return pool.query(query, [profitSalesGross, idSalesGross])
    .then(() => { return true; })
    .catch(error => {
      console.error('Error on SQL :' + error);
      throw error;
    });
};

export const deleteSaleById = async (id, idCompany) => {
  const query = 'DELETE FROM sales_gross WHERE id = ? AND company_userID = ?';
  console.log('Testeo De eliminar query: ', pool.format(query, [id, idCompany]));
  return pool.query(query, [id, idCompany])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL :' + error);
      throw error;
    });
};

export const getAllClosedQuoteId = async (idCompany) => {
  const query = 'SELECT quoteID FROM closed_quotes WHERE company_userID = ?';
  return pool.query(query, [idCompany])
    .then(row => row[0])
    .catch(error => {
      console.error('Error trying to get the quotes id:', error);
      throw error;
    });
};

export const getClosedQuoteById = async (id, idCompany) => {
  const query = 'SELECT * FROM closed_quotes WHERE quoteID = ? AND company_userID = ?';
  return pool.query(query, [id, idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get the quotes id:', error);
      throw error;
    });
};

export const getNormalQuoteById = async (id, idCompany) => {
  const query = 'SELECT * FROM carriers_fees WHERE quoteID = ? AND company_userID = ?';
  return pool.query(query, [id, idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error trying to get the quotes id:', error);
      throw error;
    });
};

export const updateSaleGrossById = async (operation_id, booking_bl, container_id, provider, customer, date, buy, sell, profit, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, idCompany) => {

  const query = 'UPDATE sales_gross SET booking_bl = ?, container_id = ?, provider = ?, customer = ?, date = ?, buy = ? , sell = ? , profit = ?,  buyaccessorials = ?, sellaccessorials = ?, buyDrayageUnitRate = ?, buyChassisUnitRate = ?, buyQtyChassis = ?, sellDrayageUnitRate = ?, sellChassisUnitRate = ?, sellQtyChassis = ?  WHERE operation_id = ? AND company_userID = ?';
  console.log('Consulta SQL para Update: ', pool.format(query, [booking_bl, container_id, provider, customer, date, buy, sell, profit, JSON.stringify(buyaccessorials), JSON.stringify(sellaccessorials), buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, operation_id, idCompany]));
  return pool.query(query, [booking_bl, container_id, provider, customer, date, buy, sell, profit, JSON.stringify(buyaccessorials), JSON.stringify(sellaccessorials), buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, operation_id, idCompany])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;
    });
};

export const deleteClientById = async (id) => {
  const query = 'DELETE FROM clients WHERE id = ?';
  return pool.query(query, [id])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL :' + error);
      throw error;
    });
};

export const getClientByIdAndCompany = async (idClient, idCompany) => {
  const query = 'SELECT * FROM clients WHERE id_Client = ? AND company_userID = ? ';
  return pool.query(query, [idClient, idCompany])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const changeClientInfo = async (customerId, customerType, name, contact, phoneNumber, email, country, state, city, zipcode, address, creditTerms, idCompany) => {
  const query = 'UPDATE clients SET type = ?, name = ?, contact = ?, phone = ?, email = ? , country = ? , state = ?, city = ?, zipcode = ?, address = ?, creditTerms = ? WHERE id_Client = ? AND company_userID = ?';
  console.log('Consulta SQL UpdateClients: ', pool.format(query, [customerType, name, contact, phoneNumber, email, country, state, city, zipcode, address, creditTerms, customerId, idCompany]));
  return pool.query(query, [customerType, name, contact, phoneNumber, email, country, state, city, zipcode, address, creditTerms, customerId, idCompany])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;
    });
};

export const changeSummarySalesGrossById = async (operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount) => {
  const query = 'UPDATE sales_gross SET buyQtyChassis = ?, buyChassisUnitRate = ?, buyChassis = ?, sellQtyChassis = ?, sellChassisUnitRate = ?, sellChassis = ?  WHERE operation_id = ?';
  return pool.query(query, [chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount, operationId])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const newSummaryInputSalesGross = async (operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount) => {
  const query = 'INSERT INTO sales_gross SET buyQtyChassis = ?, buyChassisUnitRate = ?, buyChassis = ?, sellQtyChassis = ?, sellChassisUnitRate = ?, sellChassis = ?  WHERE operation_id = ?';
  return pool.query(query, [chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount, operationId])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const fetchSaleGrossInfoById = async (idOperation) => {
  const query = 'SELECT * FROM sales_gross WHERE operation_id = ?';
  return pool.query(query, [idOperation])
    .then((data) => data[0])
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const newOperationToSalesGross = async (operation_id, booking_bl, container_id, provider, customer, buy, sell, profit, date, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, idCompany) => {
  const query = 'INSERT INTO sales_gross (operation_id, booking_bl, container_id, provider, customer, buy, sell, profit, invoice_date, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, company_userID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  return pool.query(query, [operation_id, booking_bl, container_id, provider, customer, buy, sell, profit, date, JSON.stringify(buyaccessorials), JSON.stringify(sellaccessorials), buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, idCompany])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;
    });
};

export const newClosedQuote = async (quoteData) => {
  try {
    if (!quoteData || Object.keys(quoteData).length === 0) {
      throw new Error('No data provided to insert');
    }

    const query = `INSERT INTO closed_quotes SET ?`;
    await pool.query(query, quoteData);
    
    return true;
  } catch (error) {
    console.error('Error on SQL:', error);
    throw error;
  }
};

export const getAllClientsByCompanyId = async (id) => {
  const query = 'SELECT * FROM clients WHERE company_userID = ?';
  return pool.query(query, [id])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getOperationColFiltered = async (colList, idCompany) => {
  const columns = colList.join(', ');
  const query = `SELECT ${columns} FROM operations WHERE company_userID = ?`;

  return pool.query(query, [idCompany])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const deleteGenericRowById = async (tableCalled, columnCalled, id, idCompany) => {

  const query = `DELETE FROM ${tableCalled} WHERE ${columnCalled} = ? AND company_userID = ? `;

  return pool.query(query, [id, idCompany])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;

    });
};


export const getOpFeeById = async (id) => {
  const query = 'SELECT * FROM operation_fees WHERE operationId = ?';
  return pool.query(query, [id])
    .then(data => {
      const rows = data[0];
      return {
        success: true,
        data: rows,
        empty: rows.length === 0
      };
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getCarrierByIdAndCompany = async (idCarrier, idCompany) => {
  const query = 'SELECT * FROM carriers WHERE id = ? AND company_userID = ?';
  return pool.query(query, [idCarrier, idCompany])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const changeCarrierInfoById = async (carrierId, name, contact, mc, dot, SCAC, EIN, form1099, insurance, address, city, state, country, doct, carrierType, carrierPhone, carrierEmail, idCompany, ports) => {
  const query = 'UPDATE carriers SET name = ? , contact = ?, mc = ? , dot = ? , SCAC = ?, EIN = ?, `1099` = ?, insurance = ? , address = ? , city = ?, state = ? , country = ?, DOCT = ?, type = ?, phone_number = ? , contact_email = ? , ports = ? WHERE id = ? AND company_userID = ?';
  return pool.query(query, [name, contact, mc, dot, SCAC, EIN, form1099, insurance, address, city, state, country, doct, carrierType, carrierPhone, carrierEmail, ports, carrierId, idCompany])
    .then()
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const getClosedQuoteByIdAndCompany = async (closedQuoteId, idCompany) => {
  const query = 'SELECT * from closed_quotes WHERE quoteID = ? AND company_userID = ?';
  return pool.query(query, [closedQuoteId, idCompany])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const changeClosedQuoteInfoById = async (quoteID, operationType, pol, warehouseID, city, state, zipcode, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType, carrierID, carrier, carrierIDPD, buyDrayageUnitRate, buyChassisUnitRate, clientID, client, clientIDPD, sellDrayageUnitRate, sellChassisUnitRate, idCompany) => {
  const query = 'UPDATE closed_quotes SET operationType = ? , pol = ? , wareHouseID = ? , city = ? , state = ? , zipCode = ? , equipment = ? , containerSize = ? , containerType = ? , weight = ?, commodity = ?, hazardous = ? , bonded = ? , loadType = ?, carrierID = ?, carrier = ?, carrierIdPerDestation = ?, buyDrayageUnitRate = ? , buyChassisUnitRate = ? , client = ?, customerIdPerDestation = ?, sellDrayageUnitRate = ?, sellChassisUnitRate = ? WHERE quoteID = ? AND company_userID = ? ';
  
  return pool.query(query, [operationType, pol, warehouseID, city, state, zipcode, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType, carrierID, carrier, carrierIDPD, buyDrayageUnitRate, buyChassisUnitRate, client, clientIDPD, sellDrayageUnitRate, sellChassisUnitRate, quoteID, idCompany])
    .then()
    .catch(error => {
      console.error('Error on Sql: ' + error);
      throw error;
    });
};

export const getAllCarriersNameByCompanyId = async (idCompany) => {
  const query = 'SELECT name FROM carriers WHERE company_userID = ?';
  return pool.query(query, [idCompany])
    .then((rows) => rows[0])
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const getAllSaleGrossToCompare = async (idCompany) => {
  const query = 'SELECT * from sales_gross WHERE company_userID = ?';
  return pool.query(query, [idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};


export const isOperationQuoteIDDuplicated = async (id) => {
  try {
    const checkEmailQuery = 'SELECT COUNT(*) AS quoteIDCount FROM operations WHERE quoteID = ?';
    const [emailCheckResult] = await pool.query(checkEmailQuery, [id]);
    const emailCount = emailCheckResult[0].quoteIDCount;
    return emailCount > 0;
  } catch (error) {
    console.error('Error operation quoteID duplication:', error.message || error);
    throw new Error('Failed');
  }
};
export const isClientEmailDuplicated = async (contact_email) => {
  try {
    const checkEmailQuery = 'SELECT COUNT(*) AS emailCount FROM clients WHERE email = ?';
    const [emailCheckResult] = await pool.query(checkEmailQuery, [contact_email]);
    const emailCount = emailCheckResult[0].emailCount;
    return emailCount > 0;
  } catch (error) {
    console.error('Error checking email duplication:', error.message || error);
    throw new Error('Failed to add carrier ports');
  }
};

export const isQuoteAlreadyClosed = async (id) => {
  try {
    const checkEmailQuery = 'SELECT COUNT(*) AS countID FROM closed_quotes WHERE quoteID = ?';
    const [emailCheckResult] = await pool.query(checkEmailQuery, [id]);
    const emailCount = emailCheckResult[0].countID;
    return emailCount > 0;
  } catch (error) {
    console.error('Error checking quote duplication:', error.message || error);
    throw new Error('Failed to add quote');
  }
}; 

export const isCarrierEmailDuplicated = async (contact_email) => {
  try {
    const checkEmailQuery = 'SELECT COUNT(*) AS emailCount FROM carriers WHERE contact_email = ?';
    const [emailCheckResult] = await pool.query(checkEmailQuery, [contact_email]);
    const emailCount = emailCheckResult[0].emailCount;
    return emailCount > 0;
  } catch (error) {
    console.error('Error checking email duplication:', error.message || error);
    throw new Error('Failed to add carrier ports');
  }
};

export const addNewCarrierPorts = async (carrierId, carrierData) => {
  const ports = carrierData.ports.split(',');
  try {
    const promises = ports.map(port => {
      const query = `
        INSERT INTO carrier_emails (email_address, carrier_id, port_id, company_userID) 
        VALUES (?, ?, ?, ?)`;

      return pool.query(query, [carrierData.carrierEmail, carrierId, parseInt(port), parseInt(carrierData.idCompany)])
        .then(([result]) => {
          console.log(`Port ${port} inserted with ID ${result.insertId}`);
        });
    });

    await Promise.all(promises);

    return { message: 'Ports successfully added' };
  } catch (error) {
    console.error('Error in one of the port insertions:', error);
    throw new Error('Failed to add carrier ports');
  }
};

export const getCarrierPortCoverageByID = async (idCarrier, idCompany) => {
  const query = 'SELECT port_id FROM carrier_emails WHERE carrier_id = ? AND company_userID = ?';

  return pool.query(query, [idCarrier, idCompany])
    .then(data => data[0])
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const getAllIdOpenQuotes = async (idCompany) => {
  const query = 'SELECT idCounter FROM quotes WHERE company_userID = ?';
  return pool.query(query, [idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const fetchEmailsWithPortId = async (portId, idCompany) => {
  const query = 'SELECT email_address FROM carrier_emails WHERE port_id = ? AND company_userID = ?';
  return pool.query(query, [portId, idCompany])
    .then(data => {
      console.log(data[0]);
      return data[0];
    })
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const fetchAllBuySaleGross = async (idCompany) => {
  const query = 'SELECT SUBSTRING(invoice_date, 1, 2) AS month, SUBSTRING(invoice_date, 7, 4) AS year, SUM(buy) AS totalBuy FROM sales_gross WHERE company_userID = ? GROUP BY month, year';
  console.log('Testeando el query buy: ' + pool.format(query, [idCompany]));
  return pool.query(query, [idCompany])
    .then(([data]) => { // Destructurar la primera matriz para acceder a los resultados

      const TotalsBuy = data.map(row => ({
        month: row.month,
        year: row.year,
        totalBuy: row.totalBuy
      }));
      console.log('Total de compra por mes:', TotalsBuy);
      return TotalsBuy;
    })
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const fetchAllSellSaleGross = async (idCompany) => {
  const query = 'SELECT SUBSTRING(invoice_date, 1, 2) AS month, SUBSTRING(invoice_date, 7, 4) AS year, SUM(sell) AS totalSell FROM sales_gross WHERE company_userID = ? GROUP by month, year';
  console.log('Testeando el query sell: ' + pool.format(query, [idCompany]));
  return pool.query(query, [idCompany])
    .then(([data]) => {

      const TotalsSell = data.map(row => ({
        month: row.month,
        year: row.year,
        totalSell: row.totalSell
      }));
      console.log('Total de Venta por mes: ', TotalsSell);
      return TotalsSell;
    })
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const fetchAllProfitSaleGross = async (idCompany) => {
  const query = 'SELECT SUBSTRING(invoice_date, 1, 2) AS month, SUBSTRING(invoice_date, 7, 4) AS year, SUM(profit) AS totalProfit FROM sales_gross WHERE company_userID = ? GROUP by month, year';
  console.log('Testeando el query profit: ' + pool.format(query, [idCompany]));
  return pool.query(query, [idCompany])
    .then(([data]) => {

      const TotalsProfit = data.map(row => ({
        month: row.month,
        year: row.year,
        totalProfit: row.totalProfit
      }));
      console.log('Total de Profit por mes: ', TotalsProfit);
      return TotalsProfit;
    })
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};

export const getWarehouses = async (idCompany) => {
  const query = 'SELECT id, company_userID, name, address, zipcode, city, state, country, type, email, contact, phone, scheduling_preference from warehouses WHERE company_userID = ?';
  return pool.query(query, [idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};


export const addNewWarehouse = async (type, name, contact, phoneNumber, email, country, state, city, zipcode, address, scheduling_preference, idCompany) => {
  const query = 'INSERT INTO warehouses (type, name, contact, phone, email, country, state, city, zipcode, address, scheduling_preference, company_userID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

  return pool.query(query, [type, name, contact, phoneNumber, email, country, state, city, zipcode, address, scheduling_preference, idCompany])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL: ', error);
      throw error;
    });
};

export const getWarehouseByIdAndCompany = async (idWarehouse, idCompany) => {
  const query = 'SELECT * FROM warehouses WHERE id = ? AND company_userID = ?';
  return pool.query(query, [idWarehouse, idCompany])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const changeWarehouseInfo = async (id, type, name, contact, phoneNumber, email, country, state, city, address, scheduling_preference) => {
  const query = 'UPDATE warehouses SET type = ? , name = ?, contact = ?, phone = ?, email = ?, country = ?, state = ?, city = ?, address = ?, scheduling_preference = ? WHERE id = ?';
  return pool.query(query, [type, name, contact, phoneNumber, email, country, state, city, address, scheduling_preference, id])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};
export const deleteCarriersEmailsById = async (id) => {
  const query = 'DELETE FROM carrier_emails WHERE carrier_id = ?';
  return pool.query(query, [id])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL :' + error);
      throw error;
    });
};
export const deleteCarriersById = async (id) => {
  const query = 'DELETE FROM carriers WHERE id = ?';
  return pool.query(query, [id])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL :' + error);
      throw error;
    });
};

export const deleteWarehouseById = async (id) => {
  const query = 'DELETE FROM warehouses WHERE id = ?';
  return pool.query(query, [id])
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL :' + error);
      throw error;
    });
};

export const getWarehouseDataById = async (id, idCompany) => {
  const query = 'SELECT address FROM warehouses WHERE id = ? AND company_userID = ?';
  return pool.query(query, [id, idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;
    });
};

export const getLastClosedQuoteIdFromTable = async idCompany => {
  const query = 'SELECT quoteID FROM closed_quotes WHERE company_userID = ? ORDER BY id DESC LIMIT 1;';
  return pool.query(query, [idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error on SQL : ' + error);
      throw error;
    });
};

export const getCompanyName = async (idCompany) => {
  const query = 'SELECT * FROM companies WHERE idCompanies = ?';
  return pool.query(query, [idCompany])
    .then(rows => rows[0])
    .catch(error => {
      console.error('Error on SQL : '  + error);
      throw error;
    });
};

export const filterByColFromTable = async (cols, tableName, idCompany) => {
  const columns = Object.keys(cols).join(', ');

  const query = `SELECT ${columns} FROM ${tableName} WHERE company_userID = ?`;

  return pool.query(query, [idCompany])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const postBookUserForDemo = async email => {
  const query = 'INSERT INTO clients_booking (email) VALUES (?)';
  console.log('Consulta clients_booking: ', pool.format(query, email));
  return pool.query(query, email.email)
    .then(() => true)
    .catch(error => {
      console.error('Error on SQL: ', error);
      throw error;
    });

};

export const fetchEmailWithStateId = async (stateId, idCompany) => {
  const query = 'SELECT c.carrier_state, c.carrier_contact_email FROM carriers c JOIN states se ON se.stateAbridged = c.carrier_state WHERE se.stateId = ? AND c.company_userID = ? ';
  console.log('Testeando el fetch de la consulta ' + pool.format(query, [stateId, idCompany]));
  return pool.query(query, [stateId, idCompany])
    .then(data => data[0])
    .catch(error => {
      console.error('Error on SQL: ' + error);
      throw error;
    });
};