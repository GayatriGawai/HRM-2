import React, { Fragment } from 'react';
import SidebarMenu from './side-bar.component';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Fragment>
            <nav className="border-gray-200 border-b-1 border-blue-100 top-0 w-full z-10 fixed py-7 px-8 flex items-center justify-between opacity-90 bg-black-500">
                {/* Mobile Menu Icon */}
                <div className="text-white font-semibold p-2 flex md:hidden">
                    <button
                        className="block text-white hover:text-black focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                {/* Welcome to Insnapsys */}
                <div className="text-white font-bold p-2 flex hover:text-yellow-400">
                    Welcome to Insnapsys
                </div>

                {/* Big Screen Options */}
                <div className="hidden md:flex md:justify-end md:space-x-11">
                    <ul className="flex flex-row p-4 font-medium rounded-lg space-x-8 rtl:space-x-reverse dark:bg-gray-800 dark:border-gray-700 text-white">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 hover:bg-transparent hover:text-yellow-400 p-0 dark:text-white "
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 hover:bg-transparent hover:text-yellow-400 p-0 dark:text-white "
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 hover:bg-transparent hover:text-yellow-400 p-0 dark:text-white "
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 hover:bg-transparent hover:text-yellow-400 p-0 dark:text-white "
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Sign In and Sign Up Buttons */}
                <div className="text-white font-semibold p-2 flex ">
                    <Link to="/login">
                        <button
                            type="button"
                            className="focus:outline-none text-white font-semibold bg-black-400 hover:text-black hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"
                        >
                            <span className="hidden sm:inline">Sign in </span>{' '}
                            <i className="fas fa-sign-in sm:hidden"></i>
                        </button>
                    </Link>
                    <Link to="/register">
                        <button
                            type="button"
                            className="focus:outline-none text-white font-semibold bg-black-400 hover:text-black hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"
                        >
                            <span className="hidden sm:inline">Sign Up</span>{' '}
                            <i className="fas fa-user-plus sm:hidden"></i>
                        </button>
                    </Link>
                </div>
            </nav>
            <div className={`pt-5 ${isOpen ? 'ml-64' : ''}`}>
                {isOpen && <SidebarMenu onClose={toggleSidebar} />}
            </div>
        </Fragment>
    );
};

export default NavBar;
