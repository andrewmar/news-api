const { selectAllTopics } = require("../models/topics.models");

exports.getAllTopics = (request, response) => {
  selectAllTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};
