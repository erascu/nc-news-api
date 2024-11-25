const endpointJSON = require("../../endpoints.json");
const { selectTopics } = require("../model/api.model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointJSON });
};

exports.getTopics = (req, res) => {
  selectTopics().then((data) => {
    res.status(200).send({ topics: data });
  });
};
