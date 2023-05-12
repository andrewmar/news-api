const testData = require("./../db/data/test-data/index.js");
const seed = require("./../db/seeds/seed.js");
const db = require("./../db/connection.js");
const {
  checkArticleExists,
  checkUserExists,
  checkCommentExists,
  checkTopicExists,
} = require("../utilsForApi/utilsForApi.js");

afterAll(() => {
  db.end();
});

describe("checkArticleExists", () => {
  test("should return 404 error and a message if article does not exist", () => {
    return checkArticleExists(9999).catch((err) => {
      expect(err.status).toBe(404);
      expect(err.msg).toBe("Article not found");
    });
  });

  test("should return a resolved promise if article exists", async () => {
    await expect(checkArticleExists(1)).toResolve();
  });
});
describe("checkUserExists", () => {
  test("should return 404 error and a message if user does not exist", () => {
    return checkUserExists("bob").catch((err) => {
      expect(err.status).toBe(404);
      expect(err.msg).toBe("User not found");
    });
  });

  test("should resolve a promise if user exists", async () => {
    await expect(checkUserExists("butter_bridge")).toResolve();
  });
});
describe("checkCommentExists", () => {
  test("should return 404 error and a message if comment does not exist", () => {
    return checkCommentExists(9999).catch((err) => {
      expect(err.status).toBe(404);
      expect(err.msg).toBe("Comment not found");
    });
  });

  test("should return a resolved promise if article exists", async () => {
    await expect(checkCommentExists(15)).toResolve();
  });
});
describe("checkTopicExists", () => {
  test("should return 404 error and a message if comment does not exist", () => {
    return checkTopicExists("nonsense").catch((err) => {
      expect(err.status).toBe(404);
      expect(err.msg).toBe("Topic not found");
    });
  });

  test("should return a resolved promise if article exists", async () => {
    await expect(checkTopicExists("mitch")).toResolve();
  });
});
