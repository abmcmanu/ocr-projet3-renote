import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import useAuthStore from '../store/authStore';

export default function VerifyEmailView() {
    const [status, setStatus]   = useState(null);
    const [loading, setLoading] = useState(false);
    const { resendVerification, logout } = useAuthStore();
    const navigate = useNavigate();

    async function handleResend() {
        setLoading(true);
        await resendVerification();
        setStatus('A new verification link has been sent to your email address.');
        setLoading(false);
    }

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    return (
        <AuthLayout>
            <div className="mt-4 flex flex-col gap-6">
                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Please verify your email address by clicking on the link we just emailed to you.
                </p>

                {status && (
                    <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">{status}</p>
                )}

                <div className="flex flex-col items-center gap-3">
                    <button onClick={handleResend} disabled={loading}
                        className="w-full rounded-md bg-neutral-800 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors">
                        {loading ? 'Sending…' : 'Resend verification email'}
                    </button>
                    <button onClick={handleLogout} className="text-sm text-zinc-500 dark:text-zinc-400 underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white">
                        Log out
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}