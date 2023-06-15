const Dog = require("../models/dog.js");
const createError = require("../utils/error.js");

exports.addDog = async (req, res, next) => {
  let info = {
    name: req.body.name,
    color: req.body.color,
    tail_length: req.body.tail_length,
    weight: req.body.weight,
  };
  try {
    const dog = await Dog.create(info);
    res.status(200).send(dog);
  } catch (e) {
    // res.status(500).send(e);
    next(createError(501, e.message));
  }
};

exports.getDogs = async (req, res, next) => {
  try {
    //error handlers for query params
    if (req.query) {
      const query = req.query;
      if (
        !query.attribute &&
        !query.limit &&
        !query.order &&
        !query.pageSize &&
        !query.pageNumber
      ) {
        return next(createError(400, "invalid query param!"));
      }
    }

    if (!req.query) {
      const dog = await Dog.findAll();

      res.status(200).json(dog);
    }
    if (req.query) {
      console.log("query", req.query);
      if (req.query.attribute && !req.query.pageNumber) {
        const dog = await Dog.findAll({
          order: [
            //default order is ASC and attribute is ID
            [
              req.query.attribute ? req.query.attribute : "id",
              req.query.order ? req.query.order : "ASC",
            ],
          ],
        });
        res.status(200).json(dog);
      } else if (req.query.attribute && req.query.pageNumber) {
        const limit = parseFloat(
          req.query.pageSize
            ? req.query.pageSize
            : req.query.limit
            ? req.query.limit
            : 5
        );

        const dog = await Dog.findAll({
          order: [
            //default order is ASC and attribute is ID
            [
              req.query.attribute ? req.query.attribute : "id",
              req.query.order ? req.query.order : "ASC",
            ],
          ],
          offset: (parseFloat(req.query.pageNumber) - 1) * limit,

          //defailt limit is 5
          limit: limit,
        });
        res.status(200).json(dog);
      } else if (!req.query.attribute && req.query.pageNumber) {
        const limit = parseFloat(
          req.query.pageSize
            ? req.query.pageSize
            : req.query.limit
            ? req.query.limit
            : 5
        );
        const dog = await Dog.findAll({
          order: [["id"]],
          offset: (parseFloat(req.query.pageNumber) - 1) * limit,

          //defailt limit is 5
          limit: limit,
        });
        res.status(200).json(dog);
      }
    }
  } catch (e) {
    next(e);
  }
};
