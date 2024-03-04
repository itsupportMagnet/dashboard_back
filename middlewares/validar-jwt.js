import express from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
  //leer headers del front
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      msg: "no hay token"
    })
  }

  try {
    jwt.verify(token, 'testtoken') //process.env.tokenPrivateKey 
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}