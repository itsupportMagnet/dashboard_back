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
  getCarriersList,
  getUserEmail,
  getCities,
  updateIdCounter,
  saveNewQuote,
  getQuoteById,
  saveNewQuoteFee,
  saveQuoteSent,
  saveNewOperation,
  getTerminals,
  getAllOperations,
  changeOperationStatus
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
          res.send({ token });
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
      "SELECT counter FROM id_countertest LIMIT 1"
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
    carrierFee,
    carrierChassis,
    carrierAccesorials,
    magnetFee,
    magnetChassis,
    magnetAccesorials,
    totalFee,
    totalChassis,
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
      totalFee,
      totalChassis
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
    emailSubject,
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
            <p style="margin-top: 0.5rem"><b>Phone:</b> 754 242 5988</p>
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

        <center
          style="
            width: 98.5%;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            gap: 2.5rem;
            justify-content: space-evenly;
            align-items: center;
            border-style: solid;
            border-width: 4px;
            border-color: #a5a5a5;
            text-align: center;
            font-size: 18px;
	    font-weight: 600;
          "
          class="locationsDetails md-flex-row"
        >
          <center>
            <img
              src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/Screenshot-2023-08-22-125419.png"
              alt="location icon"
            />
            <p style="margin-top: 0.75rem">${pol}</p>
          </center>

          <center class="locationsDetailsBox truckImgContainer">
            <img
              style="width: 7rem"
              class="md-w-40"
              src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/truck-1918551_12801.png"
              alt="magnet truck"
            />
            <p style="margin-top: 0.5rem">${miles} miles</p>
          </center>

          <center>
            <img
              src="http://www.magnetlogisticscorp.com/wp-content/uploads/2023/08/Screenshot-2023-08-22-125419.png"
              alt="location icon"
            />
            <p style="margin-top: 0.75rem">${deliveryAddress}</p>
          </center>
        </center>

        <div style="margin-top: 2.5rem" class="shipmentDetails">
          <h1
            style="
              font-size: 1.125rem;
              line-height: 1.75rem;
              text-align: center;
              padding: 0.25rem;
              background-color: #d1d5db;
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
              background-color: #d1d5db;
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
              margin-top: 4rem;
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

        <div style="margin-top: 2.5rem" class="mayApply">
          <h1 style="font-size: 1.125rem; line-height: 1.75rem; text-align: center; padding: 0.25rem; background-color: #d1d5db;" class="md-text-2xl">ACCESORIAL CHARGES MAY APPLY</h1>

          <div style="margin-top: 1rem; text-align: center">
          
            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
              ${Object.entries(accesorialsWithFee)
      .slice(0, 6)
      .map(
        ([item, value]) => `
              <p style="width: 16.5%; text-align: center; font-weight: 600; font-size: 17px; margin-bottom: 10px; padding: 0 15px;">
                  ${item}: $${value}
                </p>`
      )
      .join("")}
            </div>

            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
            ${Object.entries(accesorialsWithFee)
      .slice(6, 12)
      .map(
        ([item, value]) => `
              <p style="width: 16.5%; text-align: center; font-weight: 600; font-size: 17px; margin-bottom: 10px; padding: 0 15px;">
                  ${item}: $${value}
                </p>`
      )
      .join("")}
            </div>

            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accesorialWithFee">
            ${Object.entries(accesorialsWithFee)
      .slice(12, 18)
      .map(
        ([item, value]) => `
              <p style="width: 16.5%; text-align: center; font-weight: 600; font-size: 17px; margin-bottom: 10px; padding: 0 15px;">
                  ${item}: $${value}
                </p>`
      )
      .join("")}
            </div>

  
              <h3 style="font-size: 22px; font-weight:700; line-height: 1.75rem; text-align: center; padding: 25px 0; text-decoration: underline;">Also may apply</h3>
          


            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly; margin-top: 30px;" class="accesorialWithFee">
                ${accesorialsList
      .slice(0, 6)
      .map(
        (item) =>
          `<p style="width: 12%; text-align: center; font-weight: 600; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
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
          `<p style="width: 12%; text-align: center; font-weight: 600; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
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
          `<p style="width: 12%; text-align: center; font-weight: 600; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
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
              background-color: #d1d5db;
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

  sendEmail(emailSubject, emailBody, [], clientEmailsList)
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
    otherCommodity,
    hazardous,
    slctHazardous,
    bonded,
    loadType,
    carrier,
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
        ${otherCommodity !== ""
      ? `<tr>
            <td
              style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Other Comodity</td>
            <td
              style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${otherCommodity}</td>
          </tr>`
      : `<tr style="display: none">
            <td></td>
            <td></td>
          </tr>`
    }
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Hazardous</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${hazardous}</td>
        </tr>
        ${slctHazardous !== ""
      ? `<tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">Hazardous Class</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${slctHazardous}</td>
          </tr>`
      : `<tr style="display: none">
            <td></td>
            <td></td>
          </tr>`
    }
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
    otherCommodity,
    hazardous,
    slctHazardous,
    bonded,
    loadType
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
    customer,
    idOperation,
    status,
    modeOfOperation,
    operationMode,
    operationDate,
    idCoordinator,
    bookingBl,
    containerId,
    provider,
    cargoStatus,
    emptyLocation,
    warehouseLocation,
    port,
    po,
    ssline,
    city,
    equipment,
    containerSize,
    containerType,
    weight,
    commodity,
    otherCommodity,
    hazardous,
    hazardousClass,
    bonded,
  } = req.body;
  
  saveNewOperation(
    customer,
    idOperation,
    status,
    modeOfOperation,
    operationMode,
    operationDate,
    idCoordinator,
    bookingBl,
    containerId,
    provider,
    cargoStatus,
    emptyLocation,
    warehouseLocation,
    port,
    po,
    ssline,
    city,
    equipment,
    containerSize,
    containerType,
    weight,
    commodity,
    otherCommodity,
    hazardous,
    hazardousClass,
    bonded
  )
    .then(() => {
      res.status(200).json({ message: "ok" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });

  /*res.json({customer,idOperation,status, modeOfOperation, operationMode, operationType, operationDate, idCoordinator, 
    bookingBl, containerId, provider, cargoStatus ,emptyLocation ,wareHouseLocation,
    port, po, ssline, city, equipment, containerSize, containerType, weight, commodity, otherCommodity, hazardous
  })*/
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
    .then(row => res.status(500).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
}

export const changeStatus = async (req, res) => {
  const {idOperation, status} = req.body;
  
  changeOperationStatus(idOperation, status)
  .then(()=> res.status(500).json({message: 'ok'}))
  .catch(error => {
    console.log(error);
    res.status(500).json({ error })
  })
}