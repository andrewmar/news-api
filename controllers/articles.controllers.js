const {
  selectArticleById,
  selectAllArticles,
  updateArticleVotes,
} = require("../models/articles.models.js");

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  selectArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (request, response, next) => {
  selectAllArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};
exports.patchArticleVotes = (request, response, next) => {
  const { article_id } = request.params;
  const articleBody = request.body;

  updateArticleVotes(article_id, articleBody)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};
