import React, { Fragment } from 'react';
import Sidebar from '../Navigation/sidebar';
import GetNews from '../announcementsComponents/GetNews';

const HomePage = () => {
    return (
        // Once we try to add another components to the home page, kindly paste the style in the Parent component
        <Fragment>
            <div className="grid grid-cols-5 grid-rows-5 h-screen">
                <div className="row-span-5 min-w-fit">
                    <Sidebar />
                </div>
                <div className="col-span-4">
                    <GetNews />
                </div>
                <div className="bg-red-100 col-span-2 row-span-2 col-start-2 row-start-2 content-center text-center">
                    3
                </div>
                <div className="bg-green-100 col-span-2 row-span-2 col-start-4 row-start-2 content-center text-center">
                    4
                </div>
                <div className=" bg-blue-100 col-span-2 row-span-2 col-start-2 row-start-4 content-center text-center">
                    5
                </div>
                <div className=" col-span-2 row-span-2  col-start-4 row-start-4 content-center text-center">
                    6
                </div>
            </div>
        </Fragment>
    );
};

export default HomePage;
