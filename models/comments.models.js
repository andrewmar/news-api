const db = require("../db/connection.js");

exports.selectCommentsByArticleId = (id) => {
  return db
    .query(
      `
    SELECT * FROM comments 
    WHERE article_id = $1
    ORDER BY created_at DESC;`,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comments not found!" });
      }
      return result.rows;
    });
};
