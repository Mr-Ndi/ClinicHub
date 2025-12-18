import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboardHome = () => {
    const [stats, setStats] = useState([
        { label: 'Total Doctors', value: '0', change: '+0', color: 'bg-blue-500' },
        { label: 'Total Patients', value: '0', change: '+0', color: 'bg-green-500' },
        { label: 'Appointments Today', value: '0', change: '+0', color: 'bg-amber-500' },
        { label: 'Total Revenue', value: '$0', change: '+0%', color: 'bg-purple-500' },
    ]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [doctors, patients, appointments] = await Promise.all([
                    api.admin.getDoctors(),
                    api.admin.getPatients(),
                    api.admin.getAllAppointments().catch(() => []) // Return empty array if endpoint fails
                ]);

                const today = new Date().toISOString().split('T')[0];
                const appointmentsToday = Array.isArray(appointments) 
                    ? appointments.filter((app: any) => app.appointment_date?.startsWith(today)).length 
                    : 0;

                setStats([
                    { label: 'Total Doctors', value: doctors.length.toString(), change: '+0', color: 'bg-blue-500' },
                    { label: 'Total Patients', value: patients.length.toString(), change: '+0', color: 'bg-green-500' },
                    { label: 'Appointments Today', value: appointmentsToday.toString(), change: '+0', color: 'bg-amber-500' },
                    { label: 'Total Revenue', value: '$0', change: '+0%', color: 'bg-purple-500' }, // Revenue logic not implemented yet
                ]);
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
                toast.error('Failed to load dashboard statistics');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const [recentActivity] = useState<Array<{ user: string; action: string; time: string }>>([]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">System Overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color} bg-opacity-90`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            </div>
                            {/* Change indicator removed as we don't have historical data yet */}
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{isLoading ? '...' : stat.value}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">System Activity</h2>
                    <div className="space-y-6">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 pb-6 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold flex-shrink-0">
                                        {item.user[0]}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-medium">{item.user}</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">{item.action}</p>
                                    </div>
                                    <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{item.time}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                <p>No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        <button className="w-full py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Add New Doctor
                        </button>
                        <button className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Generate Report
                        </button>
                        <button className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            System Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
