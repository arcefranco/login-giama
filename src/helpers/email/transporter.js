const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars');



export const transporter = nodemailer.createTransport({ //Credenciales para enviar mail 
    host: process.env.MAIL_HOST, 
    port: 25, 
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS 
    },
    tls: {
      secure: false,
      ignoreTLS: true,
      rejectUnauthorized: false 
  }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir:  path.resolve('./views'),
      defaultLayout: false
    },
    viewPath: path.resolve('./views'),
    extName: ".handlebars"
  }

  transporter.use('compile', hbs(handlebarOptions))