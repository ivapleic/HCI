import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="py-1 px-7 border-b border-[#F2CAB3] flex justify-between items-center">
      {/* Render either DesktopNavbar or MobileNavbar */}
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
};

export default Navbar;
