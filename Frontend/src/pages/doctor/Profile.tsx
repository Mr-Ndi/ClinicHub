import { useTheme } from '../../context/ThemeContext';

const Profile = () => {
    const { theme, toggleTheme } = useTheme();
    const darkMode = theme === 'dark';

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Account Settings</h1>

            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex items-center gap-6">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-3xl">
                    SJ
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dr. Sarah Johnson</h2>
                    <p className="text-slate-500 dark:text-slate-400">Cardiologist</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">sarah.johnson@clinichub.com</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Security Settings */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Security</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors mt-2">
                            Update Password
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
