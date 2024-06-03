const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Patient API',
      version: '1.0.0',
      description: 'API endpoints for managing patients',
    },
    servers: [
      {
        url: 'https://patient-crud.onrender.com/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./Routes/Patientroutes.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
