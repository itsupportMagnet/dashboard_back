import { Router } from 'express';
import { 
  changeStatus, 
  changeContainerStatus, 
  updateBookingBl, 
  updateContainerId, 
  getContainerStatus, 
  sendFee,
  saveFee,
  changeNoteQuote,
  changeWeight,
  deleteGenericRow,
} from '../controllers/dashboard.controller.js';

const router = Router();
router
  .post('/post/change-status', changeStatus)
  .post('/post/change-containerStatus', changeContainerStatus)
  .post('/post/updateBookingBl', updateBookingBl)
  .post('/post/updateContainerID', updateContainerId)
  .get('/get/container-status', getContainerStatus)
  .post('/post/send-fee', sendFee)
  .post('/post/save-fee', saveFee)
  .post('/post/change-notes', changeNoteQuote)
  .post('/post/change-weight', changeWeight) 
  .delete('/delete/deleteGenericTable/:tableCalled/:columnCalled/:id/:idCompany', deleteGenericRow);

export default router;