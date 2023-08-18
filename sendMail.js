const axios = require('axios');

// Crear una instancia de Axios con la configuración base
const instance = axios.create({
  baseURL: 'https://api.resend.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Definir la función para enviar correos
async function sendEmail({ from, to, subject, html, apiKey }) {
  if (!apiKey || apiKey?.length == 0) {
    return {
      error: true,
      message: 'La api key es requerida para continuar',
    };
  }
  const data = {
    from,
    to,
    subject,
    html,
  };

  try {
    const response = await instance.post('/emails', data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response;
  } catch (error) {
    return { error };
  }
}

module.exports = sendEmail;
