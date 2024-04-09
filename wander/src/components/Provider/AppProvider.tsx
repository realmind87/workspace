"use client"

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// 상태의 타입을 정의합니다.
type AuthState = {
    session: any;
}

// 초기 상태를 정의합니다.
const initialState: AuthState = {
    session: null,
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AuthState>(initialState);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [session, setSession] = useState<any>({user: null, token: null})

    useEffect(() => {

        const user = Cookies.get('user');
        const token = Cookies.get('token');

        if (token){
            setSession({ ...session, user, token })
        }

      }, []);
    
    return (
        <AppContext.Provider value={{session}}>
            {children}
        </AppContext.Provider>
    );
};