const router = require("express").Router();
const { signUpControl } = require("../controller/signUpControl");
const { loginControl } = require("../controller/loginControl");
const {
  recoverPwdControl,
  resetPassword,
} = require("../controller/recoverPwdControl");
const {
  loginParamValidation,
  recoverPwdValidation,
  resetPwdValidation,
} = require("../middlewares/paramValidation");
const { isAuthorized } = require("../middlewares/authorization");

/**Sign up route */
router.post("/signup", signupParamValidation, signUpControl);
/**login route */
router.post("/login", loginParamValidation, loginControl);
/**Forgot password */
router.post("/recoverPassword", recoverPwdValidation, recoverPwdControl);
/**Reset password */
router.post("/resetPassword", resetPwdValidation, resetPassword);
module.exports = router;
