const db = require("../connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (article_id) => {
  const text = `SELECT * FROM articles WHERE article_id = $1`;
  const values = [article_id];
  return db.query(text, values).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "ID Not Found!" });
    }
    return rows[0];
  });
};

exports.selectArticles = () => {
  const chosenColumns =
    "articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url";

  const commentCount = "COUNT(comments.comment_id)::int AS comment_count";

  return db
    .query(
      `SELECT ${chosenColumns}, ${commentCount} FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectComments = (article_id) => {
  const sqlQuery = `SELECT * FROM comments WHERE article_id = $1 ORDER BY comment_id ASC`;
  const values = [article_id];
  return db.query(sqlQuery, values).then(({ rows }) => {
    return rows;
  });
};
