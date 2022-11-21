const Ajv = require("ajv");
const ajv = new Ajv();

function validatebody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0]);
      return;
    }
    next(); 
  };
}

module.exports = { validatebody }
