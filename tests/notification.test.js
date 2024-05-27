import request from "supertest";
import app from "../app.js";

describe("Notification Endpoints", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    token = res.body.token;
  });

  it("should get all notifications", async () => {
    const res = await request(app)
      .get("/notifications")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("notifications");
  });

  it("should mark notifications as read", async () => {
    const res = await request(app)
      .post("/notifications/mark-read")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Notifications marked as read");
  });
});
