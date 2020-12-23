const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
let options = { abortEarly: false };

const loginParamValidation = (req, res, next) => {
  //console.log("Login Param Validation");
  let loginSchema = joi.object({
    email: joi.string().email().min(4).required(),
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
  //console.log("Recovery Password validation");
  let recoverySchema = joi.object({
    email: joi.string().email().min(5).required(),
  });
  let { error } = recoverySchema.validate(req.body);
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
  //console.log("reset pwd validation");
  let resetPwdSchema = joi.object({
    recoveryCode: joi.string().min(6).required(),
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(new RegExp("^[A-Za-z0-9]\\w{8,64}$"))
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
  //console.log("signupParamValidation");
  let signUpSchema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4).required(),
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
  //console.log("validation error", error);
  if (error) {
    let errorMessage = [];
    error.details.map((err) =>
      errorMessage.push(
        err.message.includes("pattern") ? "Invalid Password" : ""
      )
    );
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
};
