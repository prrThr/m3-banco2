require("dotenv").config();

const credentials_datastax = {
  clientId: process.env.CLIENTID,
  secret: process.env.SECRET,
  token: process.env.TOKEN,
};

module.exports = credentials_datastax;
