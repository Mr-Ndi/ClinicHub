import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        date_of_birth: '',
        gender: 'Male',
        blood_group: '',
        height: '',
        weight: '',
        allergies: '',
        medical_conditions: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                toast.error('Please fill in all required fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            if (formData.password.length < 6) {
                toast.error('Password must be at least 6 characters');
                return;
            }
        }
        if (currentStep === 2) {
            if (!formData.phone || !formData.date_of_birth) {
                toast.error('Please fill in phone number and date of birth');
                return;
            }
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            const registrationData: any = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'patient',
                phone: formData.phone || undefined,
                address: formData.address || undefined,
                date_of_birth: formData.date_of_birth || undefined,
                gender: formData.gender,
                blood_group: formData.blood_group || undefined,
                height: formData.height || undefined,
                weight: formData.weight || undefined,
                allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()).filter(a => a) : undefined,
                medical_conditions: formData.medical_conditions ? formData.medical_conditions.split(',').map(c => c.trim()).filter(c => c) : undefined,
                emergency_contact_name: formData.emergency_contact_name || undefined,
                emergency_contact_phone: formData.emergency_contact_phone || undefined,
            };

            await api.register(registrationData);
            toast.success('Account created successfully! Please login.');
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-24 transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">C</span>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-100 dark:border-slate-800">
                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex items-center flex-1">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                                        currentStep >= step 
                                            ? 'bg-blue-600 border-blue-600 text-white' 
                                            : 'border-slate-300 dark:border-slate-700 text-slate-400'
                                    }`}>
                                        {step}
                                    </div>
                                    {step < 3 && (
                                        <div className={`flex-1 h-1 mx-2 ${
                                            currentStep > step ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <span>Account</span>
                            <span>Personal Info</span>
                            <span>Medical Info</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Account Information */}
                        {currentStep === 1 && (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Email address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="At least 6 characters"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Next: Personal Info
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 2: Personal Information */}
                        {currentStep === 2 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                type="date"
                                                required
                                                value={formData.date_of_birth}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="gender"
                                                name="gender"
                                                required
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="blood_group" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Blood Type
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="blood_group"
                                                name="blood_group"
                                                value={formData.blood_group}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            >
                                                <option value="">Select Blood Type</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="height" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Height (cm)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="height"
                                                name="height"
                                                type="number"
                                                value={formData.height}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                                placeholder="175"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="weight" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Weight (kg)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="weight"
                                                name="weight"
                                                type="number"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                                placeholder="70"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="123 Main St, City, State, ZIP"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Next: Medical Info
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 3: Medical Information */}
                        {currentStep === 3 && (
                            <>
                                <div>
                                    <label htmlFor="allergies" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Allergies
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="allergies"
                                            name="allergies"
                                            rows={3}
                                            value={formData.allergies}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="Enter allergies separated by commas (e.g., Penicillin, Peanuts)"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="medical_conditions" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Medical Conditions
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="medical_conditions"
                                            name="medical_conditions"
                                            rows={3}
                                            value={formData.medical_conditions}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                            placeholder="Enter medical conditions separated by commas (e.g., Hypertension, Diabetes)"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Emergency Contact Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="emergency_contact_name"
                                                name="emergency_contact_name"
                                                type="text"
                                                value={formData.emergency_contact_name}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                                placeholder="Jane Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Emergency Contact Phone
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="emergency_contact_phone"
                                                name="emergency_contact_phone"
                                                type="tel"
                                                value={formData.emergency_contact_phone}
                                                onChange={handleChange}
                                                className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                                placeholder="+1 (555) 987-6543"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
