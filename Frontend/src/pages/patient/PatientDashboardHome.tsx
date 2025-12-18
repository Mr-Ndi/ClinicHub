import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PatientDashboardHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState([
        { label: 'Upcoming Appointments', value: '0', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-blue-500' },
        { label: 'Prescriptions Active', value: '0', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'bg-green-500' },
        { label: 'Pending Bills', value: '$0', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-amber-500' },
    ]);
    const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const [appointments, prescriptions] = await Promise.all([
                api.patient.getAppointments().catch(() => []),
                api.patient.getPrescriptions().catch(() => [])
            ]);

            const today = new Date();
            const upcoming = Array.isArray(appointments) 
                ? appointments.filter((apt: any) => {
                    const aptDate = apt.appointment_date ? new Date(apt.appointment_date) : null;
                    return aptDate && aptDate >= today && (apt.status === 'Upcoming' || apt.status === 'Confirmed');
                }).slice(0, 2)
                : [];

            setUpcomingAppointments(upcoming);

            setStats([
                { label: 'Upcoming Appointments', value: upcoming.length.toString(), icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-blue-500' },
                { label: 'Prescriptions Active', value: Array.isArray(prescriptions) ? prescriptions.filter((p: any) => p.status === 'Active' || !p.status).length.toString() : '0', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'bg-green-500' },
                { label: 'Pending Bills', value: '$0', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-amber-500' },
            ]);
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.name || 'Patient'}</h1>
                <p className="text-slate-600 dark:text-slate-400">Here's an overview of your health dashboard.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color} bg-opacity-90`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} /></svg>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{isLoading ? '...' : stat.value}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Appointments */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming Appointments</h2>
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map((apt, index) => {
                                const doctorName = apt.doctor_name || apt.doctor || 'Doctor';
                                const appointmentDate = apt.appointment_date ? new Date(apt.appointment_date).toLocaleDateString() : 'TBD';
                                const appointmentTime = apt.appointment_time || apt.time || 'TBD';
                                return (
                                    <div key={apt.appointment_id || index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                            {doctorName[0] || 'D'}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white">{doctorName}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{apt.specialty || apt.specialization || 'General'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900 dark:text-white">{appointmentTime}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{appointmentDate}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                <p>No upcoming appointments</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Health Tips / Notifications */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Health Tip of the Day</h2>
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm mb-6">
                        <p className="text-lg font-medium mb-2">Stay Hydrated!</p>
                        <p className="text-blue-100">Drinking enough water each day is crucial for many reasons: to regulate body temperature, keep joints lubricated, prevent infections, and deliver nutrients to cells.</p>
                    </div>
                    <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                        Read More Health Tips
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboardHome;
