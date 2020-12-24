const router = require("express").Router();
const signup = require("../controller/signUpControl");
const login = require("../controller/loginControl");
const recovery = require("../controller/recoverPwdControl");
const validation = require("../middlewares/paramValidation");
const category = require("../controller/categoryControl");
const { isAuthorized } = require("../middlewares/authorization");
const multer = require("multer");
const {
  storage,
  fetchPictures,
  updatePicture,
  fileFilter,
} = require("../initdb");
const upload = multer({
  storage: storage,
  limits: 1024 * 1024 * 6,
  fileFilter: fileFilter,
});
/************************************************User******************************* */
//Sign up route
router.post(
  "/user/signup",
  validation.signupParamValidation,
  signup.signUpControl
);
//login route
router.post("/user/login", validation.loginParamValidation, login.loginControl);
//Forgot password
router.get(
  "/user/recover/password",
  validation.recoverPwdValidation,
  recovery.recoverPwdControl
);
//Reset password
router.post(
  "/user/reset/password",
  validation.resetPwdValidation,
  recovery.resetPassword
);
/************************************************Cateory******************************* */
//create
router.post(
  "/category/create",
  validation.createCategoryValidation,
  category.createCategory
);
//fetch
router.get(
  "/category/all",
  validation.getCategoryValidation,
  category.getCategories
);
/************************************************Product******************************* */
// create
//router.post("/product/create",isAuthorized,upload.single("file"),validation.createProductValidation,product.createProduct);
module.exports = router;
