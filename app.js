import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./sequelize.config.js";
import models from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/users", authRoutes);
app.use("/items", itemRoutes);
app.use("/bids", bidRoutes);
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  if (process.env.NODE_ENV !== "test") {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Export the server and app for testing
export { app, server, io };
