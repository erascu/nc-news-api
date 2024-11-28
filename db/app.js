const express = require("express");
const app = express();
const {
  getApi,
  getTopics,
  getArticleById,
  getArticles,
  getComments,
  getUsers,
  postComment,
  patchArticles,
  deleteCommentById,
} = require("./controllers/api.controller");
const { psqlErr, newErr } = require("./errors");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.get("/api/users", getUsers);

app.use(express.json()); //used for post request only

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticles);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(psqlErr);

app.use(newErr);

module.exports = app;
