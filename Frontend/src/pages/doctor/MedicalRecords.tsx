

const MedicalRecords = () => {
    const records = [
        { id: 1, patient: 'John Doe', type: 'Lab Result', title: 'Complete Blood Count (CBC)', date: 'Dec 14, 2025', doctor: 'Dr. Sarah Johnson' },
        { id: 2, patient: 'Jane Smith', type: 'X-Ray', title: 'Chest X-Ray PA View', date: 'Dec 12, 2025', doctor: 'Dr. Michael Chen' },
        { id: 3, patient: 'Robert Brown', type: 'Diagnosis', title: 'Type 2 Diabetes Diagnosis', date: 'Nov 28, 2025', doctor: 'Dr. Sarah Johnson' },
        { id: 4, patient: 'Emily Davis', type: 'Prescription', title: 'Pain Management Plan', date: 'Dec 05, 2025', doctor: 'Dr. James Wilson' },
        { id: 5, patient: 'Michael Wilson', type: 'Lab Result', title: 'Lipid Profile', date: 'Dec 10, 2025', doctor: 'Dr. Sarah Johnson' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Medical Records</h1>
                <div className="flex gap-4">
                    <select className="border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 dark:text-white bg-white dark:bg-slate-900">
                        <option>All Types</option>
                        <option>Lab Results</option>
                        <option>X-Rays</option>
                        <option>Diagnoses</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                        Upload Record
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {records.map((record) => (
                    <div key={record.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold
                ${record.type === 'Lab Result' ? 'bg-purple-500' :
                                    record.type === 'X-Ray' ? 'bg-slate-700' :
                                        record.type === 'Diagnosis' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                {record.type === 'Lab Result' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                                {record.type === 'X-Ray' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                {record.type === 'Diagnosis' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                {record.type === 'Prescription' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{record.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Patient: <span className="font-medium text-slate-700 dark:text-slate-300">{record.patient}</span> • {record.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">By {record.doctor}</span>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm border border-blue-200 dark:border-blue-900/30 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicalRecords;
