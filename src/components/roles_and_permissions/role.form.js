import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const RoleForm = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const [module, setModule] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/module/get'
                );
                setModule(response.data);
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };
        fetchModules();
    }, []);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <Fragment>
            <div className="flex justify-center items-center h-screen">
                <form
                    onSubmit={onSubmit}
                    className="container max-w-screen-lg px-8 py-10 bg-white rounded-md shadow-md"
                >
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Roles:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={onChange}
                            className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                            placeholder="Role Name"
                            required
                        />
                    </div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Modules:
                    </label>
                    <div>
                        <ul>
                            {module.map((item) => (
                                <li key={item._id} className="mt-4">
                                    <span className="text-black text-sm font-semibold">
                                        {item.name}
                                    </span>
                                    <div className="ml-4 space-x-8 mt-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-3 w-3 text-yellow-600"
                                            />
                                            <span className="ml-2 text-xs ">
                                                Create
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-3 w-3 text-yellow-600"
                                            />
                                            <span className="ml-2 text-xs">
                                                Read
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-3 w-3 text-yellow-600"
                                            />
                                            <span className="ml-2 text-xs">
                                                Update
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-3 w-3 text-yellow-600"
                                            />
                                            <span className="ml-2 text-xs">
                                                Delete
                                            </span>
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default RoleForm;
