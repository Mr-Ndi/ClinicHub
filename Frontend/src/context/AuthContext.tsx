import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
    user_id: string;
    email: string;
    name: string;
    role: string;
    phone: string;
    address: string;
    profile_image: string | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (updatedUser: Partial<User>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Use lazy initializers to avoid setState in useEffect
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user_profile');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('access_token');
    });

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('access_token', newToken);
        localStorage.setItem('user_profile', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        setToken(null);
        setUser(null);
    };

    const updateUser = (updatedUser: Partial<User>) => {
        if (user) {
            const newUser = { ...user, ...updatedUser };
            localStorage.setItem('user_profile', JSON.stringify(newUser));
            setUser(newUser);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
