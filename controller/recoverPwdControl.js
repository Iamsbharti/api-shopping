const User = require("../models/User");
const { formatResponse } = require("../library/formatResponse");
const { hashPassword } = require("../library/passwordHandler");
const nodemailer = require("nodemailer");
const logger = require("../library/logger");
//emailExistence
const emailExistence = async (email) => {
  let userExists = await User.findOne({ email: email });
  if (userExists) {
    return Promise.resolve(userExists);
  } else {
    return Promise.reject(formatResponse(true, "404", "User Not Found", null));
  }
};

const recoverPwdControl = async (req, res) => {
  logger.info("Recover Password control");
  const { email } = req.query;
  //generate random code and save against users' recoveryCode
  const generateRecoveryCode = async (foundUser) => {
    let recoveryCode = parseInt(Math.random() * 1000000, 10);
    //logger.info("Recovery Code", recoveryCode);
    let query = { email: foundUser.email };
    let update = { passwordRecoverCode: recoveryCode };
    let recoveryResponse;
    let { n } = await User.updateOne(query, update);

    if (n === 1) {
      //logger.info("updated code");
      let result = {
        updated: n.n,
        email: email,
        recoveryCode: recoveryCode,
      };
      //logger.info("finalres", result);
      recoveryResponse = Promise.resolve(result);
    } else {
      recoveryResponse = Promise.reject(
        formatResponse(true, 500, "Recover Code gen Error", error)
      );
    }
    return recoveryResponse;
  };
  //send code to mail
  const sendEmail = async (result) => {
    logger.info("send email");
    let sendEmailResult;
    //construst transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    //configure mail options
    let emailText = `
      <h1>You Requested for Password Recovery</h1>
      <code>Use this code to reset you password</code>
      <h3>Recovery Code - ${result.recoveryCode}</h3>
    `;
    let mailOptions = {
      from: "kanbanboard.test@gmail.com",
      to: result.email,
      subject: "Recover Password Kanboard",
      html: emailText,
    };
    //send email
    let data = await transporter.sendMail(mailOptions);
    logger.info(`Response-${data}`);
    if (data) {
      sendEmailResult = Promise.resolve({
        ...result,
        Operation: "Email Sent",
      });
    } else {
      sendEmailResult = Promise.reject(
        formatResponse(true, 500, "Internal Server Error", {
          ...result,
          Operation: "Email Send Error",
        })
      );
    }
    return sendEmailResult;
  };
  /**recovery starts */
  emailExistence(email)
    .then(generateRecoveryCode)
    .then(sendEmail)
    .then((result) => {
      logger.info("Recovery Email Sent");
      res
        .status(200)
        .json(formatResponse(false, 200, "Recovery Sucess", result));
    })
    .catch((error) => {
      logger.info(`Error ${error}`);
      res.status(error.status).json(error);
    });
};
const resetPassword = async (req, res) => {
  logger.info("validate recovery code and reset Password");
  const { recoveryCode, email, password } = req.body;

  //validate recoverycode
  const validateCode = async (foundUser) => {
    console.log("validate code", foundUser.passwordRecoverCode, recoveryCode);
    let validateRes;
    validateRes =
      recoveryCode === foundUser.passwordRecoverCode
        ? Promise.resolve(foundUser)
        : Promise.reject(
            formatResponse(true, 400, "Not Valid RecoveryCode", null)
          );

    return validateRes;
  };
  //reset password and recovery code
  const resetPasswordFunc = async (foundUser) => {
    logger.info("reset password");
    let query = { email: foundUser.email };
    let update = {
      password: await hashPassword(password),
      passwordRecoverCode: "",
    };
    let resetResult;
    await User.updateOne(query, update, (error, n) => {
      console.log("Password Update", `${n.n}-updated--${error}`);
      if (error !== null) {
        resetResult = Promise.reject(true, 500, "Internal Server Error", error);
      } else {
        let result = {
          updated: n.n,
          email: foundUser.email,
        };
        resetResult = Promise.resolve(result);
      }
    });
    return resetResult;
  };

  /**Reset Password starts */
  emailExistence(email)
    .then(validateCode)
    .then(resetPasswordFunc)
    .then((result) => {
      console.log("Result", result);
      res
        .status(200)
        .json(formatResponse(false, 200, "Password Reset Success", result));
    })
    .catch((error) => {
      logger.info(`Error - ${error}`);
      res.status(error.status).json(error);
    });
};
module.exports = {
  recoverPwdControl,
  resetPassword,
};
