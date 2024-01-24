import { Router } from "express";
import { 
    getAllSales, 
    getAllClients, 
    getAllProviders, 
    getAllQuotes,
    getAllPorts,
    getAllRoutes,
    getAllCities,
    getAllCitiesID,
    getCarriersByPort,
    createQuote,
    getAllAccesorials,
    getQuotesFeeById,
    updateCarrierFee,
    getCarriersFeeByID,
    getQuote,
    sendFee,
    saveFee,
    getAllCarriers,
    login,
    verifyToken,
    newOperation,
    getAllTerminals,
    getOperations,
    changeStatus,
    changeContainerStatus,
    updateBookingBl,
    updateContainerId,
    getOperation,
    addClient,
    addCarrier,
    getAllStates,
    getContainerStatus,
    changeStatusQuote,
    getQuoteIds,
    changeNoteQuote,
    changeQuoteId,
    changeWeight,
    getAllOperationsTable,
    getFloridaQuotes,
    updateOperationById,
    // maxIdOperation,
    deleteOperationFromTable,
    newAccount,
    newInputSaleGross,
    newFLInputSaleGross,
    updateProviderSalesGross,
    updateCustomerInvoiceSalesGross,
    updateStatusSalesGross,
    updateBuySalesGross,
    updateSellSalesGross,
    updateProfitSalesGross,
    deleteSale,
    getFloridaQuoteId,
    getFloridaQuote,
    getNormalQuote,
    updateSaleGross,
    deleteClient,
    fetchClientById,
    updateClientInfoById,
    updateSummarySalesGrossById,
    newSummarySalesGrossById,
    getSalesGrossById,
    addNewOperationToSaleGross,
    addNewCloseQuote,
    getAllClientsCompany,
} from "../controllers/dashboard.controller.js";
import { validarJWT } from "../../middlewares/validar-jwt.js";
import { validateRole } from "../../middlewares/verifyRol.js";
const router = Router();

router
.post("/createQuote", createQuote)
.get("/get/salesGross/:id", getAllSales)
.post("/post/send-fee", sendFee)
.post("/post/save-fee", saveFee)
.get("/get/allQuotes/:id", getAllQuotes)
.get("/allRoutes", getAllRoutes) //Este endpoint no lo ocupamos en nada
.get("/get/quotes/:id", getQuote)
.get("/get/clients", getAllClients)
.get("/get/quotes-fees/:id", getQuotesFeeById)
.get("/get/carriers-fees/:id", getCarriersFeeByID)
.post("/post/update-carrier-fee", updateCarrierFee)
.get("/get/accesorials", getAllAccesorials)
.get("/get/providers", getAllProviders)
.get("/get/carriers/:id", getCarriersByPort) //Debemos cambiarlo a futuro
.get("/get/ports", getAllPorts)
.get("/get/allCarriers/:id", getAllCarriers)
.post("/login/users/sign_in", login)
.get("/login/users/verify-token", [validarJWT], verifyToken)
.get("/get/cities", getAllCities) //Este endpoint no lo ocupamos en nada
.get("/get/cities/:id", getAllCitiesID)
.post("/post/newOperation", newOperation)
.get("/get/terminals/:id", getAllTerminals)
.get("/get/all-operations", getOperations)
.post("/post/change-status", changeStatus)
.post("/post/change-containerStatus", changeContainerStatus)
.post("/post/updateBookingBl", updateBookingBl)
.post("/post/updateContainerID", updateContainerId)
.get("/get/getOperation/:id", getOperation)
.post("/post/addClient", addClient)
.post("/post/addCarrier", addCarrier)
.get("/get/states", getAllStates)
.get("/get/container-status", getContainerStatus)
.post("/post/change-status-quote", changeStatusQuote)
.get("/get/getQuoteIds", getQuoteIds)
.post("/post/change-notes", changeNoteQuote)
.post("/post/change-quoteid", changeQuoteId)
.post("/post/change-weight", changeWeight) 
.get("/get/allOperationsTable/:id", getAllOperationsTable)
.get("/get/allFloridaQuotes/:id", getFloridaQuotes)
.post("/post/updateOperation", updateOperationById)
.delete("/delete/deleteOperation/:id", deleteOperationFromTable)
.post("/login/users/register",[validateRole],newAccount)
.post("/post/newInfoSaleGross", newInputSaleGross)
.post("/post/newSaleGrossFromFloridaQuotes" , newFLInputSaleGross)
.post("/post/updateProviderSalesGross", updateProviderSalesGross)
.post("/post/updateCustomerInvoiceSalesGross", updateCustomerInvoiceSalesGross)
.post("/post/updateStatusSalesGross", updateStatusSalesGross)
.post("/post/updateBuySalesGross", updateBuySalesGross)
.post("/post/updateSellSalesGross", updateSellSalesGross)
.post("/post/updateProfitSalesGross", updateProfitSalesGross)
.delete("/delete/delete-sale/:id", deleteSale)
.get("/get/get-florida-quoteId", getFloridaQuoteId)
.get("/get/get-florida-quote/:id", getFloridaQuote)
.get("/get/get-normal-quote/:id", getNormalQuote)
.post("/post/updateSaleGross/", updateSaleGross)
.delete("/delete/deleteClient/:id/:idCompany", deleteClient)
.get("/get/clientsById/:id/:idCompany", fetchClientById)
.post("/post/updateClient", updateClientInfoById)
.post("/post/updateSummarySalesGross", updateSummarySalesGrossById)
.post("/post/newSummarySalesGross", newSummarySalesGrossById)
.get("/get/getSalesGrossSelected/:id", getSalesGrossById)
.post("/post/newOperationSaleGross", addNewOperationToSaleGross)
.post("/post/newCloseQuote", addNewCloseQuote)
.get("/get/clients/:id", getAllClientsCompany)
// .get("/maxIdOperation", maxIdOperation )
export default router;