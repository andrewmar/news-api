const express = require("express");
const { getAllTopics } = require("./controllers/topics.controllers");
const { getAllEndpoints } = require("./controllers/endpoints.controllers");
const { handleCustomErrors, handlePsqlErrors } = require("./errors");
const { getArticleById } = require("./controllers/articles.controllers");

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints);
app.get("/api/articles/:article_id", getArticleById);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app;
