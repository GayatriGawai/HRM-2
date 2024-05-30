import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth.actions/register.action';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        roles: 'employee',
    });

    const { email, password, confirmPassword, roles } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            dispatch(register(email, password, roles));
        }
        navigate('/login');
    };

    return (
        <Fragment>
            <div className="container bg-blue-600 opacity-80 mx-auto mt-16">
                <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-left text-2xl font-semibold mb-4 font-bold">
                        Sign up
                    </h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="text-left block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-left block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-left block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-left block text-gray-700 text-sm font-bold mb-2">
                                Role
                            </label>
                            <select
                                name="roles"
                                value={roles}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <p className="my-1 pb-5 text-xs font-semibold text-left">
                            Don't have an account?
                            <Link
                                to="/login"
                                className="hover:text-blue-400 hover:underline "
                            >
                                {'  '}
                                Sign In
                            </Link>
                        </p>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 font-bold py-2 px-4 rounded"
                        >
                            Register
                        </button>
                    </form>
                </section>
            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default connect(null, { register })(Register);
