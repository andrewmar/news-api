const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

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
