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
import ProfileList from './components/ProfileComponent/ProfileList';
import setAuthToken from './utils/setAuthtoken';
import AddEducation from './components/ProfileComponent/AddEducation';
import AddExperience from './components/ProfileComponent/AddExperience';
import ViewProfile from './components/ProfileComponent/ViewProfile';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

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
                        <Route path="/profile" element={<ProfileList />} />
                        <Route
                            path="/profile/addProfile"
                            element={<Profile />}
                        />
                        <Route path="/add-edu" element={<AddEducation />} />
                        <Route path="/add-exp" element={<AddExperience />} />
                        <Route path="/getProfile/:id" element={<ViewProfile />} />{/*Use this while getting the details by the ID*/}
                    </Routes>
                </Router>
            </Fragment>
        </Provider>
    );
};

export default App;
