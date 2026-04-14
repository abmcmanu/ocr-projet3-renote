import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { forgotPassword } from '../services/authService';

const inputClass = 'w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white focus:ring-offset-1 dark:focus:ring-offset-zinc-900';

export default function ForgotPasswordView() {
    const [email, setEmail]     = useState('');
    const [status, setStatus]   = useState(null);
    const [error, setError]     = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStatus(null);
        try {
            const result = await forgotPassword(email);
            setStatus(result.message);
        } catch (err) {
            setError(err.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Forgot password</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Enter your email to receive a password reset link</p>
                </div>

                {status && <p className="text-sm text-green-600 dark:text-green-400 text-center font-medium">{status}</p>}
                {error  && <p className="text-sm text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium leading-tight text-neutral-900 dark:text-white">
                            Email address
                        </label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            required autoFocus placeholder="email@example.com" className={inputClass} />
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full rounded-md bg-neutral-800 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors">
                        {loading ? 'Sending…' : 'Email password reset link'}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Or, return to{' '}
                    <Link to="/" className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white">log in</Link>
                </p>
            </div>
        </AuthLayout>
    );
}