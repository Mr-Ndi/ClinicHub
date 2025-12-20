import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const PatientMedicalRecords = () => {
    const [records, setRecords] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            setIsLoading(true);
            const data = await api.patient.getRecords();
            setRecords(Array.isArray(data) ? data : []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load medical records');
            setRecords([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">My Medical Records</h1>

            {isLoading ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <p>Loading medical records...</p>
                </div>
            ) : records.length > 0 ? (
                <div className="space-y-4">
                    {records.map((record) => {
                        const recordDate = record.record_date ? new Date(record.record_date).toLocaleDateString() : 'N/A';
                        const recordType = record.record_type || record.type || 'General';
                        const title = record.title || record.diagnosis || record.description || 'Medical Record';
                        return (
                            <div
                                key={record.record_id || record.id}
                                onClick={() => toast(`Medical Record Details:\nTitle: ${title}\nType: ${recordType}\nDate: ${recordDate}\n\n(Full report would open here)`)}
                                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold
                                        ${recordType.toLowerCase().includes('lab') ? 'bg-purple-500' :
                                            recordType.toLowerCase().includes('x-ray') || recordType.toLowerCase().includes('xray') ? 'bg-slate-700' :
                                                recordType.toLowerCase().includes('diagnosis') ? 'bg-red-500' : 'bg-blue-500'}`}>
                                        {recordType.toLowerCase().includes('lab') && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                                        {recordType.toLowerCase().includes('x-ray') || recordType.toLowerCase().includes('xray') ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> : null}
                                        {recordType.toLowerCase().includes('diagnosis') && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                        {!recordType.toLowerCase().includes('lab') && !recordType.toLowerCase().includes('x-ray') && !recordType.toLowerCase().includes('diagnosis') && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{recordDate} • {record.doctor_name || record.doctor || 'Doctor'}</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm border border-blue-200 dark:border-blue-900/30 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    Download
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <p>No medical records found</p>
                </div>
            )}
        </div>
    );
};

export default PatientMedicalRecords;
