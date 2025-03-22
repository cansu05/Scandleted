import { links } from "@/utils/links";
import Link from "next/link";

const NavLinks = () => {
  return (
    <div className=" flex-row flex-wrap gap-4 lg:flex hidden">
      {links.map((link) => {
        return (
          <Link key={link.id} href={link.href}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
export default NavLinks;
