import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import LoginView from './LoginView';
import DashboardView from './DashboardView';

function ProtectedRoute({ children }) {
    const token = useAuthStore((s) => s.token);
    return token ? children : <Navigate to="/" replace />;
}

export default function App() {
    const initFromStorage = useAuthStore((s) => s.initFromStorage);

    useEffect(() => {
        initFromStorage();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardView />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}