const mongoose = require("mongoose");

let GridfsSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Images", GridfsSchema, "images.files");
