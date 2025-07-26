import express from "express";
import rateLimit from "./index.js";

const app = express();

const limiter = rateLimit({
  windowMs: 60000,
  maxRequests: 5,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello, you are within the rate limit!");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
