import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";

const LinksDropdown = () => {
  return (
    <div className="lg:hidden ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="cursor-pointer">
            <Image src="/icons/menu.svg" alt="menu" width={22} height={22} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {links.map((link) => {
            return (
              <DropdownMenuItem key={link.id}>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            );
          })}

          <LoginButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default LinksDropdown;
