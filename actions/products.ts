"use server";

import db from "@/utils/db";

export const fetchFeaturedProducts = async () => {
  try {
    return await db.product.findMany({
      where: {
        featured: true,
      },
    });
  } catch (error) {
    console.error("fetchFeaturedProducts failed:", error);
    return [];
  }
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  try {
    return await db.product.findMany({
      where: {
        OR: [{ name: { contains: search, mode: "insensitive" } }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("fetchAllProducts failed:", error);
    return [];
  }
};

export const fetchSingleProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  } catch (error) {
    console.error("fetchSingleProduct failed:", error);
    return null;
  }
};
