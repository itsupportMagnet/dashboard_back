import { pool } from '../../db.js';

export const getUserEmail = async (email)=> {
  const query = 'SELECT * FROM users WHERE email = ?'
  return pool.query(query, [email]).then(rows => {return rows[0]} ).catch(error => { 
    console.error(error);
    throw error
  })
    
  
}

export const saveNewQuoteFee = async (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis) => {
  const query = "INSERT INTO carriers_fees (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, carrierFee, carrierChassis, carrierAccesorials, magnetFee, magnetChassis, magnetAccesorials, totalFee, totalChassis) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  try {
    await pool.query(query, [quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis])
  } catch (error) {
    console.error("Error to get specific quote:", error);
    throw error;
  }
}

export const saveQuoteSent = async (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accesorialsWithFee, clientEmailsList) => {
  const accesorialsWithFeeJSON = JSON.stringify(accesorialsWithFee);
  const clientEmailsListJSON = JSON.stringify(clientEmailsList);
  const query = "INSERT INTO quotes_sent (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accesorialsWithFee, clientEmailsList) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  return pool.query(query, [quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accesorialsWithFeeJSON, clientEmailsListJSON])
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error("Error on SQL:", error);
      throw error;
    });
}

export const getQuoteFeeById = async (id) => {
  const query = 'SELECT * FROM carriers_fees WHERE quoteID = ?';
  try {
    const [rows] = await pool.query(query, [id]);
    return [rows]
  } catch (error) {
    console.error("Error to get specific quote:", error);
    throw error;
  }
}

export const getQuoteById = async (id) => {
  const query = 'SELECT * FROM quotes WHERE quoteID = ?';
  return pool.query(query, [id])
    .then(rows => { return rows[0] })
    .catch(error => {
      console.error("Error trying to get all quotes:", error);
      throw error;
    });
}

export const allCarriers = async () => {
  const query = "SELECT * FROM carriers";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log("Error trying to get all carriers", error);
      throw error
    })
}

export const getRoutes = async () => {
  const query = "SELECT * FROM quotes_sent";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get all quotes:", error);
      throw error;
    });
}

export const getPorts = async () => {
  const query = "SELECT * from ports";
  return pool.query(query)
    .then(rows => { return rows[0] })
    .catch(error => {
      console.error("Error trying to get the ports:", error);
      throw error;
    });
}



export const getQuotes = async () => {
  const query = "SELECT `quoteID`, `modeOfOperation`, `pol`, `deliveryAddress`, `equipment`, `containerSize`, `containerType`, `weight`, `commodity`, `otherCommodity`, `hazardous`, `hazardousClass`, `bonded`, `loadType`, `date` FROM quotes";
  return pool.query(query)
    .then(rows => { return rows[0] })
    .catch(error => {
      console.error("Error trying to get all quotes:", error); //comment
      throw error;
    });
};

export const getSales = async () => {
  const query = "SELECT * FROM sales_gross";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export const getClients = async () => {
  const query = "SELECT * FROM clients";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log(error)
      throw error
    })
}

export const getProviders = async () =>{
  const query = "SELECT * FROM providers";
  return pool.query(query)
  .then(rows => rows[0])
  .catch(error => {
    console.log(error)
    throw error
  })
}


export const getCarriers = async (id) => {
  const query = "SELECT * from carriers WHERE port_id = ?";
  return pool.query(query, [id])
    .then(rows => { return rows[0] })
    .catch(error => {
      console.error("Error trying to get the ports:", error);
      throw error;
    });
}

export const getAccesorials = async () => {
  const query = 'SELECT * FROM accesorials';
  return pool.query(query)
    .then(rows => { return rows[0] })
    .catch(error => {
      console.error("Error trying to get all quotes:", error);
      throw error;
    });
}

export const getCarriersList = async () => {
  const query = 'SELECT * FROM carriers3';
  return pool.query(query)
  .then(rows => { return rows[0] })
  .catch(error => {
    console.error("Error trying to get all quotes:", error);
    throw error;
  });
}