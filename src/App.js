import React, { Fragment } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth.components/Login.component';
import Register from './components/auth.components/Register.component';
import HomePage from './components/LandingPage.components/HomePage.component';
import Alert from './layout/Alert';
import LandingPage from './components/LandingPage.components/LandingPage.component';

const App = () => {
    return (
        <Provider store={store}>
            <Fragment>
                <Alert />
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<HomePage />} />
                    </Routes>
                </Router>
            </Fragment>
        </Provider>
    );
};

export default App;
