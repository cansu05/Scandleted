const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");
const auth = require("../middlewares/auth");
const {
  createAccessToken,
  createRefreshToken,
  hashToken,
  parseDurationToMs,
} = require("../utils/tokens");

const router = express.Router();

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: parseDurationToMs(process.env.REFRESH_TOKEN_EXPIRES_IN || "7d"),
  };
}

function refreshExpiresAt() {
  return new Date(
    Date.now() + parseDurationToMs(process.env.REFRESH_TOKEN_EXPIRES_IN || "7d")
  );
}

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true, createdAt: true },
    });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(refreshToken),
        userId: user.id,
        expiresAt: refreshExpiresAt(),
      },
    });

    res.cookie("refreshToken", refreshToken, refreshCookieOptions());

    return res.status(201).json({ accessToken, user });
  } catch (error) {
    console.error("register error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(refreshToken),
        userId: user.id,
        expiresAt: refreshExpiresAt(),
      },
    });

    res.cookie("refreshToken", refreshToken, refreshCookieOptions());

    return res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("login error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/auth/refresh", async (req, res) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

    const oldTokenHash = hashToken(oldRefreshToken);
    const existingToken = await prisma.refreshToken.findFirst({
      where: {
        tokenHash: oldTokenHash,
        userId: payload.sub,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!existingToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    await prisma.refreshToken.update({
      where: { id: existingToken.id },
      data: { revokedAt: new Date() },
    });

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(newRefreshToken),
        userId: user.id,
        expiresAt: refreshExpiresAt(),
      },
    });

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions());

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("refresh error", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

router.post("/auth/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await prisma.refreshToken.updateMany({
        where: {
          tokenHash,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("logout error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/auth/me", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("me error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
