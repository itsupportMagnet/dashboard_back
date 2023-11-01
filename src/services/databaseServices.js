import { pool } from '../../db.js';


export const getUserEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?'
  return pool.query(query, [email]).then(rows => { return rows[0] }).catch(error => {
    console.error(error);
    throw error
  })


}

export const saveNewQuote = async (newId, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, otherCommodity, hazardous, slctHazardous, bonded, loadType, quoteStatus) => {
  const query = 'INSERT INTO quotes (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, quoteStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'; //investigar
  try {
    await pool.query(query, [newId, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, otherCommodity, hazardous, slctHazardous, bonded, loadType, quoteStatus]);
  } catch (error) {
    console.error("Error to get specific quote:", error);
    throw error;
  }
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

export const saveQuoteSent = async (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accesorialsWithFee, client, clientEmailsList) => {
  const accesorialsWithFeeJSON = JSON.stringify(accesorialsWithFee);
  const clientEmailsListJSON = JSON.stringify(clientEmailsList);
  const query = "INSERT INTO quotes_sent (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accesorialsWithFee, client, clientEmailsList) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  return pool.query(query, [quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, overWeight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, userName, miles, drayageQuantity, drayageUnitPrice, drayageTotalConcept, chassisType, chassisQuantity, chassisUnitPrice, chassisTotalConcept, totalFeeToSend, accesorialsWithFeeJSON, client, clientEmailsListJSON])
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
    .then(rows => rows[0])
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
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get the ports:", error);
      throw error;
    });
}


export const getQuotes = async () => {
  const query = "SELECT `quoteID`, `modeOfOperation`, `pol`, `deliveryAddress`, `equipment`, `containerSize`, `containerType`, `weight`, `commodity`, `otherCommodity`, `hazardous`, `hazardousClass`, `bonded`, `loadType`, `date` FROM quotes";
  return pool.query(query)
    .then(rows => rows[0])
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

export const getCities = async () => {
  const query = "SELECT * FROM city_state";
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

export const getProviders = async () => {
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
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get the ports:", error);
      throw error;
    });
}

export const getAccesorials = async () => {
  const query = 'SELECT * FROM accesorials';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get all quotes:", error);
      throw error;
    });
}

export const getCarriersList = async () => {
  const query = 'SELECT * FROM carriers3';
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get all quotes:", error);
      throw error;
    });
}

export const updateIdCounter = async (newCounter) => {
  const query = "UPDATE id_counter SET counter = ? LIMIT 1"; //CAMBIAR A FUTURO AL IDCOUNTER NORMAL
  try {
    await pool.query(query, [newCounter]);
  } catch (error) {
    console.log('Error trying to update the counter');
    throw error
  }
}

export const saveNewOperation = async (idOperation, status, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, city, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, cargoCut, timeLine) => {
  const query = "INSERT INTO operations(idOperation, status, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, city, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous , hazardousClass, bonded, cargoCut, timeLine) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  try {
    await pool.query(query, [idOperation, status, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, city, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, cargoCut, timeLine])
  } catch (error) {
    console.error("Error to ger specific newOperation:", error);
    console.log('Estoy en el query')
    throw error;
  }

}

export const getTerminals = async (id) => {
  const query = "SELECT * from port_terminals WHERE port_id = ?";
  return pool.query(query, [id])
    .then(rows => { return rows[0] }) //No es necesario especificar el return
    .catch(error => {
      console.error("Error trying to get all terminals of port", error);
      throw error
    })
}

export const getAllOperations = async () => {
  const query = "SELECT * FROM operations";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get all operations", error);
      throw error
    })
}

export const changeOperationStatus = async (idOperation, status) => {
  const query = "UPDATE operations SET status = ? WHERE idOperation = ?";
  return pool.query(query, [status, idOperation])
    .then(() => { return true }).catch(error => {
      console.error("Error on SQL:", error);
      throw error;
    });
}

export const changeBookingBl = async (idOperation, bookingBl) => {
  const query = "UPDATE operations SET bookingBl = ? WHERE idOperation = ?";
  return pool.query(query, [bookingBl, idOperation])
    .then(() => { return true }).catch(error => {
      console.error("Error on SQL:", error);
      throw error;
    });
}

export const changeContainerId = async (idOperation, containerId) => {
  const query = "UPDATE operations SET containerId = ? WHERE idOperation = ?";
  return pool.query(query, [containerId, idOperation])
    .then(() => { return true }).catch(error => {
      console.error("Error on SQL:", error);
      throw error;
    });
}

export const getOperationById = async (operationId) => {
  const query = 'SELECT * FROM operations WHERE idOperation = ?';
  return pool.query(query, [operationId])
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export const addNewClient = async (clientObjt) => {
  const { name, address, contact, businessLine, customerType } = clientObjt;
  const emailsJSON = JSON.parse(clientObjt.customerEmails);
  const phonesJSON = JSON.parse(clientObjt.phoneNumbers);

  const query = "INSERT INTO clients (customer_name, address, customer_phone, customer_email, customer_contact, business_line, customer_type) VALUES (?,?,?,?,?,?,?)"

  return pool.query(query,name, address, contact, businessLine, customerType, emailsJSON, phonesJSON)
  .then(() => true)
  .catch(error => {
    console.error("Error on SQL:", error);
    throw error;
  });
}

// export const getMaxIdOperation = async () => {
//   const query = "SELECT max(id) from operations";
//   return pool.query(query)
//     .then(rows => rows.max)
//     .catch(error => {
//       console.log("Error trying to get max id", error);
//       throw error;
//     });
// }