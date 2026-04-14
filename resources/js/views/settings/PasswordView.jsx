import React, { useState } from 'react';
import SettingsLayout from './SettingsLayout';
import useAuthStore from '../../store/authStore';

const inputClass = 'w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white focus:ring-offset-1 dark:focus:ring-offset-zinc-900';
const labelClass = 'text-sm font-medium leading-tight text-neutral-900 dark:text-white';

export default function PasswordView() {
    const [current, setCurrent]   = useState('');
    const [password, setPassword] = useState('');
    const [conf, setConf]         = useState('');
    const [saved, setSaved]       = useState(false);
    const { updatePassword, loading, error } = useAuthStore();

    async function handleSubmit(e) {
        e.preventDefault();
        setSaved(false);
        try {
            await updatePassword(current, password, conf);
            setSaved(true);
            setCurrent(''); setPassword(''); setConf('');
            setTimeout(() => setSaved(false), 3000);
        } catch { /* error in store */ }
    }

    return (
        <SettingsLayout heading="Update password" subheading="Ensure your account is using a long, random password to stay secure">
            <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-lg">
                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="grid gap-2">
                    <label htmlFor="current_password" className={labelClass}>Current password</label>
                    <input id="current_password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)}
                        required autoComplete="current-password" className={inputClass} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="new_password" className={labelClass}>New password</label>
                    <input id="new_password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        required autoComplete="new-password" className={inputClass} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password_confirmation" className={labelClass}>Confirm password</label>
                    <input id="password_confirmation" type="password" value={conf} onChange={(e) => setConf(e.target.value)}
                        required autoComplete="new-password" className={inputClass} />
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={loading}
                        className="rounded-md bg-neutral-800 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors">
                        {loading ? 'Saving…' : 'Save'}
                    </button>
                    {saved && <span className="text-sm text-green-600 dark:text-green-400">Saved.</span>}
                </div>
            </form>
        </SettingsLayout>
    );
}