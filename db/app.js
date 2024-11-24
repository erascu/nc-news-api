const express = require("express");
const app = express();
const {
  getApi,
  getTopics,
  getArticleById,
} = require("./controllers/api.controller");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});
module.exports = app;
