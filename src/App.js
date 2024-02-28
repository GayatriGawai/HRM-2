import React, { Fragment } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth.components/Login.component';
import Register from './components/auth.components/Register.component';
import HomePage from './components/LandingPage.components/HomePage.component';
import RoleForm from './components/roles_and_permissions/role.form';
import LandingPage from './components/LandingPage.components/LandingPage.component';
import User from './components/UserComponents/user.component';
import Profile from './components/ProfileComponent/profile.component';

const App = () => {
    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/roles" element={<RoleForm />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </Fragment>
        </Provider>
    );
};

export default App;
