require('dotenv').config();
module.exports = {
    API_ENDPOINTS: {
        BACKEND_PORT: process.env.BACKEND_PORT,
        GET_ASSISTANT_RESPONSE: process.env.GET_ASSISTANT_RESPONSE,
        GET_ASTRA_DB_SEARCH: process.env.GET_ASTRA_DB_SEARCH,
        ASTRA_DB_SEARCH_URL: process.env.ASTRA_DB_SEARCH_URL,
    },
    SUB_API_ENDPOINTS: {
        CHATS: process.env.CHATS,
        ASTRA_DB_SEARCH_TEXT: process.env.ASTRA_DB_SEARCH_TEXT,
    }
};