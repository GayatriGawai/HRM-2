import React, { useState } from 'react';

const AddEducation = ({ onAddEducation }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEducation(formData);
        // Reset form fields after submission
        setFormData({
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
        });
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Add Education</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="school" className="block font-medium mb-1">
                        School:
                    </label>
                    <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="degree" className="block font-medium mb-1">
                        Degree:
                    </label>
                    <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="fieldofstudy"
                        className="block font-medium mb-1"
                    >
                        Field of Study:
                    </label>
                    <input
                        type="text"
                        id="fieldofstudy"
                        name="fieldofstudy"
                        value={formData.fieldofstudy}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="from" className="block font-medium mb-1">
                        From:
                    </label>
                    <input
                        type="date"
                        id="from"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="to" className="block font-medium mb-1">
                        To:
                    </label>
                    <input
                        type="date"
                        id="to"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="current"
                        className="inline-flex items-center"
                    >
                        <input
                            type="checkbox"
                            id="current"
                            name="current"
                            checked={formData.current}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-500"
                        />
                        <span className="ml-2 font-medium">Current</span>
                    </label>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block font-medium mb-1"
                    >
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Add Education
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEducation;
