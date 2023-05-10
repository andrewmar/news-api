const { selectAllEndpoints } = require("../models/endpoints.models");

exports.getAllEndpoints = (request, response) => {
  selectAllEndpoints().then((endpoints) => {
    response.status(200).send({ endpoints });
  });
};
