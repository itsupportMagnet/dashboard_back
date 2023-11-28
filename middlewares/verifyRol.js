import { pool } from "../db.js";
//rol 1 is ADMIN
//rol 2 is user or client 
export const validateRole = async (req, res, next) => {
  //traer la info del cliente mediante la base de datos
  //verificar si el rol(localStorage) es igual al de la bd
  //v- puede seguir con la acción
  //f- tirara error

  const email = req.header('email')
  const rol = req.header('rol')

  !email || res.status(500).json({ message: "email doesn't exits or appear" });
  !rol || res.status(500).json({message: "rol doesn't exits or appear"})
  //consulta a la bd
  query = "SELECT `rol` FROM users WHERE email = ?";
  pool
    .query(query, [email])
    .then((rows) => {
      user = rows[0]
      if( user.rol  == rol && rol == 1 ){
        next()
      }else{
        return res.status(500).json({message: "this rol was altered or this rol doesn't is admin"})
      }

    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json(error)
    });
};
