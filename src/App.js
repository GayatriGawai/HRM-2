import store from '../../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../component/authentication/Login.compo';

const App = () => {
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    </Provider>;
};

export default App;
