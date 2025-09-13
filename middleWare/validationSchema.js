// middleWare/validationSchema.js
const { body, validationResult } = require("express-validator");

const validationSchema = [
  body("product")
    .isString()
    .notEmpty()
    .withMessage("product is required")
    .isLength({ min: 3 })
    .withMessage("product must be at least 3 characters long"),

  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validationSchema;
