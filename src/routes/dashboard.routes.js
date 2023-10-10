import { Router } from "express";
import { getAllSales, getAllClients } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/salesGross', getAllSales)
.get('/clients', getAllClients)

export default router;