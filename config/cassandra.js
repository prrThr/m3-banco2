require("dotenv").config();

module.exports = {
  clientId: process.env.CLIENTID,
  secret: process.env.SECRET,
  token: process.env.TOKEN,
  bundle: process.env.BUNDLE,
  keyspace: process.env.KEYSPACE
};
