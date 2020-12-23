const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  passwordRecoverCode: {
    type: String,
  },
  cart: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
});
module.exports = mongoose.model("User", userSchema);
