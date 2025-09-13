const jwt = require("jsonwebtoken");

const genarateTokens = async (payload) => {
  const token = await jwt.sign({ ...payload }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = genarateTokens;
