# API Rate Limiter Middleware for Express.js

A simple and customizable rate limiter middleware for Express.js to protect your API from too many requests

## Features

- Limit requests per IP or custom key
- Configurable window duration and max requests
- Customizable response when limit is exceeded
- Lightweight, no external dependencies
- Easy to integrate into any Express app

## Installation

```bash
npm install
```

## Usage
Import and use the middleware in your Express app:

```js
import express from "express";
import rateLimit from "./index.js";

const app = express();

const limiter = rateLimit({
  windowMs: 60000,    // 1 minute window
  maxRequests: 100,   // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello, you are within the rate limit!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

```

## Options

- windowMs (number) — Duration of window in milliseconds (default: 60000)
- maxRequests (number) — Max number of requests allowed per window (default: 100)
- keyGenerator (function) — Function to generate unique key from req (default: IP address)
- onLimitReached (function) — Callback when limit exceeded; receives (req, res)