import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            const data = await api.doctor.getAppointments();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load appointments');
            setAppointments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRowClick = (patientId: string) => {
        navigate(`/doctor/patients/${patientId}`);
    };

    const handleCancel = async (e: React.MouseEvent, appointmentId: string) => {
        e.stopPropagation(); // Prevent row click
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await api.doctor.updateAppointmentStatus(appointmentId, 'Cancelled');
                toast.success('Appointment cancelled');
                fetchAppointments();
            } catch (error: any) {
                toast.error(error.message || 'Failed to cancel appointment');
            }
        }
    };

    const handleEdit = async (e: React.MouseEvent, appointmentId: string) => {
        e.stopPropagation(); // Prevent row click
        const appointment = appointments.find(app => (app.appointment_id || app.id) === appointmentId);
        if (!appointment) return;

        const newTime = window.prompt('Enter new time for appointment:', appointment.appointment_time || appointment.time);

        // If user cancelled prompt, do nothing
        if (newTime === null) return;

        // For now, just show a message that this feature needs backend support
        toast.info('Appointment time update feature requires backend implementation');
        // TODO: Implement updateAppointment API endpoint
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                    Loading appointments...
                                </td>
                            </tr>
                        ) : appointments.length > 0 ? (
                            appointments.map((appointment) => {
                                const appointmentId = appointment.appointment_id || appointment.id;
                                const patientName = appointment.patient_name || appointment.patient || 'Patient';
                                const appointmentTime = appointment.appointment_time || appointment.time || 'TBD';
                                const appointmentDate = appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : '';
                                const status = appointment.status || 'Pending';
                                return (
                                    <tr
                                        key={appointmentId}
                                        onClick={() => handleRowClick(appointment.patient_id || appointment.patient?.id || '')}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                                    {patientName[0] || 'P'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{patientName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                                            {appointmentDate && `${appointmentDate} `}{appointmentTime}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 capitalize">
                                            {appointment.appointment_type || appointment.type || 'Consultation'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${status.toLowerCase() === 'confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                    status.toLowerCase() === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                        status.toLowerCase() === 'rescheduled' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                                                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={(e) => handleEdit(e, appointmentId)}
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4 disabled:opacity-50"
                                                disabled={status.toLowerCase() === 'cancelled'}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => handleCancel(e, appointmentId)}
                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50"
                                                disabled={status.toLowerCase() === 'cancelled'}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                    No appointments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
