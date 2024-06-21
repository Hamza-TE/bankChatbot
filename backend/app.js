// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatRoute = require('./routes/chatRoute');
// const astraDBsearchRoute = require('./routes/astraDBsearchRoute');
const {API_ENDPOINTS} = require('./constants/apiEndpoints');
const astraDBInit = require('./utils/astraDBInit');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize AstraDB
astraDBInit.initializeVectorStore()
.then(() => {
    console.log('Vector store initialized.');
  })
  .catch((error) => {
    console.error('Error initializing vector store:', error);
    process.exit(1); // Exit the process if initialization fails
  });

app.use(API_ENDPOINTS.GET_ASSISTANT_RESPONSE, chatRoute );
// app.use(API_ENDPOINTS.GET_ASTRA_DB_SEARCH, astraDBsearchRoute );

module.exports = app;
