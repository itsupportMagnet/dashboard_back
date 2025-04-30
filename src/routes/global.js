import { Router } from 'express';
import { 
  getCompanyNameForSendQuote, 
  getAllTerminals, 
  getAllStates, 
  getAllProviders, 
  getAllPorts,
  getAllCities,
  getAllCitiesID,
  saveCompany
} from '../controllers/dashboard.controller.js';

const router = Router();
router
  .get('/get/companyName/:idCompany', getCompanyNameForSendQuote)
  .get('/get/terminals/:id', getAllTerminals)
  .get('/get/states', getAllStates)
  .get('/get/providers/:idCompany', getAllProviders)
  .get('/get/ports', getAllPorts)
  .get('/get/cities', getAllCities)
  .get('/get/cities/:id', getAllCitiesID)
  .post('/company', saveCompany);

export default router;