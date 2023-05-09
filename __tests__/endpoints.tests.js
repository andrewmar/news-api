const request = require("supertest");
const app = require("../app.js");
const endpointsFile = require("../endpoints.json");

describe("GET /api", () => {
  test("GET - status: 200 - responds with JSON listing all the available endpoints on the API at the moment", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        const { endpoints } = response.body;
        expect(Object.keys(endpoints)).toEqual(Object.keys(endpointsFile));
      });
  });

  test('"GET - status: 200 - responds with JSON object describing in details all the available endpoints on the API at the moment" ', () => {
    return request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        const { endpoints } = response.body;
        expect(endpoints).toEqual(endpointsFile);
      });
  });

  test("GET - status: 404 - when provided a non-existent endpoint", () => {
    return request(app).get("/apii").expect(404);
  });
});
