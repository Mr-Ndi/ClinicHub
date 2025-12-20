import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

interface DoctorProfileData {
    user_id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    specialization?: string;
    license_number?: string;
    profile_image?: string | null;
}

const Profile = () => {
    const { theme, toggleTheme } = useTheme();
    const { user: authUser } = useAuth();
    const darkMode = theme === 'dark';
    
    const [profile, setProfile] = useState<DoctorProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.doctor.getProfile();
            setProfile(data);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load profile');
            // Fallback to auth user data if API fails
            if (authUser) {
                setProfile({
                    user_id: authUser.user_id,
                    name: authUser.name,
                    email: authUser.email,
                    phone: authUser.phone || '',
                    address: authUser.address || '',
                    profile_image: authUser.profile_image || null,
                });
            }
        } finally {
            setLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        try {
            setSaving(true);
            // Assuming there's a password update endpoint
            await api.doctor.updateProfile({
                current_password: formData.currentPassword,
                new_password: formData.newPassword,
            });
            toast.success('Password updated successfully!');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            toast.error(error.message || 'Failed to update password');
        } finally {
            setSaving(false);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return 'D';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-500 dark:text-slate-400">Loading profile...</div>
                </div>
            </div>
        );
    }

    const displayProfile = profile || authUser;
    if (!displayProfile) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="text-center text-slate-500 dark:text-slate-400">No profile data available</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Account Settings</h1>

            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex items-center gap-6">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-3xl overflow-hidden">
                    {(displayProfile as any).profile_image ? (
                        <img src={(displayProfile as any).profile_image} alt={displayProfile.name} className="w-full h-full object-cover" />
                    ) : (
                        getInitials(displayProfile.name)
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{displayProfile.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 capitalize">{(displayProfile as any).specialization || 'Doctor'}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{displayProfile.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Security Settings */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Security</h3>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                            <input 
                                type="password" 
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                required
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                            <input 
                                type="password" 
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                required
                                minLength={6}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                                minLength={6}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition-colors mt-2"
                        >
                            {saving ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>

                {/* Preferences */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-fit">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Preferences</h3>

                    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates about appointments</p>
                        </div>
                        <button className="w-12 h-6 rounded-full p-1 bg-blue-600 transition-colors">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
