const { AZURE_OPENAI_CONFIG } = require('../constants/apiKeys')
const { AzureOpenAI } = require('openai');
const {astraDBsearch} = require('../utils/astraDBsearch');

async function getChatCompletion( userMessage) {
  try {
    console.log('------------inside openaiService---getChatCompletion function');
    let astraDBcontext = await astraDBsearch( userMessage.message);
    console.log('------------userMessage',userMessage);
    console.log('------------astraDBcontext',astraDBcontext);
      const client = new AzureOpenAI({
                                    apiKey: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_API_KEY, 
                                    deployment: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_NAME,
                                    apiVersion: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_VERSION,
                                    endpoint: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_ENDPOINT
                                 });
      const response = await client.chat.completions.create({
        messages:  [
          { role: "system", content: `You are a helpful assistant that answers user question using the context given.\n
                                      Context: ${astraDBcontext}` },
          { role: "user", content: userMessage.message },
        ],
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
