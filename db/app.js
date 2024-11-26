const express = require("express");
const app = express();
const {
  getApi,
  getTopics,
  getArticleById,
  getArticles,
  getComments,
} = require("./controllers/api.controller");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});
module.exports = app;
