import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    const [allowedModules, setAllowedModules] = useState([]);

    useEffect(() => {
        // Fetch allowed modules data here
        const fetchAllowedModules = async () => {
            try {
                // Make API request to fetch allowed modules for the logged-in user
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
                console.log(allowedModules);
            } catch (error) {
                console.error('Error fetching allowed modules:', error);
            }
        };

        fetchAllowedModules();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    console.log('Allowed modules:', allowedModules);

    return (
        <nav
            className={`bg-gray-800 w-64 ${isOpen ? 'hidden' : 'block'}`}
            style={{ height: '100vh', overflowY: 'auto' }}
        >
            <div className="flex justify-between items-center p-4">
                <div className="text-white font-bold text-xl">Modules</div>
                <button className="text-white focus:outline-none">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <ul>
                {allowedModules.map((module, index) => {
                    return (
                        <li
                            key={index}
                            className="p-4 hover:bg-gray-700 text-white"
                        >
                            {module}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Sidebar;
