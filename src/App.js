import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './pages/Admin';
import Login from './pages/Login';
import MetricsPanel from './pages/MetricsPanel';
import Profile from './pages/Profile';
import NoPage from './pages/NoPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<MetricsPanel />} />
                <Route path="admin" element={<Admin />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path='login' element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
