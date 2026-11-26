import { useState } from "react";
import { NavLink, Link } from "react-router";
import logo from "../assets/logo.png";

const links = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
  { name: "خدماتنا", path: "/services" },
  { name: "أعمالنا", path: "/portfolio" },
  { name: "المدونة", path: "/blog" },
  { name: "تواصل معنا", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link className="brand" to="/" aria-label="حلول سوفت - الرئيسية">
          <img src={logo} alt="حلول سوفت Hulool Soft" />
        </Link>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          aria-label="التنقل الرئيسي"
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link className="button button-primary nav-cta" to="/contact">
            اطلب خدمة <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
