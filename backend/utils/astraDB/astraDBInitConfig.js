const { DataAPIClient } = require('@datastax/astra-db-ts');
const { AzureOpenAIEmbeddings } = require("@langchain/azure-openai");
const {DB_CONFIG} = require('../../constants/dbConfig');
const { AZURE_OPENAI_CONFIG } = require('../../constants/apiKeys')

async function astraDBinitialseConfig(){
    let astraConfig;
    try {        
        console.log('------------inside astraDBinitialseConfig');
        
        // AstraDB env load
        astraConfig = {
            token: DB_CONFIG.ASTRA_DB_APPLICATION_TOKEN,
            endpoint: DB_CONFIG.ASTRA_DB_API_ENDPOINT,
            collection: DB_CONFIG.ASTRA_DB_COLLENTION_NAME,
            collectionOptions: {
            vector: {
                dimension: 1536,
                metric: "cosine",
            },
            },
        };
    } catch (error) {
        console.log('Error in AstraDB config request:', error);
        throw error;
    }
    return {
        astraConfig: JSON.stringify(astraConfig)
    };
}

async function azureOpenAIEmbeddingConfig(){
    let configAzureEmbeddings;
    try {
        // Azure OpenAI env load
        configAzureEmbeddings = new AzureOpenAIEmbeddings({
            azureOpenAIEndpoint: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_ENDPOINT,
            azureOpenAIApiKey: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_API_KEY,
            azureOpenAIApiDeploymentName: AZURE_OPENAI_CONFIG.PARAMS_AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME,
            });
    } catch (error) {
        console.log('Error in Azure OpenAI Embedding config request:', error);
        throw error;
    }
    return {
        configAzureEmbeddings: configAzureEmbeddings
    };
}



module.exports = {
    astraDBinitialseConfig,
    azureOpenAIEmbeddingConfig
};