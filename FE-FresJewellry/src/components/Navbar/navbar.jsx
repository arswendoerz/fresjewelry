import * as React from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { User, Bell, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [setIsDropdownOpen] = React.useState(false);

  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      {/* Navbar */}
      <nav className="p-4 bg-white shadow-md flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/logoprimary.svg"
              alt="Logo"
              className="h-16 w-16 rounded-full"
            />
          </Link>
        </div>
        <div className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link
            to="/"
            className="hover:text-[#CB9531] hover:scale-110 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/product/"
            className="hover:text-[#CB9531] hover:scale-110 transition duration-300"
          >
            Product
          </Link>
          <Link
            to="/aboutUs"
            className="hover:text-[#CB9531] hover:scale-110 transition duration-300"
          >
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-gray-600">
          <Link to="/account">
            <User className="w-6 h-6 cursor-pointer hover:text-[#CB9531]" />
          </Link>
          <Link to="/notification/">
            <Bell className="w-6 h-6 cursor-pointer hover:text-[#CB9531]" />
          </Link>
          <Link to="/shoppingCart/">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#CB9531]" />
          </Link>
        </div>

        <div className="md:hidden">
          {isOpen ? (
            <X
              className="w-7 h-7 cursor-pointer text-gray-700 hover:text-[#CB9531]"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 cursor-pointer text-gray-700 hover:text-[#CB9531]"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </nav>

      {/* Responsive Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="p-4 flex flex-col gap-4 text-gray-600 font-medium">
          <Link
            to="/"
            className="hover:text-[#CB9531] transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-[#CB9531] transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Product
          </Link>
          <Link
            to="/about-us"
            className="hover:text-[#CB9531] transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <div className="flex gap-4 justify-center mt-4">
            <Link to="/account">
              <User className="w-6 h-6 cursor-pointer hover:text-[#CB9531]" />
            </Link>
            <Link to="/notification">
              <Bell className="w-6 h-6 cursor-pointer hover:text-[#CB9531]" />
            </Link>
            <Link to="/shoppingCart">
              <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#CB9531]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
