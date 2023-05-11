const {
  selectCommentsByArticleId,
  addComment,
} = require("../models/comments.models");

exports.getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};
exports.postComment = (request, response, next) => {
  const { article_id } = request.params;
  const commentBody = request.body;

  addComment(article_id, commentBody)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};
