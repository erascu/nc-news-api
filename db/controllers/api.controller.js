const endpointJSON = require("../../endpoints.json");
const { selectTopics, selectArticleById } = require("../model/api.model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints: endpointJSON });
};

exports.getTopics = (req, res) => {
  selectTopics().then((data) => {
    res.status(200).send({ topics: data });
  });
};

exports.getArticleById = (req, res) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad request" });
      } else {
        res.status(err.status).send({ msg: err.msg });
      }
    });
};
