import { Router } from "express";
import { getAllSales, getAllClients, getAllProviders } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/salesGross', getAllSales)
.get('/clients', getAllClients)
.get('/providers', getAllProviders)

export default router;