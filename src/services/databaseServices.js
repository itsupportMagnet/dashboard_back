import { pool } from '../../db.js';


export const getUserEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?'
  return pool.query(query, [email]).then(rows => { return rows[0] }).catch(error => {
    console.error(error);
    throw error
  })


}

export const saveNewQuote = async (newId, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, hazardous, bonded, loadType,quoteStatus,cordinator) => {
  const query = 'INSERT INTO quotes (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType,quoteStatus, cordinator) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'; //investigar
  try {
    await pool.query(query, [newId, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, hazardous, bonded, loadType,quoteStatus, cordinator]);
  } catch (error) {
    console.error("Error to get specific quote:", error);
    throw error;
  }
}

export const saveNewQuoteFee = async (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis, notes) => {
  const query = "INSERT INTO carriers_fees (quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, carrierFee, carrierChassis, carrierAccesorials, magnetFee, magnetChassis, magnetAccesorials, totalFee, totalChassis, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  try {
    await pool.query(query, [quoteID, modeOfOperation, pol, deliveryAddress, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous, hazardousClass, bonded, loadType, date, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis, notes])
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

export const  getCarrierFeeByQuoteId = async (id) => {
  const query = 'SELECT * FROM carriers_fees WHERE quoteID = ?';
  try {
    const [rows] = await pool.query(query, [id]);
    return [rows]
  } catch (error) {
    console.error("Error to get specific quote:", error);
    throw error;
  }
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

export const updateCarrierFeeById = async (id, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis, notes) => {
  const query = "UPDATE carriers_fees SET carrierFee = ?, carrierChassis = ?, carrierAccesorials = ?, magnetFee = ?, magnetChassis = ?, magnetAccesorials = ?, totalFee = ?, totalChassis = ?, notes = ?, carrierEmail = ? WHERE id = ?";

  return pool.query(query, (query, [carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis, notes, carrierEmail, id]))
  .then(() => true)
  .catch(error => {
    console.log("Error trying to update fee", error);
    throw error
  })
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
  const query = "SELECT `quoteID`, `modeOfOperation`, `quoteStatus` , `pol`, `deliveryAddress`, `equipment`, `containerSize`, `containerType`, `weight`, `commodity`, `hazardous`, `bonded`, `loadType`, `date`,`cordinator` FROM quotes";
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
  const query = "SELECT * FROM cities";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export const getCitiesID = async (id) => {
  const query = "SELECT * FROM cities WHERE state_id = ?";
  return pool.query(query, [id])
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
  const query = 'SELECT * FROM carriers3test';
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

export const saveNewOperation = async (idOperation, quoteID, status, containerStatus, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, cargoCut, timeLine, notes) => {
  const query = "INSERT INTO operations(idOperation, quoteID, status, containerStatus, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous , bonded, cargoCut, timeLine, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  try {
    await pool.query(query, [idOperation, quoteID, status, containerStatus, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, cargoCut, timeLine, notes])
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

export const changeOperationContainerStatus = async (idOperation, status) => {
  const query = "UPDATE operations SET containerStatus = ? WHERE idOperation = ?";
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

export const addNewClient = async (customerId, name, address, contact, businessLine, customerType, emailsJSON, phonesJSON) => {
  const query = "INSERT INTO clients (id_Client, customer_name, address, customer_phone, customer_email, customer_contact, business_line, customer_type) VALUES (?,?,?,?,?,?,?,?)"

  return pool.query(query, [customerId, name, address, phonesJSON, emailsJSON, contact, businessLine, customerType])
  .then(() => true)
  .catch(error => {
    console.error("Error on SQL:", error);
    throw error;
  });
}

export const addNewCarrier = async (carrierId, name, mc, dot, w2, address, zipcode, state, doct, businessLine, carrierType, phonesJSON, emailsJSON) => {
  const query = "INSERT INTO carriers3test (id, carrier_name, mc, dot, w2, carrier_address, carrier_zipcode, carrier_state, days_of_credit_terms, line_of_business, carrier_type, carrier_phone_number, carrier_contact_mail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"

  return pool.query(query, [carrierId, name, mc, dot, w2, zipcode, address, state, doct, businessLine, carrierType, phonesJSON, emailsJSON])
  .then(() => true)
  .catch(error => {
    console.error("Error on SQL:", error);
    throw error;
  });
}

export const getStates = async () => {
  const query = "SELECT * from states";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get the ports:", error);
      throw error;
    });
}

export const changeQuote = async (status, id) => {
  const query = "UPDATE quotes SET quoteStatus = ? WHERE quoteID = ?"
  return pool.query(query, [status, id])
  .then(() => {return true})
  .catch(error => {
    console.log(error);
    throw error;
  })
}

export const getAllContainerStatus = async (req, res) => {
  const query = "SELECT * FROM container_status";
  return pool.query(query)
  .then(row => row[0])
  .catch(error => {
    console.error("Error trying to get the ports:", error);
    throw error;
  });
}

export const getAllQuoteIds = async () => {
  const query = "SELECT quoteID FROM quotes";
  return pool.query(query)
  .then(row => row[0])
  .catch(error => {
    console.error("Error trying to get the ports:", error);
    throw error;
  });
}

export const changeNote = async (note, idOperation) => {
  //consulta SQL
  const query = "UPDATE operations SET notes = ? WHERE idOperation = ?"
  //ejecución de consulta(query)
  return pool.query(query,[note, idOperation])
  .then(() => {return true})
  .catch(error => {
    console.log(error);
    throw(error)
  })
}
export const changeQuotexId = async (quoteID, idOperation) => {
  const query = "UPDATE operations SET quoteID = ? WHERE idOperation = ?;";

  return pool.query(query,[quoteID, idOperation])
  .then(() => {return true})
  .catch(error => {
    console.log(error);
    throw error
  })
}
export const changeWeigthxId = async(weight, idOperation) => {
  const query = "UPDATE operations SET weight = ? WHERE idOperation = ?;";
  return pool.query(query, [weight, idOperation])
  .then(() => {return true})
  .catch((error) => console.log(error))
}
export const updateOperation = async(
  fld,
  quoteID,
  status,
  containerStatus,
  modeOfOperation,
  customer,
  businessLine,
  operationDate,
  coordinator,
  bookingBl,
  containerId,
  provider,
  emptyLocation,
  fullLocation,
  warehouseLocation,
  port,
  terminal,
  ssline,
  state,
  city,
  equipment,
  containerSize,
  containerType,
  weight,
  commodity,
  hazardous,
  bonded,
  cargoCut,
  notes,
  idOperation
  ) => {
    const query = "UPDATE operations SET fld = ?, status = ?, quoteID = ?, containerStatus = ?, modeOfOperation = ?, customer = ?, businessLine = ?, operationDate = ?, coordinator = ?, bookingBl = ?, containerId = ?, provider = ?, emptyLocation = ?, fullLocation = ?, warehouseLocation = ?, port = ?, terminal = ?, ssline = ?, state = ?, city = ?, equipment = ?, containerSize = ?, containerType = ?, weight = ?, commodity = ?, hazardous = ?, bonded = ?, cargoCut = ?, notes = ?  WHERE idOperation = ?"
    return pool.query(query, [ fld,status, quoteID, containerStatus, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal,ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, cargoCut, notes, idOperation])
    .then(() => true)
    .catch((error) => console.log(error))
  }

  // idOperation, quoteID, status, containerStatus, modeOfOperation, customer, businessLine, operationDate, coordinator, bookingBl, containerId, provider, emptyLocation, fullLocation, warehouseLocation, port, terminal, ssline, state, city, equipment, containerSize, containerType, weight, commodity, hazardous , bonded, cargoCut, timeLine, notes

// export const getMaxIdOperation = async () => {
//   const query = "SELECT max(id) from operations";
//   return pool.query(query)
//     .then(rows => rows.max)
//     .catch(error => {
//       console.log("Error trying to get max id", error);
//       throw error;
//     });
// }


export const getAllOperationsForTable = async () => {
  const query = "SELECT idOperation, status, containerStatus, operationDate, bookingBl, containerId, customer, provider, notes, coordinator, warehouseLocation, terminal, port, emptyLocation, fullLocation, containerSize, containerType, equipment, weight, ssline, hazardous, bonded, cargoCut, commodity, city, state, modeOfOperation , quoteID, businessLine FROM operations";
  return pool.query(query)
    .then(rows => rows[0])
    .catch(error => {
      console.error("Error trying to get all operations", error);
      throw error
    })
}


export const getAllFloridaQuotes = async () => {
  const query = "SELECT * FROM florida_quotes";
  return pool.query(query).then(row => row[0])
  .catch(error => {
    console.error("Error trying to get all florida operations", error);
    throw error
  })
}