import { Router } from 'express';
import { 
  updateCarrierFee, 
  getAllCarriers, 
  getCarriersByPort, 
  getCarriersFeeByID, 
  getAllEmailsWithStateId, 
  fetchCarrierById, 
  updateCarrierInfoById,
  fetchCarriersNamesByCompanyId,
  getCarriersPortCoverage,
  getAllEmailsWithPortId,
  addCarrier,
  deleteCarrier,
} from '../controllers/dashboard.controller.js';

const router = Router();
router
  .post('/carriers', addCarrier)
  .delete('/carriers/:id', deleteCarrier)
  .post('/post/update-carrier-fee', updateCarrierFee)
  .get('/get/carriers-fees/:id/:idCompany', getCarriersFeeByID)
  .get('/get/allCarriers/:id', getAllCarriers)
  .get('/get/carriers/:id/:idCompany', getCarriersByPort)
  .get('/get/statesCarriersEmails/:id/:idCompany', getAllEmailsWithStateId)
  .get('/get/carriersByID/:idCarrier/:idCompany', fetchCarrierById)
  .post('/post/updateCarrier', updateCarrierInfoById)
  .get('/get/carriersNames/:idCompany', fetchCarriersNamesByCompanyId)
  .get('/get/carriersNamesEmails/:idCompany', fetchCarriersNamesEmailsByCompanyId)
  .get('/get/carriersPortCoverage/:idCarrier/:idCompany', getCarriersPortCoverage)
  .get('/get/portCarriersEmails/:id/:idCompany', getAllEmailsWithPortId);
  
export default router;