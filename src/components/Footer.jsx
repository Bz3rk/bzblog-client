import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="fixed
     w-full bottom-0 bg-primary-500 text-center text-md text-white p-1 font-medium italic "
    >
      <div className="flex gap-8 justify-center ">
        &copy Botzerk
        <div className=" flex justify-between items-center gap-4">
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
          <FaTwitter />
          <FaWhatsapp />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
