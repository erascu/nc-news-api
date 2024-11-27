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

describe("GET /api/articles", () => {
  test("200: Returns an array of articles objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(13);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("400: Responds with 'Bad request' when giving an invalid endpoint", () => {
    return request(app)
      .get("/api/articles/create")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("404: Responds with 'Not found' when giving an non-existent endpoint", () => {
    return request(app)
      .get("/api/loremipsum")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Returns an array of comments objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
  test("200: Returns an array of comments objects with comment_id in ASC order", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          let prevCommentId = 0;
          expect(comment.comment_id).toBeGreaterThan(prevCommentId);
          prevCommentId = comment.comment_id;
        });
      });
  });
  test("404: Returns 'No comments found for this article'", () => {
    return request(app)
      .get("/api/articles/37/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No comments found for this article");
      });
  });
  test("500: Returns 'Internal Server Error'", () => {
    return request(app)
      .get("/api/articles/number/comments")
      .expect(500)
      .then(({ body }) => {
        expect(body.msg).toBe("Internal Server Error");
      });
  });
});

describe.only("GET /api/articles/:article_id/comments - new comment", () => {
  test("201: Add a new comment to the article and return it'", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a new comment!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: newComment.body,
            article_id: 1,
            author: newComment.username,
            votes: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });
  test("400: Responds with an error when missing username", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        body: "This comment is missing a username",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: Responds with an error when missing body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: Responds with an error when article_id is NaN", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a comment on an invalid article ID!",
    };
    return request(app)
      .post("/api/articles/article_id/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Article ID should be a number");
      });
  });
  test("404: Responds with an error when article_id does not exists", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a comment on an non-existent article ID!",
    };
    return request(app)
      .post("/api/articles/333/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});
