// src/AuthContext.js 또는 src/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useCookies } from 'react-cookie';

interface AuthContextType {
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    user: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const loginUser = (username: string, password: string) => {
        // 예시 로직, 실제 애플리케이션에서는 여기에 인증 로직 구현
        const fakeToken = 'FAKE_TOKEN';
        setCookie('user', JSON.stringify({ username, token: fakeToken }), { path: '/' });
    };

    const logoutUser = () => {
        removeCookie('user', { path: '/' });
    };

    const user = cookies.user ? JSON.parse(cookies.user).username : null;

    return (
        <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
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