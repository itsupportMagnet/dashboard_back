import {
  getSales,
  getClients,
  getProviders,
  getCarriers,
  getQuotes
} from "../services/databaseServices.js";

export const getAllQuotes = async (req, res) => {
  getQuotes()
    .then(rows => res.status(200).json(rows))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllSales = (req, res) => {
  getSales()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllClients = (req, res) => {
  getClients()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllProviders = (req, res) => {
  getProviders()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllCarriers = (req, res) => {
  getCarriers()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};
