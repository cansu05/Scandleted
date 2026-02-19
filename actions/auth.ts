"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/utils/db";
import crypto from "node:crypto";

const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

const AUTH_API_BASE =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const toFriendlyAuthMessage = (
  rawMessage: string | undefined,
  endpoint: "/auth/login" | "/auth/register"
) => {
  const normalized = (rawMessage || "").trim().toLowerCase();

  if (normalized.includes("invalid credentials")) {
    return "Email or password is incorrect.";
  }
  if (normalized.includes("email and password required")) {
    return "Please enter both email and password.";
  }
  if (normalized.includes("user already exists")) {
    return "An account with this email already exists.";
  }
  if (endpoint === "/auth/login") {
    return "We couldn't sign you in. Please check your credentials and try again.";
  }
  return "We couldn't create your account. Please try again.";
};

const extractRefreshToken = (setCookieHeader: string | null) => {
  if (!setCookieHeader) return null;

  const tokenMatch = setCookieHeader.match(/refreshToken=([^;]+)/i);
  if (!tokenMatch?.[1]) return null;

  const maxAgeMatch = setCookieHeader.match(/max-age=(\d+)/i);
  const maxAge = maxAgeMatch ? Number(maxAgeMatch[1]) : 60 * 60 * 24 * 7;

  return {
    token: decodeURIComponent(tokenMatch[1]),
    maxAge: Number.isFinite(maxAge) ? maxAge : 60 * 60 * 24 * 7,
  };
};

const syncRefreshCookieFromResponse = async (response: Response) => {
  const parsed = extractRefreshToken(response.headers.get("set-cookie"));
  if (!parsed) return;

  const cookieStore = await cookies();
  cookieStore.set("refreshToken", parsed.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: parsed.maxAge,
  });
};

const authWithBackend = async (
  endpoint: "/auth/login" | "/auth/register",
  values: { email?: string; password?: string }
) => {
  const { email, password } = values;
  if (!email || !password) {
    return { ok: false, message: "Please enter both email and password." };
  }

  try {
    const response = await fetch(`${AUTH_API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({} as { message?: string }));
    if (!response.ok) {
      return {
        ok: false,
        message: toFriendlyAuthMessage(data?.message, endpoint),
      };
    }

    await syncRefreshCookieFromResponse(response);
    return { ok: true, message: "ok" };
  } catch {
    return { ok: false, message: "Server error, please try again." };
  }
};

export const loginAction = async (values: { email?: string; password?: string }) =>
  authWithBackend("/auth/login", values);

export const registerAction = async (values: {
  email?: string;
  password?: string;
}) => authWithBackend("/auth/register", values);

export const logoutAction = async (
  _values: Record<string, string | number | boolean | null | undefined> = {}
) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    await db.refreshToken.updateMany({
      where: {
        tokenHash: hashToken(refreshToken),
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  cookieStore.delete("refreshToken");
  redirect("/");
};
