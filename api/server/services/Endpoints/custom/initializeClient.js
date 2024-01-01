const { EModelEndpoint } = require('librechat-data-provider');
const { getUserKey, checkUserKeyExpiry } = require('~/server/services/UserService');
const getCustomConfig = require('~/cache/getCustomConfig');
const { OpenAIClient } = require('~/app');

const { PROXY } = process.env;

const initializeClient = async ({ req, res, endpointOption }) => {
  const { key: expiresAt, endpoint } = req.body;
  const customConfig = await getCustomConfig();
  if (!customConfig) {
    throw new Error(`Config not found for the ${endpoint} custom endpoint.`);
  }

  const { endpoints = {} } = customConfig;
  const customEndpoints = endpoints[EModelEndpoint.custom] ?? [];
  const endpointConfig = customEndpoints.find((endpointConfig) => endpointConfig.name === endpoint);

  const CUSTOM_API_KEY = endpointConfig.apiKey;
  const CUSTOM_BASE_URL = endpointConfig.baseURL;

  const contextStrategy = endpointConfig.summarize ? 'summarize' : null;

  const clientOptions = {
    contextStrategy,
    reverseProxyUrl: CUSTOM_BASE_URL ?? null,
    proxy: PROXY ?? null,
    req,
    res,
    ...endpointOption,
  };

  const credentials = {
    [endpoint]: CUSTOM_API_KEY,
  };

  const isUserProvided = credentials[endpoint] === 'user_provided';

  let userKey = null;
  if (expiresAt && isUserProvided) {
    checkUserKeyExpiry(expiresAt, 'Your API key has expired. Please provide it again.');
    userKey = await getUserKey({ userId: req.user.id, name: endpoint });
  }

  let apiKey = isUserProvided ? userKey : credentials[endpoint];

  if (!apiKey) {
    throw new Error('API key not provided.');
  }

  const client = new OpenAIClient(apiKey, clientOptions);
  return {
    client,
    openAIApiKey: apiKey,
  };
};

module.exports = initializeClient;
