import db from "@/utils/db";

export const fetchFeaturedProducts = () => {
  return db.product.findMany({
    where: {
      featured: true,
    },
  });
};

export const fetchAllProducts = () => {
  return db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
