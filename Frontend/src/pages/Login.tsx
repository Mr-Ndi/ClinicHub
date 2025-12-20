import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { api } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await api.login({ email, password });
            
            // Check if we got a valid response
            if (data && data.access_token && data.profile) {
                login(data.access_token, data.profile);
                toast.success('Login successful! Welcome back.');

                // Redirect based on role
                if (data.profile.role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (data.profile.role === 'doctor') {
                    navigate('/doctor/dashboard');
                } else {
                    navigate('/patient/dashboard');
                }
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: unknown) {
            // Handle error with custom toast
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            
            if (errorMessage.includes('Invalid email or password') || 
                errorMessage.includes('Authentication required')) {
                // Show the custom "no account" toast
                toast.error(
                    (t) => (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        No account found
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        There's no account associated with this email address.
                                    </p>
                                    <button
                                        onClick={() => {
                                            toast.dismiss(t.id);
                                            navigate('/signup');
                                        }}
                                        className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create an account instead
                                    </button>
                                </div>
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ),
                    {
                        duration: 6000,
                        style: {
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '12px',
                            padding: '16px',
                            maxWidth: '420px',
                        },
                        className: 'dark:bg-red-950/50 dark:border-red-800/50',
                    }
                );
            } else {
                // Show network error toast
                toast.error(
                    (t) => (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        Connection Error
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        Unable to connect to the server. Please check your connection and try again.
                                    </p>
                                </div>
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ),
                    {
                        duration: 5000,
                        style: {
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '12px',
                            padding: '16px',
                            maxWidth: '420px',
                        },
                        className: 'dark:bg-red-950/50 dark:border-red-800/50',
                    }
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-24 transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">C</span>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                    Or{' '}
                    <Link to="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-100 dark:border-slate-800">
                    <form className="space-y-6" onSubmit={handleLogin}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 pr-10 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 015 12c0 .858.128 1.687.365 2.471M3 3l3.29 3.29m0 0l3.29 3.29m-3.29-3.29l3.29 3.29M12 12l.01.01M21 21l-3.29-3.29m0 0A9.97 9.97 0 0119 12c0-.858-.128-1.687-.365-2.471M21 21l-3.29-3.29m0 0l-3.29-3.29m3.29 3.29L12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900 dark:text-white">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-blue-600/20 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300 dark:border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
