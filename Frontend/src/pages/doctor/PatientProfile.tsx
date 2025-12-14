import { useParams } from 'react-router-dom';


const PatientProfile = () => {
    const { id } = useParams();

    // Mock data - in a real app, fetch based on ID
    const patient = {
        id: id,
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        contact: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        address: '123 Main St, Springfield, IL',
        bloodType: 'O+',
        height: '180 cm',
        weight: '75 kg',
        allergies: 'Penicillin, Peanuts',
        conditions: 'Hypertension',
    };

    const history = [
        { date: 'Dec 10, 2025', type: 'General Checkup', doctor: 'Dr. Sarah Johnson', notes: 'Blood pressure slightly elevated. Advised diet changes.' },
        { date: 'Nov 15, 2025', type: 'Lab Test', doctor: 'Dr. Michael Chen', notes: 'Lipid profile normal.' },
        { date: 'Oct 05, 2025', type: 'Emergency', doctor: 'Dr. James Wilson', notes: 'Mild allergic reaction. Administered antihistamines.' },
    ];

    const medications = [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', status: 'Active' },
        { name: 'Multivitamin', dosage: '1 tablet', frequency: 'Once daily', status: 'Active' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Patient Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Patient Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-3xl mb-4">
                                {patient.name[0]}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{patient.name}</h2>
                            <p className="text-slate-500 dark:text-slate-400">{patient.age} Years • {patient.gender}</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Contact</p>
                                <p className="text-slate-900 dark:text-white">{patient.contact}</p>
                                <p className="text-slate-900 dark:text-white">{patient.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Address</p>
                                <p className="text-slate-900 dark:text-white">{patient.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Vitals & Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Blood Type</p>
                                <p className="font-bold text-slate-900 dark:text-white">{patient.bloodType}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Height</p>
                                <p className="font-bold text-slate-900 dark:text-white">{patient.height}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Weight</p>
                                <p className="font-bold text-slate-900 dark:text-white">{patient.weight}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Conditions</p>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{patient.conditions}</p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                            <p className="text-xs text-red-500 dark:text-red-400 font-bold uppercase">Allergies</p>
                            <p className="text-red-700 dark:text-red-300 font-medium">{patient.allergies}</p>
                        </div>
                    </div>
                </div>

                {/* Medical History & Meds */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Current Medications</h3>
                        <div className="space-y-3">
                            {medications.map((med, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">{med.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{med.dosage} • {med.frequency}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                                        {med.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Medical History</h3>
                        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8">
                            {history.map((record, index) => (
                                <div key={index} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"></div>
                                    <p className="text-sm text-slate-400 dark:text-slate-500 mb-1">{record.date}</p>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{record.type}</h4>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{record.doctor}</p>
                                    <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                                        {record.notes}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
