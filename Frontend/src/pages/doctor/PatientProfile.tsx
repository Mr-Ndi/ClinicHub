import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const PatientProfile = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState<any[]>([]);
    const [medications, setMedications] = useState<any[]>([]);

    useEffect(() => {
        const fetchPatientData = async () => {
            if (!id) return;
            
            try {
                setIsLoading(true);
                const patientData = await api.doctor.getPatientDetails(id);
                setPatient(patientData);
                
                // Try to fetch medical records and prescriptions
                try {
                    const records = await api.doctor.getPatientRecords(id).catch(() => []);
                    setHistory(Array.isArray(records) ? records.slice(0, 5) : []);
                } catch (error) {
                    console.error('Failed to fetch records:', error);
                }
                
                try {
                    const prescriptions = await api.doctor.getPrescriptions().catch(() => []);
                    const patientPrescriptions = Array.isArray(prescriptions) 
                        ? prescriptions.filter((p: any) => p.patient_id === id || p.patient_id === patientData?.user_id || p.patient_id === patientData?.id)
                        : [];
                    setMedications(patientPrescriptions);
                } catch (error) {
                    console.error('Failed to fetch prescriptions:', error);
                }
            } catch (error: any) {
                toast.error(error.message || 'Failed to load patient data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientData();
    }, [id]);

    const calculateAge = (dob: string) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-500 dark:text-slate-400">Loading patient data...</div>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-500 dark:text-slate-400">Patient not found</div>
            </div>
        );
    }

    const patientAge = patient.date_of_birth ? calculateAge(patient.date_of_birth) : patient.age || 'N/A';
    const allergies = Array.isArray(patient.allergies) ? patient.allergies.join(', ') : (patient.allergies || 'None');
    const conditions = Array.isArray(patient.medical_conditions) ? patient.medical_conditions.join(', ') : (patient.medical_conditions || 'None');


    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Patient Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Patient Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-3xl mb-4 overflow-hidden">
                                {patient.profile_image ? (
                                    <img src={patient.profile_image} alt={patient.name} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <span>{patient.name ? patient.name[0].toUpperCase() : 'P'}</span>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{patient.name || 'Patient'}</h2>
                            <p className="text-slate-500 dark:text-slate-400">{patientAge} {typeof patientAge === 'number' ? 'Years' : ''} • {patient.gender || 'N/A'}</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Contact</p>
                                <p className="text-slate-900 dark:text-white">{patient.phone || 'N/A'}</p>
                                <p className="text-slate-900 dark:text-white">{patient.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Address</p>
                                <p className="text-slate-900 dark:text-white">{patient.address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Vitals & Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Blood Type</p>
                                <p className="font-bold text-slate-900 dark:text-white">{patient.blood_group || patient.bloodType || 'N/A'}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Height</p>
                                <p className="font-bold text-slate-900 dark:text-white">{patient.height || 'N/A'}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Weight</p>
                                <p className="font-bold text-slate-900 dark:text-white">{patient.weight || 'N/A'}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Conditions</p>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{conditions}</p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                            <p className="text-xs text-red-500 dark:text-red-400 font-bold uppercase">Allergies</p>
                            <p className="text-red-700 dark:text-red-300 font-medium">{allergies}</p>
                        </div>
                    </div>
                </div>

                {/* Medical History & Meds */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Current Medications</h3>
                        <div className="space-y-3">
                            {medications.length > 0 ? (
                                medications.map((med: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">{med.medication_name || med.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{med.dosage || 'N/A'} • {med.duration || med.frequency || 'N/A'}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full capitalize">
                                            {med.status || 'Active'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <p>No current medications</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Medical History</h3>
                        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8">
                            {history.length > 0 ? (
                                history.map((record: any, index: number) => {
                                    const recordDate = record.record_date ? new Date(record.record_date).toLocaleDateString() : record.date || 'N/A';
                                    return (
                                        <div key={index} className="relative pl-8">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"></div>
                                            <p className="text-sm text-slate-400 dark:text-slate-500 mb-1">{recordDate}</p>
                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{record.record_type || record.type || 'Medical Record'}</h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{record.doctor_name || record.doctor || 'Doctor'}</p>
                                            <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                                                {record.notes || record.description || record.title || 'No notes available'}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <p>No medical history available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
