import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const PatientPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            setIsLoading(true);
            const data = await api.patient.getPrescriptions();
            setPrescriptions(Array.isArray(data) ? data : []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load prescriptions');
            setPrescriptions([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">My Prescriptions</h1>

            {isLoading ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <p>Loading prescriptions...</p>
                </div>
            ) : prescriptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prescriptions.map((script) => {
                        const issueDate = script.prescription_date ? new Date(script.prescription_date).toLocaleDateString() : 'N/A';
                        return (
                            <div key={script.prescription_id || script.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{script.medication_name || script.medication}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Prescribed by {script.doctor_name || script.doctor || 'Doctor'}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full capitalize">
                                        {script.status || 'Active'}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Dosage:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{script.dosage || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{script.duration || script.duration_days ? `${script.duration_days} days` : 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Date Issued:</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{issueDate}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => toast.success(`Refill requested for ${script.medication_name || script.medication}. We will notify you when it's ready.`)}
                                    className="w-full py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    Request Refill
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <p>No prescriptions found</p>
                </div>
            )}
        </div>
    );
};

export default PatientPrescriptions;
