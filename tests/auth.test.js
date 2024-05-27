jest.setTimeout(10000); // Increase timeout to 10 seconds

const request = require("supertest");
const { app } = require("../app"); // Ensure the path is correct

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test8@gmail.com",
      password: "Password",
    });
    expect(res.statusCode).toEqual(200);
  });
});
