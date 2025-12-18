


import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const DashboardHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState([
        { label: 'Total Patients', value: '0', change: '+0%', color: 'bg-blue-500' },
        { label: 'Appointments Today', value: '0', change: '+0%', color: 'bg-green-500' },
        { label: 'Pending Reports', value: '0', change: '-0%', color: 'bg-amber-500' },
        { label: 'Total Earnings', value: '$0', change: '+0%', color: 'bg-purple-500' },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [patients, appointmentsData] = await Promise.all([
                    api.doctor.getPatients(),
                    api.doctor.getAppointments().catch(() => [])
                ]);

                setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);

                const today = new Date().toISOString().split('T')[0];
                const appointmentsToday = Array.isArray(appointmentsData) 
                    ? appointmentsData.filter((app: any) => app.appointment_date?.startsWith(today)).length 
                    : 0;

                setStats([
                    { label: 'Total Patients', value: patients.length.toString(), change: '+0%', color: 'bg-blue-500' },
                    { label: 'Appointments Today', value: appointmentsToday.toString(), change: '+0%', color: 'bg-green-500' },
                    { label: 'Pending Reports', value: '0', change: '-0%', color: 'bg-amber-500' }, // Logic for reports not implemented
                    { label: 'Total Earnings', value: '$0', change: '+0%', color: 'bg-purple-500' }, // Logic for earnings not implemented
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

    const [recentActivity, setRecentActivity] = useState<Array<{ patient: string; action: string; time: string }>>([]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.name || 'Doctor'}</p>
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
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 pb-6 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold flex-shrink-0">
                                        {item.patient[0]}
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-medium">{item.patient}</p>
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

                {/* Upcoming Appointments */}
                <div className="bg-blue-600 dark:bg-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20">
                    <h2 className="text-lg font-bold mb-6">Next Appointment</h2>
                    {appointments && appointments.length > 0 ? (
                        <>
                            {appointments.slice(0, 2).map((app: any, index: number) => (
                                <div key={index} className="bg-white/10 p-4 rounded-xl mb-4 backdrop-blur-sm">
                                    <p className="text-blue-100 text-sm mb-1">{app.appointment_time || 'TBD'}</p>
                                    <h3 className="text-xl font-bold">{app.patient_name || 'Patient'}</h3>
                                    <p className="text-blue-100 text-sm">{app.appointment_type || 'Consultation'}</p>
                                </div>
                            ))}
                            <button className="w-full mt-6 py-3 bg-white text-blue-600 dark:text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                                View All
                            </button>
                        </>
                    ) : (
                        <div className="text-center py-8 text-blue-100">
                            <p>No upcoming appointments</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
