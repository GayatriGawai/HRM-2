import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

const AddEducation = ({ onAddEducation, onClose }) => {
    // State to manage form data
    const [education, setEducation] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    // Function to handle changes in form fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEducation({
            ...education,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEducation(education);
        // You can clear the form fields here if needed
        setEducation({
            university: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
        });
    };
    return (
        <Fragment>
            {/* Education form */}
            <div className="bg-white p-4 mb-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Add Education</h2>
                <form onSubmit={handleSubmit}></form>
                <div className="grid grid-cols-2 gap-4">
                    {/* School input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            School
                        </label>
                        <input
                            type="text"
                            name="school"
                            value={education.school}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Degree input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Degree
                        </label>
                        <input
                            type="text"
                            name="degree"
                            value={education.degree}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Field of study input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Field of Study
                        </label>
                        <input
                            type="text"
                            name="fieldofstudy"
                            value={education.fieldofstudy}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Description input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={education.description}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        ></textarea>
                    </div>
                    {/* From date input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From
                        </label>
                        <input
                            type="date"
                            name="from"
                            value={education.from}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* To date input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To
                        </label>
                        <input
                            type="date"
                            name="to"
                            value={education.to}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Currently studying checkbox */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currently Studying?
                        </label>
                        <input
                            type="checkbox"
                            name="current"
                            checked={education.current}
                            onChange={handleChange}
                            className="mt-1 p-2 block rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Button to add education */}
                    <div className="col-span-2 flex justify-between">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-yellow-500 justify-start hover:bg-yellow-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Education
                        </button>

                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 flex justify-end text-black rounded-md hover:bg-gray-300 focus:outline-none focus:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddEducation;
