import request from "supertest";
import app from "../app.js";

describe("Bid Endpoints", () => {
  let token;
  let itemId;

  beforeAll(async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    token = res.body.token;

    const itemRes = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Item",
        description: "This is a test item",
        starting_price: 100,
        end_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    itemId = itemRes.body.id;
  });

  it("should place a bid", async () => {
    const res = await request(app)
      .post(`/bids/${itemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        bid_amount: 150,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should get all bids for an item", async () => {
    const res = await request(app)
      .get(`/bids/${itemId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("bids");
  });
});
