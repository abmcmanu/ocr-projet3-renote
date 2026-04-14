import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';

const settingsLinks = [
    { to: '/settings/profile',    label: 'Profile' },
    { to: '/settings/password',   label: 'Password' },
    { to: '/settings/appearance', label: 'Appearance' },
];

const linkClass = ({ isActive }) =>
    `block rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
            ? 'bg-neutral-200/60 dark:bg-zinc-700/60 font-medium text-neutral-900 dark:text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-neutral-900 dark:hover:text-white'
    }`;

export default function SettingsLayout({ heading, subheading, children }) {
    return (
        <AppLayout>
            <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Inner settings sidebar */}
                    <nav className="md:w-[180px] shrink-0 flex flex-col gap-1">
                        <p className="mb-1 px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Settings
                        </p>
                        {settingsLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {heading && (
                            <div className="mb-6">
                                <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">{heading}</h1>
                                {subheading && <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{subheading}</p>}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}