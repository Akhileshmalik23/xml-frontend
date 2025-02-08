import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Credit Report
        </h1>

        <ul className="hidden md:flex space-x-6">
          <li>
            <button onClick={() => navigate("/")} className="hover:text-gray-300">
            Upload XML
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/credit-report")} className="hover:text-gray-300">
              Credit Reports
            </button>
          </li>
        </ul>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-gray-800 p-4 mt-2 space-y-3 rounded-lg">
          <li>
            <button onClick={() => { setIsOpen(false); navigate("/"); }} className="block w-full text-left hover:text-gray-300">
              Upload XML
            </button>
          </li>
          <li>
            <button onClick={() => { setIsOpen(false); navigate("/credit-report"); }} className="block w-full text-left hover:text-gray-300">
              Credit Reports
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
