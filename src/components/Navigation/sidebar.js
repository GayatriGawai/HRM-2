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
                className="bg-gray-700 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="flex flex-col justify-between min-h-screen">
                    <div>
                        <div className="flex justify-between items-center p-4">
                            <Link to={'/home'} className="text-white">
                                Home
                            </Link>
                        </div>
                        <ul className="flex flex-col">
                            {allowedModules.map((module, index) => (
                                <li key={index} className="p-4 text-white">
                                    <Link
                                        to={`/${module.toLowerCase()}`}
                                        className="hover:text-blue-400"
                                    >
                                        {module}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-white p-4 mb-5 justify-end">
                        <a
                            href="/"
                            onClick={logoutHandler}
                            className="focus:outline-none hover:text-blue-400 text-sm"
                        >
                            <span className="hidden sm:inline">Logout</span>{' '}
                            <i className="fas fa-sign-out-alt sm:hidden"></i>
                        </a>
                    </div>
                </div>
            </aside>
        </Fragment>
    );
};

export default Sidebar;
