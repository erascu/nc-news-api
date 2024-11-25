const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const app = require("../db/app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
/* Set up your beforeEach & afterAll functions here */
afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Check if returned array has three objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
      });
  });
  test("200: Returns an array of topic objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.topics.map((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: Responds with an error message if topics query is invalid", () => {
    return request(app)
      .get("/api/tropics")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("400: Returns bad request if article_id is NaN", () => {
    return request(app)
      .get("/api/articles/isNaN")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("404: Returns - ID Not Found", () => {
    return request(app)
      .get("/api/articles/3333")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID Not Found!");
      });
  });
});
