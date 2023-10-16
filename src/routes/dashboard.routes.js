import { Router } from "express";
import { 
    getAllSales, 
    getAllClients, 
    getAllProviders, 
    getAllQuotes,
    getAllPorts,
    getAllRoutes,
    getCarriersByPort,
    createQuote,
    getAllAccesorials,
    getQuotesFeeById,
    getQuote,
} from "../controllers/dashboard.controller.js";

const router = Router();

router
.post("/", createQuote)
.get('/salesGross', getAllSales)
.get("/allQuotes", getAllQuotes)
.get("/allRoutes", getAllRoutes)
.get("/quotes/:id", getQuote)
.get('/clients', getAllClients)
.get("/quotes-fees/:id", getQuotesFeeById)
.get("/accesorials", getAllAccesorials)
.get('/providers', getAllProviders)
.get("/carriers/:id", getCarriersByPort)
.get("/ports", getAllPorts)
export default router;