// const dotenv = require('dotenv');
// dotenv.config();
module.exports = {
  baseURL: process.env.BASE_URL,
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  grapQlPort: process.env.GRAPHQL_PORT,
  nodeEnv: process.env.ENV 
};
