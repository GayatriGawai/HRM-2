import React, { Fragment } from 'react';
import SidebarMenu from './side-bar.component';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../../actions/auth.actions/login.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavBar = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Fragment>
            <nav className="flex border-gray-200 border-b-1 border-blue-100 top-0 w-full z-10 fixed py-2 px-8 flex items-center justify-between opacity-90 bg-gray-500">
                {/* Mobile Menu Icon */}
                <div className="text-white font-semibold p-2 flex">
                    <button
                        className="block text-white hover:text-black focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className={`pt-5 ${isOpen ? 'ml-64' : ''}`}>
                    {isOpen && <SidebarMenu onClose={toggleSidebar} />}
                </div>
                <div className="text-white font-bold p-2 flex hover:text-yellow-400">
                    Insnapsys
                </div>

                {/* LOGOUT */}
                <div className="text-white font-semibold p-2 flex ">
                    <Link to="/">
                        <a
                            onClick={logout}
                            className="focus:outline-none text-white font-semibold bg-black-400 hover:text-black hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"
                        >
                            <span className="hidden sm:inline">Logout</span>{' '}
                            <i className="fas fa-sign-out-alt sm:hidden"></i>
                        </a>
                    </Link>
                </div>
            </nav>
        </Fragment>
    );
};

NavBar.prototypes = {
    logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(NavBar);
