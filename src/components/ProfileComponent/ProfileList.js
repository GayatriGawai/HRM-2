import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Navigation/sidebar';

const ProfileList = () => {
    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const token = localStorage.getItem('jwtSecret');
                const response = await fetch(
                    'http://localhost:5000/api/profile/getList',
                    { method: 'GET', headers: { 'x-auth-token': token } }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch the profiles');
                }
                const profileData = await response.json();
                setProfiles(profileData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profiles:', error.message);
                toast.error('Failed to fetch profiles');
            }
        };
        fetchProfiles();
    }, []);

    if (loading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <i className="fa fa-spinner fa-spin text-5xl text-blue-400"></i>
            </div>
        );
    }
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-5 gap-4">
                <div className="md:col-span-1 md:row-span-5">
                    <div className="flex">
                        <Sidebar />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-4 row-span-5">
                    <div className="flex-1 bg-white p-4 md:p-10 flex flex-col">
                        <h2 className="text-xl font-semibold text-2xl pt-4 md:pt-14">
                            <i className="fas fa-list"> </i> Employee List
                        </h2>
                        <div className="container">
                            <div className="contents">
                                <Link
                                    to={'/profile/addProfile'}
                                    type="button"
                                    className="bg-green-500 float-right mb-2 h-10 w-fit text-center rounded p-2 text-white hover:bg-green-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
                                >
                                    <i className="fas fa-add"> </i>
                                </Link>
                            </div>
                            <div>
                                <table className="w-full border border-collapse border-gray-300 border-r">
                                    <thead className="bg-blue-500 text-white  h-10">
                                        <tr>
                                            <th style={{ width: '20%' }}>
                                                No.
                                            </th>
                                            <th style={{ width: '20%' }}>
                                                Name
                                            </th>
                                            <th style={{ width: '20%' }}>
                                                Designation
                                            </th>
                                            <th style={{ width: '20%' }}>
                                                Status
                                            </th>
                                            <th style={{ width: '20%' }}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center text-sm font-medium">
                                        {profiles.map((profile, index) => (
                                            <tr key={index} className="h-10">
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Link
                                                        to={`/getProfile/${profile._id}`}
                                                        className="hover:text-red-700"
                                                    >
                                                        {profile.firstName}{' '}
                                                        {profile.lastName}
                                                    </Link>
                                                </td>
                                                <td>{profile.position}</td>
                                                <td>{profile.status}</td>
                                                <td>
                                                    <Link
                                                        to={`/employees/edit/${profile._id}`}
                                                        className="text-blue-500"
                                                    >
                                                        <i className="fas fa-pencil"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </Fragment>
    );
};

export default ProfileList;
