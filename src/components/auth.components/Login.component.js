import React, { Fragment, useState, useEffect } from 'react';
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
        role: '',
    });

    const { email, password, role } = formData;
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/roles/getRoles'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }
                const rolesData = await response.json();
                setRoles(rolesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching roles:', error.message);
                setAlert('Error fetching roles. Please try again.', 'danger');
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateLogin = async (e) => {
        e.preventDefault();
        login(email, password, role);

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        role,
                    }),
                }
            );

            const responseData = await response.json();
            console.log(responseData);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            const { token } = responseData;
            localStorage.setItem('jwtSecret', token);
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Error during login. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <div className="container mx-auto mt-16">
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
                                name="role"
                                value={role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role._id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
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
