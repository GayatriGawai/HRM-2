import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-black border-gray-200 border-b-1 bg-opacity-60 border-blue-100 top-0 w-full z-10 fixed py-7 px-8 flex items-center justify-between dark:bg-gray-900 w-fit">
            <div className="text-white text-3xl p-2 flex hover:text-blue-300">
                Welcome to Insnapsys
            </div>
        </nav>
    );
};

export default NavBar;
