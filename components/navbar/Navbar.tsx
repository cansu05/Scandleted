import Container from "../global/Container";
import CartButton from "./CartButton";
import LinksDropdown from "./LinksDropdown";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { NavSearch } from "./NavSearch";

const Navbar = () => {
  return (
    <nav>
      <Container className="flex items-center justify-between py-3 lg:px-0 px-5">
        <div className="w-1/3 flex justify-start">
          <LinksDropdown />
          <NavLinks />
        </div>

        <div className="w-1/3 flex justify-center">
          <Logo />
        </div>

        <div className="flex w-1/3 justify-end gap-4 items-center">
          <NavSearch />
          <CartButton />
          <LoginButton />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
