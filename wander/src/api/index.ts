import config from "config";
import type { Credentials, UserInfo } from "./types";

export const register = async (userInfo: UserInfo) => {
    const response = await fetch(`${config}/register`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
};


export const login = async (credentials: Credentials) => {
    const response = await fetch(`${config}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    
    // JWT를 세션 스토리지에 저장합니다.
    sessionStorage.setItem('token', data.token);
    return data;
};
