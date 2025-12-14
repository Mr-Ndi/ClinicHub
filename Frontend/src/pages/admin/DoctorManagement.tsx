import { useState } from 'react';

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 156, status: 'Active' },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatrics', patients: 89, status: 'Active' },
        { id: 3, name: 'Dr. Emily Davis', specialty: 'Neurology', patients: 45, status: 'On Leave' },
        { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics', patients: 120, status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: '',
        status: 'Active'
    });

    const handleAddDoctor = (e: React.FormEvent) => {
        e.preventDefault();
        const doctor = {
            id: doctors.length + 1,
            name: newDoctor.name,
            specialty: newDoctor.specialty,
            patients: 0,
            status: newDoctor.status
        };
        setDoctors([...doctors, doctor]);
        setIsModalOpen(false);
        setNewDoctor({ name: '', specialty: '', status: 'Active' });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Doctor Management</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage medical staff and permissions</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Add Doctor
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Doctor Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Specialty</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Active Patients</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {doctors.map((doctor) => (
                                <tr key={doctor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                                {doctor.name.split(' ').map(n => n[0]).join('').substring(1, 3)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">{doctor.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">ID: #{1000 + doctor.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{doctor.specialty}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{doctor.patients}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doctor.status === 'Active'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                            {doctor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Doctor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add New Doctor</h2>
                        <form onSubmit={handleAddDoctor} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newDoctor.name}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Dr. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Specialty</label>
                                <input
                                    type="text"
                                    required
                                    value={newDoctor.specialty}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Cardiology"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                                <select
                                    value={newDoctor.status}
                                    onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Add Doctor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
