import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const [allowedModules, setAllowedModules] = useState([]);
    const [allowedModulesActions, setAllowedModulesActions] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllowedModules = async () => {
            try {
                const token = localStorage.getItem('jwtSecret');
                const response = await fetch(
                    'http://localhost:5000/api/permission/allowed-modules',
                    { method: 'GET', headers: { 'x-auth-token': token } }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch allowed modules');
                }
                const data = await response.json();
                setAllowedModules(data.allowedModules);
                setAllowedModulesActions(data.allowedModulesActions);
            } catch (error) {
                console.error('Error fetching allowed modules:', error);
            }
        };

        fetchAllowedModules();
    }, []);

    const logoutHandler = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <Fragment>
            <aside
                id="default-sidebar"
                className="bg-yellow-700 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 overflow-y-auto"
                aria-label="Sidebar"
            >
                <div className="flex flex-col justify-between min-h-screen">
                    <div>
                        <ul className="flex flex-col space-y-2 p-4 font-normal">
                            <Link
                                to="/home"
                                className="p-4 text-white bg-yellow-600 rounded-lg shadow-lg z-50 transition transform hover:-translate-y-1 hover:bg-white hover:text-yellow-600 hover:font-bold"
                            >
                                <p className="fas fa-home"></p> Home
                            </Link>
                            <Link
                                to="/dashboard"
                                className="p-4 text-white bg-yellow-600 rounded-lg shadow-lg z-50 transition transform hover:-translate-y-1 hover:bg-white hover:text-yellow-600 hover:font-semibold"
                            >
                                <p className="fas fa-cubes"></p> Dashboard
                            </Link>
                            <p className="p-4 text-white">
                                <p className="fas fa-align-left"></p> Modules
                            </p>

                            {allowedModules.map((module, index) => (
                                <li
                                    key={index}
                                    className="p-4 text-white text-sm bg-yellow-600 rounded-lg shadow-lg z-50 transition transform hover:-translate-y-1 hover:bg-white hover:text-yellow-600 hover:font-bold"
                                >
                                    <Link
                                        to={`/${module.toLowerCase()}`}
                                        className="block hover:text-yellow-600"
                                    >
                                        {module}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4">
                        <Link
                            to="/"
                            onClick={logoutHandler}
                            className="block p-4 text-white text-sm bg-yellow-600 rounded-lg shadow-lg z-50 transition transform hover:-translate-y-1 hover:bg-white hover:text-red-600 hover:font-bold"
                        >
                            <i className="fas fa-sign-out-alt"></i>{' '}
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </Fragment>
    );
};

export default Sidebar;
