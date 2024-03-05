import React, { Fragment, useState } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';

const AddExperience = ({ onAddExperience, onClose, id }) => {
    const [experience, setExperience] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setExperience({
            ...experience,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtSecret');

            const roleId = new mongoose.Types.ObjectId(experience.role); // Change formData to experience
            const dataToSend = { ...experience, role: roleId }; // Change formData to experience

            const response = await axios.post(
                `http://localhost:5000/api/expDetails/addExp/${id}`, // Add id
                dataToSend,
                {
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Employee Profile created:', response.data);

            // You can clear the form fields here if needed
            setExperience({
                title: '',
                company: '',
                location: '',
                from: '',
                to: '',
                current: false,
                description: '',
            });
        } catch (error) {
            console.error('Error creating employee profile:', error);
        }
    };

    return (
        <Fragment>
            <div className="bg-white p-4 mb-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Add Experience</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={experience.title}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company:
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={experience.company}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location:
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={experience.location}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={experience.description}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From:
                            </label>
                            <input
                                type="date"
                                id="from"
                                name="from"
                                value={experience.from}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To:
                            </label>
                            <input
                                type="date"
                                id="to"
                                name="to"
                                value={experience.to}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current employee?
                                <input
                                    type="checkbox"
                                    id="current"
                                    name="current"
                                    checked={experience.current}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                />
                            </label>
                        </div>

                        <div className="col-span-2 flex justify-between">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="bg-yellow-500 justify-start hover:bg-yellow-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Experience
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 flex justify-end text-black rounded-md hover:bg-gray-300 focus:outline-none focus:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default AddExperience;
