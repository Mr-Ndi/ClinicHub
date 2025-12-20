/**
 * Example: Login form using React Hook Form + Zod
 * This demonstrates how to use the required libraries for form validation
 * 
 * To use this pattern, replace the current Login.tsx implementation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginWithReactHookForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Using Axios instead of fetch (as required)
      const response = await axios.post('http://127.0.0.1:2739/api/auth/login', {
        email: data.email,
        password: data.password,
      });

      login(response.data.access_token, response.data.profile);
      toast.success('Login successful! Welcome back.');

      // Redirect based on role
      if (response.data.profile.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.data.profile.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email address
        </label>
        <input
          {...register('email')}
          type="email"
          className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="appearance-none block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register('rememberMe')}
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-900 dark:text-white">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-blue-600/20 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginWithReactHookForm;




