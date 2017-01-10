'use strict';

module.exports = function mapSequelizeValidationErrors(sequelizeError) {
  return sequelizeError.errors.map(function mapToApiError(error) {
    return {
      message: error.message,
      path: error.path,
      value: error.value
    };
  });
};
