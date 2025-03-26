type Links = {
  id: number;
  href: string;
  label: string;
};

export const links: Links[] = [
  { id: 1, href: "/", label: "HOME" },
  { id: 2, href: "/products", label: "SHOP" },
  { id: 3, href: "/about", label: "ABOUT" },
];

export const footerLinks: Links[] = [
  { id: 1, href: "/", label: "NEW ARRIVALS" },
  { id: 2, href: "/", label: "ABOUT" },
  { id: 3, href: "/", label: "INFLUENCER" },
  { id: 4, href: "/", label: "BLOG" },
  { id: 5, href: "/", label: "CONTACT US" },
];

export const socialLinks: Links[] = [
  { id: 1, href: "/", label: "FACEBOOK" },
  { id: 2, href: "/", label: "INSTAGRAM" },
  { id: 3, href: "/", label: "TWITTER" },
];
