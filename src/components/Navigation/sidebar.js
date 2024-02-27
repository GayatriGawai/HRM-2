import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar = ({ isOpen }) => {
  const [allowedModules, setAllowedModules] = useState([]);
  const [allowedModulesActions, setAllowedModulesActions] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllowedModules = async () => {
      try {
        const token = localStorage.getItem("jwtSecret");
        const response = await fetch(
          "http://localhost:5000/api/permission/allowed-modules",
          { method: "GET", headers: { "x-auth-token": token } }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch allowed modules");
        }
        const data = await response.json();
        setAllowedModules(data.allowedModules);
        setAllowedModulesActions(data.allowedModulesActions);
      } catch (error) {
        console.error("Error fetching allowed modules:", error);
      }
    };

    fetchAllowedModules();
  }, []);

  //console.log('Allowed modules:', allowedModules);

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 w-60 h-screen overflow-y-auto ">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center p-4">
            <div className="text-white font-bold text-xl">Modules</div>
            <button className="text-white focus:outline-none">
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <ul className="flex flex-col">
                        {allowedModules.map((module, index) => (
                            <li key={index} className="p-4 hover:bg-gray-700 text-white">
                                <Link to={`/${module}`} className="hover:text-yellow-400">
                                    {module}
                                </Link>
                                <ul>
                                    {module.actions.map((action, idx) => (
                                        <li key={idx}>{action}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
        </div>
        <div className="text-white p-4 mb-1">
          <a
            href="/"
            onClick={logoutHandler}
            className="focus:outline-none hover:text-yellow-400 text-sm"
          >
            <span className="hidden sm:inline">Logout</span>{" "}
            <i className="fas fa-sign-out-alt sm:hidden"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
