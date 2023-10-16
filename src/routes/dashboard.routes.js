import { Router } from "express";
import { 
    getAllSales, 
    getAllClients, 
    getAllProviders, 
    getAllCarriers,
    getAllQuotes,
    getAllPorts
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/salesGross', getAllSales)
.get("/allQuotes", getAllQuotes)
.get('/clients', getAllClients)
.get('/providers', getAllProviders)
.get('/carriers', getAllCarriers)
.get("/ports", getAllPorts)
export default router;