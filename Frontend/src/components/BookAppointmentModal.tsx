import { useState, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface BookAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface Doctor {
    id?: string;
    user_id?: string;
    name: string;
    specialization?: string;
    specialty?: string;
}

const BookAppointmentModal = ({ isOpen, onClose, onSuccess }: BookAppointmentModalProps) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        doctor_id: '',
        date: '',
        time: '',
        type: 'Consultation',
        notes: '',
    });

    useEffect(() => {
        if (isOpen) {
            fetchDoctors();
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setFormData(prev => ({
                ...prev,
                date: tomorrow.toISOString().split('T')[0],
                time: '09:00',
            }));
        }
    }, [isOpen]);

    const fetchDoctors = async () => {
        try {
            setIsLoadingDoctors(true);
            const data = await api.patient.getDoctors();
            setDoctors(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to load doctors');
            console.error('Error fetching doctors:', error);
        } finally {
            setIsLoadingDoctors(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.doctor_id || !formData.date || !formData.time || !formData.type) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate date is not in the past
        const selectedDate = new Date(`${formData.date}T${formData.time}`);
        const now = new Date();
        if (selectedDate < now) {
            toast.error('Please select a future date and time');
            return;
        }

        try {
            setIsSubmitting(true);
            
            // Format date for API (ISO format)
            const appointmentDate = new Date(`${formData.date}T${formData.time}`);
            const appointmentData = {
                doctor_id: formData.doctor_id,
                date: appointmentDate.toISOString(),
                time: formData.time,
                type: formData.type,
                notes: formData.notes,
            };

            await api.patient.bookAppointment(appointmentData);
            toast.success('Appointment booked successfully!');
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                doctor_id: '',
                date: '',
                time: '',
                type: 'Consultation',
                notes: '',
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to book appointment';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            {/* Modal panel */}
            <div 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
                onClick={(e) => e.stopPropagation()}
            >
                    <div className="bg-white dark:bg-slate-800 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Book New Appointment
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-5">
                        <div className="space-y-5">
                            {/* Doctor Selection */}
                            <div>
                                <label htmlFor="doctor_id" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Select Doctor <span className="text-red-500">*</span>
                                </label>
                                {isLoadingDoctors ? (
                                    <div className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500">
                                        Loading doctors...
                                    </div>
                                ) : (
                                    <select
                                        id="doctor_id"
                                        name="doctor_id"
                                        value={formData.doctor_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">Choose a doctor...</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor.id || doctor.user_id} value={doctor.id || doctor.user_id}>
                                                Dr. {doctor.name} - {doctor.specialization || doctor.specialty || 'General'}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Appointment Type */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Appointment Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="Consultation">Consultation</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="Check-up">Check-up</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Any additional information or concerns..."
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoadingDoctors}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Book Appointment
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default BookAppointmentModal;

