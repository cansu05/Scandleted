const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function parseDurationToMs(value) {
  const match = /^(\d+)([mhd])$/.exec(value || "7d");
  if (!match) return 7 * 24 * 60 * 60 * 1000;

  const num = Number(match[1]);
  const unit = match[2];

  if (unit === "m") return num * 60 * 1000;
  if (unit === "h") return num * 60 * 60 * 1000;
  return num * 24 * 60 * 60 * 1000;
}

function createAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" },
  );
}

function createRefreshToken(user) {
  return jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports = {
  parseDurationToMs,
  createAccessToken,
  createRefreshToken,
  hashToken,
};
