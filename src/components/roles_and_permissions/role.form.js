import React, { useState } from 'react';
import Module from '../../../dbModels/modulesDB';

const RoleForm = () => {
    const [formData, setFormData] = useState({
        name: '',
    });
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit} className="mt-4">
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Role
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Role Name"
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default RoleForm;
