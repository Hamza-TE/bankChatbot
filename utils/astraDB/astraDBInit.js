const { AstraDBVectorStore} = require("@langchain/community/vectorstores/astradb");
const configurations = require('./astraDBInitConfig');


let astradbvectorstore = null;

async function initializeVectorStore() {
    try {
        console.log('------------inside initializeVectorStore');
        const astraDBconfigJSON = await configurations.astraDBinitialseConfig();
        const astraDBconfig = JSON.parse(astraDBconfigJSON.astraConfig);
        const azureOpenAIEmbeddingConfig = await configurations.azureOpenAIEmbeddingConfig();
        astradbvectorstore =  await new AstraDBVectorStore(azureOpenAIEmbeddingConfig.configAzureEmbeddings,astraDBconfig);
        await astradbvectorstore.initialize();
    } catch (error) {
      console.error('Error initializing vector store:', error);
      throw error;
    }
  return astradbvectorstore;
}


async function getVectorStore() {
  if (!astradbvectorstore) {
    throw new Error('Vector store is not initialized.');
  }
  return astradbvectorstore;
}

module.exports = {
  initializeVectorStore,
  getVectorStore,
};
