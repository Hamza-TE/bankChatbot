require('dotenv').config();

module.exports = {
    DB_CONFIG: {
        ASTRA_DB_APPLICATION_TOKEN: process.env.ASTRA_DB_APPLICATION_TOKEN,
        ASTRA_DB_ID: process.env.ASTRA_DB_ID,
        ASTRA_DB_API_ENDPOINT: process.env.ASTRA_DB_API_ENDPOINT,
    }
}