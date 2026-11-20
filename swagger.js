// swagger.js - W03 - Mongoose version
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books and Authors API',
    description: 'CSE 341 W03 Books and Authors API - Mongoose version'
  },
  host: 'cse341-books-api-k04i.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);