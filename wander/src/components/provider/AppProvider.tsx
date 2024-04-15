"use client"

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Toast from '../toast'

// 상태의 타입을 정의합니다.


type ToastProps = {
    state: 'info' | 'error' | 'wran' | 'success'
    msg: string
}

type UserInfo = {
    username: string;
    avatar: string;
};

type AuthState = {
    cookies: any,
    userInfo: UserInfo | null;
    setCookie: any;
    removeCookie: any;
    loginModal: Boolean,
    setLoginModal: React.Dispatch<React.SetStateAction<Boolean>> | null,
    postModal: Boolean,
    setPostModal: React.Dispatch<React.SetStateAction<Boolean>> | null,
    toast: ToastProps | null,
    setToast: React.Dispatch<React.SetStateAction<ToastProps | null>>,
}

// 초기 상태를 정의합니다.
const initialState: AuthState = {
    cookies: null,
    userInfo: null,
    setCookie: null,
    removeCookie: null,
    loginModal: false,
    setLoginModal: null,
    postModal: false,
    setPostModal: null,
    toast: null,
    setToast: null!
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AuthState>(initialState);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(['auth', 'user']);
    const [toast, setToast] = useState<ToastProps | null>(null)
    const [loginModal, setLoginModal] = useState<Boolean>(false)
    const [postModal, setPostModal] = useState<Boolean>(false)
    
    useEffect(() => {
        const cookie = cookies;
        setUserInfo(cookie.user);
    }, [cookies])
    
    return (
        <AppContext.Provider value={{cookies, userInfo, setCookie, removeCookie, loginModal, setLoginModal, postModal, setPostModal, toast, setToast}}>
            {children}
            {toast && <Toast state={toast.state} msg={toast.msg} />}
        </AppContext.Provider>
    );
};