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
    changeNoteQuote
    // maxIdOperation
} from "../controllers/dashboard.controller.js";
import { validarJWT } from "../../middlewares/validar-jwt.js";
const router = Router();

router
.post("/", createQuote)
.get("/salesGross", getAllSales)
.post("/send-fee", sendFee)
.post("/save-fee", saveFee)
.get("/allQuotes", getAllQuotes)
.get("/allRoutes", getAllRoutes)
.get("/quotes/:id", getQuote)
.get("/clients", getAllClients)
.get("/quotes-fees/:id", getQuotesFeeById)
.get("/carriers-fees/:id", getCarriersFeeByID)
.get("/accesorials", getAllAccesorials)
.get("/providers", getAllProviders)
.get("/carriers/:id", getCarriersByPort)
.get("/ports", getAllPorts)
.get("/carriers", getAllCarriers)
.post("/users/sign_in", login)
.get("/users/verify-token", [validarJWT], verifyToken)
.get("/cities", getAllCities)
.get("/cities/:id", getAllCitiesID)
.post("/newOperation", newOperation)
.get("/terminals/:id", getAllTerminals)
.get("/all-operations", getOperations)
.post("/change-status", changeStatus)
.post("/change-containerStatus", changeContainerStatus)
.post("/updateBookingBl", updateBookingBl)
.post("/updateContainerID", updateContainerId)
.get("/getOperation/:id", getOperation)
.post("/addClient", addClient)
.post("/addCarrier", addCarrier)
.get("/states", getAllStates)
.get("/container-status", getContainerStatus)
.post("/change-status-quote", changeStatusQuote)
.get("/getQuoteIds", getQuoteIds)
.post("/change-notes", changeNoteQuote)
// .get("/maxIdOperation", maxIdOperation )
export default router;