import { NavLink } from "react-router-dom";
import "../styling/Navbar.css";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-index: 50;">
      <div className="left flex items-center">
        <img src="/path/to/logo.png" alt="Logo" className="h-8" />
        <h1 className="text-white text-xl ml-4">DotArray2 XML Editor</h1>
      </div>

      <div className="right flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-white"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/layers"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-white"
          }
        >
          Layers
        </NavLink>
        <NavLink
          to="/materials"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-white"
          }
        >
          Materials
        </NavLink>
        <NavLink
          to="/xml"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-white"
          }
        >
          XML View
        </NavLink>
      </div>
    </nav>
  );
}
