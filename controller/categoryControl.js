const Category = require("../models/Category");
const logger = require("../library/logger");
const shortid = require("shortid");
const { formatResponse } = require("../library/formatResponse");
const EXCLUDE = "-__v -_id";

const createCategory = async (req, res) => {
  logger.info("Create Category Control");
  let { name, description } = req.query;

  let newCategory = new Category({
    categoryId: shortid.generate(),
    name: name,
    description: description,
  });
  const queryOptions = {
    name: { $regex: new RegExp(name.toLowerCase(), "i") },
  };

  let isCategoryPresent = await Category.find(queryOptions);
  if (isCategoryPresent) {
    res
      .status(401)
      .json(formatResponse(true, 401, "Category Already Present", name));
  } else {
    await Category.create(newCategory, (error, category) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        res
          .status(200)
          .json(
            formatResponse(
              false,
              200,
              "Create Category Sucess",
              createdCategory
            )
          );
      }
    });
  }
};
const getCategories = async (req, res) => {
  logger.info("Get Categories");
  await Category.find()
    .select(EXCLUDE)
    .lean((error, categories) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Get Category Sucess", categories));
      }
    });
};
module.exports = {
  createCategory,
  getCategories,
};
