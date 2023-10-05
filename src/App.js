import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';
import MetricsPanel from './pages/MetricsPanel';
import Profile from './pages/Profile';
import NoPage from './pages/NoPage';
import { Navibar } from './components/Navibar';
import { getToken, removeToken } from './models/token';

function checkAuth() {
    if (getToken()) {
        return true;
    } else {
        return false;
    }
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    const onLogin = () => {
        setIsAuthenticated(true);
    };

    const onLogout = () => {
        removeToken();
        setIsAuthenticated(false);
    };

    return (
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
                    path="profile"
                    element={
                        isAuthenticated ? (
                            <Profile />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
