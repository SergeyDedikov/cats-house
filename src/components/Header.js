import "./Header.css";
import NavBar from "./NavBar";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <NavBar />
    </header>
  );
}
