const isValidId = function (id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
};

module.exports = { isValidId };
