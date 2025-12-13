import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([
        { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'General Checkup', status: 'Confirmed' },
        { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Cardiology Consultation', status: 'Pending' },
        { id: 3, patient: 'Robert Brown', time: '11:45 AM', type: 'Follow-up', status: 'Confirmed' },
        { id: 4, patient: 'Emily Davis', time: '02:00 PM', type: 'Lab Results Review', status: 'Cancelled' },
        { id: 5, patient: 'Michael Wilson', time: '03:30 PM', type: 'General Checkup', status: 'Confirmed' },
    ]);

    const handleRowClick = (id: number) => {
        navigate(`/doctor/patients/${id}`);
    };

    const handleCancel = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Prevent row click
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            setAppointments(prev => prev.map(app =>
                app.id === id ? { ...app, status: 'Cancelled' } : app
            ));
        }
    };

    const handleEdit = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Prevent row click
        const appointment = appointments.find(app => app.id === id);
        if (!appointment) return;

        const newTime = window.prompt('Enter new time for appointment:', appointment.time);

        // If user cancelled prompt, do nothing
        if (newTime === null) return;

        let newStatus = appointment.status;
        if (appointment.status === 'Pending') {
            if (window.confirm('Do you want to confirm this appointment?')) {
                newStatus = 'Confirmed';
            }
        }

        if (newTime !== appointment.time || newStatus !== appointment.status) {
            setAppointments(prev => prev.map(app =>
                app.id === id ? { ...app, time: newTime, status: newStatus } : app
            ));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Appointments</h1>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                        {appointments.map((appointment) => (
                            <tr
                                key={appointment.id}
                                onClick={() => handleRowClick(appointment.id)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                            {appointment.patient[0]}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{appointment.patient}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                                    {appointment.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                                    {appointment.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${appointment.status === 'Confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                            appointment.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                appointment.status === 'Rescheduled' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                                                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={(e) => handleEdit(e, appointment.id)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4 disabled:opacity-50"
                                        disabled={appointment.status === 'Cancelled'}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => handleCancel(e, appointment.id)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50"
                                        disabled={appointment.status === 'Cancelled'}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
