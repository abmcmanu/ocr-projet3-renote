import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function AppLogoIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 42" className={className}>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
                fontFamily="Arial, sans-serif" fontSize="28" fill="currentColor">R</text>
        </svg>
    );
}

function IconHome() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function IconLogout() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ').slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
        isActive
            ? 'bg-neutral-200/60 dark:bg-zinc-700/60 text-neutral-900 dark:text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-neutral-900 dark:hover:text-white'
    }`;

export default function AppLayout({ children }) {
    const navigate   = useNavigate();
    const { user, logout } = useAuthStore();
    const initials   = getInitials(user?.name);

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-zinc-800">

            {/* ── Sidebar desktop ── */}
            <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 sticky top-0 h-screen overflow-y-auto">
                <div className="p-4 pb-2">
                    <NavLink to="/dashboard" className="me-5 flex items-center gap-2 font-medium text-neutral-900 dark:text-white">
                        <AppLogoIcon className="size-8 fill-current text-black dark:text-white" />
                        <span className="font-semibold text-sm">Renote</span>
                    </NavLink>
                </div>

                <nav className="flex-1 px-3 py-2">
                    <p className="mb-1 px-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Platform
                    </p>
                    <NavLink to="/dashboard" className={navLinkClass}>
                        <IconHome />
                        Dashboard
                    </NavLink>
                </nav>

                <div className="mt-auto border-t border-zinc-200 dark:border-zinc-700 p-3">
                    <div className="flex items-center gap-2 px-1 py-1.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-sm font-semibold text-black dark:text-white">
                            {initials}
                        </span>
                        <div className="grid flex-1 min-w-0 leading-tight">
                            <span className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{user?.name ?? '—'}</span>
                            <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user?.email ?? ''}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-1 w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                        <IconLogout />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* ── Header mobile ── */}
            <header className="lg:hidden fixed inset-x-0 top-0 z-10 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 h-12">
                <NavLink to="/dashboard" className="flex items-center gap-2 font-medium text-neutral-900 dark:text-white">
                    <AppLogoIcon className="size-6 fill-current text-black dark:text-white" />
                    <span className="font-semibold text-sm">Renote</span>
                </NavLink>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <IconLogout />
                    Log Out
                </button>
            </header>

            {/* ── Contenu ── */}
            <main className="flex-1 p-6 md:p-10 pt-6 max-lg:pt-16">
                {children}
            </main>
        </div>
    );
}