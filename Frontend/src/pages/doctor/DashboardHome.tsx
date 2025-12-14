


const DashboardHome = () => {
    const stats = [
        { label: 'Total Patients', value: '1,234', change: '+12%', color: 'bg-blue-500' },
        { label: 'Appointments Today', value: '42', change: '+5%', color: 'bg-green-500' },
        { label: 'Pending Reports', value: '15', change: '-2%', color: 'bg-amber-500' },
        { label: 'Total Earnings', value: '$12k', change: '+8%', color: 'bg-purple-500' },
    ];

    const recentActivity = [
        { patient: 'John Doe', action: 'Appointment scheduled', time: '2 mins ago' },
        { patient: 'Jane Smith', action: 'Lab report uploaded', time: '1 hour ago' },
        { patient: 'Robert Brown', action: 'Prescription renewed', time: '3 hours ago' },
        { patient: 'Emily Davis', action: 'New patient registration', time: '5 hours ago' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, Dr. Sarah Johnson</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color} bg-opacity-90`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            </div>
                            <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {recentActivity.map((item, index) => (
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
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments (Placeholder) */}
                <div className="bg-blue-600 dark:bg-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20">
                    <h2 className="text-lg font-bold mb-6">Next Appointment</h2>
                    <div className="bg-white/10 p-4 rounded-xl mb-4 backdrop-blur-sm">
                        <p className="text-blue-100 text-sm mb-1">10:00 AM - 10:30 AM</p>
                        <h3 className="text-xl font-bold">Michael Scott</h3>
                        <p className="text-blue-100 text-sm">General Checkup</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-blue-100 text-sm mb-1">11:00 AM - 11:45 AM</p>
                        <h3 className="text-xl font-bold">Dwight Schrute</h3>
                        <p className="text-blue-100 text-sm">Cardiology Consultation</p>
                    </div>
                    <button className="w-full mt-6 py-3 bg-white text-blue-600 dark:text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
