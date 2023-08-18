const axios = require('axios');

// Crear una instancia de Axios con la configuración base
const instance = axios.create({
  baseURL: 'https://api.resend.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Definir la función para enviar correos
async function sendEmail() {
  const data = {
    from: 'onboarding@resend.dev',
    to: 'angel-krak@hotmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  };

  try {
    const response = await instance.post('/emails', data, {
      headers: {
        Authorization: 'Bearer re_fCjCybPP_59drTgsqJSAUXuydsH468unX',
      },
    });
    console.log('Email sent:', response.data);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    return error;
  }
}
