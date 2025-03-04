import * as React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { User, Bell, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

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
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="p-4 bg-white shadow-md flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="../src/assets/FJ.png"
            alt="Logo"
            className="h-12 w-12 rounded-full"
          />
          <h1 className="text-xl font-semibold text-gray-800">Fres Jewelry</h1>
        </div>

        <div className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-[#85986d] transition duration-300">
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-[#85986d] transition duration-300"
          >
            Product
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#85986d] transition duration-300"
            >
              Category <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden">
                <Link
                  to="/category/all"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  ALL
                </Link>
                <Link
                  to="/category/ring"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  RING
                </Link>
                <Link
                  to="/category/necklace"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  NECKLACE
                </Link>
                <Link
                  to="/category/earrings"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  EARRINGS
                </Link>
                <Link
                  to="/category/bracelet"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  BRACELET
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about-us"
            className="hover:text-[#85986d] transition duration-300"
          >
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-gray-600">
          <User className="w-6 h-6 cursor-pointer transition duration-300 hover:text-[#85986d]" />
          <Bell className="w-6 h-6 cursor-pointer transition duration-300 hover:text-[#85986d]" />
          <ShoppingCart className="w-6 h-6 cursor-pointer transition duration-300 hover:text-[#85986d]" />
        </div>

        <div className="md:hidden">
          {isOpen ? (
            <X
              className="w-7 h-7 cursor-pointer text-gray-700 transition duration-300 hover:text-[#85986d]"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 cursor-pointer text-gray-700 transition duration-300 hover:text-[#85986d]"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </nav>

      {/* Responsive*/}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="p-4 flex flex-col gap-4 text-gray-600 font-medium">
          <Link
            to="/"
            className="hover:text-[#85986d] transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-[#85986d] transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Product
          </Link>

          {/* In Mobile Responsive*/}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full text-left hover:text-[#85986d] transition duration-300"
            >
              Category <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-md overflow-hidden">
                <Link
                  to="/category/all"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  ALL
                </Link>
                <Link
                  to="/category/ring"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  RING
                </Link>
                <Link
                  to="/category/necklace"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  NECKLACE
                </Link>
                <Link
                  to="/category/earrings"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  EARRINGS
                </Link>
                <Link
                  to="/category/bracelet"
                  className="block px-4 py-2 hover:bg-[#85986d] hover:text-white transition"
                >
                  BRACELET
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about-us"
            className="hover:text-[#85986d] transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
        </div>
      </div>
    </>
  );
};

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const Homepage = () => {};
