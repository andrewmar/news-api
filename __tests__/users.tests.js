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

describe("GET api/users", () => {
  test("GET - status: 200 - responds with an array of user objects ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const { users } = response.body;

        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("GET api/users", () => {
  test("GET - status: 404 - when provided non existent endpoint", () => {
    return request(app)
      .get("/api/userss")
      .expect(404)
      .then((response) => {
        expect(response.text).toBe("Not found");
      });
  });
});
