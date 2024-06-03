import nodemailer from 'nodemailer'
import { env } from '../config'

const send = (subject: string, html: string, to: string): void => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.APP_EMAIL_ACCOUNT,
      pass: env.APP_EMAIL_PASSWORD,
    },
  })

  // setting credentials
  const mailDetails = {
    from: env.APP_EMAIL_ACCOUNT,
    to,
    subject,
    text: '',
    html,
    attachments: [
      {
        filename: 'logo-rdt.web',
        path: './public/logo-rdt.webp',
        cid: 'logo',
      },
    ],
  }

  // sending email
  transporter
    .sendMail(mailDetails)
    .then((data) => {
      console.log('---------------------')
      console.log('email sent successfully')
    })
    .catch((err) => {
      console.log('error occurred', err.message)
    })
}

const getConfirmTemplate = (name: string, urlConfirm: string) => {
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
    `
}

const getApplicationTemplate = (
  name: string,
  lastName: string,
  title: string
) => {
  const fullName = `${lastName}, ${name}`
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="cid:logo" alt="logo">
          <h2>Nueva postulación</h2>
          <p>El usuario ${fullName} se postuló al aviso ${title}</p>
      </div>
    `
}

const getUpdateApplicationTemplate = (businessName: string, title: string) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="cid:logo" alt="logo">
          <h2>Actualización</h2>
          <p>La empresa ${businessName} actualizó el estado de tu postulación al aviso ${title}</p>
      </div>
    `
}

const getInactiveJobTemplate = (company: any, jobs: any) => {
  const subtitle =
    jobs.length > 1
      ? `los siguientes avisos pasaron a estar INACTIVOS`
      : `el siguiente aviso pasó a estar INACTIVO`

  const inactiveJobs = jobs.map((job: any) => {
    return `<li>${job.title}</li>`
  })

  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="cid:logo" alt="logo">
          <h2>Avisos Inactivos</h2>
          <p>Hola ${company.businessName}, ${subtitle}</p>
          <ul>${inactiveJobs}</ul>
      </div>
    `
}

const geContactTemplate = (
  name: string,
  lastName: string,
  email: string,
  message: string
) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Contacto de ${lastName}, ${name}</h2>
          <p>Correo: ${email}</p>
          <p>Mensaje: ${message}</p>
      </div>
    `
}

const getForgotPasswordTemplate = (username: string, urlForgot: string) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Alguien ha solicitado un reinicio de contraseña para la siguiente cuenta:</h2>
          <p>Nombre de usuario: ${username}</p>
          <p>Si fue un error ignorá este correo que no va a pasar nada.</p>
          <p>Para restaurar la contraseña, visita la siguiente dirección:</p>
          <a
              href="${urlForgot}"
              target="_blank"
          >Restaurar contraseña</a>
      </div>
    `
}

const mailService = {
  send,
  getConfirmTemplate,
  getApplicationTemplate,
  getUpdateApplicationTemplate,
  getInactiveJobTemplate,
  geContactTemplate,
  getForgotPasswordTemplate,
}

export default mailService
