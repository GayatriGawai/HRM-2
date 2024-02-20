import React from 'react';

const SidebarMenu = ({ onClose }) => {
    return (
        <div className=" opacity-80 fixed inset-y-0 left-0 w-64 px-8 py-4 text-white z-20 bg-yellow-600">
            <button
                onClick={onClose}
                className="text-white absolute top-2 right-2 focus:outline-none"
            >
                <i className="fas fa-times"></i>
            </button>
            <ul className="space-y-4 ">
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 hover:bg-transparent p-0 hover:text-black"
                    >
                        <i className="fas fa-home"></i> Home
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 hover:bg-transparent p-0 hover:text-black"
                    >
                        <i className="fas fa-info-circle"></i> About
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 hover:bg-transparent p-0 hover:text-black"
                    >
                        <i className="fas fa-cogs"></i> Services
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 hover:bg-transparent p-0 hover:text-black"
                    >
                        <i className="fas fa-envelope"></i> Contact
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SidebarMenu;
