import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/* Logo SVG — identique à app-logo-icon.blade.php */
function AppLogoIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 42" className={className}>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Arial, sans-serif"
                fontSize="28"
                fill="currentColor"
            >
                R
            </text>
        </svg>
    );
}

export default function LoginView() {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const navigate                = useNavigate();
    const { login, loading, error, token } = useAuthStore();

    /* redirect si déjà connecté */
    useEffect(() => {
        if (token) navigate('/dashboard', { replace: true });
    }, [token]);

    async function handleSubmit(e) {
        e.preventDefault();
        await login(email, password);
    }

    /* ── Layout identique à auth/simple.blade.php ─────────────────────────
       body : min-h-screen bg-white antialiased dark:bg-linear-to-b dark:from-neutral-950 dark:to-neutral-900
       wrapper : flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10
       inner   : flex w-full max-w-sm flex-col gap-2
    ──────────────────────────────────────────────────────────────────────── */
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-white antialiased dark:bg-gradient-to-b dark:from-neutral-950 dark:to-neutral-900">
            <div className="flex w-full max-w-sm flex-col gap-2">

                {/* Logo — identique au <a> centré du simple layout */}
                <a href="/" className="flex flex-col items-center gap-2 font-medium mb-1">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md">
                        <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                    </span>
                    <span className="sr-only">Renote</span>
                </a>

                <div className="flex flex-col gap-6">

                    {/* Auth header — identique à x-auth-header */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                            Log in to your account
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Enter your email and password below to log in
                        </p>
                    </div>

                    {/* Erreur */}
                    {error && (
                        <div className="text-sm text-red-500 text-center">{error}</div>
                    )}

                    {/* Formulaire — identique à la <form> de login.blade.php */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* flux:input email */}
                        <div className="grid gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-tight text-neutral-900 dark:text-white"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="email@example.com"
                                className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white focus:ring-offset-1 dark:focus:ring-offset-zinc-900"
                            />
                        </div>

                        {/* flux:input password */}
                        <div className="relative grid gap-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-tight text-neutral-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="Password"
                                className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white focus:ring-offset-1 dark:focus:ring-offset-zinc-900"
                            />
                        </div>

                        {/* flux:button variant="primary" — pleine largeur */}
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-md bg-neutral-800 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors"
                            >
                                {loading ? 'Logging in…' : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}