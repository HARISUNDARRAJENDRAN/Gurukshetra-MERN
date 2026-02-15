import { createContext, useEffect, useMemo, useState } from "react";

export const AppContent = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AppContentProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const request = async (endpoint, options = {}) => {
        const response = await fetch(`${BACKEND_URL}/api/auth${endpoint}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });

        return response.json();
    };

    const fetchMe = async () => {
        const data = await request('/me', { method: 'GET' });
        if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
        }
        return data;
    };

    const checkAuth = async () => {
        try {
            setAuthLoading(true);
            const status = await request('/is-auth', { method: 'GET' });
            if (!status.success) {
                setUser(null);
                setIsAuthenticated(false);
                return status;
            }
            return await fetchMe();
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            return { success: false, message: error.message };
        } finally {
            setAuthLoading(false);
        }
    };

    const register = async (payload) => {
        const data = await request('/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (data.success) {
            setUser(data.user || null);
            setIsAuthenticated(true);
        }

        return data;
    };

    const login = async (payload) => {
        const data = await request('/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (data.success) {
            setUser(data.user || null);
            setIsAuthenticated(true);
        }

        return data;
    };

    const logout = async () => {
        const data = await request('/logout', { method: 'POST' });
        if (data.success) {
            setUser(null);
            setIsAuthenticated(false);
        }
        return data;
    };

    const sendVerifyOtp = async () => {
        return request('/send-verify-otp', { method: 'POST' });
    };

    const verifyEmail = async (otp) => {
        const data = await request('/verify-email', {
            method: 'POST',
            body: JSON.stringify({ otp }),
        });

        if (data.success) {
            await fetchMe();
        }
        return data;
    };

    const sendResetOtp = async (email) => {
        return request('/send-reset-otp', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    };

    const resetPassword = async ({ email, otp, newPassword }) => {
        return request('/reset-password', {
            method: 'POST',
            body: JSON.stringify({ email, otp, newPassword }),
        });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        authLoading,
        backendUrl: BACKEND_URL,
        register,
        login,
        logout,
        checkAuth,
        fetchMe,
        sendVerifyOtp,
        verifyEmail,
        sendResetOtp,
        resetPassword,
    }), [user, isAuthenticated, authLoading]);

    return (
        <AppContent.Provider value ={value}>
            {props.children}
        </AppContent.Provider>
    )
}
export default AppContent;
