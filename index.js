const express = require('express');
const { Resend } = require('resend');
const ejs = require('ejs');
const fs = require('fs');

const app = express();
const port = 3000;

const resend = new Resend('re_RGyA3Q2F_L5RjaogADQFvrQ5jPgBbbUS8');

// Configuración de Express
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
  res.render('form');
});

// Ruta para manejar el envío del formulario
app.post('/send-email', async (req, res) => {
  try {
    const recipientEmail = req.body.email;

    // Leer el archivo de plantilla EJS
    const template = fs.readFileSync('./views/welcomeEmail.ejs', 'utf-8');

    // Datos para reemplazar en la plantilla
    const data = {
      nombre: 'Angel',
      companyName: 'Metodika',
    };

    // Renderizar la plantilla EJS
    const renderedHTML = ejs.render(template, data);

    // Opciones del correo
    const mailOptions = {
      from: 'Angel Ramirez <onboarding@resend.dev>',
      to: recipientEmail,
      subject: 'Bienvenido a Resend',
      html: renderedHTML,
    };

    // Enviar el correo
    const mailSend = await resend.emails.send(mailOptions);
    res.send('¡Email enviado con éxito!');
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
