import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webHookRouter from "./routes/webhook.route.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server is running on port no ${process.env.PORT}`);
});

