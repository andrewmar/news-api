const request = require("supertest");
const app = require("../app.js");

describe("GET /api", () => {
  test("GET - status: 200 - responds with JSON listing all the available endpoints on the API at the moment", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        const { endpoints } = response.body;
        expect(Object.keys(endpoints)).toEqual([
          "GET /api",
          "GET /api/topics",
          "GET /api/articles",
        ]);
      });
  });

  test('"GET - status: 200 - responds with JSON object describing in details all the available endpoints on the API at the moment" ', () => {
    return request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        const { endpoints } = response.body;
        expect(endpoints).toEqual({
          "GET /api": {
            description:
              "serves up a json representation of all the available endpoints of the api",
          },
          "GET /api/topics": {
            description: "serves an array of all topics",
            queries: [],
            exampleResponse: {
              topics: [{ slug: "football", description: "Footie!" }],
            },
          },
          "GET /api/articles": {
            description: "serves an array of all topics",
            queries: ["author", "topic", "sort_by", "order"],
            exampleResponse: {
              articles: [
                {
                  title: "Seafood substitutions are increasing",
                  topic: "cooking",
                  author: "weegembump",
                  body: "Text from the article..",
                  created_at: "2018-05-30T15:59:13.341Z",
                  votes: 0,
                  comment_count: 6,
                },
              ],
            },
          },
        });
      });
  });

  test("GET - status: 404 - when provided a non-existent endpoint", () => {
    return request(app).get("/apii").expect(404);
  });
});
