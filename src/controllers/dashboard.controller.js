import {
  getSales,
  getClients,
  getProviders,
  getCarriers,
  getQuotes,
  getApprovedQuotes,
  getPorts,
  getQuoteFeeById,
  updateCarrierFeeById,
  getCarriersList,
  getUserEmailAndCompany,
  getCities,
  getCitiesID,
  getQuoteByIdAndCompanyID,
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
  getOperationByIdAndCompany,
  addNewClient,
  isClientEmailDuplicated,
  addNewCarrier,
  deleteCarriersById,
  deleteCarriersEmailsById,
  isCarrierEmailDuplicated,
  isQuoteAlreadyClosed,
  getStates,
  getAllContainerStatus,
  changeQuote,
  getAllQuoteIds,
  changeNote,
  changeQuoteIdById,
  changeWeightxId,
  getAllOperationsForTable,
  getAllClosedQuotes,
  getAllClosedCompletedQuotes,
  getAllRequestedQuotes,
  getAllQuotesWithFees,
  updateOperation,
  saveOperationFees,
  saveBunchOperationFees,
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
  getAllClosedQuoteId,
  getClosedQuoteById,
  getNormalQuoteById,
  updateSaleGrossById,
  deleteClientById,
  getClientByIdAndCompany,
  changeClientInfo,
  changeSummarySalesGrossById,
  newSummaryInputSalesGross,
  fetchSaleGrossInfoById,
  newOperationToSalesGross,
  newClosedQuote,
  deleteQuoteById,
  getAllClientsByCompanyId,
  getOperationColFiltered,
  deleteGenericRowById,
  getCarrierByIdAndCompany,
  changeCarrierInfoById,
  getClosedQuoteByIdAndCompany,
  changeClosedQuoteInfoById,
  getAllCarriersNameByCompanyId,
  getAllSaleGrossToCompare,
  addNewCarrierPorts,
  getCarrierPortCoverageByID,
  getAllIdOpenQuotes,
  fetchEmailsWithPortId,
  fetchAllBuySaleGross,
  fetchAllSellSaleGross,
  fetchAllProfitSaleGross,
  getWarehouses,
  addNewWarehouse,
  getWarehouseByIdAndCompany,
  changeWarehouseInfo,
  deleteWarehouseById,
  getWarehouseDataById,
  getLastClosedQuoteIdFromTable,
  filterByColFromTable,
  postBookUserForDemo,
  fetchEmailWithStateId,
  getCompanyName,
  deleteClosedQuoteById,
  getOpFeeById,
  findUserByEmail,
  findUserByInviteCode,
} from '../services/databaseServices.js';
import {
  saveNewQuote,
} from '../services/quotes.js';
import {
  hashPassword
} from '../utils/hashPassword.js';
import { 
  createUser,
  updateUserDetails,
  updateUserPassword,
} from '../services/userService.js';
import { 
  saveCompanyRow
} from '../services/companyService.js';
import { sendEmail } from '../services/emailService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res) => {
  return res.json('Valid token');
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await getUserEmailAndCompany(email);

    if (!user) {
      return res.status(400).json({ message: 'Email does not exist' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    const tokenPayload = { email: user.email, userID: user.userID };
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET || 'testtoken', {
      expiresIn: '2h'
    });

    const {
      userName,
      userID,
      fullName,
      role,
      phone,
      email: userEmail,
      company_userID: companyUser
    } = user;

    const company = {
      companyName: user.company_name,
      companyPhone: user.company_phone,
      companyAddress: user.company_address,
      companyWebPage: user.company_webpage,
      companyEmail: user.company_email,
      inviteCode: user.invite_code
    };

    return res.status(200).json({
      token,
      userName,
      role,
      companyUser,
      phone,
      fullName,
      userID,
      email: userEmail,
      company
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const saveFee = async (req, res) => {
  const {
    id,
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
    buyaccessorials,
    buyAccesorialsQuantity,
    sellDrayageUniteRate,
    sellChassisUnitRate,
    sellaccessorials,
    sellAccesorialsQuantity,
    notes,
    companyID
  } = req.body;

  try {
    const buyaccessorialsJSON = JSON.stringify(buyaccessorials);
    const buyAccesorialsQuantityJSON = JSON.stringify(buyAccesorialsQuantity);
    
    const sellaccessorialsJSON = JSON.stringify(sellaccessorials);
    const sellAccesorialsQuantityJSON = JSON.stringify(sellAccesorialsQuantity);
    
    await saveNewQuoteFee(
      id,
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
      buyaccessorialsJSON,
      buyAccesorialsQuantityJSON,
      sellDrayageUniteRate,
      sellChassisUnitRate,
      sellaccessorialsJSON,
      sellAccesorialsQuantityJSON,
      notes,
      companyID
    );
    return res.status(200).json({ message: 'ok' });
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
    accessorialsWithFee,
    accessorialsList,
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

        .accessorialBox {
          width: 200px !important;
        }

        .truckImgContainer {
          padding: 40px 0 !important;
        }

        .accessorialText {
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

      .accessorialBox {
        width: 300px;
      }

      .truckImgContainer {
        padding: 20px 0;
      }

      .accessorialText {
        margin-bottom: 10px;
        display: inline-block;
        width: 110px;
        font-size: 17px;
      }

      .accessorialWithFee{
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly;
      }

      .accessorialList{
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
            ${otherCommodity === ''
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

            ${hazardous === 'Yes'
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
          class="md-text-2xl">accessorial CHARGES THAT WILL APPLY</h1>

          <div style="margin-top: 1rem; text-align: center">
          
          ${!Object.entries(accessorialsWithFee).length ? (
    ' <p style="width: 95%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">NONE</p>'
  ) : (
    `<div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accessorialWithFee">
                    ${Object.entries(accessorialsWithFee)
      .slice(0, 7)
      .map(
        ([item, value]) => `
                    <p style="width: 16.5%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">
                        ${item}: $${value}
                      </p>`
      )
      .join('')}
                  </div>

                  <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accessorialWithFee">
                  ${Object.entries(accessorialsWithFee)
      .slice(7, 13)
      .map(
        ([item, value]) => `
                    <p style="width: 16.5%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">
                        ${item}: $${value}
                      </p>`
      )
      .join('')}
                  </div>

                  <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accessorialWithFee">
                  ${Object.entries(accessorialsWithFee)
      .slice(13, 18)
      .map(
        ([item, value]) => `
                    <p style="width: 16.5%; text-align: center; font-weight: 500; font-size: 16px; margin-bottom: 10px; padding: 0 15px;">
                        ${item}: $${value}
                      </p>`
      )
      .join('')}
                  </div>
        `
  )}
        
            
              <h3 style="font-size: 22px; font-weight:700; line-height: 1.75rem; text-align: center; margin-top: 25px; text-decoration: underline;">Also may apply</h3>
          


            <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly; margin-top: 15px;" class="accessorialWithFee">
                ${accessorialsList
    .slice(0, 6)
    .map(
      (item) =>
        `<p style="width: 12%; text-align: center; font-weight: 500; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
                      ${item.accessorial}
                  </p>`
    )
    .join('')}
              </div>

              <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accessorialWithFee">
                ${accessorialsList
    .slice(6, 12)
    .map(
      (item) =>
        `<p style="width: 12%; text-align: center; font-weight: 500; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
                      ${item.accessorial}
                  </p>`
    )
    .join('')}
              </div>

              <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly;" class="accessorialWithFee">
                ${accessorialsList
    .slice(12, 18)
    .map(
      (item) =>
        `<p style="width: 12%; text-align: center; font-weight: 500; font-size: 14px; margin-bottom: 10px; padding: 0 10px;">
                      ${item.accessorial}
                  </p>`
    )
    .join('')}
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

  const subject = `New Quotation / ${quoteID}`;

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
          accessorialsWithFee,
          client,
          clientEmailsList
        )
          .then((data) => {
            if (data) {
              res.status(200).json({ message: 'ok' });
            } else {
              res
                .status(500)
                .json({ message: 'Something went wrong on saving the quote' });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      } else {
        res
          .status(500)
          .json({ message: 'Something went wrong on sending the message' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getQuote = async (req, res) => {
  const id = req.params.id;
  const idCompany = req.params.idCompany;
  getQuoteByIdAndCompanyID(id, idCompany)
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
  const id = req.params.id;
  const idCompany = req.params.idCompany;
  try {
    const [rows] = await getCarrierFeeByQuoteId(id, idCompany);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const updateCarrierFee = async (req, res) => {
  const {
    id,
    carrierEmail,
    buyDrayageUnitRate,
    buyChassisUnitRate,
    buyaccessorials,
    buyAccesorialsQuantity,
    sellDrayageUnitRate,
    sellChassisUnitRate,
    sellaccessorials,
    sellAccesorialsQuantity,
    notes
  } = req.body;
  
  const updateData = {};
  
  if (carrierEmail !== null && carrierEmail !== undefined) updateData.carrierEmail = carrierEmail;
  if (buyDrayageUnitRate !== null && buyDrayageUnitRate !== undefined) updateData.buyDrayageUnitRate = buyDrayageUnitRate;
  if (buyChassisUnitRate !== null && buyChassisUnitRate !== undefined) updateData.buyChassisUnitRate = buyChassisUnitRate;
  if (buyaccessorials !== null && buyaccessorials !== undefined) updateData.buyAccesorials = JSON.stringify(buyaccessorials);
  if (buyAccesorialsQuantity !== null && buyAccesorialsQuantity !== undefined) updateData.buyAccesorialsQuantity = JSON.stringify(buyAccesorialsQuantity);
  if (sellAccesorialsQuantity !== null && sellAccesorialsQuantity !== undefined) updateData.sellAccesorialsQuantity = JSON.stringify(sellAccesorialsQuantity);
  if (sellDrayageUnitRate !== null && sellDrayageUnitRate !== undefined) updateData.sellDrayageUnitRate = sellDrayageUnitRate;
  if (sellChassisUnitRate !== null && sellChassisUnitRate !== undefined) updateData.sellChassisUnitRate = sellChassisUnitRate;
  if (sellaccessorials !== null && sellaccessorials !== undefined) updateData.sellAccesorials = JSON.stringify(sellaccessorials);
  if (notes !== null && notes !== undefined) updateData.notes = notes;

  updateCarrierFeeById(id, updateData)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const createQuote = async (req, res) => {
  const {
    carriers,
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
    bussinessLine,
    quoteStatus,
    cordinator,
    replyEmail,
    idCompany,
    companyName
  } = req.body;

  const emailSubject = `Drayage request from ${companyName}`;

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
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600; width: 170px;">Mode
            of Operation</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${operation}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">${isExport ? 'POL' : 'POD'
}</td>
          <td
            style="border: 1px solid black; padding: 8px; text-align: start; font-size: 15px; padding-left: 10px;">${pol}</td>
        </tr>
        <tr>
          <td
            style="border: 1px solid black; padding: 8px; text-align: center; background-color: #1A6AFF; color: white; font-size: 18px; font-weight: 600;">${isExport ? 'Pick Up Address' : 'Delivery Address'
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
      <a href="https://easyfreight.ai/">
        <img style="margin-top: 10px;" width="200"
          src="https://tms.easyfreight.ai/logo.svg"
          alt="logo">
      </a>
    </body>
    </html>`;

  saveNewQuote(
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
    bussinessLine,
    quoteStatus,
    cordinator,
    idCompany
  )
    .then(() => sendEmail(carriers, replyEmail, emailSubject, emailBody))
    .then(() => {
      res.status(200).json({ message: 'ok' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};

export const getCarriersByPort = async (req, res) => {
  const selectedPort = req.params.id;
  const idCompany = req.params.idCompany;
  getCarriers(selectedPort, idCompany)
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

export const getAllClosedCompletedQuote = async (req, res) => {
  getAllClosedCompletedQuotes(req.params.idCompany)
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
export const getAllClosedQuote = async (req, res) => {
  getAllClosedQuotes(req.params.idCompany)
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getAllRequestedQuote = async (req, res) => {
  getAllRequestedQuotes(req.params.idCompany)
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getAllQuotesWithFess = async (req, res) => {
  getAllQuotesWithFees(req.params.idCompany)
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getAllApprovedQuotes = async (req, res) => {
  getApprovedQuotes(req.params.idCompany)
    .then((rows) => res.status(200).json(rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};
export const getAllQuotes = async (req, res) => {
  getQuotes(req.params.id)
    .then((rows) => res.status(200).json(rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllSales = (req, res) => {
  getSales(req.params.id)
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
  getProviders(req.params.idCompany)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllCarriers = (req, res) => {
  getCarriersList(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const newOperation = async (req, res) => {
  try {
    const { qty = 1, ...operationData } = req.body;
    const insertedIds = await saveNewOperation(operationData, qty);
    const [quoteFee] = await getQuoteFeeById(req.body.quoteID);
    await saveBunchOperationFees(insertedIds, quoteFee);
    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.error('Error saving new operation:', error);
    res.status(500).json({ error });
  }
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
};

export const changeStatus = async (req, res) => {
  const { idOperation, status, idCompany } = req.body;

  changeOperationStatus(idOperation, status, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const changeContainerStatus = async (req, res) => {
  const { idOperation, containerStatus, idCompany } = req.body;

  changeOperationContainerStatus(idOperation, containerStatus, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const updateBookingBl = async (req, res) => {
  const { idOperation, bookingBl, idCompany } = req.body;
  changeBookingBl(idOperation, bookingBl, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const updateContainerId = async (req, res) => {
  const { idOperation, containerId, idCompany } = req.body;
  changeContainerId(idOperation, containerId, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });

};

export const getOperation = async (req, res) => {
  const id = req.params.id;
  const idCompany = req.params.idCompany;
  getOperationByIdAndCompany(id, idCompany)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const addClient = async (req, res) => {
  try {
    const clientData = req.body;
    const isEmailDuplicated = await isClientEmailDuplicated(clientData.email);
    if (isEmailDuplicated) {
      return res.status(400).json({
        message: 'This email is already registered. Please use a different one.'
      });
    }
    const clientId = await addNewClient(clientData);
    res.status(200).json({ 
      message: 'Client added successfully' ,
      client_id: clientId,
    });

  } catch (error) {
    // Captura de errores globales en todo el proceso
    console.error('Error in adding carrier:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCarrier = async (req, res) => {
  try {
    const carrierId = req.params.id;
    const isDeletedCarriersEmails = await deleteCarriersEmailsById(carrierId);
    const isDeletedCarriers = await deleteCarriersById(carrierId);
    if (isDeletedCarriersEmails && isDeletedCarriers) {
      res.status(200).json({ 
        message: 'Carrier deleted successfully' ,
      });
    }

  } catch (error) {
    // Captura de errores globales en todo el proceso
    console.error('Error in adding carrier:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const addCarrier = async (req, res) => {
  try {
    const carrierData = req.body;
    const isEmailDuplicated = await isCarrierEmailDuplicated(carrierData.carrierEmail);
    if (isEmailDuplicated) {
      return res.status(400).json({
        message: 'This email is already registered. Please use a different one.'
      });
    }
    const carrierId = await addNewCarrier(carrierData);
    const carrierEmailId = await addNewCarrierPorts(carrierId, carrierData);
    res.status(200).json({ 
      message: 'Carrier added successfully' ,
      carrier_id: carrierId,
      carrier_email_id: carrierEmailId

    });

  } catch (error) {
    // Captura de errores globales en todo el proceso
    console.error('Error in adding carrier:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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
      return res.status(500);
    });
};

export const changeStatusQuote = async (req, res) => {
  const { status, id } = req.body;
  changeQuote(status, id)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const getQuoteIds = async (req, res) => {
  getAllQuoteIds(req.params.idCompany)
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const changeNoteQuote = async (req, res) => {
  //formato json enviado por el cliente
  const { note, idOperation, idCompany } = req.body;
  //ejecucion de query
  changeNote(note, idOperation, idCompany)
    //respuesta
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
export const changeQuoteId = async (req, res) => {
  const { quoteID, idOperation } = req.body;
  const idCompany = req.params.idCompany;
  changeQuoteIdById(quoteID, idOperation, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
export const changeWeight = async (req, res) => {
  const { weight, idOperation } = req.body;
  changeWeightxId(weight, idOperation)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => res.status(500).json({ error }));
};


export const saveOperationFeesByID = async (req, res) => {
  saveOperationFees(req.body)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => res.status(500).json(error));
};

export const updateOperationById = async (req, res) => {
  const operationData = req.body;
  if (!operationData.idOperation) {
    return res.status(400).json({ message: 'idOperation is required' });
  }
  updateOperation(operationData)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => res.status(500).json(error));
};

export const allOperationsDashboard = async (req, res) => {
  getAllOperationsForTable(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getAllOperationsTable = async (req, res) => {
  getAllOperationsForTable(req.params.id)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getClosedQuotes = async (req, res) => {
  getAllClosedQuotes(req.params.id)
    .then(row => res.status(200).json(row))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const updateUser = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const { fullName, userName, phone, role } = req.body;

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await updateUserDetails(
      existingUser.id, fullName, userName, phone, role
    );
    return res.status(200).send({ email, fullName, userName, phone, role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const { currentPassword, newPassword } = req.body;

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashedNewPassword = await hashPassword(newPassword);
    const updatedUser = await updateUserPassword(existingUser.id, hashedNewPassword);
    return res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const newAccount = async (req, res) => {
  try {
    const { fullName, email, password, phone, role, invitationCode } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    let companyID;
    if (invitationCode) {
      const invitationCodeIsValid = await findUserByInviteCode(invitationCode);
      if (!invitationCodeIsValid) {
        return res.status(400).json({ error: 'The invitation code is invalid or does not exist.' });
      }
      companyID = invitationCodeIsValid.id;
    } else {
      const newCompany = await saveCompanyRow({
        name: 'Test company',
        company_phone: 111111,
        company_address: 'company_address',
        company_webpage: 'company_webpage',
        company_email: 'company_email'
      });
      companyID = newCompany.id;
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser(fullName, fullName, email, hashedPassword, phone, role, companyID);
    return res.status(201).json({ message: 'Account created successfully', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteOperationFromTable = async (req, res) => {
  const id = req.params.id;
  deleteOperationByID(id)
    .then(() => res.status(200).json({ message: 'Operation Deleted Successfully' }))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error Deleting Operation' });
    });
};

export const newInputSaleGross = async (req, res) => {
  const {
    bookingBl,
    containerId,
    provider,
    customer,
    date
  } = req.body;
  console.log('testeo desde controller + booking bl: ' + bookingBl + ' containerId: ' + containerId + ' provider: ' + provider + ' customer: ' + customer + ' con la fecha de: ' + date);

  newInputQuerySaleGross(bookingBl, containerId, provider, customer, date)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      res.status(500).json(error);
      console.log('Error en Controlador ' + error);
    });


};

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
    carrieraccessorials,
    magnetaccessorials,
    buyChassis,
    sellChassis,
  } = req.body;

  newInputQueryFLSaleGross(operationId, bookingBl, containerId, provider, customer, buy, sell, profit, date, carrieraccessorials, magnetaccessorials, buyChassis, sellChassis)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      res.status(500).json(error);
      console.log('Error en controlador ' + error);
    });

};

export const updateProviderSalesGross = async (req, res) => {
  const { idSalesGross, providerInvoice } = req.body;
  changeProviderSalesGross(idSalesGross, providerInvoice)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller updateProviderSales  : ' + error);
      res.status(500).json({ error });
    });
};

export const updateCustomerInvoiceSalesGross = async (req, res) => {
  const { idSalesGross, customerInvoice } = req.body;
  changeCustomerInvoiceSalesGross(idSalesGross, customerInvoice)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller updateCustomerInvoiceSalesGross  : ');
      res.status(500).json({ error });
    });
};

export const updateStatusSalesGross = async (req, res) => {
  const { idSalesGross, statusSalesGross } = req.body;
  changeStatusSalesGross(idSalesGross, statusSalesGross)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller updateStatusSalesGross  :  ' + error);
      res.status(500).json({ error });
    });
};

export const updateBuySalesGross = async (req, res) => {
  const { idSalesGross, buySalesGross } = req.body;
  changeBuySalesGross(idSalesGross, buySalesGross)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller updateBuySalesGross : ' + error);
      res.status(500).json({ error });
    });
};

export const updateSellSalesGross = async (req, res) => {
  const { idSalesGross, sellSalesGross } = req.body;
  changeSellSalesGross(idSalesGross, sellSalesGross)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller updateSellSalesGross: ' + error);
      res.status(500).json({ error });
    });
};

export const updateProfitSalesGross = async (req, res) => {
  const { idSalesGross, profitSalesGross } = req.body;
  changeProfitSalesGross(idSalesGross, profitSalesGross)
    .then(() => res.status(200).json({ message: 'updated profit' }))
    .catch(error => {
      console.log('Error Controller updateProfitSalesGross: ' + error);
      res.status(500).json({ error });
    });
};

export const deleteSale = async (req, res) => {
  const id = req.params.id;
  const idCompany = req.params.idCompany;

  deleteSaleById(id, idCompany)
    .then(res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller deleteSale: ' + error);
      res.status(500).json({ error });
    });
};

export const getClosedQuoteId = async (req, res) => {
  getAllClosedQuoteId(req.params.idCompany)
    .then(row => res.status(200).json(row))
    .catch(error => {
      console.log('Error Controller getClosedQuoteId: ' + error);
      res.status(500).json({ error });
    });
};

export const getClosedQuote = async (req, res) => {
  getClosedQuoteById(req.params.id, req.params.idCompany)
    .then(row => res.status(200).json(row[0]))
    .catch(error => {
      console.log('Error Controller getFloridaQuote: ' + error);
      res.status(500).json({ error });
    });
};

export const getNormalQuote = async (req, res) => {
  getNormalQuoteById(req.params.id, req.params.idCompany)
    .then(row => res.status(200).json(row[0]))
    .catch(error => {
      console.log('Error Controller getNormalQuote: ' + error);
      res.status(500).json({ error });
    });
};

export const updateSaleGross = async (req, res) => {
  const { operation_id, booking_bl, container_id, provider, customer, date, buy, sell, profit, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis } = req.body;
  const idCompany = req.params.idCompany;
  console.log('Estos datos me llegan:' + JSON.stringify(req.body) + '  tambien el idCompany: ' + idCompany);
  updateSaleGrossById(operation_id, booking_bl, container_id, provider, customer, date, buy, sell, profit, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, idCompany)
    .then(() => res.status(200).json({ message: 'saleGross Input Updated' }))
    .catch(error => {
      console.log('Error Controller updateSaleGross: ' + error);
      res.status(500).json({ error });
    });
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  deleteClientById(id)
    .then(res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller deleteClient: ' + error);
      res.status(500).json({ error });
    });
};

export const fetchClientById = async (req, res) => {
  const idClient = req.params.id;
  const idCompany = req.params.idCompany;
  getClientByIdAndCompany(idClient, idCompany)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const updateClientInfoById = async (req, res) => {
  const { customerId, customerType, name, contact, phoneNumber, email, country, state, city, zipcode, address, creditTerms, idCompany } = req.body;
  changeClientInfo(customerId, customerType, name, contact, phoneNumber, email, country, state, city, zipcode, address, creditTerms, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });

};

export const updateSummarySalesGrossById = async (req, res) => {
  const { operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount } = req.body;
  changeSummarySalesGrossById(operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const newSummarySalesGrossById = async (req, res) => {
  const { operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount } = req.body;
  newSummaryInputSalesGross(operationId, chassisBuyQuantity, chassisBuySummary, totalBuyChassisAmount, chassisSellQuantity, chassisSellSummary, totalSellChassisAmount)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const getSalesGrossById = async (req, res) => {
  fetchSaleGrossInfoById(req.params.id)
    .then(data => res.status(200).json(data[0]))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const addNewOperationToSaleGross = async (req, res) => {
  const idCompany = req.params.idCompany;
  const { operation_id, booking_bl, container_id, provider, customer, buy, sell, profit, date, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis } = req.body;
  newOperationToSalesGross(operation_id, booking_bl, container_id, provider, customer, buy, sell, profit, date, buyaccessorials, sellaccessorials, buyDrayageUnitRate, buyChassisUnitRate, buyQtyChassis, sellDrayageUnitRate, sellChassisUnitRate, sellQtyChassis, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      res.status(500).json(error);
      console.log('Error Controller addNewOperationToSaleGross: ' + error);
    });
};

export const addNewCloseQuote = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'Quote id is required' });
    }
    const quotes = await getQuoteById(id);
    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    const quote = quotes[0];

    const isQuoteClosed = await isQuoteAlreadyClosed(id);

    if (isQuoteClosed) {
      return res.status(400).json({
        message: 'This quote is already closed. Please use a different id.'
      });
    }

    const {
      modeOfOperation,
      pol,
      deliveryAddress,
      equipment,
      containerSize,
      containerType,
      weight,
      commodity,
      hazardous,
      bonded,
      loadType,
      bussinessLine,
      company_userID,
      sellChassisUnitRate,
      sellDrayageUnitRate,
      buyChassisUnitRate,
      buyDrayageUnitRate,
    } = quote;

    await newClosedQuote({
      quoteID: id,
      operationType: modeOfOperation,
      pol,
      deliveryAddress,
      equipment,
      containerSize,
      containerType,
      weight,
      commodity,
      hazardous,
      bonded,
      loadType,
      bussinessLine,
      company_userID,
      sellChassisUnitRate,
      sellDrayageUnitRate,
      buyChassisUnitRate,
      buyDrayageUnitRate
    });

    await deleteQuoteById(id);

    return res.status(200).json({ message: 'Closed quote saved successfully' });

  } catch (error) {
    console.error('Error in addNewCloseQuote:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteQuote = async (req, res) => {
  deleteQuoteById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const deleteClosedQuote = async (req,res) => {
  deleteClosedQuoteById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const getAllClientsCompany = async (req, res) => {
  getAllClientsByCompanyId(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const getOperationFeesByID = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await getOpFeeById(id);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const filterOperationCol = async (req, res) => {
  const colList = Object.keys(req.body);
  const idCompany = req.params.idCompany;

  getOperationColFiltered(colList, idCompany)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const deleteGenericRow = async (req, res) => {
  const { id, idCompany, tableCalled, columnCalled } = req.params;

  deleteGenericRowById(tableCalled, columnCalled, id, idCompany)
    .then(res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller deleteGenericRow' + error);
      res.status(500).json({ error });
    });
};

export const fetchCarrierById = async (req, res) => {
  const idCarrier = req.params.idCarrier;
  const idCompany = req.params.idCompany;
  getCarrierByIdAndCompany(idCarrier, idCompany)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const updateCarrierInfoById = async (req, res) => {
  const { carrierId, name, contact, mc, dot, SCAC, EIN, form1099, insurance, address, city, state, country, doct, carrierType, carrierPhone, carrierEmail, idCompany, ports } = req.body;
  changeCarrierInfoById(carrierId, name, contact, mc, dot, SCAC, EIN, form1099, insurance, address, city, state, country, doct, carrierType, carrierPhone, carrierEmail, idCompany, ports)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const fetchClosedQuoteById = async (req, res) => {
  const closedQuoteId = req.params.id;
  const idCompany = req.params.idCompany;
  getClosedQuoteByIdAndCompany(closedQuoteId, idCompany)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const updateClosedQuoteInfoById = async (req, res) => {
  const { quoteID, operationType, pol, warehouseID, city, state, zipcode, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType, carrier, buyDrayageUnitRate, buyChassisUnitRate, clientID, client, clientIDPD, sellDrayageUnitRate, sellChassisUnitRate, idCompany } = req.body;
  changeClosedQuoteInfoById(quoteID, operationType, pol, warehouseID, city, state, zipcode, equipment, containerSize, containerType, weight, commodity, hazardous, bonded, loadType, carrier, buyDrayageUnitRate, buyChassisUnitRate, clientID, client, clientIDPD, sellDrayageUnitRate, sellChassisUnitRate, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });

};

export const fetchCarriersNamesByCompanyId = (req, res) => {
  getAllCarriersNameByCompanyId(req.params.idCompany)
    .then((row) => res.status(200).json(row))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const getInfoToCompareSaleGross = (req, res) => {
  getAllSaleGrossToCompare(req.params.idCompany)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getCarriersPortCoverage = (req, res) => {
  const idCarrier = req.params.idCarrier;
  const idCompany = req.params.idCompany;
  getCarrierPortCoverageByID(idCarrier, idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllQuotesForIdCheck = (req, res) => {
  getAllIdOpenQuotes(req.params.idCompany)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllEmailsWithPortId = (req, res) => {
  fetchEmailsWithPortId(req.params.id, req.params.idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllBuySaleGrossData = (req, res) => {
  fetchAllBuySaleGross(req.params.idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllSellSaleGrossData = (req, res) => {
  fetchAllSellSaleGross(req.params.idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllProfitSaleGrossData = (req, res) => {
  fetchAllProfitSaleGross(req.params.idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllWarehousesData = (req, res) => {

  getWarehouses(req.params.idCompany)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const addWarehouse = (req, res) => {
  const {type, name, contact, phoneNumber, email, country, state, city, zipcode, address, scheduling_preference, idCompany } = req.body;

  addNewWarehouse(type, name, contact, phoneNumber, email, country, state, city, zipcode, address, scheduling_preference, idCompany)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
};

export const fetchWarehouseById = (req, res) => {
  const idWarehouse = req.params.id;
  const idCompany = req.params.idCompany;
  getWarehouseByIdAndCompany(idWarehouse, idCompany)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

export const updateWarehouseInfoById = (req, res) => {
  const { id } = req.params;
  const { type, name, contact, phoneNumber, email, country, state, city, address, scheduling_preference } = req.body;
  changeWarehouseInfo(id, type, name, contact, phoneNumber, email, country, state, city, address, scheduling_preference)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const deleteWarehouse = (req, res) => {
  deleteWarehouseById(req.params.id)
    .then(res.status(200).json({ message: 'ok' }))
    .catch(error => {
      console.log('Error Controller deleteWarehouse ' + error);
      res.status(500).json({ error });
    });
};

export const fetchWarehouseData = (req, res) => {
  getWarehouseDataById(req.params.id, req.params.idCompany)
    .then((row) => res.status(200).json(row))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getLastClosedQuoteId = (req, res) => {
  getLastClosedQuoteIdFromTable(req.params.idCompany)
    .then((data) => {
      res.status(200).json(data.length ? data[0].quoteID : 1);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const fetchSendQuoteCompInformation = (req, res) => {
  getCompanyName(req.params.idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const filterByCol = (req, res) => {
  const { cols, tableName } = req.body;

  filterByColFromTable(cols, tableName, req.params.idCompany)
    .then(data => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const bookUserForDemo = (req, res) => {
  console.log(req.body);
  postBookUserForDemo(req.body)
    .then(() => res.status(200).json({ message: 'ok' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getAllEmailsWithStateId = (req, res) => {
  fetchEmailWithStateId(req.params.id, req.params.idCompany)
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const getCompanyNameForSendQuote = (req, res) => {
  getCompanyName(req.params.idCompany)
    .then(data => res.status(200).json(data[0].name))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

export const saveCompany = (req, res) => {
  saveCompanyRow(req.body)
    .then(data => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};
