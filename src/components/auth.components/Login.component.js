import React, { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth.actions/login.action';

const Login = ({ login }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        roles: '',
    });

    const { email, password, roles } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateLogin = async (e) => {
        e.preventDefault();
        login(email, password, roles);

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        roles: formData.roles,
                    }),
                }
            );

            const responseData = await response.json(); // Parse response data once
            console.log(44, responseData);
            if (!response.ok) {
                throw new Error(responseData.message); // Access error message from parsed data
            }

            const { token } = responseData; // Access response data

            localStorage.setItem('jwtSecret', token);
            navigate('/home');

            setAlert('Logged in successfully', 'success');
        } catch (error) {
            console.error('Error during login:', error.message);
            setAlert('Error during login. Please try again.', 'danger');
        }
    };

    return (
        <Fragment>
            <div className="container bg bg-yellow-600 mx-auto mt-16">
                <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 font-bold text-left">
                        Sign In
                    </h2>

                    <form onSubmit={validateLogin} className="flex flex-col">
                        <div className="mb-4">
                            <label className=" text-left block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
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
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter your password"
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
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <p className="my-1 pb-5 text-xs font-semibold text-left">
                            Already have an account?
                            <Link
                                to="/register"
                                className="hover:text-blue-400 hover:underline "
                            >
                                {'  '}
                                Sign Up
                            </Link>
                        </p>
                        <button
                            type="submit"
                            className="bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 rounded"
                            style={{ marginLeft: 'auto' }}
                        >
                            Login
                        </button>
                    </form>
                </section>
            </div>
        </Fragment>
    );
};

export default connect(null, { login })(Login);
