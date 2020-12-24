const Product = require("../models/Product");
const shortid = require("shortid");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");

const createProduct = async (req, res) => {
  logger.info("Create Product control");
  const {
    name,
    category,
    price,
    inStock,
    discount,
    description,
    quantity,
    seller,
  } = req.body;
  let newProduct = new Product({
    productId: shortid.generate(),
    name: name,
    category: category,
    price: price,
    inStock: inStock,
    discount: discount,
    description: description,
    quantity: quantity,
    seller: seller,
  });

  await Product.create(newProduct, (error, product) => {
    if (error) {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", error));
    } else {
      // push image
      updateImage(req.file.id, product, res);
    }
  });
};
const updateImage = async (fileId, product, res) => {
  const query = { productId: product.productId };
  let updateOption = { $push: { image: fileId } };
  let updatedProduct = await Product.updateOne(query, updateOption);
  let { n } = updatedProduct;
  if (n === 1) {
    let createdProduct = await Product.findOne(query)
      .populate("image", ["_id", "filename"])
      .populate("category", ["_id", "name", "description"]);
    res
      .status(200)
      .json(
        formatResponse(false, 200, "Product Create Success", createdProduct)
      );
  } else {
    res
      .status(500)
      .json(
        formatResponse(true, 500, "Internal Server Error", "Image update error")
      );
  }
};
module.exports = {
  createProduct,
};
