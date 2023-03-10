const nodemailer = require("nodemailer");

const LINK = `${process.env.NEXT_PUBLIC_API_URL}/user/confirm/`;

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
    return error.message;
  }
};

const sendContactMail = async (name, email, subject, message) => {
  try {
    transporter.sendMail({
      from: `FitU <${mail.user}>`,
      to: `FitU <${mail.user}>`,
      subject: `Form Contact app: <${subject}>`,
      text: `nombre:<${name}>  email:<${email}> mensaje: <${message}>`,
    });
    return "e-Mail enviado";
  } catch (error) {
    return error.message;
  }
};

const getTemplate = (name, token) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img width="500" src="https://img.freepik.com/vector-premium/verificacion-correo-electronico-icono-validacion-marca-verificacion-diseno-plano_614220-66.jpg?w=2000" alt="">
          <h2>Hola ${name}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href=https://fp-server-cg2b.onrender.com/user/confirm/${token.token}
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
