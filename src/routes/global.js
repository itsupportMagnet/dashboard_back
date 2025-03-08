import { Router } from 'express';
import { 
    getCompanyNameForSendQuote, 
    getAllTerminals, 
    getAllStates, 
    getAllaccessorials, 
    getAllProviders, 
    getAllPorts,
    getAllCities,
    getAllCitiesID
} from '../controllers/dashboard.controller.js';

const router = Router();
router
    .get('/get/companyName/:idCompany', getCompanyNameForSendQuote)
    .get('/get/terminals/:id', getAllTerminals)
    .get('/get/states', getAllStates)
    .get('/get/accessorials', getAllaccessorials)
    .get('/get/providers/:idCompany', getAllProviders)
    .get('/get/ports', getAllPorts)
    .get('/get/cities', getAllCities) //Este endpoint no lo ocupamos en nada
    .get('/get/cities/:id', getAllCitiesID);

export default router;