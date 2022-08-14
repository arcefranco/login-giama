const nodemailer = require('nodemailer')
export const transporter = nodemailer.createTransport({ //Credenciales para enviar mail 
    host: "mail.giama.com.ar", //faltan .ENV
    port: 25, 
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@giama.com.ar',
      pass: 'Q)9~X-?(5~,o' 
    },
    tls: {
      secure: false,
      ignoreTLS: true,
      rejectUnauthorized: false 
  }
  });