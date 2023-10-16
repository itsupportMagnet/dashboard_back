import { pool } from '../../db.js';

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