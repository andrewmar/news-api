const db = require("../db/connection.js");
const {
  checkArticleExists,
  checkUserExists,
} = require("../utilsForApi/utilsForApi.js");

exports.selectCommentsByArticleId = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comments not found!" });
      }

      return db.query(
        `
        SELECT * FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC;`,
        [id]
      );
    })
    .then((result) => {
      return result.rows;
    });
};

exports.addComment = (articleId, commentBody) => {
  const { body, username } = commentBody;

  const queryArr = [username, body, articleId];
  const queryString = `
      INSERT INTO comments
      (author, body, article_id)
      VALUES
      ($1, $2, $3)
      RETURNING *;
    `;
  const checkArticle = checkArticleExists(articleId);
  const checkUser = checkUserExists(username);
  const queryPromise = db.query(queryString, queryArr);

  return Promise.all([checkArticle, checkUser, queryPromise]).then((result) => {
    return result[2].rows[0];
  });
};
