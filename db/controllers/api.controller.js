const endpointJSON = require("../../endpoints.json");
const {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectComments,
  selectUsers,
  addComment,
  updateArticles,
  removeCommentById,
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

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((user) => {
      res.status(200).send({ users: user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res.status(400).send({ msg: "Bad request" });
  }

  selectArticleById(article_id)
    .then(() => {
      addComment(username, body, article_id)
        .then((newComment) => {
          res.status(201).send({ comment: newComment[0] });
        })
        .catch((err) => {
          res.status(500).send({ msg: "Internal Server Error" });
        });
    })
    .catch(() => {
      if (isNaN(article_id)) {
        res.status(400).send({ msg: "Article ID should be a number" });
      } else {
        res.status(404).send({ msg: "Article not found" });
      }
    });
};

exports.patchArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes: newVote } = req.body;
  updateArticles(article_id, newVote)
    .then((article) => {
      if (!article.length) {
        res.status(404).send({ msg: "Article ID does not exists" });
      }
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      // console.log("Comment deleted");
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
