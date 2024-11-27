const express = require("express");
const app = express();
const {
  getApi,
  getTopics,
  getArticleById,
  getArticles,
  getComments,
  postComment,
  patchArticles,
} = require("./controllers/api.controller");
const { psqlErr } = require("./errors");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.use(express.json()); //used for post request only

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticles);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(psqlErr);

module.exports = app;
