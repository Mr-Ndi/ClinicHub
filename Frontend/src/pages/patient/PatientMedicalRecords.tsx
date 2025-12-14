
const PatientMedicalRecords = () => {
    const records = [
        { id: 1, type: 'Lab Result', title: 'Complete Blood Count (CBC)', date: 'Dec 14, 2025', doctor: 'Dr. Sarah Johnson' },
        { id: 2, type: 'X-Ray', title: 'Chest X-Ray PA View', date: 'Dec 12, 2025', doctor: 'Dr. Michael Chen' },
        { id: 3, type: 'Diagnosis', title: 'Type 2 Diabetes Diagnosis', date: 'Nov 28, 2025', doctor: 'Dr. Sarah Johnson' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">My Medical Records</h1>

            <div className="space-y-4">
                {records.map((record) => (
                    <div
                        key={record.id}
                        onClick={() => alert(`Medical Record Details:\nTitle: ${record.title}\nType: ${record.type}\nDoctor: ${record.doctor}\nDate: ${record.date}\n\n(Full report would open here)`)}
                        className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold
                                ${record.type === 'Lab Result' ? 'bg-purple-500' :
                                    record.type === 'X-Ray' ? 'bg-slate-700' :
                                        record.type === 'Diagnosis' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                {record.type === 'Lab Result' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                                {record.type === 'X-Ray' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                {record.type === 'Diagnosis' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{record.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{record.date} • {record.doctor}</p>
                            </div>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm border border-blue-200 dark:border-blue-900/30 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientMedicalRecords;
