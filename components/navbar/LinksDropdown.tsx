import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";

const LinksDropdown = () => {
  return (
    <div className="lg:hidden ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src="/icons/menu.svg"
            alt="cart"
            width={20}
            height={20}
            className="cursor-pointer w-5 h-5 "
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {links.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default LinksDropdown;
