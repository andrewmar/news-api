const express = require("express");
const { getAllTopics } = require("./controllers/topics.controllers");
const { getAllEndpoints } = require("./controllers/endpoints.controllers");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleNonExistentEndpoints,
} = require("./errors");
const {
  getArticleById,
  getAllArticles,
  patchArticleVotes,
} = require("./controllers/articles.controllers.js");
const {
  getCommentsByArticleId,
  postComment,
  deleteCommentById,
} = require("./controllers/comments.controllers.js");
const { getAllUsers } = require("./controllers/users.conteollers");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticleVotes);
app.delete("/api/comments/:comment_id", deleteCommentById);
app.get("/api/users", getAllUsers);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleNonExistentEndpoints);

module.exports = app;
