import React, { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-4 left-0 right-0 mx-auto bg-[#1f1f1f] backdrop-blur-md text-white px-4 py-2 rounded-full w-fit flex items-center gap-4 shadow-lg z-50">
        {/* Left Section */}
        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-full bg-black hover:bg-gray-800"
          >
            <IconMenu2 size={20} />
          </button>
          <span className="font-serif text-2xl tracking-wide">Veloria</span>
        </div>

        {/* Right Navigation Links */}
        <div className="flex items-center bg-black rounded-full px-6 py-2 gap-6 text-sm font-semibold">
          <Link to="/menu" className="hover:text-yellow-300 transition">
            Menu
          </Link>
          <Link to="/reservation-list" className="hover:text-yellow-300 transition">
            Reservation
          </Link>
          <Link
            to="/book-a-table"
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            Book A Table
          </Link>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#1f1f1f] flex flex-col justify-center items-center z-40 text-center">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-yellow-300"
          >
            <IconX size={30} />
          </button>

          {/* Centered Menu Content */}
          <div className="p-8 rounded-2xl text-xl text-yellow-100 font-serif tracking-wide space-y-6">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-300"
            >
              HOME
            </Link>
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-300"
            >
              MENU
            </Link>
            <Link
              to="/book"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-300"
            >
              BOOK A TABLE
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-300"
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-300"
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
