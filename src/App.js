import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';
import MetricsPanel from './pages/MetricsPanel';
import Profile from './pages/Profile';
import NoPage from './pages/NoPage';
import SingleMetrics from './pages/SingleMetrics';
import TableView from './pages/TableView';
import ForgetPasswordSendEmail from './pages/user_auth/ForgetPasswordSendEmail';
import { Navibar } from './components/Navibar';
import { removeToken, isAdmin } from './models/token';
import { ChangePassword } from './pages/user_auth/ChangePassword';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log(isAuthenticated)
        isAdmin()
            .then(result => {
                setIsAuthenticated(result);
                if (result === false) {
                    removeToken();
                }
            })
            .catch(error => {
                console.error('Error checking authentication:', error);
            });
    }, []);

    const onLogin = () => {
        setIsAuthenticated(true);
    };

    const onLogout = () => {
        removeToken();
        setIsAuthenticated(false);
    };

    return (
        <div className='App'>
            <BrowserRouter>
                <Navibar isAuthenticated={isAuthenticated} onLogout={onLogout} />
                <Routes>
                    <Route
                        path=""
                        element={
                            isAuthenticated ? (
                                <MetricsPanel />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="single"
                        element={
                            isAuthenticated ? (
                                <SingleMetrics />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="tables"
                        element={isAuthenticated ? <TableView /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="admin"
                        element={
                            isAuthenticated ? (
                                <Admin />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="login"
                        element={<Login onLogin={onLogin} />}
                    />
                    <Route
                        path="forgetPassword"
                        element={
                            !isAuthenticated && (<ForgetPasswordSendEmail />)} />
                    <Route
                        path="profile"
                        element={
                            isAuthenticated ? (
                                <Profile />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="change-password"
                        element={
                            isAuthenticated &&
                            <ChangePassword />
                        }
                    />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
