const jwt = require("jsonwebtoken");
const { format } = require("winston");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");

exports.isAuthorized = async (req, res, next) => {
  let reqUserId = req.query.userId;

  console.debug(req.body);
  logger.info("Authorizing...", reqUserId);
  let authTokenQuery = req.query.authToken;
  let authTokenBody = req.body.authToken;
  let authTokenHeader = req.header("authToken");

  /**check for token in req */
  if (
    authTokenBody !== undefined ||
    authTokenHeader !== undefined ||
    authTokenQuery !== undefined
  ) {
    /**validate the token */
    try {
      let decodedInfo = jwt.verify(
        authTokenQuery || authTokenHeader || authTokenBody,
        process.env.TOKEN_SECRET
      );

      let { userId } = decodedInfo.data;
      console.debug("userid:", userId);
      if (userId !== reqUserId) {
        return res
          .status(400)
          .json(formatResponse(true, 400, "Invalid Token", null));
      }
    } catch (error) {
      return res.status(400).json(formatResponse(true, 500, "Error", error));
    }
  } else {
    /**auth token missing */
    res.status(400).json(formatResponse(true, 400, "AuthToken Missing", null));
  }
  next();
};
