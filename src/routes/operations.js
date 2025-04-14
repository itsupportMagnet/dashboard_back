import { Router } from 'express';
import { 
  newOperation, 
  getOperations, 
  getOperation, 
  getAllOperationsTable, 
  updateOperationById, 
  deleteOperationFromTable, 
  filterOperationCol, 
  getOperationFeesByID,
  updateOperationFeesByID,
} from '../controllers/dashboard.controller.js';
const router = Router();
router
  .post('/post/operation-fees/:id', updateOperationFeesByID)
  .get('/get/operation-fees/:id', getOperationFeesByID)

  .post('/post/newOperation', newOperation)
  .get('/get/all-operations', getOperations)
  .get('/get/getOperation/:id/:idCompany', getOperation)
  .get('/get/allOperationsTable/:id', getAllOperationsTable)
  .post('/post/updateOperation/:idCompany', updateOperationById)
  .delete('/delete/deleteOperation/:id', deleteOperationFromTable)
  .post('/post/filterOperationCol/:idCompany', filterOperationCol);

export default router;