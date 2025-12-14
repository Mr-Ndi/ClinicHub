import { useState } from 'react';
import { Link } from 'react-router-dom';

const PatientManagement = () => {
    const [patients] = useState([
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-03-10', condition: 'Hypertension' },
        { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2024-03-12', condition: 'Pregnancy' },
        { id: 3, name: 'Robert Brown', age: 68, gender: 'Male', lastVisit: '2024-03-08', condition: 'Diabetes' },
        { id: 4, name: 'Emily White', age: 24, gender: 'Female', lastVisit: '2024-03-14', condition: 'Flu' },
        { id: 5, name: 'Michael Green', age: 55, gender: 'Male', lastVisit: '2024-03-01', condition: 'Back Pain' },
    ]);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patient Management</h1>
                    <p className="text-slate-600 dark:text-slate-400">View and manage patient records</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search patients..."
                        className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Patient Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Age/Gender</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Last Visit</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Condition</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                                                {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">{patient.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">ID: #{2000 + patient.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{patient.age} / {patient.gender}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{patient.lastVisit}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                            {patient.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/admin/patients/${patient.id}`}
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientManagement;
