import nodemailer from 'nodemailer';
import { env } from '../config';

const send = (subject: string, html: string, to: string): void => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: env.APP_EMAIL_ACCOUNT,
            pass: env.APP_EMAIL_PASSWORD,
        },
    });

    // setting credentials
    const mailDetails = {
        from: env.APP_EMAIL_ACCOUNT,
        to,
        subject,
        text: "",
        html,
        attachments: [{
            filename: 'logo-rdt.web',
            path: './public/logo-rdt.webp',
            cid: 'logo',
        }],
    };

    // sending email
    transporter.sendMail(mailDetails)
        .then(data => {
            console.log('---------------------');
            console.log('email sent successfully');
        })
        .catch(err => {
            console.log('error occurred', err.message);
        });
};

const getTemplate = (name: string, urlConfirm: string) => {


    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="cid:logo" alt="logo">
          <h2>Hola ${name}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="${urlConfirm}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
}

const mailService = {
    send,
    getTemplate
};

export default mailService;
