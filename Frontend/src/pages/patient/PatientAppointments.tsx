
const PatientAppointments = () => {
    const appointments = [
        { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: 'Dec 18, 2025', time: '10:00 AM', status: 'Upcoming', type: 'Checkup' },
        { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', date: 'Dec 22, 2025', time: '02:30 PM', status: 'Upcoming', type: 'Consultation' },
        { id: 3, doctor: 'Dr. James Wilson', specialty: 'General Practitioner', date: 'Nov 15, 2025', time: '09:00 AM', status: 'Completed', type: 'Follow-up' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Appointments</h1>
                <button
                    onClick={() => {
                        const date = prompt('Enter preferred date (e.g., Dec 25, 2025):');
                        if (date) alert(`Appointment request sent for ${date}. We will confirm shortly.`);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Book Appointment
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Doctor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                        {appointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                            {apt.doctor[4]}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{apt.doctor}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{apt.specialty}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900 dark:text-white">{apt.date}</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">{apt.time}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                                    {apt.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${apt.status === 'Upcoming' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'}`}>
                                        {apt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {apt.status === 'Upcoming' && (
                                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Cancel</button>
                                    )}
                                    {apt.status === 'Completed' && (
                                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">View Summary</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientAppointments;
