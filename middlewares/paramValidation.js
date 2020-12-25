const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
let options = { abortEarly: false };
const logger = require("../library/logger");
const loginParamValidation = (req, res, next) => {
  logger.info("Login Param Validation");
  let loginSchema = joi.object({
    loginId: joi.string().email().min(4).required(),
    password: joi.string().min(8).required(),
  });

  let { error } = loginSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};

const recoverPwdValidation = (req, res, next) => {
  logger.info("Recovery Password validation");
  let recoverySchema = joi.object({
    email: joi.string().email().min(5).required(),
  });
  let { error } = recoverySchema.validate(req.query);
  if (error)
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          "Input Param Not Valid",
          error.details[0].message
        )
      );

  next();
};
const resetPwdValidation = (req, res, next) => {
  logger.info("reset pwd validation");
  let resetPwdSchema = joi.object({
    recoveryCode: joi.string().min(6).required(),
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  let { error } = resetPwdSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};

const signupParamValidation = (req, res, next) => {
  logger.info("signupParamValidation");
  let signUpSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().min(5).email().required(),
    mobile: joi.number().min(10).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  let { error } = signUpSchema.validate(req.body, options);
  logger.info("validation error", error);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const createCategoryValidation = (req, res, next) => {
  logger.info("Create Category Validation");
  let categorySchema = joi.object({
    userId: joi.string().min(4).required(),
    name: joi.string().min(8).required(),
    description: joi.string().min(8).required(),
  });

  let { error } = categorySchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const getCategoryValidation = (req, res, next) => {
  logger.info("Get Category Validation");
  let categorySchema = joi.object({
    userId: joi.string().min(4).required(),
  });

  let { error } = categorySchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const createProductValidation = (req, res, next) => {
  logger.info("Create Product Validation");
  console.log("body validation:", req.body);
  let productSchema = joi.object({
    name: joi.string().min(4).required(),
    category: joi.string().min(4).required(),
    price: joi.number().min(4).required(),
    inStock: joi.boolean().min(4).required(),
    discount: joi.number().min(4).required(),
    description: joi.string().min(4).required(),
    quantity: joi.number().min(4).required(),
    seller: joi.string().min(4).required(),
  });

  let { error } = productSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const allProductValidation = (req, res, next) => {
  logger.info("all Product Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const productByIdValidation = (req, res, next) => {
  logger.info("product by id Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
    productId: joi.string().min(4).required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const upadteProductValidation = (req, res, next) => {
  logger.info("update product  Validation");
  let productSchema = joi.object({
    productId: joi.string().min(4).required(),
    updateOptions: joi.object().required(),
  });
  let { error } = productSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const deleteProductValidation = (req, res, next) => {
  logger.info("delete product Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
    productId: joi.string().min(4).required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
const searchProductValidation = (req, res, next) => {
  logger.info("search product Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
    search: joi.string().required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(
      formatResponse(true, 400, "Not valid Input Params", errorMessage)
    );
  }
  next();
};
module.exports = {
  signupParamValidation,
  loginParamValidation,
  recoverPwdValidation,
  resetPwdValidation,
  createCategoryValidation,
  getCategoryValidation,
  createProductValidation,
  allProductValidation,
  productByIdValidation,
  upadteProductValidation,
  deleteProductValidation,
  searchProductValidation,
};
