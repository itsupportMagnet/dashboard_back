import { Router } from 'express';
import { 
    getAllSales, 
    updateProviderSalesGross, 
    updateCustomerInvoiceSalesGross, 
    updateStatusSalesGross, 
    updateBuySalesGross, 
    updateSellSalesGross, 
    updateProfitSalesGross,
    newInputSaleGross,
    updateSaleGross,
    updateSummarySalesGrossById,
    newSummarySalesGrossById,
    getSalesGrossById,
    addNewOperationToSaleGross,
    getInfoToCompareSaleGross,
    getAllBuySaleGrossData,
    getAllSellSaleGrossData,
    getAllProfitSaleGrossData,
    newFLInputSaleGross,
    deleteSale,
} from '../controllers/dashboard.controller.js';

const router = Router();
router
    .get('/get/salesGross/:id', getAllSales)
    .post('/post/updateProviderSalesGross', updateProviderSalesGross)
    .post('/post/updateCustomerInvoiceSalesGross', updateCustomerInvoiceSalesGross)
    .post('/post/updateStatusSalesGross', updateStatusSalesGross)
    .post('/post/updateBuySalesGross', updateBuySalesGross)
    .post('/post/updateSellSalesGross', updateSellSalesGross)
    .post('/post/updateProfitSalesGross', updateProfitSalesGross)
    .post('/post/newInfoSaleGross', newInputSaleGross)
    .post('/post/updateSaleGross/:idCompany', updateSaleGross)
    .post('/post/updateSummarySalesGross', updateSummarySalesGrossById)
    .post('/post/newSummarySalesGross', newSummarySalesGrossById)
    .get('/get/getSalesGrossSelected/:id', getSalesGrossById)
    .post('/post/newOperationSaleGross/:idCompany', addNewOperationToSaleGross)
    .get('/get/salesGrossToCompare/:idCompany', getInfoToCompareSaleGross)
    .get('/get/allBuySaleGross/:idCompany', getAllBuySaleGrossData)
    .get('/get/allSellSaleGross/:idCompany', getAllSellSaleGrossData)
    .get('/get/allProfitSaleGross/:idCompany', getAllProfitSaleGrossData)
    .post('/post/newSaleGrossFromFloridaQuotes' , newFLInputSaleGross)
    .delete('/delete/delete-sale/:id/:idCompany', deleteSale);

export default router;