import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import BookAppointmentModal from '../../components/BookAppointmentModal';

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            const data = await api.patient.getAppointments();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load appointments');
            setAppointments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookingSuccess = () => {
        fetchAppointments(); // Refresh appointments list
    };

    // Helper function to get doctor name (we'll need to fetch doctor details or include in response)
    const getDoctorName = (doctorId: string) => {
        // For now, return a placeholder. In a real app, you'd fetch doctor details or include in appointment response
        return `Doctor ${doctorId.substring(0, 8)}`;
    };

    // Format date for display
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'TBD';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Appointments</h1>
                <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Book Appointment
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Doctor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date & Time</th>
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
                            appointments.map((apt) => {
                                const doctorName = apt.doctor_name || apt.doctor || getDoctorName(apt.doctor_id || '');
                                const appointmentDate = formatDate(apt.date || apt.appointment_date);
                                const appointmentTime = apt.time || apt.appointment_time || 'TBD';
                                const status = apt.status || 'Upcoming';
                                return (
                                    <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                                    {doctorName[0] || 'D'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{doctorName}</div>
                                                    <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{apt.specialty || apt.specialization || 'General'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900 dark:text-white">{appointmentDate}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{appointmentTime}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 capitalize">
                                            {apt.type || apt.appointment_type || 'Consultation'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${status.toLowerCase() === 'upcoming' || status.toLowerCase() === 'confirmed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' : 
                                                status.toLowerCase() === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {status.toLowerCase() === 'upcoming' || status.toLowerCase() === 'confirmed' ? (
                                                <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Cancel</button>
                                            ) : status.toLowerCase() === 'completed' ? (
                                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">View Summary</button>
                                            ) : null}
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

            {/* Booking Modal */}
            <BookAppointmentModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSuccess={handleBookingSuccess}
            />
        </div>
    );
};

export default PatientAppointments;
