import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";
import db from "@/utils/db";

const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const getOptionalAuthUser = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return null;

  const refreshTokenRow = await db.refreshToken.findFirst({
    where: {
      tokenHash: hashToken(refreshToken),
      revokedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return refreshTokenRow?.user ?? null;
};

export const getRequiredAuthUser = async () => {
  const user = await getOptionalAuthUser();
  if (!user) redirect("/login");
  return user;
};

