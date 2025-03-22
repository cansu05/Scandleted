import Container from "../global/Container";
import FooterBottom from "./FooterBottom";
import FooterLinks from "./FooterLinks";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer>
      <Container className="bg-foreground mt-10">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 pt-5 lg:space-y-0 space-y-5 lg:px-0">
          <Logo />
          <FooterLinks />
        </div>
        <FooterBottom />
      </Container>
    </footer>
  );
};
export default Footer;
