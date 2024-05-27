jest.setTimeout(100000); // Increase timeout to 10 seconds

import request from "supertest";
import { app, server } from "../app.js";

let token;

beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "test8@gmail.com",
    password: "Password",
  });
  token = res.body.token;
});

afterAll((done) => {
  server.close();
});

describe("Notification Endpoints", () => {
  it("should get all notifications", async () => {
    const res = await request(app)
      .get("/notifications")
      .set("Authorization", `Bearer ${token}`);
    console.log(token);
    expect(res.statusCode).toEqual(200);
  });

  it("should mark notifications as read", async () => {
    const res = await request(app)
      .post("/notifications/mark-read")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Notifications marked as read");
  });
});
