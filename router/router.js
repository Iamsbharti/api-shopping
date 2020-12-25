const router = require("express").Router();
const signup = require("../controller/signUpControl");
const login = require("../controller/loginControl");
const recovery = require("../controller/recoverPwdControl");
const validation = require("../middlewares/paramValidation");
const category = require("../controller/categoryControl");
const product = require("../controller/productControl");
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
  isAuthorized,
  validation.createCategoryValidation,
  category.createCategory
);
//fetch
router.get(
  "/category/all",
  isAuthorized,
  validation.getCategoryValidation,
  category.getCategories
);
/************************************************Product******************************* */
// create
router.post(
  "/product/create",
  isAuthorized,
  upload.single("file"),
  product.createProduct
);
// fetch
router.get(
  "/product/all",
  isAuthorized,
  validation.allProductValidation,
  product.getAllProducts
);
router.get(
  "/product/id",
  isAuthorized,
  validation.productByIdValidation,
  product.getProductById
);
//update
router.post(
  "/product/update",
  isAuthorized,
  validation.upadteProductValidation,
  product.updateProduct
);
//delete
router.delete(
  "/product/delete",
  isAuthorized,
  validation.deleteProductValidation,
  product.deleteProduct
);
//search
router.get(
  "/product/search",
  isAuthorized,
  validation.searchProductValidation,
  product.searchRoute
);
module.exports = router;
