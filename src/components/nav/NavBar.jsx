import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <Link className="logo__link navbar__link" to="/">
        <img className="logo__img" src={logo} alt="Decoration Station Logo" />
      </Link>
      <li className="navbar__item">
        <Link className="navbar__link" to="/new">
          New Decoration
        </Link>
      </li>
    </ul>
  );
};
