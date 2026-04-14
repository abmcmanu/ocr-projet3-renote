import React from 'react';

function AppLogoIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 42" className={className}>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
                fontFamily="Arial, sans-serif" fontSize="28" fill="currentColor">R</text>
        </svg>
    );
}

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-white antialiased dark:bg-gradient-to-b dark:from-neutral-950 dark:to-neutral-900">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="/" className="flex flex-col items-center gap-2 font-medium mb-1">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md">
                        <AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
                    </span>
                    <span className="sr-only">Renote</span>
                </a>
                {children}
            </div>
        </div>
    );
}