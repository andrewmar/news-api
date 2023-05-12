const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const { describe } = require("@jest/globals");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  connection.end();
});

describe("GET /api/articles/:article_id/comments", () => {
  test("GET - status: 200 - responds with an array of comments for given article id ", () => {
    const articleId = 1;

    return request(app)
      .get(`/api/articles/${articleId}/comments`)
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(11);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(1);
        });
      });
  });

  test("GET - status: 200 - responds with an array of comments for given article id ", () => {
    const articleId = 1;

    return request(app)
      .get(`/api/articles/${articleId}/comments`)
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(11);
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("GET - status: 200 - responds with an empty array when article doesn't have any comments ", () => {
    const articleId = 2;

    return request(app)
      .get(`/api/articles/${articleId}/comments`)
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(0);
      });
  });

  test("GET - status: 404 - valid but non-existent article id", () => {
    const articleId = 9999;

    return request(app)
      .get(`/api/articles/${articleId}/comments`)
      .expect(404)
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Comments not found!");
      });
  });
  test("GET - status: 400 - invalid article id", () => {
    const articleId = "nonsense";

    return request(app)
      .get(`/api/articles/${articleId}/comments`)
      .expect(400)
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Invalid input");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("POST - status:201 - returns created comment", () => {
    const id = 1;
    return request(app)
      .post(`/api/articles/${id}/comments`)
      .expect(201)
      .send({
        body: "Hello",
        username: "butter_bridge",
      })
      .then((response) => {
        const { comment } = response.body;

        expect(comment.comment_id).toBe(19);
        expect(comment.body).toBe("Hello");
        expect(comment.article_id).toBe(1);
        expect(comment.author).toBe("butter_bridge");
        expect(comment.votes).toBe(0);
        expect(typeof comment.created_at).toBe("string");
      });
  });
  test("POST - status:400 - missing required fields", () => {
    const id = 1;
    return request(app)
      .post(`/api/articles/${id}/comments`)
      .expect(400)
      .send({
        username: "butter_bridge",
      })
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Missing required fields");
      });
  });
  test("POST - status:404 - no user found", () => {
    const id = 1;
    return request(app)
      .post(`/api/articles/${id}/comments`)
      .expect(404)
      .send({
        username: "butter",
      })
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("User not found");
      });
  });
  test("GET - status: 404 - valid but non-existent article id", () => {
    const articleId = 9999;

    return request(app)
      .post(`/api/articles/${articleId}/comments`)
      .expect(404)
      .send({
        body: "Hello",
        username: "butter_bridge",
      })
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Article not found");
      });
  });
  test("GET - status: 400 - invalid article id", () => {
    const articleId = "nonsense";

    return request(app)
      .post(`/api/articles/${articleId}/comments`)
      .expect(400)
      .send({
        body: "Hello",
        username: "butter_bridge",
      })
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Invalid input");
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  test("DELETE - status: 204 - deletes the given comment by comment id", () => {
    const commentId = 1;
    return request(app).delete(`/api/comments/${commentId}`).expect(204);
  });
  test("DELETE - status: 404 - comment id not found", () => {
    const commentId = 9999;
    return request(app)
      .delete(`/api/comments/${commentId}`)
      .expect(404)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Comment not found");
      });
  });
  test("DELETE - status: 404 - invalid input", () => {
    const commentId = "nonsense";
    return request(app)
      .delete(`/api/comments/${commentId}`)
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Invalid input");
      });
  });
});
