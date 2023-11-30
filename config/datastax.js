require("dotenv").config();

const credentials_datastax = {
  clientId: process.env.CLIENTID,
  secret: process.env.SECRET,
  token: process.env.TOKEN,
  bundle: process.env.BUNDLE
};

module.exports = credentials_datastax;
