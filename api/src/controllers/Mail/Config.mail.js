const nodemailer = require("nodemailer");

const LINK = "http://localhost:3001/user/confirm/";


const mail = {
  user: "grupo06fit.u@gmail.com",
  pass: "zaixnzmpdirujkcq",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

const sendEmail = async (email, html) => {
  try {
    transporter.sendMail({
      from: `FitU <${mail.user}>`,
      to: email,
      subject: "Confirm e-mail FitU",
      text: "Confirm your e-mail",
      html,
    });
    return "e-Mail de verificacion enviado";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const sendContactMail = async (name, email, subject, message) => {
  try {
    transporter.sendMail({
      from: `FitU <${mail.user}>`,
      to: `FitU <${mail.user}>`,
      subject: `Form Contact app: <${subject}>`,
      text:`nombre:<${name}>  email:<${email}> mensaje: <${message}>`
    });
    return "e-Mail enviado";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const getTemplate = (name, token) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://i.pinimg.com/736x/63/39/2f/63392fa88244d183777fdb1018e4b602--programming-humor-humor-meme.jpg" alt="">
          <h2>Hola ${name}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:3000/confirm/?token=${token.token}"
              target="_blank"
          >Confirmar Cuenta</a>
         
      </div>
    `;
};

module.exports = {
  sendEmail,
  getTemplate,
  sendContactMail,
};
