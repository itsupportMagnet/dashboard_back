import {
  getSales,
  getClients,
  getProviders,
  getCarriers,
  getQuotes,
  getPorts,
  getAccesorials,
  getQuoteFeeById
} from "../services/databaseServices.js";

export const getQuotesFeeById = async (req, res) => {
  try {
    const [rows] = await getQuoteFeeById(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}


export const getAllAccesorials = async (req, res) => {
  getAccesorials()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
}

export const createQuote = async (req, res) => {
  const { operation, isExport, pol, address, equipment, containerSize, ContainerType, weight, commodity, otherCommodity, hazardous, slctHazardous, bonded, loadType, carrier } = req.body;
  const newCounter = await getIdCounter() + 1;
  const newId = `MGT${newCounter.toString().padStart(4, '0')}`;
  const emailSubject = `Drayage request from Magnet logistics / ${newId}`
  const bccRecipients = carrier;
  
  const emailBody = `<!DOCTYPE html>
  <html lang="en">
    <head>
    </head>
    <body>	 									
      <h1 style="font-size: 15px; font-weight: 500;">Dear Team,</h1>
      <h1 style="font-size: 15px; font-weight: 500;">Kindly sent rates and capacity
        as follow:</h1>
      <table border="1" cellpadding="8"
        style="width: 600px; margin: 20px; border-collapse: collapse;">
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Quote ID</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${newId}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Mode
            of Operation</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${operation}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">${isExport ? 'POL' : 'POD'}</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${pol}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">${isExport ? 'Pick Up Address' : 'Delivery Address'}</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${address}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Equipment</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${equipment}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Container
            Size</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${containerSize}'</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Container
            Type</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${ContainerType}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Weight</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${weight} lbs</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Commodity</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${commodity}</td>
        </tr>
        ${otherCommodity !== '' ? (
      `<tr>
            <td
              style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Other Comodity</td>
            <td
              style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${otherCommodity}</td>
          </tr>`
    ) : (
      `<tr style="display: none">
            <td></td>
            <td></td>
          </tr>`
    )}
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Hazardous</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${hazardous}</td>
        </tr>
        ${slctHazardous !== '' ? (
      `<tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Hazardous Class</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${slctHazardous}</td>
          </tr>`
    ) : (
      `<tr style="display: none">
            <td></td>
            <td></td>
          </tr>`
    )}
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Bonded</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${bonded}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Load
            Type</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${loadType}</td>
        </tr>
      </table>
      <p style="font-size: 15px; font-weight: 500; margin-top: 10px;"><b>Best
          regards,</b></p>
      <p><i style=" font-size: 15px; text-align: center; color: #1A6AFF;"><b>Our
            business relationship is extremely important for us. Simplifying your
            logistics needs!</b></i></p>
      <img style="margin-top: 10px;" width="200"
        src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/07/magnet-logo.png"
        alt="logo">
    </body>
    </html>`

  saveNewQuote(newId, operation, pol, address, equipment, containerSize, ContainerType, weight, commodity, otherCommodity, hazardous, slctHazardous, bonded, loadType)
    .then(() => {
      return sendEmail(emailSubject, emailBody, bccRecipients, '');
    })
    .then(() => {
      return updateIdCounter(newCounter);
    })
    .then(() => {
      res.status(200).json({ message: 'ok' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

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
