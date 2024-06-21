const { DataAPIClient } = require('@datastax/astra-db-ts');
const { AstraDBVectorStore} = require("@langchain/community/vectorstores/astradb");
const { AzureOpenAIEmbeddings } = require("@langchain/azure-openai");
const configurations = require('./astraDBInitConfig');

let astradbvectorstore = null;

async function initializeVectorStore() {
  if (!astradbvectorstore) {
    try {
        console.log('------------inside initializeVectorStore');
        const astraDBconfigJSON = await configurations.astraDBinitialseConfig();
        const astraDBconfig = JSON.parse(astraDBconfigJSON.astraConfig);
        console.log('------------astraDBconfig',astraDBconfig);
        const azureOpenAIEmbeddingConfig = await configurations.azureOpenAIEmbeddingConfig();
        astradbvectorstore =  await new AstraDBVectorStore(azureOpenAIEmbeddingConfig.configAzureEmbeddings,astraDBconfig);
        await astradbvectorstore.initialize();
    } catch (error) {
      console.error('Error initializing vector store:', error);
      throw error;
    }
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
