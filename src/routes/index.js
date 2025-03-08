import { Router } from 'express';
import clientsRoutes from './clients.js';
import authRoutes from './auth.js';
import operationsRoutes from './operations.js';
import containerRoutes from './container.js';
import carrierRoutes from './carrier.js';
import salesGrossRoutes from './salesGross.js';
import warehouseRoutes from './warehouse.js';
import quotesRoutes from './quotes.js';

const router = Router();

router.use('/', clientsRoutes);
router.use('/', authRoutes);
router.use('/', operationsRoutes);
router.use('/', containerRoutes);
router.use('/', carrierRoutes);
router.use('/', salesGrossRoutes);
router.use('/', warehouseRoutes);
router.use('/', quotesRoutes);

export default router;