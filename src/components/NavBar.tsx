import { NavLink } from "react-router-dom";
import ThemeToggle, { THEME_KEY } from "./ThemeToggle";
import type { Theme } from "./ThemeToggle";
import { useEffect, useState } from "react";

import logoLight from "../assets/YLogo_black.png"; // light theme
import logoDark from "../assets/YLogo_white.png";  // dark theme

// Active link styling (magma red when active)
const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-btn transition ${
    isActive ? "bg-[#cf3a30] text-white" : "hover:bg-base-200"
  }`;

export default function NavBar() {
  // Initialize from saved theme (default to light)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    return saved === "dark" ? "dark" : "light";
  });

  // React to theme changes from:
  //  - other tabs (storage)
  //  - ThemeToggle in this tab (custom "themechange" event)
  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === "light" || saved === "dark") setTheme(saved);
    };
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<Theme>).detail;
      if (detail === "light" || detail === "dark") setTheme(detail);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("themechange", onThemeChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("themechange", onThemeChange);
    };
  }, []);

  return (
    <div className="navbar bg-transparent shadow sticky top-0 z-50 transition-colors">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost px-2">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Yoav logo"
            className="h-16 w-16 align-middle"
          />
        </NavLink>
      </div>

      {/* CENTER: desktop links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
              <NavLink to="/projects" className={navItemClass}>
                Projects
              </NavLink>
            </li>
            <li>
            <NavLink to="/contact" className={navItemClass}>
              Get in touch
            </NavLink>
          </li>
        </ul>
      </div>

      {/* RIGHT: mobile dropdown (right-aligned) + desktop theme toggle */}
      <div className="navbar-end gap-2">
        {/* Mobile dropdown — RIGHT side */}
        <div className="dropdown dropdown-end lg:hidden">
          <button className="btn btn-ghost" aria-label="Open menu" tabIndex={0}>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/projects" className={navItemClass}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navItemClass}>
                Get in touch
              </NavLink>
            </li>
            <li className="mt-1">
              {/* Theme toggle inside the mobile menu */}
              <ThemeToggle />
            </li>
          </ul>
        </div>

        {/* Desktop theme toggle (hidden on mobile) */}
        <div className="hidden lg:flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}