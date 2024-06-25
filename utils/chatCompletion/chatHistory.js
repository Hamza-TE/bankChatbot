

async function preprocessChatHistory(chatHistory) {
    let chatHistoryProcessed = [];
    try {
        chatHistory.forEach((chat) => {
            chatHistoryProcessed.push({
                role: chat.role,
                content: chat.content
            });
        });
    } catch (error) {
        console.log('Error in preprocessing Chat History:', error);
        throw error;
    }
    return chatHistoryProcessed;
};

module.exports = {
    preprocessChatHistory,
};