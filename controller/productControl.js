const Product = require("../models/Product");
const shortid = require("shortid");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");
const EXCLUDE = "-__v -_id";
const { deleteFile } = require("../initdb");

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
const getAllProducts = async (req, res) => {
  logger.info("Get All products control");
  Product.find()
    .select(EXCLUDE)
    .populate("image", ["_id", "filename"])
    .populate("category", ["_id", "name", "description"])
    .lean()
    .exec((error, allProducts) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error"), error);
      } else {
        res
          .status(200)
          .json(formatResponse(true, 200, "All Products", allProducts));
      }
    });
};
const getProductById = async (req, res) => {
  logger.info("Get Product By Id Control");
  const { productId } = req.query;
  await Product.findOne({ productId: productId })
    .select(EXCLUDE)
    .populate("image", ["_id", "filename"])
    .populate("category", ["_id", "name", "description"])
    .exec((error, product) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error"), error);
      } else {
        if (product) {
          res.status(200).json(formatResponse(false, 200, "Product", product));
        } else {
          res
            .status(404)
            .json(formatResponse(false, 404, "Product Not Found", null));
        }
      }
    });
};
const updateProduct = async (req, res) => {
  logger.info("Update Product Control");
  const { productId, updateOptions } = req.body;
  Product.updateOne({ productId: productId }, updateOptions).exec(
    (error, updated) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        let { n } = updated;
        res
          .status(200)
          .json(
            formatResponse(
              false,
              200,
              "Product updated",
              `${n} document affected`
            )
          );
      }
    }
  );
};
const deleteProduct = async (req, res) => {
  logger.info("Delete Product Control");
  const { productId } = req.query;
  const query = { productId: productId };
  let product = await Product.findOne(query);
  if (product) {
    if (product.image != null) {
      product.image.map((img) => {
        let deleteResponse = deleteFile(img);
      });
    }
    Product.deleteOne(query, (error, deleted) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        let { n } = deleted;
        res
          .status(200)
          .json(
            formatResponse(
              false,
              200,
              "Product Deleted",
              `${n} document affected`
            )
          );
      }
    });
  } else {
    res.status(404).json(formatResponse(false, 404, "Product Not found", null));
  }
};
const searchRoute = async (req, res) => {
  logger.error("Search Route Control");
  const { search } = req.query;
  const queryOptions = {
    $or: [
      { description: { $regex: new RegExp(search.toLowerCase(), "i") } },
      { name: { $regex: new RegExp(search.toLowerCase(), "i") } },
      { seller: { $regex: new RegExp(search.toLowerCase(), "i") } },
    ],
  };
  //console.debug("queryoptions:", queryOptions);
  Product.find(queryOptions)
    .select(EXCLUDE)
    .populate("image", ["_id", "filename"])
    .populate("category", ["_id", "name", "description"])
    .lean()
    .exec((error, products) => {
      if (error) {
        res
          .status(500)
          .json(
            formatResponse(true, 500, "Internal Server Error", error.message)
          );
      } else {
        res.status(200).json(formatResponse(false, 200, "Products", products));
      }
    });
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchRoute,
};
