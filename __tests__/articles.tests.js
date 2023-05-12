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

describe("GET /api/articles/:article_id", () => {
  test("GET - status: 200 - responds with an article object ", () => {
    const articleId = 1;
    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(200)
      .then((response) => {
        const { article } = response.body;

        expect(article.author).toBe("butter_bridge");
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.article_id).toBe(1);
        expect(article.body).toBe("I find this existence challenging");
        expect(article.topic).toBe("mitch");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(100);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("GET - status: 200 - responds with an article object with comments count property ", () => {
    const articleId = 1;
    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article.comment_count).toBe(11);
      });
  });
  test("GET - status: 404 - valid but non-existent article id", () => {
    const articleId = 9999;

    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(404)
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Article not found!");
      });
  });
  test("GET - status: 400 - invalid article id", () => {
    const articleId = "nonsense";

    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(400)
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Invalid input");
      });
  });
});
describe("GET api/articles", () => {
  test("GET - status: 200 - responds with an array of article objects ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;

        expect(articles.length).toBe(12);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
  test("GET - status: 200 - responds with an array of article objects sorted by created_at in descending order ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;

        expect(articles.length).toBe(12);
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("GET - status: 404 - when provided non-existent endpoint  ", () => {
    return request(app).get("/api/articless").expect(404);
  });
  describe('GET api/articles"(queries)', () => {
    test("GET - status: 200 - responds with an array of article objects sorted by topic ", () => {
      const queryTopic = "mitch";

      return request(app)
        .get(`/api/articles?topic=${queryTopic}`)
        .expect(200)
        .then((response) => {
          const { articles } = response.body;
          expect(articles.length).toBe(11);
          articles.forEach((article) => {
            expect(article.topic).toBe(queryTopic);
          });
        });
    });
    test("GET status:200, returns an empty array for the topic with no articles ", () => {
      const queryTopic = "paper";
      return request(app)
        .get(`/api/articles?topic=${queryTopic}`)
        .expect(200)
        .then((response) => {
          const { articles } = response.body;
          expect(articles.length).toBe(0);
        });
    });
    test("GET status:404, returns error message when topic not found", () => {
      const queryTopic = "nonsense";
      return request(app)
        .get(`/api/articles?topic=${queryTopic}`)
        .expect(404)
        .then((res) => {
          const { msg } = res.body;
          expect(msg).toBe("Topic not found");
        });
    });
    test("GET - status: 200 - responds with an array of article objects sorted by created at in ascending order", () => {
      const order = "asc";
      return request(app)
        .get(`/api/articles?order=${order}`)
        .expect(200)
        .then((response) => {
          const { articles } = response.body;

          expect(articles.length).toBe(12);
          expect(articles).toBeSortedBy("created_at");
        });
    });
    test("GET - status: 400 - invalid order query", () => {
      const order = "; DROP TABLE topics";
      return request(app)
        .get(`/api/articles?order=${order}`)
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid order query");
        });
    });
    test("GET - status: 200 - responds with an array of article objects sorted by author in descending order", () => {
      const sortBy = "author";
      return request(app)
        .get(`/api/articles?sort_by=${sortBy}`)
        .expect(200)
        .then((response) => {
          const { articles } = response.body;

          expect(articles.length).toBe(12);
          expect(articles).toBeSortedBy("author", { descending: true });
        });
    });
    test("GET - status: 200 - responds with an array of article objects sorted by comments count in ascending order", () => {
      const sortBy = "comment_count";
      const order = "asc";
      return request(app)
        .get(`/api/articles?sort_by=${sortBy}&order=${order}`)
        .expect(200)
        .then((response) => {
          const { articles } = response.body;

          expect(articles.length).toBe(12);
          expect(articles).toBeSortedBy("comment_count");
        });
    });
    test("GET - status: 400 - invalid sort query", () => {
      const sortBY = "; DROP TABLE topics";
      return request(app)
        .get(`/api/articles?sort_by=${sortBY}`)
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid sort query");
        });
    });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("PATCH - status: - 200 responds with the updated article ", () => {
    const newVote = { inc_votes: 1 };
    const articleId = 1;
    return request(app)
      .patch(`/api/articles/${articleId}`)
      .expect(200)
      .send(newVote)
      .then((response) => {
        const { article } = response.body;
        expect(article.author).toBe("butter_bridge");
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.article_id).toBe(1);
        expect(article.body).toBe("I find this existence challenging");
        expect(article.topic).toBe("mitch");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(101);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("PATCH - status: - 404: responds with an error if article_id is invalid", () => {
    const articleId = 0;
    return request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: 1 })
      .expect(404)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Article not found");
      });
  });
  test("PATCH - status: - 400: responds with an error for invalid vote value", () => {
    const articleId = 1;
    const inc = "nonsense";
    return request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: inc })
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Invalid input");
      });
  });
  test("PATCH - status: - 400: responds with an error for invalid vote value range", () => {
    const articleId = 1;
    const inc = -21474836479;
    return request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: inc })
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Invalid input");
      });
  });
  test("PATCH - status: - 400: responds with an error for missing body", () => {
    const articleId = 1;
    return request(app)
      .patch(`/api/articles/${articleId}`)
      .send({})
      .expect(400)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("Missing request body");
      });
  });
});
