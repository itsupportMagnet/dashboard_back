import { Router } from 'express';
import { 
  getClosedQuote,
  getLastClosedQuoteId,
  getNormalQuote,
  getAllQuotesForIdCheck,
  fetchClosedQuoteById,
  updateClosedQuoteInfoById,
  addNewCloseQuote,
  getClosedQuoteId,
  getClosedQuotes,
  changeQuoteId,
  fetchSendQuoteCompInformation,
  filterByCol,
  bookUserForDemo,
  getQuoteIds,
  changeStatusQuote,
  getQuotesFeeById,
  getQuote,
  getAllQuotes,
  createQuote,
  getAllApprovedQuotes,
  getAllClosedQuote,
  getAllRequestedQuote,
} from '../controllers/dashboard.controller.js';
const router = Router();

router
  .get('/quotes/approved/:idCompany', getAllApprovedQuotes)
  .get('/quotes/closed/:idCompany', getAllClosedQuote)
  .get('/quotes/requested/:idCompany', getAllRequestedQuote)
  .post('/createQuote', createQuote)
  .get('/get/allQuotes/:id', getAllQuotes)
  .get('/get/quotes/:id/:idCompany', getQuote)
  .get('/get/quotes-fees/:id', getQuotesFeeById)
  .post('/post/change-status-quote', changeStatusQuote)
  .get('/get/getQuoteIds/:idCompany', getQuoteIds)
  .get('/get/allClosedQuotes/:id', getClosedQuotes)
  .post('/post/change-quoteid/:idCompany', changeQuoteId)
  .get('/get/fetchInfoSendQuote/:idCompany', fetchSendQuoteCompInformation)
  .post('/post/filterByCol/:idCompany', filterByCol)
  .post('/post/bookUserForDemo', bookUserForDemo)
  .get('/get/openQuoteIdCheck/:idCompany', getAllQuotesForIdCheck)
  .get('/get/closedQuoteByID/:id/:idCompany', fetchClosedQuoteById)
  .post('/post/updateClosedQuote', updateClosedQuoteInfoById)
  .post('/post/newCloseQuote', addNewCloseQuote)
  .get('/get/get-closed-quoteId/:idCompany', getClosedQuoteId)
  .get('/get/get-closed-quote/:id/:idCompany', getClosedQuote)
  .get('/get/get-last-closed-quote-id/:idCompany', getLastClosedQuoteId)
  .get('/get/get-normal-quote/:id/:idCompany', getNormalQuote);

export default router;