import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../Navigation/sidebar';
import moment from 'moment';
import UpdateProfile from './UpdateProfile';

const ViewProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('jwtSecret');
                const response = await axios.get(
                    `http://localhost:5000/api/profile/getProfile/${id}`,
                    { headers: { 'x-auth-token': token } }
                );

                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Unable to fetch the profile', error);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <i className="fa fa-spinner fa-spin text-5xl text-yellow-400"></i>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="grid grid-cols-6 min-h-screen bg-gray-100">
                <div className="col-span-1 bg-white">
                    <Sidebar />
                </div>
                <div className="col-span-5 p-10">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">
                                {profile.firstName} {profile.lastName}
                            </h2>
                            <Link
                                to={'/profile'}
                                className="text-blue-500 hover:text-red-700"
                            >
                                <span className="text-sm">
                                    Back to Profiles{'   '}
                                </span>
                                <i className="fas fa-chevron-right"></i>
                            </Link>
                            <Link
                                to={`/updateProfile/${id}`}
                                className="text-blue-500 hover:text-red-700"
                            >
                                <span className="text-sm">Edit{'   '}</span>
                                <i className="fas fa-chevron-right"></i>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p>
                                    <span className="font-semibold">Role:</span>{' '}
                                    {profile.role.name}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Date of birth:
                                    </span>{' '}
                                    {moment(profile.dob).format('DD/MM/YYYY')}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Gender:
                                    </span>{' '}
                                    {profile.gender}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{' '}
                                    {profile.phone}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{' '}
                                    {profile.emailAddress}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Status:
                                    </span>{' '}
                                    {profile.status}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Position:
                                    </span>{' '}
                                    {profile.position}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Skills
                                </h3>
                                <ul className="list-disc list-inside">
                                    {profile.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 ">
                            <h3 className="text-lg font-semibold mb-4">
                                Education{'     '}
                                <Link to={`/addEdu/${id}`}>
                                    <i className="fas fa-pencil text-sm text-blue-300 font-thin"></i>
                                </Link>
                            </h3>

                            {profile.education &&
                            profile.education.length > 0 ? (
                                profile.education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="mb-6 p-4 border rounded-lg bg-gray-50"
                                    >
                                        <p>
                                            <span className="font-semibold">
                                                University:
                                            </span>{' '}
                                            {edu.university}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Degree:
                                            </span>{' '}
                                            {edu.degree}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Field Of Study:
                                            </span>{' '}
                                            {edu.fieldofstudy}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                From:
                                            </span>{' '}
                                            {moment(edu.from).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                To:
                                            </span>{' '}
                                            {moment(edu.to).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Description:
                                            </span>{' '}
                                            {edu.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-300 italic">
                                    No education is added
                                </p>
                            )}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">
                                Experience{'    '}
                                <Link to={`/addExp/${id}`}>
                                    <i className="fas fa-pencil text-sm text-blue-300 font-thin"></i>
                                </Link>
                            </h3>
                            {profile.education &&
                            profile.education.length > 0 ? (
                                profile.experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="mb-6 p-4 border rounded-lg bg-gray-50"
                                    >
                                        <p>
                                            <span className="font-semibold">
                                                Title:
                                            </span>{' '}
                                            {exp.title}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Company:
                                            </span>{' '}
                                            {exp.company}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Location:
                                            </span>{' '}
                                            {exp.location}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                From:
                                            </span>{' '}
                                            {moment(exp.from).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                To:
                                            </span>{' '}
                                            {moment(exp.to).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Description:
                                            </span>{' '}
                                            {exp.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-300 italic">
                                    No experience is added
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewProfile;
