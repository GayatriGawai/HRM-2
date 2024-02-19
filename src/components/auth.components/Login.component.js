import React, { Fragment } from 'react';

const Login = () => {
    console.log('Olla from Login');
    return (
        <Fragment>
            <div className="container mx-auto mt-16">
                <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 font-bold">
                        Sign In
                    </h2>

                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter your Email"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    </form>
                </section>
            </div>
        </Fragment>
    );
};

export default Login;
