import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

import LoginView          from './LoginView';
import RegisterView       from './RegisterView';
import ForgotPasswordView from './ForgotPasswordView';
import ResetPasswordView  from './ResetPasswordView';
import VerifyEmailView    from './VerifyEmailView';
import DashboardView      from './DashboardView';
import ProfileView        from './settings/ProfileView';
import PasswordView       from './settings/PasswordView';
import AppearanceView     from './settings/AppearanceView';

function ProtectedRoute({ children }) {
    const token = useAuthStore((s) => s.token);
    return token ? children : <Navigate to="/" replace />;
}

export default function App() {
    const { fetchUser, token } = useAuthStore();

    // Restaure l'objet user depuis l'API au chargement si un token existe.
    useEffect(() => {
        if (token) fetchUser();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* Auth publique */}
                <Route path="/"                  element={<LoginView />} />
                <Route path="/register"          element={<RegisterView />} />
                <Route path="/forgot-password"   element={<ForgotPasswordView />} />
                <Route path="/reset-password"    element={<ResetPasswordView />} />
                <Route path="/verify-email"      element={<VerifyEmailView />} />

                {/* App protégée */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><DashboardView /></ProtectedRoute>
                } />
                <Route path="/settings/profile" element={
                    <ProtectedRoute><ProfileView /></ProtectedRoute>
                } />
                <Route path="/settings/password" element={
                    <ProtectedRoute><PasswordView /></ProtectedRoute>
                } />
                <Route path="/settings/appearance" element={
                    <ProtectedRoute><AppearanceView /></ProtectedRoute>
                } />

                {/* Redirect /settings → /settings/profile */}
                <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}