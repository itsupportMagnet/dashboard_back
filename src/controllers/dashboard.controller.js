import { pool } from "../../db.js";
import {
  getSales,
  getClients,
  getProviders,
  getCarriers,
  getQuotes,
  getPorts,
  getAccesorials,
  getQuoteFeeById,
  updateCarrierFeeById,
  getCarriersList,
  getUserEmail,
  getCities,
  getCitiesID,
  updateIdCounter,
  saveNewQuote,
  getQuoteById,
  getCarrierFeeByQuoteId,
  saveNewQuoteFee,
  saveQuoteSent,
  saveNewOperation,
  getTerminals,
  getAllOperations,
  changeOperationStatus,
  changeOperationContainerStatus,
  changeBookingBl,
  changeContainerId,
  getOperationById,
  addNewClient,
  addNewCarrier,
  getStates,
  getAllContainerStatus,
  changeQuote,
  getAllQuoteIds,
  changeNote,
  changeQuotexId,
  changeWeightxId,
  getAllOperationsForTable,
  getAllFloridaQuotes,
  updateOperation,
  deleteOperationByID,
  create,
  newInputQuerySaleGross,
  newInputQueryFLSaleGross,
  changeProviderSalesGross,
  changeCustomerInvoiceSalesGross,
  changeStatusSalesGross,
  changeBuySalesGross,
  changeSellSalesGross,
  changeProfitSalesGross,
  deleteSaleById,
  getAllFloridaQuoteId,
  getFloridaQuoteById,
  getNormalQuoteById,
  updateSaleGrossById,
  deleteClientById,
  getClientById,
  changeClientInfo,
  changeSummarySalesGrossById,
  newSummaryInputSalesGross,
  fetchSaleGrossInfoById
} from "../services/databaseServices.js";
import { sendEmail } from "../services/emailService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
  return res.json("Valid token");
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  getUserEmail(email)
    .then((data) => {
      const user = data[0];
      const userName = user.userName;
      const rol = user.rol

      console.log(data);


      //verify password
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "password incorrect! " });
      }
      //make jwt

      jwt.sign(user.userID, process.env.tokenPrivateKey, (err, token) => {
        if (err) {
          res.status(400).send({ msg: "error" });
        } else {
          res.status(200).send({ token, userName, rol });
          console.log(res)

        }
      });
    })
    .catch(() => {
      return res.status(400).json({ message: "email does not exist" });
    });
};

export const getIdCounter = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT counter FROM id_counter LIMIT 1"
    );
    if (rows.length > 0) {
      return rows[0].counter;
    }
  } catch (error) {
    console.error("Error to get id counter:", error);
    throw error;
  }
};

export const saveFee = async (req, res) => {
  console.log(req.body.quote);
  const {
    quoteID,
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
    carrierAccesorials,
    magnetFee,
    magnetChassis,
    magnetAccesorials,
    notes
  } = req.body;

  try {
    const carrierAccesorialsJSON = JSON.stringify(carrierAccesorials);
    const magnetAccesorialsJSON = JSON.stringify(magnetAccesorials);

    await saveNewQuoteFee(
      quoteID,
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
      carrierFee,
      carrierChassis,
      carrierAccesorialsJSON,
      magnetFee,
      magnetChassis,
      magnetAccesorialsJSON,
      notes
    );
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const sendFee = async (req, res) => {
  const {
    quoteID,
    modeOfOperation,
    pol,
    deliveryAddress,
    equipment,
    containerSize,
    containerType,
    weight,
    overWeight,
    commodity,
    otherCommodity,
    hazardous,
    hazardousClass,
    bonded,
    loadType,
    date,
    userName,
    miles,
    drayageQuantity,
    drayageUnitPrice,
    drayageTotalConcept,
    chassisType,
    chassisQuantity,
    chassisUnitPrice,
    chassisTotalConcept,
    totalFeeToSend,
    accesorialsWithFee,
    accesorialsList,
    // emailSubject,
    client,
    clientEmailsList,
  } = req.body;

  const emailBody = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @media (min-width: 768px) {
        .md-w-33 {
          width: 20% !important;
        }

        .md-w-2-4 {
          width: 50% !important;
        }

        .md-w-40 {
          width: 10rem !important;
        }

        .md-w-full {
          width: 100% !important;
        }

        .md-mt-1 {
          margin-top: 0.25rem !important;
        }

        .md-mr-2 {
          margin-right: 0.5rem !important;
        }

        .md-flex-row {
          flex-direction: row !important;
        }

        .md-text-lg {
          font-size: 1.125rem !important;
          line-height: 1.75rem !important;
        }

        .md-text-xl {
          font-size: 1.25rem !important;
          line-height: 1.75rem !important;
        }

        .md-text-2xl {
          font-size: 1.5rem !important;
          line-height: 2rem !important;
        }

        .accesorialBox {
          width: 200px !important;
        }

        .truckImgContainer {
          padding: 40px 0 !important;
        }

        .accesorialText {
          width: 200px !important;
        }
      }

      .sendTable {
        width: 100%;
      }

      .sendTh {
        width: 15%;
        background-color: #1a6aff;
        color: #fff;
        padding: 5px 10px 5px 0;
        text-align: start;
        font-size: 17px !important;
        border: 1px solid black;
      }

      .sendTr:not(:first-child) {
        padding-top: 10px;
      }

      .sendTd {
        padding-left: 7px;
        font-weight: 500;
        border: 1px solid black;
        font-size: 17px !important;
      }
      .locationsDetailsBox {
        display: block;
      }

      .accesorialBox {
        width: 300px;
      }

      .truckImgContainer {
        padding: 20px 0;
      }

      .accesorialText {
        margin-bottom: 10px;
        display: inline-block;
        width: 110px;
        font-size: 17px;
      }

      .accesorialWithFee{
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly;
      }

      .accesorialList{
        width: 100%; 
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; 
        margin-top: 20px;
      }
    </style>
  </head>

  <body>
    <div
      v-if="quote"
      style="
        border-style: solid;
        border-width: 4px;
        border-color: black;
        padding: 0.75rem;
        margin-top: 1.25rem;
        max-width: 650px;
      "
    >
      <header>
        <center>
          <img
            style="width: 200px"
            src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/07/magnet-logo.png"
            alt="logo"
          />
        </center>

        <div style="margin-top: 3rem">
          <div style="font-size: 18px">
            <p>
              <b>Address:</b> 3115 Terramar St, 14, Fort Lauderdale, FL 33304
            </p>
            <p style="margin-top: 0.5rem">
              <b>Web Page:</b> www.magnetlogisticscorp.com
            </p>
            <p style="margin-top: 0.5rem">
              <b>Name:</b>
              ${userName}
            </p>
            <p style="margin-top: 0.5rem">
              <b>Client:</b>
              ${client}
            </p>
            <p style="margin-top: 0.5rem"><b>Phone:</b> (754) 242 5988</p>
            <p style="margin-top: 0.5rem">
              <b>Email: </b>
              <span
                style="
                  text-decoration: underline;
                  text-decoration-thickness: 2px;
                "
                >sales@magnetlogisticscorp.com</span
              >
            </p>
          </div>

          <div class="quotation"></div>
        </div>
      </header>

      <div style="margin-top: 3rem" class="main">
        <div class="customerDetails"></div>

        <table cellpadding="0" cellspacing="0" width="100%"
        style="border: 4px solid #a5a5a5; text-align: center; font-size: 15px; font-weight: 600;">
        <tr>
          <td align="center" style="width: 33%; padding: 10px 5px;">
            <img src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/Screenshot-2023-08-22-125419.png" alt="location icon" /><br>
            <p style="margin-top: 0.75rem">${pol}</p>
          </td>
          <td align="center" style="width: 100%; padding: 10px 5px;" class="locationsDetailsBox truckImgContainer">
            <img style="width: 7rem" class="md-w-40" src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/truck-1918551_12801.png" alt="magnet truck" /><br>
            <p style="margin-top: 0.5rem">${miles} miles</p>
          </td>
          <td align="center" style="width: 33%; padding: 10px 5px;">
            <img src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/Screenshot-2023-08-22-125419.png" alt="location icon" /><br>
            <p style="margin-top: 0.75rem">${deliveryAddress}</p>
          </td>
        </tr>
      </table>

        <div style="margin-top: 2.5rem" class="shipmentDetails">
          <h1
            style="
              font-size: 1.125rem;
              line-height: 1.75rem;
              text-align: center;
              padding: 0.25rem;
              background-color: #1d4ed8;
              color: #fff;
            "
            class="md-text-2xl"
          >
            SHIPMENT DETAILS
          </h1>

          <table border="1" cellpadding="8" class="sendTable" style="margin-top: 1rem; border-collapse: collapse;">
          <tbody style="width:100%">
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Quote ID</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${quoteID}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Mode of Operation</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${modeOfOperation}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Equipment</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${equipment}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Container Size</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${containerSize}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Container Type</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${containerType}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Weight</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${weight}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Commodity</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${commodity}</td>
            </tr>
            ${otherCommodity === ""
      ? `<tr style="display: none">
            </tr>`
      : `<tr>
                <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Other Comodity</td>
                <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${otherCommodity}</td>
              </tr>`
    }
            <tr class= "sendTr" >
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Hazardous</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${hazardous}</td>
            </tr >

            ${hazardous === "Yes"
      ? `<tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Hazardous Class</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${hazardousClass}</td>
            </tr>`
      : `<tr style="display: none">
            </tr>`
    }
           
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Bonded</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${bonded}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Load Type</th>
              <td style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${loadType}</td>
            </tr>
            </tbody>
          </table >
        </div >

        <div style="margin-top: 2.5rem" class="quoteDetails">
          <h1
            style="
              font-size: 1.125rem;
              line-height: 1.75rem;
              text-align: center;
              padding: 0.25rem;
              background-color: #1d4ed8;
              color: #fff;
            "
            class="md-text-2xl"
          >
            QUOTE DETAILS
          </h1>

          <table style="margin-top: 0.5rem; width: 100%; text-align: center">
            <tbody>
              <tr
                style="
                  font-size: 16px;
                  line-height: 1.25rem;
                  display: flex;
                  gap: 0.5rem;
                  font-weight: 600;
                "
                class="md-text-lg"
              >
                <td style="width: 20%">Concept</td>
                <td style="width: 20%">Quantity</td>
                <td style="width: 20%">Unit</td>
                <td style="width: 20%">Unit Price</td>
                <td style="width: 20%">Total Concept</td>
              </tr>

              
              <tr
                style="
                  font-size: 16px;
                  line-height: 1.25rem;
                  font-weight: 400;
                  display: flex;
                "
                class="md-text-lg md-mt-1"
              >
                <td style="width: 20%">Drayage</td>
                <td style="width: 20%">${drayageQuantity}</td>
                <td style="overflow: hidden; width: 20%; text-overflow: ellipsis">
                  Per container
                </td>
                <td style="width: 20%">$${drayageUnitPrice}</td>
                <td style="width: 20%">$${drayageTotalConcept}</td>
              </tr>

              <tr
                style="
                  font-size: 16px;
                  line-height: 1.25rem;
                  font-weight: 400;
                  display: flex;
                "
                class="md-text-lg md-mt-1"
              >
                <td style="width: 20%">${chassisType}</td>
                <td style="width: 20%">${chassisQuantity}</td>
                <td style="overflow: hidden; width: 20%; text-overflow: ellipsis">
                  Per day
                </td>
                <td style="width: 20%">$${chassisUnitPrice}</td>
                <td style="width: 20%">$${chassisTotalConcept}</td>
              </tr>
            </tbody>
          </table>

          <div
            style="
              display: inline-block;
              text-align: end;
              width: 100%;
              margin-top: 1rem;
              font-size: 1.25rem;
              line-height: 1.75rem;
            "
          >
            <h1
              style="
                font-size: 20px;
                font-weight: 600;
                display: inline-block;
                vertical-align: middle;
                padding-right: 15px;
              "
            >
              TOTAL
            </h1>
            <h2
              style="
                width: 200px;
                border-top-width: 4px;
                border-right-width: 0;
                border-bottom-width: 0;
                border-left-width: 0;
                border-style: solid;
                border-color: #9ca3af;
                font-weight: 600;
                text-align: center;
                display: inline-block;
                vertical-align: middle;
                font-size: 25px;
              "
            >
            $${totalFeeToSend}
            </h2>
          </div>
        </div>

        <div style="margin-top: 1rem" class="mayApply">
        
          <h1 style="font-size: 1.125rem; 
          line-height: 1.75rem; 
          text-align: center; 
          padding: 0.25rem; 
          background-color: #1d4ed8;
          color: #fff;
          " 
          class="md-text-2xl">ACCESORIAL CHARGES THAT WILL APPLY</h1>

          <div style="margin-top: 1rem; text-align: center">
          
          ${!Object.entries(accesorialsWithFee).length ? (
      ' <p style="width: 95%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">NONE</p>'
    ) : (
      `<div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
                    ${Object.entries(accesorialsWithFee)
        .slice(0, 7)
        .map(
          ([item, value]) => `
                    <p style="width: 16.5%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">
                        ${item}: $${value}
                      </p>`
        )
        .join("")}
                  </div>

                  <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
                  ${Object.entries(accesorialsWithFee)
        .slice(7, 13)
        .map(
          ([item, value]) => `
                    <p style="width: 16.5%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">
                        ${item}: $${value}
                      </p>`
        )
        .join("")}
                  </div>

                  <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
                  ${Object.entries(accesorialsWithFee)
        .slice(13, 18)
        .map(
          ([item, value]) => `
                    <p style="width: 16.5%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">
                        ${item}: $${value}
                      </p>`
        )
        .join("")}
                  </div>
        `
    )}
        
            
              <h3 style="font-size: 22px; font-weight:700; line-height: 1.75rem; text-align: center; margin-top: 25px; text-decoration: underline;">Also may apply</h3>
          


            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly; margin-top: 15px;" class="accesorialWithFee">
                ${accesorialsList
      .slice(0, 6)
      .map(
        (item) =>
          `<p style="width: 12%; text-align: center; font-weight: 500; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
                      ${item.accesorial}
                  </p>`
      )
      .join("")}
              </div>

              <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
                ${accesorialsList
      .slice(6, 12)
      .map(
        (item) =>
          `<p style="width: 12%; text-align: center; font-weight: 500; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
                      ${item.accesorial}
                  </p>`
      )
      .join("")}
              </div>

              <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
                ${accesorialsList
      .slice(12, 18)
      .map(
        (item) =>
          `<p style="width: 12%; text-align: center; font-weight: 500; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
                      ${item.accesorial}
                  </p>`
      )
      .join("")}
              </div>

            </div>
          </div>
        </div>


        <div style="margin-top: 2.5rem" class="remarksDetails">
          <h1
            style="
              font-size: 1.125rem;
              line-height: 1.75rem;
              text-align: center;
              padding: 0.25rem;
              background-color: #1d4ed8;
              color: #fff;
            "
            class="md-text-2xl"
          >
            SPECIAL REMARKS
          </h1>

          <p style="margin-top: 0.5rem">
            Magnet Logistics will not accept liability for Detention/Per Diem/
            Demurrage, including but not limited to per diem charges that begin
            accruing after the date an intermodal unit is dropped at a
            shipper/consignee and/or Special Equipment. This rate quote is valid
            for 2 days. Fuel surcharge included. 1 free hour loading/discharge
            included ($80 per hour after that). Trucker availability may change
            according to demand. If you want to lock rate 25 % deposit. All
            requests for availability and work orders should be sent to
            sales@magnetlogisticscorp.com for Florida, and to
            sales@magnetlogisticscorp.com for National Wide. Rate quote is not
            confirmation that Magnet Logistics will haul your shipment. In case
            of cancelation, fee will be applied.
          </p>
        </div>
      </div >
    </div >
  </body >
</html >
  `;

  const subject = `New Quotation / ${quoteID}`

  sendEmail(subject, emailBody, [], clientEmailsList)
    .then((data) => {
      if (data) {
        saveQuoteSent(
          quoteID,
          modeOfOperation,
          pol,
          deliveryAddress,
          equipment,
          containerSize,
          containerType,
          weight,
          overWeight,
          commodity,
          otherCommodity,
          hazardous,
          hazardousClass,
          bonded,
          loadType,
          date,
          userName,
          miles,
          drayageQuantity,
          drayageUnitPrice,
          drayageTotalConcept,
          chassisType,
          chassisQuantity,
          chassisUnitPrice,
          chassisTotalConcept,
          totalFeeToSend,
          accesorialsWithFee,
          client,
          clientEmailsList
        )
          .then((data) => {
            if (data) {
              res.status(200).json({ message: "ok" });
            } else {
              res
                .status(500)
                .json({ message: "Something went wrong on saving the quote" });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      } else {
        res
          .status(500)
          .json({ message: "Something went wrong on sending the message" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getQuote = async (req, res) => {
  getQuoteById(req.params.id)
    .then((rows) => {
      return res.status(200).json({ message: rows[0] });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getQuotesFeeById = async (req, res) => {
  try {
    const [rows] = await getQuoteFeeById(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getCarriersFeeByID = async (req, res) => {
  try {
    const [rows] = await getCarrierFeeByQuoteId(req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const updateCarrierFee = async (req, res) => {
  const { id, carrierEmail, carrierFee, carrierChassis, carrierAccesorials, magnetFee, magnetChassis, magnetAccesorials, totalFee, totalChassis, notes } = req.body

  const carrierAccesorialsJSON = JSON.stringify(carrierAccesorials);
  const magnetAccesorialsJSON = JSON.stringify(magnetAccesorials);

  console.log(id, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis, notes);
  updateCarrierFeeById(id, carrierEmail, carrierFee, carrierChassis, carrierAccesorialsJSON, magnetFee, magnetChassis, magnetAccesorialsJSON, totalFee, totalChassis, notes)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
}

export const getAllAccesorials = async (req, res) => {
  getAccesorials()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const createQuote = async (req, res) => {
  const {
    operation,
    isExport,
    pol,
    address,
    equipment,
    containerSize,
    ContainerType,
    weight,
    commodity,
    hazardous,
    bonded,
    loadType,
    carrier,
    quoteStatus,
    cordinator
  } = req.body;
  const newCounter = (await getIdCounter()) + 1;
  const newId = `MGT${newCounter.toString().padStart(4, "0")}`;
  const emailSubject = `Drayage request from Magnet logistics / ${newId}`;
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
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">${isExport ? "POL" : "POD"
    }</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${pol}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">${isExport ? "Pick Up Address" : "Delivery Address"
    }</td>
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
       
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Hazardous</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${hazardous}</td>
        </tr>
    
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
    </html>`;

  saveNewQuote(
    newId,
    operation,
    pol,
    address,
    equipment,
    containerSize,
    ContainerType,
    weight,
    commodity,
    hazardous,
    bonded,
    loadType,
    quoteStatus,
    cordinator
  )
    .then(() => {
      return sendEmail(emailSubject, emailBody, bccRecipients, "");
    })
    .then(() => {
      return updateIdCounter(newCounter);
    })
    .then(() => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

export const getAllRoutes = async (req, res) => {
  getRoutes()
    .then((rows) => res.status(200).json(rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getCarriersByPort = async (req, res) => {
  getCarriers(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllPorts = async (req, res) => {
  getPorts()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllQuotes = async (req, res) => {
  getQuotes()
    .then((rows) => res.status(200).json(rows))
    .catch((error) => {
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

export const getAllCities = (req, res) => {
  getCities()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllCitiesID = (req, res) => {
  getCitiesID(req.params.id)
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
  getCarriersList()
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const newOperation = async (req, res) => {
  const {
    idOperation,
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
    timeLine,
    notes,
  } = req.body;

  saveNewOperation(
    idOperation,
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
    timeLine,
    notes,
  )
    .then(() => {
      res.status(200).json({ message: "ok" });
      console.log('se envio bien la informacion')
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

export const getAllTerminals = async (req, res) => {
  getTerminals(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getOperations = async (req, res) => {
  getAllOperations()
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

export const changeStatus = async (req, res) => {
  const { idOperation, status } = req.body;

  changeOperationStatus(idOperation, status)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    })
}

export const changeContainerStatus = async (req, res) => {
  const { idOperation, containerStatus } = req.body;

  changeOperationContainerStatus(idOperation, containerStatus)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    })
}

export const updateBookingBl = async (req, res) => {
  const { idOperation, bookingBl } = req.body;
  changeBookingBl(idOperation, bookingBl)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    })
}

export const updateContainerId = async (req, res) => {
  const { idOperation, containerId } = req.body;
  changeContainerId(idOperation, containerId)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    })

}

export const getOperation = async (req, res) => {
  getOperationById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }))
}

export const addClient = async (req, res) => {

  const { customerId, name, address, contact, businessLine, customerType, customerEmails, phoneNumbers } = req.body;
  const emailsJSON = JSON.stringify(customerEmails);
  const phonesJSON = JSON.stringify(phoneNumbers);

  addNewClient(customerId, name, address, contact, businessLine, customerType, emailsJSON, phonesJSON)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    })
}

export const addCarrier = async (req, res) => {

  const { carrierId, name, mc, dot, w2, address, zipcode, state, doct, businessLine, carrierType, phoneNumbers, carrierEmails } = req.body;
  const phonesJSON = JSON.stringify(phoneNumbers);
  const emailsJSON = JSON.stringify(carrierEmails);
  addNewCarrier(carrierId, name, mc, dot, w2, address, zipcode, state, doct, businessLine, carrierType, phonesJSON, emailsJSON)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    })
}

export const getAllStates = async (req, res) => {
  getStates(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getContainerStatus = async (req, res) => {
  getAllContainerStatus()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.log(error);
      return res.status(500)
    })
}

export const changeStatusQuote = async (req, res) => {
  const { status, id } = req.body
  changeQuote(status, id)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error })
    })
}

export const getQuoteIds = async (req, res) => {
  getAllQuoteIds()
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error })
    })
}

export const changeNoteQuote = async (req, res) => {
  //formato json enviado por el cliente
  const { note, idOperation } = req.body
  //ejecucion de query
  changeNote(note, idOperation)
    //respuesta
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error })
    })
}
export const changeQuoteId = async (req, res) => {
  //recibimos el json(destructuracion de obj)
  const { quoteID, idOperation } = req.body
  changeQuotexId(quoteID, idOperation)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error)
    })
}
export const changeWeight = async (req, res) => {
  const { weight, idOperation } = req.body
  changeWeightxId(weight, idOperation)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => res.status(500).json({ error }))
}

export const updateOperationById = async (req, res) => {
  const {
    idOperation,
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
    lfd
  } = req.body
  updateOperation(
    lfd,
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
    idOperation,
  )
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => res.status(500).json(error))
}

// export const getOperationById = async(req,res) => {
//   const {id} = req.params
//   getOperation(id)
//   .then(() => res.status(200).json({message: 'ok'}))
//   .catch((error) => res.status(500).json(error))
// }s
// export const updateContainerId = async (req, res) => {
//   const { idOperation, containerId } = req.body;
//   changeContainerId(idOperation, containerId)
//   .then(() => res.status(500).json({ message: 'ok' }))
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ error })
//     })

// }

export const getAllOperationsTable = async (req, res) => {
  getAllOperationsForTable(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getFloridaQuotes = async (req, res) => {
  getAllFloridaQuotes()
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

export const newAccount = async (req, res) => {
  const { userName, email, password } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'error encrypt' })
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error encrypt' })
      }

      create(userName, email, hash)
        .then((data) => res.status(201).json({ message: data }))
        .catch((error) => res.status(500).json({ error }))
    })
  })
}

export const deleteOperationFromTable = async (req, res) => {
  const { id } = req.params
  console.log(id);
  deleteOperationByID(id)
    .then(() => res.status(200).json({ message: "Operation Deleted Successfully" }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Error Deleting Operation" })
    })
}

export const newInputSaleGross = async (req, res) => {
  const {
    bookingBl,
    containerId,
    provider,
    customer,
    date
  } = req.body;
  console.log('testeo desde controller + booking bl: ' + bookingBl + ' containerId: ' + containerId + ' provider: ' + provider + ' customer: ' + customer+ ' con la fecha de: ' + date) 

  newInputQuerySaleGross(bookingBl, containerId, provider, customer, date)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      res.status(500).json(error);
      console.log("Error en Controlador " + error);
    })


}

export const newFLInputSaleGross = async (req, res) => {
  const {
    operationId,
    bookingBl,
    containerId,
    provider,
    customer,
    buy,
    sell,
    profit,
    date,
    carrierAccesorials,
    magnetAccesorials,
    buyChassis,
    sellChassis,
  } = req.body;

  newInputQueryFLSaleGross(operationId, bookingBl, containerId, provider, customer, buy, sell, profit, date, carrierAccesorials, magnetAccesorials,buyChassis, sellChassis)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      res.status(500).json(error);
      console.log("Error en controlador " + error);
    })

}

export const updateProviderSalesGross = async (req, res) => {
  const { idSalesGross, providerInvoice } = req.body
  changeProviderSalesGross(idSalesGross, providerInvoice)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      console.log('Error Controller updateProviderSales  : ' + error)
      res.status(500).json({ error })
    })
}

export const updateCustomerInvoiceSalesGross = async (req, res) => {
  const { idSalesGross, customerInvoice } = req.body
  changeCustomerInvoiceSalesGross(idSalesGross, customerInvoice)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      console.log('Error Controller updateCustomerInvoiceSalesGross  : ')
      res.status(500).json({ error })
    })
}

export const updateStatusSalesGross = async (req, res) => {
  const { idSalesGross, statusSalesGross } = req.body
  changeStatusSalesGross(idSalesGross, statusSalesGross)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      console.log('Error Controller updateStatusSalesGross  :  ' + error)
      res.status(500).json({ error })
    })
}

export const updateBuySalesGross = async (req, res) => {
  const { idSalesGross, buySalesGross } = req.body
  changeBuySalesGross(idSalesGross, buySalesGross)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      console.log('Error Controller updateBuySalesGross : ' + error)
      res.status(500).json({ error })
    })
}

export const updateSellSalesGross = async (req, res) => {
  const { idSalesGross, sellSalesGross } = req.body
  changeSellSalesGross(idSalesGross, sellSalesGross)
    .then(() => res.status(200).json({ message: "ok" }))
    .catch(error => {
      console.log('Error Controller updateSellSalesGross: ' + error)
      res.status(500).json({ error })
    })
}

export const updateProfitSalesGross = async (req, res) => {
  const { idSalesGross, profitSalesGross } = req.body
  changeProfitSalesGross(idSalesGross, profitSalesGross)
    .then(() => res.status(200).json({ message: "updated profit" }))
    .catch(error => {
      console.log('Error Controller updateProfitSalesGross: ' + error)
      res.status(500).json({ error })
    })
}

export const deleteSale = async (req, res) => {
  const { id } = req.params;

  deleteSaleById(id)
    .then(res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller deleteSale: ' + error)
      res.status(500).json({ error })
    })
}

export const getFloridaQuoteId = async (req, res) => {
  getAllFloridaQuoteId()
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.log('Error Controller getFloridaQuoteId: ' + error)
      res.status(500).json({ error })
    })
}

export const getFloridaQuote = async (req, res) => {
  getFloridaQuoteById(req.params.id)
    .then(row => res.status(200).json(row[0]))
    .catch(error => {
      console.log('Error Controller getFloridaQuote: ' + error)
      res.status(500).json({ error })
    })
}

export const getNormalQuote = async (req, res) => {
  getNormalQuoteById(req.params.id)
  .then(row => res.status(200).json(row[0]))
  .catch(error => {
    console.log('Error Controller getNormalQuote: ' + error)
    res.status(500).json({error})
  })
}

export const updateSaleGross = async (req, res) => {
  const {operation_id, booking_bl, container_id, provider, customer, date, buyAccesorials, sellAccesorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis } = req.body
  console.log('Estos datos me llegan:' + JSON.stringify(req.body)) 
  updateSaleGrossById(operation_id, booking_bl, container_id, provider, customer, date, buyAccesorials, sellAccesorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis)
  .then(() => res.status(200).json({ message: "saleGross Input Updated"}))
  .catch(error => {
    console.log('Error Controller updateSaleGross: ' + error)
    res.status(500).json({error})
  })
}

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  deleteClientById(id)
  .then(res.status(200).json({ message: 'ok'}))
  .catch(error => {
    console.log('Error Controller deleteClient: ' + error)
    res.status(500).json({error})
  })
}

export const fetchClientById = async (req, res) => {
  getClientById(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(error => res.status(500).json({ error }))
}

export const updateClientInfoById = async (req, res) => {
  const {customerId, name, address, contact, businessLine, customerType, phoneNumbers , customerEmails} = req.body;
  changeClientInfo(customerId, name, address, contact, businessLine, customerType, phoneNumbers, customerEmails)
  .then(() => res.status(200).json({message: 'ok'}))
  .catch(error => {
    console.log(error);
    res.status(500).json({ error });
  })

}

export const updateSummarySalesGrossById = async (req, res) => {
  const { operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount} = req.body;
  changeSummarySalesGrossById(operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount)
  .then(() => res.status(200).json({message: 'ok'}))
  .catch(error => {
    console.log(error);
    res.status(500).json({ error })
  })
}

export const newSummarySalesGrossById = async (req, res) => {
  const { operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount} = req.body;
  newSummaryInputSalesGross(operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount)
  .then(() => res.status(200).json({message: 'ok'}))
  .catch(error => {
    console.log(error);
    res.status(500).json({ error })
  })
}

export const getSalesGrossById = async (req, res) => {
  fetchSaleGrossInfoById(req.params.id)
  .then(data => res.status(200).json(data[0]))
  .catch(error => {
    console.log(error);
    res.status(500).json({ error })
  })
}


