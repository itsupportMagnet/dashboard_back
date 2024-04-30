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
    getClosedQuotes,
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
    getClosedQuoteId,
    getClosedQuote,
    getLastClosedQuoteId,
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
    filterOperationCol,
    deleteGenericRow,
    fetchCarrierById,
    updateCarrierInfoById,
    fetchClosedQuoteById,
    updateClosedQuoteInfoById,
    fetchCarriersNamesByCompanyId,
    getSsLineData,
    getInfoToCompareSaleGross,
    getCarriersPortCoverage,
    getAllQuotesForIdCheck,
    getAllEmailsWithPortId,
    getAllBuySaleGrossData,
    getAllSellSaleGrossData,
    getAllProfitSaleGrossData,
    getAllWarehousesData,
    addWarehouse,
    fetchWarehouseById,
    updateWarehouseInfoById,
    deleteWarehouse,
    fetchWarehouseData,
    fetchSendQuoteCompInformation,
    filterByCol,
    bookUserForDemo,
    getAllEmailsWithStateId,
    getCompanyNameForSendQuote
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
.get("/get/quotes/:id/:idCompany", getQuote)
.get("/get/clients", getAllClients)
.get("/get/quotes-fees/:id", getQuotesFeeById)
.get("/get/carriers-fees/:id/:idCompany", getCarriersFeeByID)
.post("/post/update-carrier-fee", updateCarrierFee)
.get("/get/accesorials", getAllAccesorials)
.get("/get/providers/:idCompany", getAllProviders)
.get("/get/carriers/:id/:idCompany", getCarriersByPort) //Debemos cambiarlo a futuro
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
.get("/get/getOperation/:id/:idCompany", getOperation)
.post("/post/addClient", addClient)
.post("/post/addCarrier", addCarrier)
.get("/get/states", getAllStates)
.get("/get/container-status", getContainerStatus)
.post("/post/change-status-quote", changeStatusQuote)
.get("/get/getQuoteIds/:idCompany", getQuoteIds)
.post("/post/change-notes", changeNoteQuote)
.post("/post/change-quoteid/:idCompany", changeQuoteId)
.post("/post/change-weight", changeWeight) 
.get("/get/allOperationsTable/:id", getAllOperationsTable)
.get("/get/allClosedQuotes/:id", getClosedQuotes)
.post("/post/updateOperation/:idCompany", updateOperationById)
.delete("/delete/deleteOperation/:id/:idCompany", deleteOperationFromTable)
.post("/login/users/register",[validateRole],newAccount)
.post("/post/newInfoSaleGross", newInputSaleGross)
.post("/post/newSaleGrossFromFloridaQuotes" , newFLInputSaleGross)
.post("/post/updateProviderSalesGross", updateProviderSalesGross)
.post("/post/updateCustomerInvoiceSalesGross", updateCustomerInvoiceSalesGross)
.post("/post/updateStatusSalesGross", updateStatusSalesGross)
.post("/post/updateBuySalesGross", updateBuySalesGross)
.post("/post/updateSellSalesGross", updateSellSalesGross)
.post("/post/updateProfitSalesGross", updateProfitSalesGross)
.delete("/delete/delete-sale/:id/:idCompany", deleteSale)
.get("/get/get-closed-quoteId/:idCompany", getClosedQuoteId)
.get("/get/get-closed-quote/:id/:idCompany", getClosedQuote)
.get("/get/get-last-closed-quote-id/:idCompany", getLastClosedQuoteId)
.get("/get/get-normal-quote/:id/:idCompany", getNormalQuote)
.post("/post/updateSaleGross/:idCompany", updateSaleGross)
.delete("/delete/deleteClient/:id/:idCompany", deleteClient)
.get("/get/clientsById/:id/:idCompany", fetchClientById)
.post("/post/updateClient", updateClientInfoById)
.post("/post/updateSummarySalesGross", updateSummarySalesGrossById)
.post("/post/newSummarySalesGross", newSummarySalesGrossById)
.get("/get/getSalesGrossSelected/:id", getSalesGrossById)
.post("/post/newOperationSaleGross/:idCompany", addNewOperationToSaleGross)
.post("/post/newCloseQuote", addNewCloseQuote)
.get("/get/clients/:id", getAllClientsCompany)
.post("/post/filterOperationCol/:idCompany", filterOperationCol)
.delete("/delete/deleteGenericTable/:tableCalled/:columnCalled/:id/:idCompany", deleteGenericRow)
.get("/get/carriersByID/:idCarrier/:idCompany", fetchCarrierById)
.post("/post/updateCarrier", updateCarrierInfoById)
.get("/get/closedQuoteByID/:id/:idCompany", fetchClosedQuoteById)
.post("/post/updateClosedQuote", updateClosedQuoteInfoById)
.get("/get/carriersNames/:idCompany", fetchCarriersNamesByCompanyId)
.get("/get/ssLine", getSsLineData)
.get("/get/salesGrossToCompare/:idCompany", getInfoToCompareSaleGross)
.get("/get/carriersPortCoverage/:idCarrier/:idCompany", getCarriersPortCoverage)
.get("/get/openQuoteIdCheck/:idCompany", getAllQuotesForIdCheck)
.get("/get/portCarriersEmails/:id/:idCompany", getAllEmailsWithPortId)
.get("/get/allBuySaleGross/:idCompany", getAllBuySaleGrossData)
.get("/get/allSellSaleGross/:idCompany", getAllSellSaleGrossData)
.get("/get/allProfitSaleGross/:idCompany", getAllProfitSaleGrossData)
.get("/get/warehouses/:idCompany", getAllWarehousesData)
.post("/post/addWarehouse", addWarehouse)
.get("/get/warehousesById/:id/:idCompany", fetchWarehouseById)
.post("/post/updateWarehouse", updateWarehouseInfoById)
.delete("/delete/deleteWarehouse/:id/:idCompany", deleteWarehouse)
.get("/get/warehousesByName/:id/:idCompany", fetchWarehouseData)
.get("/get/fetchInfoSendQuote/:idCompany", fetchSendQuoteCompInformation)
.post("/post/filterByCol/:idCompany", filterByCol)
.post("/post/bookUserForDemo", bookUserForDemo)
.get("/get/statesCarriersEmails/:id/:idCompany", getAllEmailsWithStateId)
.get("/get/companyName/:idCompany", getCompanyNameForSendQuote);


// .get("/maxIdOperation", maxIdOperation )
export default router;