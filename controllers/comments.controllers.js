const {
  selectCommentsByArticleId,
  addComment,
  removeCommentById,
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

exports.deleteCommentById = (request, response, next) => {
  const { comment_id } = request.params;

  removeCommentById(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch(next);
};
