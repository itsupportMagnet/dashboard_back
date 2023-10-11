import { Router } from "express";
import { getAllSales, getAllClients, getAllProviders, getAllCarriers } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/salesGross', getAllSales)
.get('/clients', getAllClients)
.get('/providers', getAllProviders)
.get('/carriers', getAllCarriers)

export default router;