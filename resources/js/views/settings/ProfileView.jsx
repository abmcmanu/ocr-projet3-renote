import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayout from './SettingsLayout';
import useAuthStore from '../../store/authStore';

const inputClass = 'w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:focus:ring-white focus:ring-offset-1 dark:focus:ring-offset-zinc-900';
const labelClass = 'text-sm font-medium leading-tight text-neutral-900 dark:text-white';

export default function ProfileView() {
    const { user, updateProfile, deleteAccount, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const [name, setName]         = useState(user?.name ?? '');
    const [email, setEmail]       = useState(user?.email ?? '');
    const [saved, setSaved]       = useState(false);
    const [showDelete, setShowDelete]   = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError]       = useState(null);

    useEffect(() => {
        if (user) { setName(user.name); setEmail(user.email); }
    }, [user]);

    async function handleSave(e) {
        e.preventDefault();
        setSaved(false);
        try {
            await updateProfile(name, email);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch { /* error in store */ }
    }

    async function handleDelete(e) {
        e.preventDefault();
        setDeleteError(null);
        try {
            await deleteAccount(deletePassword);
            navigate('/');
        } catch (err) {
            setDeleteError(err.response?.data?.message ?? err.message);
        }
    }

    return (
        <SettingsLayout heading="Profile" subheading="Update your name and email address">
            <form onSubmit={handleSave} className="space-y-6 max-w-lg">
                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="grid gap-2">
                    <label htmlFor="name" className={labelClass}>Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                        required autoComplete="name" className={inputClass} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        required autoComplete="email" className={inputClass} />
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={loading}
                        className="rounded-md bg-neutral-800 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors">
                        {loading ? 'Saving…' : 'Save'}
                    </button>
                    {saved && <span className="text-sm text-green-600 dark:text-green-400">Saved.</span>}
                </div>
            </form>

            {/* Delete account section */}
            <div className="mt-10 space-y-4 max-w-lg">
                <div>
                    <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Delete account</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Delete your account and all of its resources</p>
                </div>
                {!showDelete ? (
                    <button onClick={() => setShowDelete(true)}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
                        Delete account
                    </button>
                ) : (
                    <form onSubmit={handleDelete} className="space-y-4 border border-red-200 dark:border-red-900 rounded-xl p-4">
                        <p className="text-sm text-neutral-900 dark:text-white font-medium">
                            Are you sure? This action is irreversible. Enter your password to confirm.
                        </p>
                        {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}
                        <div className="grid gap-2">
                            <label htmlFor="delete_password" className={labelClass}>Password</label>
                            <input id="delete_password" type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)}
                                required className={inputClass} />
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setShowDelete(false)}
                                className="rounded-md border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" disabled={loading}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors">
                                {loading ? 'Deleting…' : 'Delete account'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </SettingsLayout>
    );
}