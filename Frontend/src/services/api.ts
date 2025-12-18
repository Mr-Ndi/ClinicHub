const API_URL = 'http://127.0.0.1:2739/api';

const getHeaders = () => {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        let error: any;
        try {
            error = await response.json();
        } catch (e) {
            // If response is not JSON, create a generic error object
            error = { detail: `HTTP ${response.status}: ${response.statusText}` };
        }
        
        // Extract error message - try detail first, then message, then fallback
        const errorMessage = error.detail || error.message || error.error || 'An error occurred';
        
        // Handle specific error codes with appropriate messages
        if (response.status === 401) {
            throw new Error('Authentication required. Please login again.');
        } else if (response.status === 403) {
            throw new Error(errorMessage);
        } else if (response.status === 404) {
            throw new Error(errorMessage);
        } else if (response.status === 422) {
            throw new Error(errorMessage);
        } else if (response.status >= 500) {
            // Show the actual error detail from backend for 500 errors
            throw new Error(errorMessage);
        }
        
        // For 400 errors, show the detail message
        throw new Error(errorMessage);
    }
    return response.json();
};

export const api = {
    // Auth
    login: async (credentials: any) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    },
    register: async (userData: any) => {
        const response = await fetch(`${API_URL}/api/patient/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    // Patient
    patient: {
        getAppointments: async () => {
            const response = await fetch(`${API_URL}/patient/appointments`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        bookAppointment: async (data: any) => {
            const response = await fetch(`${API_URL}/patient/appointments`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        getPrescriptions: async () => {
            const response = await fetch(`${API_URL}/patient/prescriptions`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getRecords: async () => {
            const response = await fetch(`${API_URL}/patient/records`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getProfile: async () => {
            const response = await fetch(`${API_URL}/patient/profile`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        updateProfile: async (data: any) => {
            const response = await fetch(`${API_URL}/patient/profile`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
    },

    // Doctor
    doctor: {
        getAppointments: async () => {
            const response = await fetch(`${API_URL}/doctor/appointments`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        updateAppointmentStatus: async (id: string, status: string) => {
            const response = await fetch(`${API_URL}/doctor/appointments/update-status`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ appointment_id: id, status }),
            });
            return handleResponse(response);
        },
        getPatients: async () => {
            const response = await fetch(`${API_URL}/doctor/patients`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getPatientDetails: async (id: string) => {
            const response = await fetch(`${API_URL}/doctor/patients/${id}`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getPrescriptions: async () => {
            const response = await fetch(`${API_URL}/doctor/prescriptions`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        createPrescription: async (data: any) => {
            const response = await fetch(`${API_URL}/doctor/prescriptions`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        getPatientRecords: async (id: string) => {
            const response = await fetch(`${API_URL}/doctor/patients/${id}/records`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        addPatientRecord: async (id: string, data: any) => {
            const response = await fetch(`${API_URL}/doctor/patients/${id}/records`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        getProfile: async () => {
            const response = await fetch(`${API_URL}/doctor/profile`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        updateProfile: async (data: any) => {
            const response = await fetch(`${API_URL}/doctor/profile`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
    },

    // Admin
    admin: {
        getDoctors: async () => {
            const response = await fetch(`${API_URL}/admin/doctors`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },

        getDashboardData: async () => {
            const response = await fetch(`${API_URL}/admin/dashboard/data`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        addDoctor: async (data: any) => {
            const response = await fetch(`${API_URL}/admin/doctors`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        updateDoctor: async (id: string, data: any) => {
            const response = await fetch(`${API_URL}/admin/doctors/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        deleteDoctor: async (id: string) => {
            const response = await fetch(`${API_URL}/admin/doctors/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getPatients: async () => {
            const response = await fetch(`${API_URL}/admin/patients`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        addPatient: async (data: any) => {
            const response = await fetch(`${API_URL}/admin/patients`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        updatePatient: async (id: string, data: any) => {
            const response = await fetch(`${API_URL}/admin/patients/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        deletePatient: async (id: string) => {
            const response = await fetch(`${API_URL}/admin/patients/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        getAllAppointments: async () => {
            const response = await fetch(`${API_URL}/admin/appointments`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        updateAppointmentStatus: async (id: string, status: string) => {
            const response = await fetch(`${API_URL}/admin/appointments/update-status`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ appointment_id: id, status }),
            });
            return handleResponse(response);
        },
        getProfile: async () => {
            const response = await fetch(`${API_URL}/admin/profile`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        updateProfile: async (data: any) => {
            const response = await fetch(`${API_URL}/admin/profile`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        // Stock Management
        getStockItems: async () => {
            const response = await fetch(`${API_URL}/stock`, {
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
        addStockItem: async (data: any) => {
            console.log('📤 API Request - POST /api/stock');
            console.log('📤 Request Body:', JSON.stringify(data, null, 2));
            console.log('📤 Request Headers:', getHeaders());
            
            const response = await fetch(`${API_URL}/stock`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            
            console.log('📥 Response Status:', response.status, response.statusText);
            const responseData = await response.clone().json().catch(() => ({ error: 'Could not parse response' }));
            console.log('📥 Response Body:', JSON.stringify(responseData, null, 2));
            
            return handleResponse(response);
        },
        updateStockItem: async (id: string, data: any) => {
            const response = await fetch(`${API_URL}/stock/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        deleteStockItem: async (id: string) => {
            const response = await fetch(`${API_URL}/stock/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            return handleResponse(response);
        },
    },
};
