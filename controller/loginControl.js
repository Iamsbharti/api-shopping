const { generateTokens } = require("../library/autenticationCode");
const { formatResponse } = require("../library/formatResponse");
const User = require("../models/User");
const { comparePassword } = require("../library/passwordHandler");
const logger = require("../library/logger");
const loginControl = async (req, res) => {
  console.log("Login Control");

  const { loginId, password } = req.body;
  //emailexistence
  const loginIdExistence = async (loginId) => {
    logger.info(`Email Existence - ${loginId}`);
    const query = loginId.includes("@")
      ? { email: loginId }
      : { mobile: loginId };
    let userExists = await User.findOne(query);
    if (!userExists) {
      return Promise.reject(formatResponse(true, 404, "User Not Found", email));
    } else {
      return Promise.resolve(userExists);
    }
  };
  //comparepassword
  const validateCredentials = async (foundUser) => {
    logger.info(`Validate credentials`);
    let validCred = await comparePassword(password, foundUser.password);
    logger.info(`validCred - ${validCred}`);
    if (validCred) {
      let _userData = foundUser.toObject();
      delete _userData.password;
      delete _userData.__v;
      delete _userData._id;
      delete _userData.passwordRecoverCode;

      return Promise.resolve(_userData);
    } else {
      return Promise.reject(formatResponse(true, 401, "Login Failed", null));
    }
  };
  //generatetoken
  const generateToken = async (userData) => {
    logger.info(`Generate token`);
    let result;
    generateTokens(userData, (error, tokenDetails) => {
      console.log("Error/token", error);
      if (error) {
        result = Promise.reject(
          formatResponse(true, 500, "Token Generation Error", null)
        );
      } else {
        result = Promise.resolve({
          ...userData,
          authToken: tokenDetails.authToken,
        });
      }
    });
    return result;
  };

  /**Login controller start */
  loginIdExistence(loginId)
    .then(validateCredentials)
    .then(generateToken)
    .then((result) => {
      console.log("login-result-sucess");
      res.header("authToken", result.authToken);
      res.status(200).json(formatResponse(false, 200, "Login Sucess", result));
    })
    .catch((error) => {
      console.log("Error- In Login", error);
      res.status(error.status).json(error);
    });
};
module.exports = {
  loginControl,
};
