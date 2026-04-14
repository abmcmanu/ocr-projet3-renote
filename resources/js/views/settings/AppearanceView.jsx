import React, { useState, useEffect } from 'react';
import SettingsLayout from './SettingsLayout';

const STORAGE_KEY = 'renote_appearance';

function applyAppearance(value) {
    const root = document.documentElement;
    if (value === 'dark') {
        root.classList.add('dark');
    } else if (value === 'light') {
        root.classList.remove('dark');
    } else {
        // system
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
    }
}

export default function AppearanceView() {
    const [appearance, setAppearance] = useState(
        () => localStorage.getItem(STORAGE_KEY) ?? 'dark'
    );

    function handleChange(value) {
        setAppearance(value);
        localStorage.setItem(STORAGE_KEY, value);
        applyAppearance(value);
    }

    const options = [
        { value: 'light',  label: 'Light' },
        { value: 'dark',   label: 'Dark' },
        { value: 'system', label: 'System' },
    ];

    return (
        <SettingsLayout heading="Appearance" subheading="Update the appearance settings for your account">
            <div className="mt-6 flex gap-2">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleChange(opt.value)}
                        className={`rounded-md px-4 py-2 text-sm font-medium border transition-colors ${
                            appearance === opt.value
                                ? 'bg-neutral-800 dark:bg-white text-white dark:text-neutral-800 border-neutral-800 dark:border-white'
                                : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </SettingsLayout>
    );
}