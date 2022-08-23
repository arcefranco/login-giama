const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {

   // el token viene en el header de la petición, lo tomamos:
   const token = req.header('x-auth-token');
   console.log('token: ', token)
   // Si no nos han proporcionado un token lanzamos un error
   if (!token) {
      return next({ status: 404, message: "Token not found" });
   }

   try {
      const decoded = jwt.verify(token, 'JWT_SECRET');
      req.usuario = decoded
      next(); 

   } catch (error) {
      console.log(error);
      next({ status: 400, message: "Invalid token" });
   }
}