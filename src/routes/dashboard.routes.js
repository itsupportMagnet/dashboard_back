import { Router } from "express";
import { getAllSales } from "../controllers/dashboard.controller";

const router = Router();

router.get('/salesGross', getAllSales)

export default router;