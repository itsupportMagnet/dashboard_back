import { Router } from "express";
import { 
    getAllSales, 
    getAllClients, 
    getAllProviders, 
    getAllQuotes,
    getAllPorts,
    getAllRoutes,
    getAllCities,
    getCarriersByPort,
    createQuote,
    getAllAccesorials,
    getQuotesFeeById,
    getQuote,
    sendFee,
    saveFee,
    getAllCarriers,
    login,
    verifyToken,
    newOperation,
    getAllTerminals,
    getOperations,
    changeStatus
} from "../controllers/dashboard.controller.js";
import { validarJWT } from "../../middlewares/validar-jwt.js";
const router = Router();

router
.post("/", createQuote)
.get('/salesGross', getAllSales)
.post("/send-fee", sendFee)
.post("/save-fee", saveFee)
.get("/allQuotes", getAllQuotes)
.get("/allRoutes", getAllRoutes)
.get("/quotes/:id", getQuote)
.get('/clients', getAllClients)
.get("/quotes-fees/:id", getQuotesFeeById)
.get("/accesorials", getAllAccesorials)
.get('/providers', getAllProviders)
.get("/carriers/:id", getCarriersByPort)
.get("/ports", getAllPorts)
.get("/carriers", getAllCarriers)
.post("/users/sign_in", login)
.get("/users/verify-token", [validarJWT], verifyToken)
.get("/cities", getAllCities)
.post("/newOperation", newOperation)
.get("/terminals/:id", getAllTerminals)
.get("/all-operations", getOperations)
.get('/change-status', changeStatus)
export default router;