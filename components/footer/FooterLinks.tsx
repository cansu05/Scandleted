import { footerLinks, socialLinks } from "@/utils/links";
import Link from "next/link";

const FooterLinks = () => {
  return (
    <div className="flex flex-row lg:gap-10 lg:mt-0 mt-5 items-start justify-around">
      <div className="flex flex-col ">
        {footerLinks.map((link) => {
          return (
            <Link key={link.id} href={link.href} className="text-white">
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col ">
        {socialLinks.map((link) => {
          return (
            <Link key={link.id} href={link.href} className="text-white">
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default FooterLinks;
