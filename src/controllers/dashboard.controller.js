import { getSales, getClients } from "../services/databaseServices.js"

export const getAllSales = (req, res) => {
    getSales()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    })
  }

  export const getAllClients = (req, res) => {
    getClients()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    })
  }

  export const getAllProviders = (req, res) => {
    getProviders()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    })
    
  
  }