"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = void 0;

var nodemailer = require('nodemailer');

var path = require('path');

var hbs = require('nodemailer-express-handlebars');

var transporter = nodemailer.createTransport({
  //Credenciales para enviar mail 
  host: process.env.MAIL_HOST,
  port: 25,
  secure: false,
  // true for 465, false for other ports
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
exports.transporter = transporter;
var handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve('./views'),
    defaultLayout: false
  },
  viewPath: path.resolve('./views'),
  extName: ".handlebars"
};
transporter.use('compile', hbs(handlebarOptions));