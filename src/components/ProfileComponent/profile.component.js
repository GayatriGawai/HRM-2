//Component to create the profile for employee

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Sidebar from '../Navigation/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose';
import { useNavigate } from 'react-router-dom';
import EducationForm from './AddEducation';
import ExperienceForm from './AddExperience';
const Profile = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: '',
        firstName: '',
        lastName: '',
        phone: '',
        emailAddress: '',
        skills: [],
        gender: '',
        position: '',
        status: '',
        salary: '',
        dob: '',
        education: [],
        experience: [],
    });

    const addEducation = () => {
        setFormData((prevState) => ({
            ...prevState,
            education: [
                ...prevState.education,
                {
                    university: '',
                    degree: '',
                    fieldofstudy: '',
                    description: '',
                    from: '',
                    to: '',
                    current: false,
                },
            ],
        }));
    };
    const removeEducation = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            education: prevState.education.filter((_, i) => i !== index),
        }));
    };

    const addExperience = () => {
        setFormData((prevState) => ({
            ...prevState,
            experience: [
                ...prevState.experience,
                {
                    title: '',
                    company: '',
                    location: '',
                    description: '',
                    from: '',
                    to: '',
                    current: false,
                },
            ],
        }));
    };
    const removeExperience = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            experience: prevState.experience.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtSecret');

            const roleId = new mongoose.Types.ObjectId(formData.role);
            const dataToSend = { ...formData, role: roleId };

            const response = await axios.post(
                'http://localhost:5000/api/profile/addProfile',
                dataToSend,
                {
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Employee Profile created:', response.data);
            if (dataToSend) {
                // Clear form data after submission
                setFormData({
                    role: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    emailAddress: '',
                    skills: '',
                    gender: '',
                    position: '',
                    status: '',
                    salary: '',
                    dob: '',
                    education: [
                        {
                            university: '',
                            degree: '',
                            fieldofstudy: '',
                            from: '',
                            to: '',
                            current: false,
                            description: '',
                        },
                    ],
                    experience: [
                        {
                            title: '',
                            company: '',
                            location: '',
                            from: '',
                            to: '',
                            current: false,
                            description: '',
                        },
                    ],
                });

                toast.success('Employee Profile Created please open the list');
            }
        } catch (error) {
            toast.error('Error creating employee: please open the list');
            console.error('Error creating employee:', error);
        }
    };
    const handleCancel = () => {
        navigate('/profile');
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/roles/getRoles'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }
                const rolesData = await response.json();
                setRoles(rolesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching roles:', error.message);
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e, index = null) => {
        const { name, value, checked, type } = e.target;
        const closestElement = e.target.closest('[data-key]');

        if (closestElement) {
            const key = closestElement.dataset.key;

            if (index !== null && key) {
                setFormData((prevState) => ({
                    ...prevState,
                    [key]: prevState[key].map((item, i) =>
                        i === index
                            ? {
                                  ...item,
                                  [name]: type === 'checkbox' ? checked : value,
                              }
                            : item
                    ),
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    if (loading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <i className="fa fa-spinner fa-spin text-5xl text-yellow-400"></i>
            </div>
        );
    }
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-1 md:row-span-5">
                    <div className="flex">
                        <Sidebar />
                    </div>
                </div>
                <div className="flex-1 bg-white p-10 flex flex-col col-span-4">
                    <div className="bg-white p-4 mb-4 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-6">
                            Create Employee
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="mb-4 col-span-2">
                                <label
                                    className="block text-sm font-bold text-gray-700 mb-2"
                                    htmlFor="role"
                                >
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role._id} value={role._id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="emailAddress"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="skills"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills.join(', ')}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="gender"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Gender
                                </label>

                                <div className="flex justify-start items-center mt-3">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === 'Male'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="male">Male</label>

                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === 'Female'}
                                        onChange={handleChange}
                                        className="mr-2 ml-4"
                                    />
                                    <label htmlFor="female">Female</label>

                                    <input
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        value="Other"
                                        checked={formData.gender === 'Other'}
                                        onChange={handleChange}
                                        className="mr-2 ml-4"
                                    />
                                    <label htmlFor="other">Other</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="position"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Position
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Trainee">Trainee</option>
                                    <option value="Regular-Employee">
                                        Regular Employee
                                    </option>
                                    <option value="Terminated">
                                        Terminated
                                    </option>
                                    <option value="Absconded">Absconded</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="salary"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Annual salary
                                </label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dob"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-yellow-500"
                                />
                            </div>
                            <EducationForm
                                education={formData.education}
                                handleChange={handleChange}
                                addEducation={addEducation}
                                removeEducation={removeEducation}
                            />
                            <ExperienceForm
                                experience={formData.experience}
                                handleChange={handleChange}
                                addExperience={addExperience}
                                removeExperience={removeExperience}
                            />
                        </form>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                onClick={handleCancel}
                                className="bg-gray-300 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default Profile;
