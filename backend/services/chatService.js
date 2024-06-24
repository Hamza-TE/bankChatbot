const { AZURE_OPENAI_CONFIG } = require('../constants/apiKeys')
const { AzureOpenAI } = require('openai');
const {astraDBsearch} = require('../utils/astraDB/astraDBsearch');
const { preprocessChatHistory } = require('../utils/chatHistory');

async function getChatCompletion( userMessage) {
  try {
    const chatHistory = await preprocessChatHistory(userMessage);
    let astraDBcontext = await astraDBsearch( chatHistory[chatHistory.length - 1].content);
      const client = new AzureOpenAI({
                                    apiKey: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_API_KEY, 
                                    deployment: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_NAME,
                                    apiVersion: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_VERSION,
                                    endpoint: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_ENDPOINT
                                 });
      
      let completionsInput = [
        { role: "system", content: `You are a helpful assistant that answers user question using the context given.\n
                                    Context: ${astraDBcontext}` }
      ]
      chatHistory.forEach((chat) => {
        console.log('------------chat',chat);
        completionsInput.push({
            role: chat.role,
            content: chat.content
        })});
      console.log('------------completionsInput',completionsInput);
      const response = await client.chat.completions.create({
        messages:  completionsInput,
        model: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_NAME,
      });
      console.log('------------response');
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in OpenAI API request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  getChatCompletion,
};
