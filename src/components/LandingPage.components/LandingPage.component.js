import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <Fragment>
            <div className="background flex flex-col items-center justify-center min-h-screen bg-gray-200">
                <h1 className="text-4xl text-white font-bold mb-8 text-center">
                    Welcome to Insnapsys
                </h1>
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="py-2 px-4 bg-yellow-500 font-semibold text-white hover:text-black rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default LandingPage;
