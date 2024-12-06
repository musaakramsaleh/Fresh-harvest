import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-300px)] mt-10">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Root;
