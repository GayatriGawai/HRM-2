import React, { useState } from 'react';

const AddExperience = ({ onAddExperience }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const { title, company, location, from, to, current, description } =
        formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form data here if needed
        onAddExperience(formData);
        // Reset form data after submission
        setFormData({
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
        });
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Add Experience</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required
                    />
                </div>
                {/* Other input fields for company, location, from, to, current, description */}
                {/* Example: */}
                {/* <div className="mb-4">
                    <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                    <input type="text" id="company" name="company" value={company} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
                </div> */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="current"
                        name="current"
                        checked={current}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="current" className="text-gray-700">
                        Currently Working
                    </label>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Experience
                </button>
            </form>
        </div>
    );
};

export default AddExperience;
