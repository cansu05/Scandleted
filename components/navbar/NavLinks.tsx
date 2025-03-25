"use client";

import { links } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className=" flex-row flex-wrap gap-4 lg:flex hidden">
      {links.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.href}
            className="text-xl"
            style={{
              color: pathname === link.href ? "var(--text)" : undefined,
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
export default NavLinks;
