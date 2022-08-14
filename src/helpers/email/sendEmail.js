import { transporter } from "./transporter";


export const sendEmail = async(email, id, token) => { //faltan .ENV
try {
    await transporter.sendMail({ //Envio el mail a la casilla que encontramos segun su nombre de usuario
    from: 'info@giama.com.ar',  
    to: email, 
    subject: "Forgot Password", 
    html: '<p>Click <a href="http://localhost:3000/reset-password/' + id + '/' + token + '">here</a> to reset your password</p>', // html body
  });

} catch (error) {
    console.log(error)
    return error
}

}
