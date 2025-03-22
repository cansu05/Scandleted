type Links = {
  id: number;
  href: string;
  label: string;
};

export const links: Links[] = [
  { id: 1, href: "/product", label: "SHOP" },
  { id: 2, href: "/about", label: "ABOUT" },
  { id: 3, href: "/blog", label: "BLOG" },
  { id: 4, href: "/testimonials", label: "TESTIMONIALS" },
];

export const footerLinks: Links[] = [
  { id: 1, href: "/", label: "NEW ARRIVALS" },
  { id: 2, href: "/about", label: "ABOUT" },
  { id: 3, href: "/testimonials", label: "INFLUENCER" },
  { id: 4, href: "/blog", label: "BLOG" },
  { id: 5, href: "/", label: "CONTACT US" },
];

export const socialLinks: Links[] = [
  { id: 1, href: "/", label: "FACEBOOK" },
  { id: 2, href: "/", label: "INSTAGRAM" },
  { id: 3, href: "/", label: "TWITTER" },
];
