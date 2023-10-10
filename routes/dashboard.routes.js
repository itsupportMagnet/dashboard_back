import { Router } from "express";

const router = Router();

router.get('/dashboard', ()=> {
    console.log('Ruta principal');
})