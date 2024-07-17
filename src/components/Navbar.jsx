import React from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="flex flex-wrap justify-between items-center bg-primary-500 p-2 px-[10%]">
      <NavLink to="/">
        <div className=" text-2xl md:text-4xl text-white font-bold tracking-[.25rem] font-mont">
          Bzblog
        </div>
      </NavLink>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-white  " onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Menu */}

      <div className="hidden md:flex space-x-6 text-white items-center font-mont font-semibold">
        {user ? (
          <>
            <div>
              <NavLink to="/">Home</NavLink>
            </div>
            <div>
              <NavLink to="/create-blog">Create Blog</NavLink>
            </div>
            <div>
              <NavLink to="/logout">Logout</NavLink>
            </div>
          </>
        ) : (
          <>
            <div>
              <NavLink to="/register">Register</NavLink>
            </div>
            <div>
              <NavLink to="/login">Login</NavLink>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "fixed inset-0 z-50" : "hidden"
        } backdrop-blur-md bg-white/30`}
      >
        <button
          className="text-black fixed right-0 mx-6 mt-6"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes className="w-6 h-7" />
        </button>
        <div className="flex flex-col m-16 space-y-2 p-4 items-center">
          {user ? (
            <>
              <NavLink
                to="/"
                className="text-black text-xl font-semibold font-sans"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/create-blog"
                className="text-black text-xl font-semibold font-sans"
                onClick={() => setIsOpen(false)}
              >
                Create Blog
              </NavLink>
              <NavLink
                to="/logout"
                className="text-black text-xl font-semibold font-sans"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-black text-xl font-semibold font-sans"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-black text-xl font-semibold font-sans"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
