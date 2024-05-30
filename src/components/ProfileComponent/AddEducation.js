import React, { Fragment } from 'react';

const EducationForm = ({
    education,
    handleChange,
    addEducation,
    removeEducation,
}) => {
    return (
        <Fragment>
            <div className="bg-white p-4 mb-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Add Education</h2>
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-4"
                        data-key="education"
                    >
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                University
                            </label>
                            <input
                                type="text"
                                name="university"
                                value={edu.university}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Degree
                            </label>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Field of Study
                            </label>
                            <input
                                type="text"
                                name="fieldofstudy"
                                value={edu.fieldofstudy}
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
                                value={edu.description}
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
                                value={edu.from}
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
                                value={edu.to}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="flex text-sm font-medium text-gray-700 mb-1">
                                Currently Studying?
                            </label>
                            <input
                                type="checkbox"
                                name="current"
                                checked={edu.current}
                                onChange={(e) => handleChange(e, index)}
                                className="mt-1 p-2 flex rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => removeEducation(index)}
                            className="text-red-500 text-sm flex justify-end font-semibold"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addEducation}
                    className="mt-5 text-yellow-500 text-sm font-semibold flex justify-end"
                >
                    Add Education
                </button>
            </div>
        </Fragment>
    );
};

export default EducationForm;
