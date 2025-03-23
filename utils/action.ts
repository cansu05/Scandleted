import db from "@/utils/db";

export const fetchFeaturedProducts = () => {
  return db.product.findMany({
    where: {
      featured: true,
    },
  });
};

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
