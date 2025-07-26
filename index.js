const rateLimit = (options) => {
  const {
    windowMs = 60000,
    maxRequests = 100,
    keyGenerator = (req) => req.ip,
    onLimitReached = (req, res) => {
      res.status(429).json({ error: "Too many requests, please try again later." });
    },
  } = options || {};

  const hits = new Map();

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();

    if (!hits.has(key)) {
      hits.set(key, []);
    }

    const timestamps = hits.get(key);

    // Удаляем запросы старше окна
    while (timestamps.length && timestamps[0] <= now - windowMs) {
      timestamps.shift();
    }

    if (timestamps.length >= maxRequests) {
      return onLimitReached(req, res);
    }

    timestamps.push(now);
    next();
  };
};

export default rateLimit;
