import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import useAuthStore from '../store/authStore';

const inputClass = 'w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white focus:ring-offset-1 dark:focus:ring-offset-zinc-900';
const labelClass = 'text-sm font-medium leading-tight text-neutral-900 dark:text-white';

export default function RegisterView() {
    const [name, setName]                     = useState('');
    const [email, setEmail]                   = useState('');
    const [password, setPassword]             = useState('');
    const [passwordConf, setPasswordConf]     = useState('');
    const navigate                            = useNavigate();
    const { register, loading, error, token } = useAuthStore();

    useEffect(() => {
        if (token) navigate('/dashboard', { replace: true });
    }, [token]);

    async function handleSubmit(e) {
        e.preventDefault();
        await register(name, email, password, passwordConf);
    }

    return (
        <AuthLayout>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Create an account</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Enter your details below to create your account</p>
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <label htmlFor="name" className={labelClass}>Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                            required autoFocus autoComplete="name" placeholder="Full name" className={inputClass} />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className={labelClass}>Email address</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            required autoComplete="email" placeholder="email@example.com" className={inputClass} />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password" className={labelClass}>Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            required autoComplete="new-password" placeholder="Password" className={inputClass} />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password_confirmation" className={labelClass}>Confirm password</label>
                        <input id="password_confirmation" type="password" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)}
                            required autoComplete="new-password" placeholder="Confirm password" className={inputClass} />
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" disabled={loading}
                            className="w-full rounded-md bg-neutral-800 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors">
                            {loading ? 'Creating account…' : 'Create account'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Already have an account?{' '}
                    <Link to="/" className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-white">Log in</Link>
                </p>
            </div>
        </AuthLayout>
    );
}