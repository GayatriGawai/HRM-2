import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Sidebar from '../Navigation/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoleForm = () => {
    const [module, setModule] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        permissions: [],
    });

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/module/get'
                );
                setModule(response.data);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    permissions: response.data.map((item) => ({
                        moduleId: item._id,
                        actions: [],
                    })),
                }));
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };
        fetchModules();
    }, []);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePermissionChange = (e, moduleId, action) => {
        const checked = e.target.checked;

        setFormData((prevFormData) => {
            const updatedPermissions = prevFormData.permissions.map((item) => {
                if (item.moduleId === moduleId) {
                    if (checked) {
                        const updatedActions = checked
                            ? [...item.actions, action]
                            : item.actions.filter((a) => a !== action);

                        return { ...item, actions: updatedActions };
                    }
                }
                return item;
            });
            return {
                ...prevFormData,
                permissions: updatedPermissions,
            };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const filteredPermissions = formData.permissions.filter(
                (permission) => permission.actions.length > 0
            );

            const permissionsData = filteredPermissions.map((permission) => ({
                module_id: permission.moduleId,
                actions: permission.actions,
            }));

            const response = await axios.post(
                'http://localhost:5000/api/permission/role',
                {
                    name: formData.name,
                    permissions: permissionsData,
                }
            );
            toast(response.data.message);

            setFormData({
                name: '',
                permissions: [],
            });
        } catch (error) {
            console.error('Error creating role:', error);
            toast.error('Error creating role');
        }
    };

    return (
        <Fragment>
            <div className="flex">
                <div className="w-1/4 flex">
                    <Sidebar />
                </div>
                <div className="flex-1 bg-white p-10 flex flex-col">
                    <form
                        onSubmit={onSubmit}
                        className="flex-grow px-8 py-10 bg-white rounded-md shadow-md"
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
                                value={formData.name}
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
                            <ul className="mb-8">
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
                                                    onChange={(e) =>
                                                        handlePermissionChange(
                                                            e,
                                                            item._id,
                                                            'create'
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-xs">
                                                    Create
                                                </span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-3 w-3 text-yellow-600"
                                                    onChange={(e) =>
                                                        handlePermissionChange(
                                                            e,
                                                            item._id,
                                                            'read'
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-xs">
                                                    Read
                                                </span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-3 w-3 text-yellow-600"
                                                    onChange={(e) =>
                                                        handlePermissionChange(
                                                            e,
                                                            item._id,
                                                            'update'
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-xs">
                                                    Update
                                                </span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-3 w-3 text-yellow-600"
                                                    onChange={(e) =>
                                                        handlePermissionChange(
                                                            e,
                                                            item._id,
                                                            'delete'
                                                        )
                                                    }
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

                        <div className="flex justify-end -mt-2">
                            <button
                                type="submit"
                                className="inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default RoleForm;
