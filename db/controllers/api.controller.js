const endpointJSON = require("../../endpoints.json");
const {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectComments,
} = require("../model/api.model");

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

exports.getArticles = (req, res) => {
  selectArticles().then((data) => {
    res.status(200).send({ articles: data });
  });
};

exports.getComments = (req, res) => {
  const { article_id } = req.params;
  selectComments(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        return res
          .status(404)
          .send({ msg: "No comments found for this article" });
      }
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send({ msg: "Internal Server Error" });
    });
};
