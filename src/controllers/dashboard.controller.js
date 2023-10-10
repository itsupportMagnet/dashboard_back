import { getSales } from "../services/databaseServices.js"

export const getAllSales = (req, res) => {
    getSales()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    })
  }