import { pool } from '../db.js';
//rol 1 is ADMIN
//rol 2 is user or client
export const validateRole = async (req, res, next) => {
    //traer la info del cliente mediante la base de datos
    //verificar si el rol(localStorage) es igual al de la bd
    //v- puede seguir con la acción
    //f- tirara error

    const email = req.header('email');
    const rol = req.header('rol');
    console.log(email);
    console.log(rol);
    console.log(typeof rol);
    !email && res.status(500).json({ message: 'email doesn\'t exits or appear' });
    !rol && res.status(500).json({ message: 'rol doesn\'t exits or appear' });
    //consulta a la bd
    let query = 'SELECT `rol` FROM users WHERE email = ?';
    pool
        .query(query, [email])
        .then((rows) => {
            const user = rows[0][0];
            console.log(user);
            const userRol = user.rol;
      
            console.log('user rol de bd: '+ userRol);
            if (userRol == rol && userRol == 1) {
                return next();
            } else {
                return res
                    .status(500)
                    .json({
                        message: 'this rol was altered or this rol doesn\'t have enough permissions',
                    });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
        });
};
