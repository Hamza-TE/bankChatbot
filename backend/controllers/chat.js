
const chatService = require('../services/chatService');

async function getChatResponse(req, res){
  const { messages } = req.body;
  try {

    console.log('--------------inside chatController getChatResponse -----------------')
    const response = await chatService.getChatCompletion(messages);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
};

module.exports = {
  getChatResponse,
};