import { Router } from 'express';
import { 
  fetchWarehouseData,
  deleteWarehouse,
  updateWarehouseInfoById,
  fetchWarehouseById,
  addWarehouse,
  getAllWarehousesData
} from '../controllers/dashboard.controller.js';
const router = Router();

router
  .get('/get/warehouses/:idCompany', getAllWarehousesData)
  .post('/post/addWarehouse', addWarehouse)
  .get('/get/warehousesById/:id/:idCompany', fetchWarehouseById)
  .post('/post/updateWarehouse/:id', updateWarehouseInfoById)
  .delete('/delete/deleteWarehouse/:id', deleteWarehouse)
  .get('/get/warehousesByName/:id/:idCompany', fetchWarehouseData);

export default router;