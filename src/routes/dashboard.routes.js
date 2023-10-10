import { Router } from "express";
import { getAllSales } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/salesGross', getAllSales)

export default router;