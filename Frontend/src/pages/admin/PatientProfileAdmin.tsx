import { useParams, Link } from 'react-router-dom';

const PatientProfileAdmin = () => {
    const { id } = useParams();

    // Mock data - in a real app this would come from an API based on the ID
    const patient = {
        id: id,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        bloodType: 'O+',
        height: '178 cm',
        weight: '75 kg',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        emergencyContact: 'Jane Doe (Wife) - +1 (555) 987-6543',
        allergies: ['Penicillin', 'Peanuts'],
        conditions: ['Hypertension', 'Seasonal Allergies'],
        recentVisits: [
            { date: '2024-03-10', doctor: 'Dr. Sarah Johnson', reason: 'Regular Checkup', diagnosis: 'Stable' },
            { date: '2024-02-15', doctor: 'Dr. Michael Chen', reason: 'Flu Symptoms', diagnosis: 'Viral Infection' },
            { date: '2023-11-20', doctor: 'Dr. Sarah Johnson', reason: 'Blood Pressure Monitoring', diagnosis: 'Elevated BP' },
        ]
    };

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
                        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl font-bold mb-4">
                            {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{patient.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400">Patient ID: #{2000 + Number(patient.id)}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Age</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.age} Years</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Gender</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.gender}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Blood Type</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.bloodType}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Height</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.height}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">Weight</span>
                            <span className="font-medium text-slate-900 dark:text-white">{patient.weight}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Contact Info</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span className="text-slate-600 dark:text-slate-300">{patient.email}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span className="text-slate-600 dark:text-slate-300">{patient.phone}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="text-slate-600 dark:text-slate-300">{patient.address}</span>
                            </div>
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
                                {patient.conditions.map((condition, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                                        {condition}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Allergies</h3>
                            <div className="flex flex-wrap gap-2">
                                {patient.allergies.map((allergy, index) => (
                                    <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
                                        {allergy}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Visits */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Visits</h3>
                        <div className="space-y-6">
                            {patient.recentVisits.map((visit, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">{visit.reason}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Attended by {visit.doctor}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Diagnosis: {visit.diagnosis}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{visit.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileAdmin;
