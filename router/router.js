const router = require("express").Router();
const signup = require("../controller/signUpControl");
const login = require("../controller/loginControl");
const recovery = require("../controller/recoverPwdControl");
const validation = require("../middlewares/paramValidation");
const { isAuthorized } = require("../middlewares/authorization");

/**Sign up route */
router.post(
  "/user/signup",
  validation.signupParamValidation,
  signup.signUpControl
);
/**login route */
router.post("/user/login", validation.loginParamValidation, login.loginControl);
/**Forgot password */
router.post(
  "/user/recoverPassword",
  validation.recoverPwdValidation,
  recovery.recoverPwdControl
);
/**Reset password */
router.post(
  "/user/resetPassword",
  validation.resetPwdValidation,
  recovery.resetPassword
);
module.exports = router;
