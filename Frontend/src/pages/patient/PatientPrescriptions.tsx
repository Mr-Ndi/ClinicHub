
const PatientPrescriptions = () => {
    const prescriptions = [
        { id: 1, medication: 'Amoxicillin 500mg', dosage: '1 tablet 3x daily', duration: '7 days', date: 'Dec 14, 2025', status: 'Active', doctor: 'Dr. Sarah Johnson' },
        { id: 2, medication: 'Lisinopril 10mg', dosage: '1 tablet daily', duration: '30 days', date: 'Dec 12, 2025', status: 'Active', doctor: 'Dr. Michael Chen' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">My Prescriptions</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prescriptions.map((script) => (
                    <div key={script.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{script.medication}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Prescribed by {script.doctor}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                                {script.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Dosage:</span>
                                <span className="font-medium text-slate-900 dark:text-white">{script.dosage}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                                <span className="font-medium text-slate-900 dark:text-white">{script.duration}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Date Issued:</span>
                                <span className="font-medium text-slate-900 dark:text-white">{script.date}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => alert(`Refill requested for ${script.medication}. We will notify you when it's ready.`)}
                            className="w-full py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                            Request Refill
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientPrescriptions;
