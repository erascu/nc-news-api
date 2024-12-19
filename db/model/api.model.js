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

exports.selectArticles = (query) => {
  const { sort_by = "created_at", order = "DESC", topic } = query;

  let mainSql = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  const arrQuery = [];

  if (topic) {
    mainSql += `WHERE articles.topic = $1 `;
    arrQuery.push(topic);
  }

  mainSql += `GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order}`;

  return db.query(mainSql, arrQuery).then(({ rows }) => {
    // if (rows.length === 0 && arrQuery) {
    //   return Promise.reject({
    //     status: 404,
    //     msg: "Topic not found",
    //   });
    // }
    return rows;
  });
};

exports.selectComments = (article_id) => {
  const sqlQuery = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`;
  const values = [article_id];
  return db.query(sqlQuery, values).then(({ rows }) => {
    return rows;
  });
};

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

exports.addComment = (username, body, article_id) => {
  return db
    .query(
      `INSERT INTO comments(author, body, article_id) VALUES ($1, $2, $3) RETURNING *`,
      [username, body, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateArticles = (article_id, newVote) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`,
      [article_id, newVote]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.removeCommentById = (comment_id) => {
  return checkCommentExists(comment_id).then((commentExists) => {
    if (!commentExists) {
      return Promise.reject({ status: 404, msg: "Comment ID doesn't exist" });
    }
    return db
      .query(`DELETE FROM comments WHERE comment_id = $1`, [comment_id])
      .then(({ rows }) => {
        return rows;
      });
  });
};

const checkCommentExists = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rows }) => {
      return rows.length > 0;
    });
};
