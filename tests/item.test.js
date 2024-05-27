jest.setTimeout(10000); // Increase timeout to 10 seconds

import request from "supertest";
import { app } from "../app.js";
import { User } from "../models/index.js";

describe("Item Endpoints", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/users/login").send({
      email: "test8@gmail.com",
      password: "Password",
    });
    token = res.body.token;
  });

  it("should create a new item", async () => {
    const res = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Item",
        description: "This is a test item",
        starting_price: 100,
        end_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should get all items", async () => {
    const res = await request(app)
      .get("/items")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
