import RequestLimit from "../models/rateLimit.js";

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 100;

async function rateLimit(req, res, next) {
  const ipAddress = req.ip;
  const currentTime = new Date();
  const windowStart = new Date(currentTime - RATE_LIMIT_WINDOW);

  try {
    let requestLimit = await RequestLimit.findOne({
      where: { ip_address: ipAddress },
    });
    if (!requestLimit) {
      requestLimit = await RequestLimit.create({ ip_address: ipAddress });
    }
    if (
      requestLimit.last_request_at >= windowStart &&
      requestLimit.request_count >= MAX_REQUESTS_PER_WINDOW
    ) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    }
    await requestLimit.update({
      request_count: requestLimit.request_count + 1,
      last_request_at: currentTime,
    });
    next();
  } catch (error) {
    console.error("Error in rate limiting middleware:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default rateLimit;
