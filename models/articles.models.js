const db = require("../db/connection.js");
const {
  checkArticleExists,
  checkTopicExists,
} = require("../utilsForApi/utilsForApi.js");

exports.selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.*, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
      FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 
      GROUP BY articles.article_id `,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found!" });
      }
      return result.rows[0];
    });
};

exports.selectAllArticles = (topic, sort_by = "created_at", order = "desc") => {
  const validOrderQuery = ["asc", "desc"];
  const validSortByQuery = [
    "title",
    "author",
    "created_at",
    "votes",
    "comment_count",
  ];

  if (!validOrderQuery.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }
  if (!validSortByQuery.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  const queryValues = [];
  let queryString = `
  SELECT 
  articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count  
  FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;

  if (topic) {
    queryString += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryString += `
  GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};
  `;

  const checkedTopic = checkTopicExists(topic);
  const dbQuery = db.query(queryString, queryValues);

  return Promise.all([checkedTopic, dbQuery]).then(([_, result]) => {
    return result.rows;
  });
};
exports.updateArticleVotes = (articleId, articleBody) => {
  if (!Object.keys(articleBody).length) {
    return Promise.reject({ status: 400, msg: "Missing request body" });
  }

  const { inc_votes } = articleBody;
  const queryString = `UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *;`;

  const queryArr = [inc_votes, articleId];

  const checkArticle = checkArticleExists(articleId);
  const queryPromise = db.query(queryString, queryArr);
  return Promise.all([checkArticle, queryPromise]).then(
    ([_, result]) => result.rows[0]
  );
};
