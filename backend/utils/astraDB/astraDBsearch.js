const {getVectorStore} = require('./astraDBInit');
const configurations = require('./astraDBInitConfig');

async function astraDBsearch( inputText){
    let results;
    try{
        console.log('------------inside astraDBsearch.js---', inputText);
        const azureOpenAIEmbeddingConfig = await configurations.azureOpenAIEmbeddingConfig();
        const vectorStore = await getVectorStore();
        // Embed the input text
        const queryVector = await azureOpenAIEmbeddingConfig.configAzureEmbeddings.embedQuery(inputText);
        // Perform a similarity search
        results = await vectorStore.similaritySearchVectorWithScore(queryVector, 1);
        // console.log('------------------search results',results);
        const score = results[0][1];
        console.log('------------------search score',score);
        if (score < 0.90) {
          return 'null';
        } else {
          return results[0][0].pageContent;
        }
} catch (error) {
    console.error('Error in AstraDB search request:', error.response ? error.response.data : error.message);
    throw error;
  };
};

module.exports = {
    astraDBsearch,
  };