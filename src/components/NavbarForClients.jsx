import React from "react";
import { Link } from "react-router-dom";
function NavbarForClients() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link to="/" className="text-white text-lg font-semibold">
            Remote Engine For Clients
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to={"/client"} className="text-white hover:underline">
            Signup
          </Link>
          <Link to={"/clientlogin"} className="text-white hover:underline">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarForClients;
