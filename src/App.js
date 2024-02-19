import React, { Fragment } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth.components/Login.component';
import HomePage from './components/LandingPage.components/LandingPage.component';

const App = () => {
    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </Fragment>
        </Provider>
    );
};

export default App;
