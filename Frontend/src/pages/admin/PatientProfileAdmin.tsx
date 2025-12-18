import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const PatientProfileAdmin = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [recentVisits, setRecentVisits] = useState<any[]>([]);

    useEffect(() => {
        const fetchPatientData = async () => {
            if (!id) return;
            
            try {
                setIsLoading(true);
                // Get patient from the list (admin can see all patients)
                const patients = await api.admin.getPatients();
                const foundPatient = Array.isArray(patients) ? patients.find((p: any) => p.id === id || p.user_id === id) : null;
                
                if (foundPatient) {
                    setPatient(foundPatient);
                    
                    // Try to fetch appointments for this patient
                    try {
                        const appointments = await api.admin.getAllAppointments().catch(() => []);
                        const patientAppointments = Array.isArray(appointments) 
                            ? appointments.filter((apt: any) => apt.patient_id === id || apt.patient_id === foundPatient.user_id || apt.patient_id === foundPatient.id)
                            : [];
                        setRecentVisits(patientAppointments.slice(0, 5));
                    } catch (error) {
                        console.error('Failed to fetch appointments:', error);
                    }
                } else {
                    toast.error('Patient not found');
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
    const allergies = Array.isArray(patient.allergies) ? patient.allergies : (patient.allergies ? patient.allergies.split(',').map((a: string) => a.trim()) : []);
    const conditions = Array.isArray(patient.medical_conditions) ? patient.medical_conditions : (patient.medical_conditions ? patient.medical_conditions.split(',').map((c: string) => c.trim()) : []);

    return (
        <div>
            <div className="mb-8 flex items-center gap-4">
                <Link to="/admin/patients" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patient Profile</h1>
                    <p className="text-slate-600 dark:text-slate-400">View detailed medical history</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Info Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold mb-4 overflow-hidden">
                            {patient.profile_image ? (
                                <img src={patient.profile_image} alt={patient.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span>{patient.name ? patient.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'P'}</span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{patient.name || 'Patient'}</h2>
                        <p className="text-slate-500 dark:text-slate-400">Patient ID: #{patient.user_id?.slice(-6) || patient.id?.slice(-6) || 'N/A'}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Age</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patientAge} {typeof patientAge === 'number' ? 'Years' : ''}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Gender</span>
                            <span className="font-medium text-slate-900 dark:text-white capitalize">{patient.gender || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Blood Type</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.blood_group || patient.bloodType || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Height</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.height || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Weight</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.weight || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Contact Info</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span className="text-slate-600 dark:text-slate-300">{patient.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span className="text-slate-600 dark:text-slate-300">{patient.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="text-slate-600 dark:text-slate-300">{patient.address || 'N/A'}</span>
                            </div>
                            {patient.emergency_contact_name && (
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span className="text-slate-600 dark:text-slate-300">
                                        {patient.emergency_contact_name} {patient.emergency_contact_phone ? `- ${patient.emergency_contact_phone}` : ''}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Medical History */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Alerts & Conditions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Medical Conditions</h3>
                            <div className="flex flex-wrap gap-2">
                                {conditions.length > 0 ? (
                                    conditions.map((condition: string, index: number) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                                            {condition}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">No medical conditions recorded</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Allergies</h3>
                            <div className="flex flex-wrap gap-2">
                                {allergies.length > 0 ? (
                                    allergies.map((allergy: string, index: number) => (
                                        <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
                                            {allergy}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">No allergies recorded</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Visits */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Visits</h3>
                        <div className="space-y-6">
                            {recentVisits.length > 0 ? (
                                recentVisits.map((visit: any, index: number) => {
                                    const visitDate = visit.appointment_date ? new Date(visit.appointment_date).toLocaleDateString() : visit.date || 'N/A';
                                    return (
                                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{visit.appointment_type || visit.reason || 'Appointment'}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Attended by {visit.doctor_name || visit.doctor || 'Doctor'}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">Status: {visit.status || 'Completed'}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{visitDate}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <p>No recent visits found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileAdmin;
