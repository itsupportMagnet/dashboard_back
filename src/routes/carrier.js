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
    getSsLineData,
    getCarriersPortCoverage,
    getAllEmailsWithPortId,
    addCarrier,
} from '../controllers/dashboard.controller.js';

const router = Router();
router
    .post('/post/update-carrier-fee', updateCarrierFee)
    .get('/get/carriers-fees/:id/:idCompany', getCarriersFeeByID)
    .get('/get/allCarriers/:id', getAllCarriers)
    .get('/get/carriers/:id/:idCompany', getCarriersByPort) //Debemos cambiarlo a futuro
    .get('/get/statesCarriersEmails/:id/:idCompany', getAllEmailsWithStateId)
    .get('/get/carriersByID/:idCarrier/:idCompany', fetchCarrierById)
    .post('/post/updateCarrier', updateCarrierInfoById)
    .get('/get/carriersNames/:idCompany', fetchCarriersNamesByCompanyId)
    .get('/get/ssLine', getSsLineData)
    .get('/get/carriersPortCoverage/:idCarrier/:idCompany', getCarriersPortCoverage)
    .get('/get/portCarriersEmails/:id/:idCompany', getAllEmailsWithPortId)
    .post('/post/addCarrier', addCarrier);

export default router;