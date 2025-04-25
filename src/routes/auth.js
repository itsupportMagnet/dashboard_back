import { Router } from 'express';
import { login, verifyToken, newAccount, updateUser, changePassword } from '../controllers/dashboard.controller.js';
// import { validateRole } from '../../middlewares/verifyRol.js';
import { validarJWT } from '../../middlewares/validar-jwt.js';
const router = Router();
router
  .post('/login/users/sign_in', login)
  // .post('/login/users/register',[validateRole],newAccount)
  .post('/signUp',newAccount)
  .get('/login/users/verify-token', [validarJWT], verifyToken)
  .put('/users/:email',updateUser)
  .post('/users/changePassword/:email',changePassword);

export default router;

