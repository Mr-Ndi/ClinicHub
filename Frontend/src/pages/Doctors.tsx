import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Doctors = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Try to fetch from admin endpoint (public access might need separate endpoint)
                const data = await api.admin.getDoctors().catch(() => []);
                setDoctors(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
                setDoctors([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
                        Meet Our <span className="text-blue-600">Doctors</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Our team of highly skilled and experienced medical professionals is here to take care of you.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                        <p>Loading doctors...</p>
                    </div>
                ) : doctors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctors.map((doctor) => (
                            <div key={doctor.user_id || doctor.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-800 group">
                                <div className="h-64 overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    {doctor.profile_image ? (
                                <img
                                            src={doctor.profile_image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                    ) : (
                                        <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-4xl">
                                            {doctor.name ? doctor.name.substring(0, 2).toUpperCase() : 'D'}
                                        </div>
                                    )}
                            </div>
                            <div className="p-6">
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1 capitalize">{doctor.specialization || doctor.specialty || 'Doctor'}</p>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{doctor.name}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                        {doctor.bio || doctor.description || 'Experienced medical professional dedicated to patient care.'}
                                </p>
                                    <button className="w-full py-2 px-4 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                        <p>No doctors available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctors;
