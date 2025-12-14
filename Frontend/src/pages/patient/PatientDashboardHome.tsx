
const PatientDashboardHome = () => {
    const stats = [
        { label: 'Upcoming Appointments', value: '2', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-blue-500' },
        { label: 'Prescriptions Active', value: '3', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'bg-green-500' },
        { label: 'Pending Bills', value: '$150', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-amber-500' },
    ];

    const upcomingAppointments = [
        { doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: 'Dec 18, 2025', time: '10:00 AM', type: 'Checkup' },
        { doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', date: 'Dec 22, 2025', time: '02:30 PM', type: 'Consultation' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, John</h1>
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
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
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
                        {upcomingAppointments.map((apt, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                    {apt.doctor[4]}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">{apt.doctor}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{apt.specialty}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900 dark:text-white">{apt.time}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{apt.date}</p>
                                </div>
                            </div>
                        ))}
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
