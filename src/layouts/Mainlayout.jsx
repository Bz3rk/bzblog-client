import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />;
      <ToastContainer draggablePercent={60} />
      <Footer />
    </>
  );
};

export default Mainlayout;
