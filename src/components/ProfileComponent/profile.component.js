import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Sidebar from '../Navigation/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEducation from './AddEducation';
import AddExperience from './AddExperience';

const Profile = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        role: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        skills: '',
        gender: '',
        position: '',
        status: '',
        salary: '',
        dob: '',
    });

    const handleChange = (e, data) => {
        const { name, value } = e.target;

        let newValue = value;
        // As we have declared the salary as number, we will have to click that bar for multiple time
        // to make it easy we can convert the string to number
        if (name === 'salary' && !isNaN(value)) {
            newValue = parseInt(value);
        }

        setFormData({ ...formData, [name]: data ? data : newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedRole = roles.find(
                (role) => role.name === formData.role
            );

            if (!selectedRole) {
                throw new Error('Selected role not found');
            }
            const formDataWithRoleId = {
                ...formData,
                role: selectedRole._id,
            };
            const res = await axios.post(
                'http://localhost:5000/api/profile/profiles',
                formDataWithRoleId
            );
            console.log('Employee  Profile created:', res.data);

            setFormData({
                role: '',
                firstName: '',
                lastName: '',
                phone: '',
                emailAddress: '',
                password: '',
                skills: '',
                gender: '',
                position: '',
                status: '',
                salary: '',
                dob: '',
            });
        } catch (error) {
            console.error('Error creating employee:', error);
            console.log(formData);
        }
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
                toast.error('Error fetching roles. Please try again.');
            }
        };

        fetchRoles();
    }, []);

    console.log(formData);
    if (loading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <i className="fa fa-spinner fa-spin text-5xl text-yellow-400"></i>
            </div>
        );
    }
    return (
        <Fragment>
            <div className="flex">
                <div className="w-1/4 flex">
                    <Sidebar />
                </div>
                <div className="flex-1 bg-white p-10 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-6">
                        Create Employee
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex-1 grid grid-cols-2 gap-8"
                    >
                        <div className="mb-4 col-span-2">
                            <label className="text-left block text-gray-700 text-sm font-bold mb-2">
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
                                    <option key={role._id} value={role.name}>
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                                value={formData.skills}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Gender
                            </label>

                            <div className="flex justify-start items-center">
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="Trainee">Trainee</option>
                                <option value="Regular-Employee">
                                    Regular Employee
                                </option>
                                <option value="Terminated">Terminated</option>
                                <option value="Absconded">Absconded</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="salary"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Salary
                            </label>
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <AddEducation
                            onChange={(educationData) =>
                                handleChange(null, educationData)
                            }
                        />

                        <AddExperience
                            onChange={(experienceData) =>
                                handleChange(null, experienceData)
                            }
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 mt-5 hover:text-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </Fragment>
    );
};

export default Profile;
