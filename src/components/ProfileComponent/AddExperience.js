import React, { Fragment } from 'react';

const ExperienceForm = ({
    experience,
    handleChange,
    addExperience,
    removeExperience,
}) => {
    return (
        <Fragment>
            <div className="bg-white p-4 mb-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Add Experience</h2>
                {experience.map((exp, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-4"
                        data-key="experience"
                    >
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={exp.title}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Company
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={exp.location}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={exp.description}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                From
                            </label>
                            <input
                                type="date"
                                name="from"
                                value={exp.from}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                To
                            </label>
                            <input
                                type="date"
                                name="to"
                                value={exp.to}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Currently Working?
                            </label>
                            <input
                                type="checkbox"
                                name="current"
                                checked={exp.current}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => removeExperience(index)}
                            className="text-red-500 text-sm flex justify-end font-semibold"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addExperience}
                    className="mt-5 text-yellow-500 text-sm font-semibold flex justify-end"
                >
                    Add Experience
                </button>
            </div>
        </Fragment>
    );
};

export default ExperienceForm;
