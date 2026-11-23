
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SendIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Exhibition", href: "/exhibition" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "text-[16px] font-extrabold font-Kalam uppercase tracking-[0.12em] transition-colors",
      isActive
        ? "text-accent"
        : "text-text hover:text-accent/70",
    ].join(" ");

  return (
    <header className="relative z-50 w-full px-4 sm:px-6 md:px-12 bg-bg">

      <nav className="mx-auto flex max-w-350 items-center justify-between py-5 md:py-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-Kalam text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text"
        >
          SHUTTER<span className="text-accent">.</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                end
                className={linkClasses}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop contact button */}
        <Link
          to="/contact"
          aria-label="Contact us"
          className="hidden rounded-full bg-accent p-3 text-white transition-colors hover:bg-accent/90 lg:block"
        >
          <SendIcon size={20} />
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="lg:hidden text-text hover:text-accent transition-colors"
        >
          {isMenuOpen ? (
            <X size={27} />
          ) : (
            <Menu size={27} />
          )}
        </button>

      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={[
          "lg:hidden absolute left-0 top-full w-full bg-bg border-t border-text/15 shadow-xl",
          "transition-all duration-300 overflow-hidden",
          isMenuOpen
            ? "max-h-125 opacity-100 visible"
            : "max-h-0 opacity-0 invisible",
        ].join(" ")}
      >
        <ul className="flex flex-col px-6 py-5 sm:px-10">

          {navLinks.map((link) => (
            <li
              key={link.name}
              className="border-b border-text/10 last:border-b-0"
            >
              <NavLink
                to={link.href}
                end
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "block py-4 font-Kalam text-lg font-bold uppercase tracking-widest transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-text hover:text-accent",
                  ].join(" ")
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Mobile contact button */}
          <li className="pt-5">
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-accent py-3 font-Kalam text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent/90"
            >
              Contact Us
              <SendIcon size={18} />
            </Link>
          </li>

        </ul>
      </div>

    </header>
  );
};

export default Navbar;
