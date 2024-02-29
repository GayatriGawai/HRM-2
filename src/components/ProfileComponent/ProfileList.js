import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <i className="fa fa-spinner fa-spin text-5xl text-yellow-400"></i>
            </div>
        );
    }
    return (
        <Fragment>
            <div>
                {loading ? (
                    <div className="fixed transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <i className="fa fa-spinner fa-spin text-5xl text-yellow-400"></i>
                    </div>
                ) : (
                    <div className="container mx-auto p-4">
                        <h2 className="text-xl font-semibold text-2xl pt-14">
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
                                    <thead className="bg-yellow-500 h-10">
                                        <tr>
                                            <th style={{ width: '20%' }}>ID</th>
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
                                                        to={`/employee/get/${profile._id}`}
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
                )}
                <ToastContainer />
            </div>
        </Fragment>
    );
};

export default ProfileList;
