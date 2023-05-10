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
  test("GET - status: 404 - valid but non-existent article id", () => {
    const articleId = 9999;

    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(404)
      .then((response) => {
        const { msg } = response.body;

        expect(msg).toBe("Not found!");
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
