import { Router } from 'express';
import { 
  addClient, 
  getAllClients, 
  getAllClientsCompany, 
  deleteClient, 
  fetchClientById, 
  updateClientInfoById 
} from '../controllers/dashboard.controller.js';

const router = Router();
router
  .post('/post/addClient', addClient)
  .get('/get/clients', getAllClients)
  .get('/get/clients/:id', getAllClientsCompany)
  .delete('/delete/deleteClient/:id/:idCompany', deleteClient)
  .get('/get/clientsById/:id/:idCompany', fetchClientById)
  .post('/post/updateClient', updateClientInfoById);

export default router;