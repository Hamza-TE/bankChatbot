const { AZURE_OPENAI_CONFIG } = require('../constants/apiKeys')
const { AzureOpenAI } = require('openai');
const {astraDBsearch} = require('../utils/astraDB/astraDBsearch');
const { preprocessChatHistory } = require('../utils/chatCompletion/chatHistory');
const { systemPrompt, systemPrompt02 } = require('../utils/chatCompletion/constants');


async function getChatCompletion( userMessage) {
  try {
    const client = new AzureOpenAI({
      apiKey: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_API_KEY, 
      deployment: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_NAME,
      apiVersion: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_VERSION,
      endpoint: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_ENDPOINT
    });
    
    let completionsInput = [ systemPrompt ]

    const chatHistory = await preprocessChatHistory(userMessage);

    chatHistory.forEach((chat) => {
      completionsInput.push({
          role: chat.role,
          content: chat.content
      })});
    console.log('------------completionsInput',completionsInput);
    
     // Step 1: send the conversation and available functions to the model
    console.log('------------STEP1');
    const response = await client.chat.completions.create({
      messages:  completionsInput,
      model: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_NAME,
      tools:[
          {
            type: "function",
            function: {
              name: "astraDBsearch",
              description: "Search AstraDB for relevant context",
              parameters: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "The query to search in AstraDB"
                  }
                },
                required: ["query"]
              }
            },
          },
        ],
        tool_choice: {"type": "function", "function": {"name": "astraDBsearch"}}
    });
    const responseMessage = response.choices[0].message.content;
    // Step 2: check if the model wanted to call a function 
    console.log('------------STEP2');
    const toolCalls = response.choices[0].message.tool_calls;
    let secondResponse;
    if (response.choices[0].message.tool_calls) {
    // Step 3: call the function
    console.log('------------STEP3');
    // Note: the JSON response may not always be valid; be sure to handle errors
      const availableFunctions = {
        astraDBsearch: astraDBsearch,
      }; 
      let functionResponse;
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        functionResponse = await functionToCall(
          functionArgs.query,
        );
        console.log('------------functionResponse',functionResponse);
      }
      let completionsInput02 = [{ 
        role: "system", 
        content: `You are a helpful assistant that answers user questions using only the context provided. If context is 'null' or does not contain relevant information, respond with only "No match found in Database".
        Context: ${functionResponse}`
      }];
      chatHistory.forEach((chat) => {
        completionsInput02.push({
            role: chat.role,
            content: chat.content
        })});
    console.log('------------chatHistory',completionsInput02);
    secondResponse = await client.chat.completions.create({
      model: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_DEPLOYMENT_NAME,
      messages: completionsInput02,
    }); // get a new response from the model where it can see the function response
  }
  if (secondResponse) {
    console.log('------------secondResponse',secondResponse.choices[0].message.content);
    return secondResponse.choices[0].message.content;
  } else {
    console.log('------------responseMessage',responseMessage);
    return responseMessage;
  }
} catch (error) {
    console.error('Error in OpenAI API request:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  getChatCompletion,
};