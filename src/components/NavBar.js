import { NavLink } from "react-router-dom";

import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <NavLink to="/" className="navigation__link button">
            Все котики
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorite-cats" className="navigation__link button">
            Любимые котики
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
