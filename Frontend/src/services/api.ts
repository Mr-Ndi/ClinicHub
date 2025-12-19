const API_URL = 'http://localhost:2739/api';

const getHeaders = (includeContentType: boolean = true) => {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {};
    
    // Only include Content-Type for requests with a body
    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        let error: any;
        try {
            const text = await response.text();
            error = JSON.parse(text);
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
    
    try {
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error('Invalid response format from server');
    }
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
                headers: getHeaders(false),
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
                headers: getHeaders(false),
            });
            return handleResponse(response);
        },
        getRecords: async () => {
            const response = await fetch(`${API_URL}/patient/records`, {
                headers: getHeaders(false),
            });
            return handleResponse(response);
        },
        getProfile: async () => {
            const response = await fetch(`${API_URL}/patient/profile`, {
                headers: getHeaders(false),
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
                headers: getHeaders(false),
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
                headers: getHeaders(false),
            });
            return handleResponse(response);
        },
        getPatientDetails: async (id: string) => {
            const response = await fetch(`${API_URL}/doctor/patients/${id}`, {
                headers: getHeaders(false),
            });
            return handleResponse(response);
        },
        getPrescriptions: async () => {
            const response = await fetch(`${API_URL}/doctor/prescriptions`, {
                headers: getHeaders(false),
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
                headers: getHeaders(false),
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
                headers: getHeaders(false),
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
        getDashboardData: async () => {
            const response = await fetch(`${API_URL}/dashboard/doctor/data`, {
                headers: getHeaders(false),
            });
            return handleResponse(response);
        },
    },

    // Admin
    admin: {
        getDoctors: async () => {
            try {
                const headers = getHeaders(false); // Don't include Content-Type for GET
                
                const response = await fetch(`${API_URL}/admin/doctors`, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors',
                });
                
                return handleResponse(response);
            } catch (error: any) {
                // If it's a network error, provide a more helpful message
                if (error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
                    throw new Error('Network error: Unable to connect to the server. Please check if the backend is running at http://localhost:2739');
                }
                throw error;
            }
        },

        getDashboardData: async () => {
            const response = await fetch(`${API_URL}/dashboard/data`, {
                headers: getHeaders(false),
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
            try {
                const headers = getHeaders(false); // Don't include Content-Type for GET
                
                const response = await fetch(`${API_URL}/admin/patients`, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors',
                });
                
                return handleResponse(response);
            } catch (error: any) {
                if (error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
                    throw new Error('Network error: Unable to connect to the server. Please check if the backend is running at http://localhost:2739');
                }
                throw error;
            }
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
            try {
                const headers = getHeaders(false); // Don't include Content-Type for GET
                
                const response = await fetch(`${API_URL}/admin/appointments`, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors',
                });
                
                return handleResponse(response);
            } catch (error: any) {
                if (error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
                    throw new Error('Network error: Unable to connect to the server. Please check if the backend is running at http://localhost:2739');
                }
                throw error;
            }
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
                headers: getHeaders(false),
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
                headers: getHeaders(false),
            });
            return handleResponse(response);
        },
        addStockItem: async (data: any) => {
            const response = await fetch(`${API_URL}/stock`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });
            
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
