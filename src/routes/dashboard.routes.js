import { Router } from "express";
import { 
    getAllSales, 
    getAllClients, 
    getAllProviders, 
    getAllCarriers,
    getAllQuotes,
    getAllPorts,
    getAllRoutes,
    getCarriersByPort,
} from "../controllers/dashboard.controller.js";

const router = Router();

router

.get('/salesGross', getAllSales)
.get("/allQuotes", getAllQuotes)
.get("/allRoutes", getAllRoutes)
.get('/clients', getAllClients)
.get("/accesorials", getAllAccesorials)
.get('/providers', getAllProviders)
.get("/carriers/:id", getCarriersByPort)
.get("/ports", getAllPorts)
export default router;