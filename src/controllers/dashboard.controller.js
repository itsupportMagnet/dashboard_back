import {
  getSales,
  getClients,
  getProviders,
  getCarriers,
  getQuotes,
  getPorts,
  getCarriers
} from "../services/databaseServices.js";

export const getAllRoutes = async (req, res) => {
  getRoutes().then(rows => res.status(200).json(rows))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
};



export const getCarriersByPort = async (req, res) => {
  getCarriers(req.params.id)
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
}

export const getAllPorts = async (req, res) => {
  getPorts()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
}

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

// export const getAllCarriers = (req, res) => {
//   getCarriers()
//     .then((row) => res.status(200).json(row))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json(error);
//     });
// };
