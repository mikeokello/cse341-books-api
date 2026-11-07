const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books and Authors API',
    description: 'CSE 341 W02 Books and Authors API'
  },
  host: 'cse341-books-api-k04i.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);