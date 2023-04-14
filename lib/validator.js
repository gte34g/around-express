const myValidator = require('validator');

const validateURL = (value, helpers) => {
  if (
    myValidator.isURL(value, {
      require_protocol: true,
      allow_underscores: true,
    })
  ) {
    return value;
  }
  return helpers.error('string.uri');
};
module.exports = { validateURL };
