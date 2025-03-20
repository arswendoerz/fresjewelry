import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

const FooterFresh = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">
        {/* Brand & Description */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start">
          <img className="h-20 w-auto" src="/logosec.svg" alt="Logo Footer" />
          <p className="text-sm mt-4 text-gray-500 leading-6 md:w-4/5">
            Fres Jewelry is a jewelry company that provides various types of
            jewelry, ranging from necklaces, rings, bracelets, and earrings.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/5 flex flex-col items-center md:items-start">
          <h2 className="font-medium text-gray-900 mb-2">Company</h2>
          <ul className="text-sm space-y-1">
            <li>
              <a className="hover:underline transition" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:underline transition" href="/product">
                Product
              </a>
            </li>
            <li>
              <a className="hover:underline transition" href="/aboutUs">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/5 flex flex-col items-center md:items-start">
          <h2 className="font-medium text-gray-900 mb-2">Get in Touch</h2>

          <p className="text-sm flex items-center gap-2">
            <FaWhatsapp size={16} />
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              +62 812-3456-7890
            </a>
          </p>

          <p className="text-sm flex items-center gap-2">
            <MdOutlineAlternateEmail size={16} />
            <a
              href="mailto:contact@fresjewelry.com"
              className="hover:underline"
            >
              contact@fresjewelry.com
            </a>
          </p>

          <p className="text-sm flex items-center gap-2">
            <FaInstagram size={16} />
            <a
              href="https://www.instagram.com/fresjewelry/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @fresjewelry
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Line & Copyright */}
      <div className="border-t border-gray-300">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-center items-center text-xs text-gray-500 gap-2">
          <div className="flex items-center">
            <div className="w-6 h-2 bg-yellow-600 rounded-full"></div>
            <div className="w-full h-0.5 bg-gray-300"></div>
          </div>
          <p className="text-center md:text-left">
            Copyright 2025© fresjewelry.com - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterFresh;
